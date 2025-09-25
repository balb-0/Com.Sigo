# Modal de Upload JSON - Analisar Chamadas

## Funcionalidade Implementada

Foi implementado um modal que permite inserir um arquivo JSON com dados de chamadas para análise. O modal está integrado ao botão "Analisar chamadas" no header da aplicação.

## Como Usar

1. **Clique no botão "Analisar chamadas"** no header da aplicação
2. **No modal que abrir, você pode:**
   - Arrastar e soltar um arquivo `.json`
   - Clicar na área de upload para selecionar um arquivo
   - Colar o JSON diretamente no campo de texto

## Formato JSON Esperado

O JSON deve conter a seguinte estrutura:

```json
{
  "meta": {
    "seed": 625770300,
    "persona": "satisfeito",
    "scenario": "Cliente liga por suspeita de cheiro de gás, atendente acalma e orienta",
    "complyCriteriaIds": ["2.0", "3.2", "4.8", "3.3", "1.1", "4.2"],
    "violateCriteriaIds": ["2.3", "2.2", "3.5", "4.5"]
  },
  "results": [
    {
      "channelTag": 1,
      "alternatives": [
        {
          "words": [
            {
              "word": "Oi,",
              "endTime": "0.4s",
              "startTime": "0s",
              "speakerTag": 2
            }
          ],
          "confidence": 0.9791241,
          "transcript": "Oi, boa tarde! ..."
        }
      ]
    }
  ],
  "totalBilledTime": "67.097s"
}
```

## Validações Implementadas

- **Estrutura JSON**: Verifica se contém `meta`, `results` e `totalBilledTime`
- **Tipos de dados**: Valida se os campos têm os tipos corretos
- **Arquivo**: Aceita apenas arquivos com extensão `.json`
- **Sintaxe**: Verifica se o JSON está bem formado

## Fluxo de Dados

1. **Frontend**: Modal valida e envia JSON
2. **API**: Endpoint `POST /api/v1/chamadas` recebe o JSON
3. **Backend**: Service processa e salva na tabela `chamada`
4. **Banco**: Dados são armazenados com:
   - `transcript_json`: JSON completo da chamada
   - `cliente_id`: ID gerado automaticamente
   - `atendente_id`: Atendente padrão
   - `created_at`: Timestamp de criação

## Estados do Modal

- **Carregando**: Mostra "Processando..." durante envio
- **Erro**: Exibe mensagens de erro específicas
- **Sucesso**: Confirma criação da chamada com ID

## Exemplo de Uso

```javascript
// O JSON será enviado para:
POST /api/v1/chamadas

// Resposta esperada:
{
  "chamada_id": 123,
  "created_at": "2025-09-25T19:30:00.000Z",
  "cliente_id": "cliente_1727299800000",
  "atendente_id": "atendente_1",
  "transcript_json": { /* JSON completo */ },
  "nota_qualidade": null,
  "avaliacao_json": null
}
```

## Arquivos Implementados

### Frontend
- `/src/components/JsonUploadModal/JsonUploadModal.tsx` - Componente do modal
- `/src/components/JsonUploadModal/JsonUploadModal.css` - Estilos do modal
- `/src/components/Header/Header.tsx` - Integração com botão
- `/src/lib/api.ts` - Função `createChamada()`

### Backend
- `/src/controllers/chamada.controller.ts` - Método `create()`
- `/src/services/chamada.service.ts` - Método `createFromJson()`
- `/src/routes/v1/chamada.routes.ts` - Rota `POST /`

A funcionalidade está pronta para uso e os dados JSON são automaticamente salvos na tabela `chamada` do banco de dados.