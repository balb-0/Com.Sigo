<Table>
  <tr>
    <td>
      <a href="https://www.querocomgas.com.br/?utm_source=google&utm_medium=cpc&utm_term=comg%C3%A1s&utm_campaign=21432544487&utm_content=765228372932&gad_source=1&gad_campaignid=21432544487&gbraid=0AAAAABVP93Y1dgkYEH7cb900l9xETrtQj&gclid=CjwKCAjwtfvEBhAmEiwA-DsKjgFtOeGUYeQECLrAI8S2y4lavUc_XcfZPp2zRsE2z1Vt1NAQdp2__xoCbvYQAvD_BwE">
        <img src="img/image.png" alt="Comgas" width="150" border="0">
      </a>
    </td>
    <td>
      <a href="https://www.inteli.edu.br/">
        <img src="img/logo-Inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" width="150" border="0">
      </a>
    </td>
  </tr>
</Table>

# Manual de Instalação - Com.Sigo

## Nome do Projeto: Com.Sigo

## Nome do Grupo: Com.Segue

## Integrantes:

- <a href="https://www.linkedin.com/in/andre-lobo-dev/">André Eduardo Lobo de Paula</a>
- <a href="https://www.linkedin.com/in/joao-souza-campos/">João Victor de Souza Campos</a>
- <a href="https://www.linkedin.com/in/otavio-vasc/">Otavio de Carvalho Vasconcelos</a>
- <a href="https://www.linkedin.com/in/rafaelbarbosa-dev/">Rafael Rocha Barbosa</a>
- <a href="https://www.linkedin.com/in/rodrigo-lee/">Rodrigo Hu Tchie Lee</a>
- <a href="https://www.linkedin.com/in/ryan-botelho-gartlan/">Ryan Botelho Gartlan</a>
- <a href="https://www.linkedin.com/in/vitor-balbo/">Vitor Margarido Balbo</a>

---

## Índice

