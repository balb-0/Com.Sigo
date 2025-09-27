import React, { useState, useRef } from 'react';
import './JsonUploadModal.css';

interface JsonData {
  meta: {
    seed: number;
    persona: string;
    scenario: string;
    complyCriteriaIds: string[];
    violateCriteriaIds: string[];
  };
  results: Array<{
    channelTag: number;
    alternatives: Array<{
      words: Array<{
        word: string;
        endTime: string;
        startTime: string;
        speakerTag: number;
      }>;
      confidence: number;
      transcript: string;
    }>;
  }>;
  totalBilledTime: string;
}

interface JsonUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: JsonData) => Promise<void>;
  isSubmitting?: boolean;
}

export function JsonUploadModal({ isOpen, onClose, onSubmit, isSubmitting = false }: JsonUploadModalProps) {
  const [jsonData, setJsonData] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateJsonStructure = (data: any): data is JsonData => {
    // Verificar se tem a estrutura básica
    if (!data || typeof data !== 'object') {
      return false;
    }

    // Verificar meta
    if (!data.meta || typeof data.meta !== 'object') {
      return false;
    }

    const meta = data.meta;
    if (
      typeof meta.seed !== 'number' ||
      typeof meta.persona !== 'string' ||
      typeof meta.scenario !== 'string' ||
      !Array.isArray(meta.complyCriteriaIds) ||
      !Array.isArray(meta.violateCriteriaIds)
    ) {
      return false;
    }

    // Verificar results
    if (!Array.isArray(data.results)) {
      return false;
    }

    for (const result of data.results) {
      if (
        typeof result.channelTag !== 'number' ||
        !Array.isArray(result.alternatives)
      ) {
        return false;
      }

      for (const alternative of result.alternatives) {
        if (
          !Array.isArray(alternative.words) ||
          typeof alternative.confidence !== 'number' ||
          typeof alternative.transcript !== 'string'
        ) {
          return false;
        }

        for (const word of alternative.words) {
          if (
            typeof word.word !== 'string' ||
            typeof word.endTime !== 'string' ||
            typeof word.startTime !== 'string' ||
            typeof word.speakerTag !== 'number'
          ) {
            return false;
          }
        }
      }
    }

    // Verificar totalBilledTime
    if (typeof data.totalBilledTime !== 'string') {
      return false;
    }

    return true;
  };

  const parseCSVtoJSON = (csvText: string): any => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('CSV deve ter pelo menos 2 linhas (cabeçalho e dados)');
    }

    console.log('Total de linhas no CSV:', lines.length);
    console.log('Primeira linha (cabeçalho):', lines[0]);
    console.log('Segunda linha (dados, primeiros 200 chars):', lines[1].substring(0, 200));

    // Parse do cabeçalho
    const headerLine = lines[0];
    const headers = parseCSVLine(headerLine);
    console.log('Colunas encontradas:', headers);

    // Procurar pela coluna transcript_json
    const transcriptIndex = headers.findIndex(h => h.toLowerCase().trim() === 'transcript_json');
    if (transcriptIndex === -1) {
      console.error('Coluna transcript_json não encontrada. Colunas disponíveis:', headers);
      throw new Error(`CSV deve conter uma coluna "transcript_json". Colunas encontradas: ${headers.join(', ')}`);
    }
    
    console.log('Índice da coluna transcript_json:', transcriptIndex);

    // Parse da primeira linha de dados
    const dataLine = lines[1];
    const data = parseCSVLine(dataLine);
    console.log('Total de colunas na linha de dados:', data.length);

    if (data.length <= transcriptIndex) {
      throw new Error(`Linha de dados não possui dados suficientes. Esperado: ${transcriptIndex + 1}, encontrado: ${data.length}`);
    }

    const transcriptData = data[transcriptIndex];
    console.log('Dados da coluna transcript_json (primeiros 300 chars):', transcriptData.substring(0, 300));
    
    if (!transcriptData) {
      throw new Error('Coluna transcript_json está vazia');
    }

    try {
      // Limpar possíveis aspas duplas escapadas e outros caracteres problemáticos
      let cleanedData = transcriptData.trim();
      
      // Se começar e terminar com aspas, remover
      if (cleanedData.startsWith('"') && cleanedData.endsWith('"')) {
        cleanedData = cleanedData.slice(1, -1);
      }
      
      // Substituir aspas duplas escapadas
      cleanedData = cleanedData.replace(/\\"/g, '"');
      
      console.log('Dados limpos para parse (primeiros 300 chars):', cleanedData.substring(0, 300));
      
      return JSON.parse(cleanedData);
    } catch (err) {
      console.error('Erro ao fazer parse do JSON:', err);
      console.error('Dados da coluna (primeiros 500 chars):', transcriptData.substring(0, 500));
      throw new Error('Dados JSON na coluna transcript_json são inválidos: ' + (err as Error).message);
    }
  };

  // Função auxiliar para fazer parse de linha CSV considerando aspas
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    let i = 0;

    while (i < line.length) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Aspas duplas escapadas
          current += '"';
          i += 2;
        } else {
          // Início ou fim de aspas
          inQuotes = !inQuotes;
          i++;
        }
      } else if (char === ',' && !inQuotes) {
        // Vírgula fora de aspas - fim do campo
        result.push(current.trim());
        current = '';
        i++;
      } else {
        current += char;
        i++;
      }
    }
    
    // Adicionar o último campo
    result.push(current.trim());
    
    return result;
  };

  const handleFileUpload = (file: File) => {
    const isJSON = file.type === 'application/json' || file.name.endsWith('.json');
    const isCSV = file.type === 'text/csv' || file.name.endsWith('.csv');

    if (!isJSON && !isCSV) {
      setError('Por favor, selecione um arquivo JSON ou CSV válido.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      
      try {
        if (isCSV) {
          console.log('Processando arquivo CSV...');
          console.log('Conteúdo do CSV (primeiras 500 chars):', content.substring(0, 500));
          
          const jsonData = parseCSVtoJSON(content);
          console.log('JSON extraído do CSV:', jsonData);
          
          setJsonData(JSON.stringify(jsonData, null, 2));
        } else {
          console.log('Processando arquivo JSON...');
          setJsonData(content);
        }
        setError('');
      } catch (err) {
        console.error('Erro ao processar arquivo:', err);
        setError(err instanceof Error ? err.message : 'Erro ao processar arquivo');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!jsonData.trim()) {
      setError('Por favor, insira ou carregue um arquivo JSON.');
      return;
    }

    try {
      const parsedData = JSON.parse(jsonData);
      
      if (!validateJsonStructure(parsedData)) {
        setError('O formato do JSON não está correto. Verifique se contém todas as propriedades necessárias (meta, results, totalBilledTime).');
        return;
      }

      await onSubmit(parsedData);
      handleClose();
    } catch (err) {
      setError('JSON inválido. Verifique a sintaxe do arquivo.');
    }
  };

  const handleClose = () => {
    setJsonData('');
    setError('');
    setIsDragOver(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="json-upload-modal-overlay" onClick={handleClose}>
      <div className="json-upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="json-upload-modal-header">
          <h2>Analisar Chamada - JSON/CSV</h2>
          <button className="json-upload-modal-close" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

          <div className="json-upload-modal-content">
          <p className="json-upload-description">
            Carregue um arquivo JSON ou CSV com os dados da chamada para análise, ou cole o conteúdo JSON diretamente no campo abaixo.
          </p>

          <div 
            className={`json-upload-dropzone ${isDragOver ? 'dragover' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7,10 12,15 17,10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <p>
              <strong>Clique para selecionar</strong> ou arraste um arquivo aqui
            </p>
            <p className="json-upload-hint">Arquivos .json e .csv são aceitos</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.csv"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />          <div className="json-upload-textarea-container">
            <label htmlFor="json-textarea">Ou cole o JSON diretamente:</label>
            <textarea
              id="json-textarea"
              className="json-upload-textarea"
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              placeholder='{"meta": {"seed": 123, "persona": "satisfeito", ...}, "results": [...], "totalBilledTime": "67.097s"}'
              rows={10}
            />
          </div>

          {error && (
            <div className="json-upload-error">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              {error}
            </div>
          )}
        </div>

        <div className="json-upload-modal-footer">
          <button className="json-upload-btn-secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancelar
          </button>
          <button className="json-upload-btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Processando...' : 'Analisar Chamada'}
          </button>
        </div>
      </div>
    </div>
  );
}