1. [Visão Geral do Sistema](#visão-geral-do-sistema)
2. [Pré-requisitos](#pré-requisitos)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Instalação Passo a Passo](#instalação-passo-a-passo)
   - [4.1 Clonando o Repositório](#41-clonando-o-repositório)
   - [4.2 Configuração do Banco de Dados](#42-configuração-do-banco-de-dados)
   - [4.3 Configuração do Backend](#43-configuração-do-backend)
   - [4.4 Configuração do Frontend](#44-configuração-do-frontend)
   - [4.5 Configuração do Webhook Service (Opcional)](#45-configuração-do-webhook-service-opcional)
   - [4.6 Configuração dos Scripts de IA (Opcional)](#46-configuração-dos-scripts-de-ia-opcional)
   - [4.7 Configuração do Ambiente Python/Jupyter (Opcional)](#47-configuração-do-ambiente-pythonjupyter-opcional)
5. [Migrações e Seed do Banco de Dados](#migrações-e-seed-do-banco-de-dados)
6. [Executando a Aplicação](#executando-a-aplicação)
7. [Testando a Aplicação](#testando-a-aplicação)
8. [Troubleshooting](#troubleshooting)
9. [Scripts Disponíveis](#scripts-disponíveis)
10. [Arquitetura e Fluxo de Dados](#arquitetura-e-fluxo-de-dados)

---

## Visão Geral do Sistema

**Com.Sigo** é uma plataforma inteligente de análise de atendimento ao cliente para companhias de gás, que utiliza:

- **Análise de Conversas**: Processamento de linguagem natural para avaliar qualidade de atendimento
- **Busca Semântica**: Sistema de busca vetorial usando embeddings OpenAI e pgvector
- **Dashboard Interativo**: Interface React para visualização de métricas e KPIs
- **Chat Conversacional**: Agente LLM que interpreta perguntas em linguagem natural
- **Processamento de Áudio**: Transcrição automática de chamadas telefônicas

### Componentes Principais

1. **Backend** (`src/backend`): API REST em Node.js + Express + PostgreSQL + pgvector
2. **Frontend** (`src/frontend`): Interface React + TypeScript + Vite
3. **Webhook Service** (`src/webhook-service`): Servidor para integração em tempo real
4. **Scripts de IA** (`src/scripts`): Ferramentas para geração e avaliação de conversas
5. **Modelo** (`src/modelo`): Notebooks Jupyter com algoritmos de análise

---

## Pré-requisitos

### Obrigatórios

- **Node.js**: versão 18 ou superior
  - Verifique: `node --version`
  - Download: https://nodejs.org/
- **npm**: versão 9 ou superior (vem com Node.js)
  - Verifique: `npm --version`
- **PostgreSQL**: versão 14 ou superior
  - Verifique: `psql --version`
  - Download: https://www.postgresql.org/download/
- **Git**: para clonar o repositório
  - Verifique: `git --version`
  - Download: https://git-scm.com/downloads

### Opcionais (para funcionalidades específicas)

- **Python**: versão 3.11 ou superior (para notebooks Jupyter)
  - Verifique: `python --version` ou `python3 --version`
  - Download: https://www.python.org/downloads/
- **Jupyter Notebook/Lab**: para executar análises de dados
  - Instalação: `pip install jupyter`
- **Conta OpenAI**: para usar funcionalidades de IA
  - Cadastro: https://platform.openai.com/

---

## Estrutura do Projeto

```
2025-2A-T13-ES07-G03/
├── documentos/                   # Documentação do projeto
│   ├── img/                      # Imagens e diagramas
│   ├── Index.md                  # Documentação geral
│   ├── Manual-instalacao.md      # Este arquivo
│   ├── Projeto.md                # Documentação técnica
│   └── ...
├── src/
│   ├── backend/                  # API Node.js + Express
│   │   ├── src/
│   │   │   ├── app/              # Configuração do servidor
│   │   │   ├── config/           # Configurações (DB, env, Swagger)
│   │   │   ├── controllers/      # Controladores
│   │   │   ├── middleware/       # Middlewares (upload, etc)
│   │   │   ├── migrations/       # Migrações SQL
│   │   │   ├── repositories/     # Acesso a dados
│   │   │   ├── routes/           # Rotas da API
│   │   │   ├── scripts/          # Scripts utilitários
│   │   │   ├── services/         # Lógica de negócio
│   │   │   └── unittests/        # Testes unitários
│   │   └── package.json
│   ├── frontend/                 # Interface React
│   │   ├── src/
│   │   │   ├── components/       # Componentes reutilizáveis
│   │   │   ├── pages/            # Páginas (Dashboard, Chat)
│   │   │   ├── lib/              # Utilitários (API client)
│   │   │   └── assets/           # Imagens e recursos
│   │   └── package.json
│   ├── webhook-service/          # Serviço de webhooks
│   │   ├── server.js
│   │   └── package.json
│   ├── scripts/                  # Scripts de IA
│   │   ├── GenerateConversations/
│   │   ├── EvaluateConversation/
│   │   └── package.json
│   └── modelo/                   # Notebooks Jupyter
│       └── algoritmos_projeto.ipynb
├── README.md
└── RUNBOOK_SEMANTIC_SEARCH.md    # Guia de busca semântica
```

---

## Instalação Passo a Passo

### 4.1 Clonando o Repositório

```bash
# Clone o repositório
git clone https://github.com/Inteli-College/2025-2A-T13-ES07-G03.git

# Entre no diretório do projeto
cd 2025-2A-T13-ES07-G03
```

### 4.2 Configuração do Banco de Dados

#### Instalação do PostgreSQL

**macOS** (usando Homebrew):

```bash
brew install postgresql@14
brew services start postgresql@14
```

**Ubuntu/Debian**:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Windows**:

- Baixe o instalador em: https://www.postgresql.org/download/windows/
- Execute o instalador e siga as instruções

#### Criação do Banco de Dados

```bash
# Acesse o PostgreSQL como superusuário
psql postgres

# Dentro do psql, execute:
CREATE DATABASE comsigo;
CREATE USER comsigo_user WITH PASSWORD 'sua_senha_segura';
GRANT ALL PRIVILEGES ON DATABASE comsigo TO comsigo_user;

# Saia do psql
\q
```

#### Verificação da Conexão

```bash
# Teste a conexão
psql -h localhost -U comsigo_user -d comsigo

# Se conectou com sucesso, saia
\q
```

### 4.3 Configuração do Backend

#### Instalação de Dependências

```bash
# Entre no diretório do backend
cd src/backend

# Instale as dependências
npm install
```

#### Configuração de Variáveis de Ambiente

Crie um arquivo `.env` no diretório `src/backend`:

```bash
# src/backend/.env

# Porta do servidor (padrão: 4000)
PORT=4000

# Ambiente de execução
NODE_ENV=development

# URL de conexão com PostgreSQL
# Formato: postgresql://usuario:senha@host:porta/banco
DATABASE_URL=postgresql://comsigo_user:sua_senha_segura@localhost:5432/comsigo

# Origem CORS (frontend)
CORS_ORIGIN=http://localhost:5173

# Chave da API OpenAI (obrigatória para IA)
# Obtenha em: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj-...

# Configuração alternativa do banco (para notebooks Python)
DB_HOST=localhost
DB_PORT=5432
DB_USER=comsigo_user
DB_PASSWORD=sua_senha_segura
DB_NAME=comsigo
```

**⚠️ IMPORTANTE:**

- **Nunca commit o arquivo `.env`** no repositório
- Substitua `sua_senha_segura` pela senha real do banco
- A `OPENAI_API_KEY` é necessária para:
  - Busca semântica
  - Chat conversacional
  - Transcrição de áudio
  - Geração de conversas

#### Verificação da Configuração

```bash
# Teste a conexão com o banco
npm run test-db

# Deve exibir: "✅ Conexão com banco estabelecida com sucesso!"
```

### 4.4 Configuração do Frontend

```bash
# Entre no diretório do frontend
cd ../frontend

# Instale as dependências
npm install
```

O frontend não precisa de arquivo `.env` pois usa proxy configurado no `vite.config.ts` que redireciona requisições para `http://localhost:4000`.

### 4.5 Configuração do Webhook Service (Opcional)

Este serviço é necessário apenas se você precisar integrar com sistemas externos de telefonia ou processamento de chamadas.

```bash
# Entre no diretório do webhook-service
cd ../webhook-service

# Instale as dependências
npm install
```

O webhook service usa configuração padrão (porta 3000) e não requer variáveis de ambiente.

### 4.6 Configuração dos Scripts de IA (Opcional)

Necessário apenas para gerar conversas sintéticas ou avaliar conversas.

```bash
# Entre no diretório de scripts
cd ../scripts

# Instale as dependências
npm install
```

Crie um arquivo `.env` em `src/scripts`:

```bash
# src/scripts/.env

# Chave da API OpenAI
OPENAI_API_KEY=sk-proj-...

# Modelo opcional (padrão: gpt-4o-mini)
OPENAI_MODEL=gpt-4o-mini
```

### 4.7 Configuração do Ambiente Python/Jupyter (Opcional)

Necessário apenas para executar análises nos notebooks Jupyter.

```bash
# Entre no diretório modelo
cd ../modelo

# Crie um ambiente virtual (recomendado)
python3 -m venv venv

# Ative o ambiente virtual
# macOS/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Instale as dependências
pip install pandas torch transformers spacy psycopg2-binary python-dotenv jupyter

# Baixe o modelo de linguagem portuguesa do spaCy
python -m spacy download pt_core_news_lg
```

O notebook usa as mesmas variáveis de ambiente do backend (`.env` em `src/backend`).

---

## Migrações e Seed do Banco de Dados

### Executar Migrações

As migrações criam as tabelas necessárias e habilitam a extensão pgvector:

```bash
# Certifique-se de estar no diretório backend
cd src/backend

# Execute as migrações
npm run migrate
```

**Migrações executadas:**

1. `001_enable_pgvector.sql` - Habilita extensão pgvector
2. `002_create_chamada_table.sql` - Cria tabela de chamadas
3. `003_drop_nota_qualidade_check.sql` - Ajusta validações
4. `004_drop_chamada_embedding.sql` - Remove embedding da tabela principal
5. `005_create_chamada_segments.sql` - Cria tabela de segmentos com vetores

### Popular o Banco de Dados (Seed)

O seed insere chamadas de exemplo no banco de dados:

```bash
# Popular com chamadas geradas
npm run seed
```

Este comando:

- Limpa a tabela `chamada` existente (TRUNCATE)
- Insere chamadas dos arquivos JSON em `src/scripts/GenerateConversations/results/`
- Atribui `cliente_id` sequencial (1, 2, 3, ...)
- Atribui `atendente_id` rotativo (1, 2, 3, 4)

### Gerar Embeddings (Busca Semântica)

Para habilitar a busca semântica, é necessário gerar embeddings dos segmentos de conversa:

```bash
# Gera embeddings para todas as chamadas
npm run backfill:segments
```

**⚠️ ATENÇÃO:**

- Este processo consome créditos da API OpenAI
- Para ~100 chamadas com ~10 segmentos cada = ~1000 embeddings
- Custo aproximado: $0.10 - $0.30 USD (depende do modelo)
- Pode levar vários minutos

Você verá logs como:

```
Backfilled chamada 1
Backfilled chamada 2
...
Backfilled chamada 100
Done!
```

---

## Executando a Aplicação

### Modo Desenvolvimento

**Opção 1: Usando terminais separados (recomendado)**

```bash
# Terminal 1 - Backend
cd src/backend
npm run dev
# Servidor rodando em http://localhost:4000

# Terminal 2 - Frontend
cd src/frontend
npm run dev
# Aplicação rodando em http://localhost:5173
```

**Opção 2: Usando um único terminal (background)**

```bash
# Backend em background
cd src/backend
npm run dev &

# Frontend em background
cd ../frontend
npm run dev &
```

### Modo Produção

```bash
# Backend
cd src/backend
npm run build
npm start

# Frontend
cd src/frontend
npm run build
npm run preview
```

### Serviços Opcionais

**Webhook Service:**

```bash
cd src/webhook-service
npm start
# Rodando em http://localhost:3000
```

### Acessando a Aplicação

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **Swagger Docs**: http://localhost:4000/api-docs
- **Webhook Service**: http://localhost:3000 (se iniciado)

---

## Testando a Aplicação

### Testes Unitários (Backend)

```bash
cd src/backend
npm test
```

### Teste de Conexão com Banco

```bash
cd src/backend
npm run test-db
```

### Teste do Webhook Service

```bash
cd src/webhook-service
npm test
```

### Teste Manual da API

**1. Health Check:**

```bash
curl http://localhost:4000/api/health
```

**2. Listar Chamadas:**

```bash
curl http://localhost:4000/api/v1/chamadas
```

**3. Busca Semântica:**

```bash
curl "http://localhost:4000/api/v1/search?q=vazamento&speaker_tag=2&limit=10"
```

**4. Chat Conversacional:**

```bash
curl -X POST http://localhost:4000/api/v1/agent/interpret \
  -H "Content-Type: application/json" \
  -d '{"message":"cliente disse gás nos últimos 15 dias"}'
```

### Teste no Frontend

1. Acesse http://localhost:5173
2. Navegue para a página do **Dashboard**:
   - Veja a lista de chamadas
   - Teste os filtros de data
   - Verifique os KPIs
3. Navegue para a página do **Chat**:
   - Digite: "bom dia" (cumprimento casual)
   - Digite: "cliente disse vazamento" (busca semântica)
   - Digite: "atendente disse gás nos últimos 7 dias" (busca + filtro temporal)

---

## Troubleshooting

### Erro: "OPENAI_API_KEY is required"

**Problema**: A chave da API OpenAI não está configurada.

**Solução**:

1. Obtenha uma chave em https://platform.openai.com/api-keys
2. Adicione ao `.env` do backend:
   ```
   OPENAI_API_KEY=sk-proj-...
   ```
3. Reinicie o servidor backend

**Nota**: Se não precisar das funcionalidades de IA, você pode usar o sistema sem a chave, mas algumas features não funcionarão:

- Busca semântica
- Chat conversacional
- Transcrição de áudio

### Erro: "DATABASE_URL is required"

**Problema**: A URL do banco de dados não está configurada.

**Solução**:

1. Verifique se o PostgreSQL está rodando:
   ```bash
   psql -h localhost -U comsigo_user -d comsigo
   ```
2. Confirme a `DATABASE_URL` no `.env`:
   ```
   DATABASE_URL=postgresql://comsigo_user:senha@localhost:5432/comsigo
   ```
3. Certifique-se de que o banco `comsigo` existe

### Erro: "relation 'chamada' does not exist"

**Problema**: As migrações não foram executadas.

**Solução**:

```bash
cd src/backend
npm run migrate
```

### Erro: "No conversations found in results directory"

**Problema**: Não há arquivos JSON para popular o banco.

**Solução**:

```bash
# Gere conversas sintéticas
cd src/scripts
npm run dev

# Volte ao backend e execute o seed
cd ../backend
npm run seed
```

### Frontend não carrega dados do Backend

**Problema**: Proxy não está configurado ou backend não está rodando.

**Verificação**:

1. Confirme que o backend está rodando em http://localhost:4000
2. Verifique o `vite.config.ts`:
   ```typescript
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:4000',
         changeOrigin: true,
       }
     }
   }
   ```
3. Reinicie o frontend

### Busca Semântica retorna poucos resultados

**Problema**: Embeddings não foram gerados ou similaridade mínima está muito alta.

**Solução**:

```bash
# Gere embeddings
cd src/backend
npm run backfill:segments

# Teste com similaridade menor
curl "http://localhost:4000/api/v1/search?q=gás&speaker_tag=2&limit=20&min_similarity=0.5"
```

### Erro ao instalar pgvector

**Problema**: Extensão pgvector não está disponível.

**Solução**:

**macOS**:

```bash
brew install pgvector
```

**Ubuntu/Debian**:

```bash
sudo apt install postgresql-14-pgvector
```

**Windows**:

- Baixe pré-compilado de https://github.com/pgvector/pgvector/releases
- Ou compile do código-fonte

### Erro de CORS no Frontend

**Problema**: Backend rejeitando requisições do frontend.

**Solução**:
Verifique `CORS_ORIGIN` no `.env` do backend:

```
CORS_ORIGIN=http://localhost:5173
```

Para múltiplas origens:

```
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

---

## Scripts Disponíveis

### Backend (`src/backend`)

```bash
npm run dev              # Desenvolvimento com hot-reload
npm run build            # Compila TypeScript para JavaScript
npm start                # Executa versão compilada (produção)
npm test                 # Executa testes com Jest
npm run migrate          # Executa migrações do banco
npm run seed             # Popula banco com chamadas de exemplo
npm run backfill:segments # Gera embeddings para busca semântica
npm run update:chamadas:timestamps # Atualiza timestamps das chamadas
```

### Frontend (`src/frontend`)

```bash
npm run dev              # Desenvolvimento com Vite (hot-reload)
npm run build            # Build de produção
npm run preview          # Preview do build de produção
npm run lint             # Executa ESLint
```

### Scripts de IA (`src/scripts`)

```bash
npm run dev              # Gera conversas padrão (10 arquivos)
npm run gen:500          # Gera 500 conversas com parâmetros customizados
npm run eval             # Avalia uma conversa específica
npm run eval:results     # Avalia todas as conversas geradas
npm run build            # Compila TypeScript
npm run lint             # Executa ESLint
```

### Webhook Service (`src/webhook-service`)

```bash
npm start                # Inicia servidor de webhooks
npm test                 # Testa endpoints de webhook
```

---

## Arquitetura e Fluxo de Dados

### Fluxo de Busca Semântica

1. **Usuário digita no Chat**: "cliente disse 'gás' nos últimos 15 dias"
2. **Frontend chama**: `POST /api/v1/agent/interpret`
3. **Backend (LLM)**: Interpreta a mensagem e retorna JSON estruturado:
   ```json
   {
     "kind": "mixed",
     "semantic": { "query": "gás", "speaker": "cliente" },
     "dateRange": { "filter": "custom", "lastDays": 15 },
     "assistant": "Encontrei X trechos..."
   }
   ```
4. **Backend**: Gera embedding de "gás" via OpenAI
5. **Backend**: Busca em `chamada_segments` usando pgvector (kNN)
6. **Frontend**: Exibe resultados e botão "Ver no Dashboard"
7. **Dashboard**: Aplica filtros de data + exibe chamadas

### Tecnologias Utilizadas

**Backend:**

- **Node.js** + **Express**: Framework web
- **TypeScript**: Tipagem estática
- **PostgreSQL**: Banco de dados relacional
- **pgvector**: Extensão para busca vetorial
- **OpenAI API**: Embeddings e LLM
- **Multer**: Upload de arquivos
- **Swagger**: Documentação da API

**Frontend:**

- **React 19**: Biblioteca UI
- **TypeScript**: Tipagem estática
- **Vite**: Build tool e dev server
- **React Router**: Navegação
- **TanStack Table**: Tabelas interativas
- **Motion**: Animações

**Infraestrutura:**

- **Git**: Controle de versão
- **npm**: Gerenciador de pacotes
- **Jest**: Testes unitários
- **ESLint**: Linting de código

---

## Gerar Conversas (Opcional)

Há um gerador de conversas sintéticas em `src/scripts/GenerateConversations/generateConversations.ts`.

### Gerar 10 conversas (padrão):

```bash
cd src/scripts
npm run dev
```

Arquivos gerados em: `src/scripts/GenerateConversations/results/`

### Gerar 500 conversas com parâmetros customizados:

```bash
npm run gen:500
```

Parâmetros:

- `--count=500`: Número de conversas
- `--min-turns=10`: Mínimo de turnos (falas)
- `--max-turns=18`: Máximo de turnos
- `--chaos=0.5`: Variabilidade
- `--compliant-conversation-ratio=0.85`: 85% conversas compatíveis
- `--adherence-ratio=0.9`: 90% aderência ao protocolo
- `--out=GenerateConversations/results`: Diretório de saída
- `--prefix=conv`: Prefixo dos arquivos

### Avaliar conversas geradas:

```bash
npm run eval:results
```

Gera relatório em: `src/scripts/EvaluateConversation/results.json`

---

## Recursos Adicionais

- **Documentação Geral**: `documentos/Index.md`
- **Documentação Técnica**: `documentos/Projeto.md`
- **Runbook de Busca Semântica**: `RUNBOOK_SEMANTIC_SEARCH.md`
- **Gestão de Configuração**: `documentos/GestaoConfiguracao.md`
- **Gestão de Projeto**: `documentos/GestaoProjeto.md`
- **Guia de Padrões**: `documentos/GuiaPadroesDesenvolvimento.md`

---

## Contato e Suporte

Para dúvidas ou problemas:

1. Consulte a seção [Troubleshooting](#troubleshooting)
2. Verifique os logs do servidor backend e frontend
3. Consulte a documentação técnica em `documentos/Projeto.md`
4. Entre em contato com a equipe de desenvolvimento

---

## Licença

Este projeto está licenciado sob a licença Creative Commons Attribution 4.0 International (CC BY 4.0).
Mais informações: https://creativecommons.org/licenses/by/4.0/

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Inteli-College/2025-2A-T13-ES07-G03">Com.Sigo</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://inteli.edu.br">INTELI, <a href="https://www.linkedin.com/in/andre-lobo-dev/">André Eduardo Lobo de Paula</a>, <a href="https://www.linkedin.com/in/joao-souza-campos/">João Victor de Souza Campos</a>, <a href="https://www.linkedin.com/in/otavio-vasc/">Otavio de Carvalho Vasconcelos</a>, <a href="https://www.linkedin.com/in/rafaelbarbosa-dev/">Rafael Rocha Barbosa</a>, <a href="https://www.linkedin.com/in/rodrigo-lee/">Rodrigo Hu Tchie Lee</a>, <a href="https://www.linkedin.com/in/ryan-botelho-gartlan/">Ryan Botelho Gartlan</a>, <a href="https://www.linkedin.com/in/vitor-balbo/">Vitor Margarido Balbo</a></a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>
