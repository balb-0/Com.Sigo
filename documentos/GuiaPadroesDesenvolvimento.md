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

# Guia de Padrões de Desenvolvimento - Com.Sigo

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

# Sumário

- [1. Introdução](#1-introdução)
  - [1.1 Objetivo do Documento](#11-objetivo-do-documento)
  - [1.2 Escopo e Aplicabilidade](#12-escopo-e-aplicabilidade)
- [2. Padrões de Codificação](#2-padrões-de-codificação)
  - [2.1 Naming Conventions](#21-naming-conventions)
  - [2.2 Formatação de Código](#22-formatação-de-código)
  - [2.3 Comentários e Documentação](#23-comentários-e-documentação)
  - [2.4 Organização de Imports](#24-organização-de-imports)
  - [2.5 Tratamento de Erros](#25-tratamento-de-erros)
- [3. Padrões de Projeto](#3-padrões-de-projeto)
  - [3.1 Design Patterns](#31-design-patterns)
  - [3.2 Arquitetura de Software](#32-arquitetura-de-software)
  - [3.3 Estrutura de Diretórios](#33-estrutura-de-diretórios)
- [4. Práticas de Desenvolvimento](#4-práticas-de-desenvolvimento)
  - [4.1 Testes Automatizados](#41-testes-automatizados)
  - [4.2 Controle de Qualidade](#42-controle-de-qualidade)
  - [4.3 Versionamento e Git](#43-versionamento-e-git)
  - [4.4 Code Review](#44-code-review)
- [5. Ferramentas e Tecnologias](#5-ferramentas-e-tecnologias)
  - [5.1 Ferramentas de Desenvolvimento](#51-ferramentas-de-desenvolvimento)
  - [5.2 Tecnologias e Frameworks](#52-tecnologias-e-frameworks)
  - [5.3 Bibliotecas Principais](#53-bibliotecas-principais)
- [6. Segurança e Boas Práticas](#6-segurança-e-boas-práticas)
  - [6.1 Variáveis de Ambiente](#61-variáveis-de-ambiente)
  - [6.2 Validação de Dados](#62-validação-de-dados)
  - [6.3 Segurança de API](#63-segurança-de-api)
- [7. Performance e Otimização](#7-performance-e-otimização)
  - [7.1 Backend](#71-backend)
  - [7.2 Frontend](#72-frontend)
  - [7.3 Banco de Dados](#73-banco-de-dados)

---

# 1. Introdução

## 1.1 Objetivo do Documento

Este documento estabelece padrões de codificação, práticas de desenvolvimento e diretrizes arquiteturais para o projeto **Com.Sigo**. O objetivo é garantir:

- **Consistência**: Código uniforme e previsível em toda a base
- **Qualidade**: Redução de bugs e facilidade de manutenção
- **Colaboração**: Facilitar o trabalho em equipe e code reviews
- **Escalabilidade**: Código que suporta crescimento e evolução
- **Legibilidade**: Código auto-explicativo e bem documentado

Seguir estes padrões é fundamental para manter a saúde do projeto a longo prazo e facilitar a integração de novos desenvolvedores.

## 1.2 Escopo e Aplicabilidade

Este guia se aplica a:

- **Backend** (Node.js + Express + TypeScript)
- **Frontend** (React + TypeScript + Vite)
- **Scripts** (TypeScript/JavaScript para automação)
- **Banco de Dados** (PostgreSQL + migrações SQL)
- **Notebooks** (Python + Jupyter para análise de dados)

---

# 2. Padrões de Codificação

## 2.1 Naming Conventions

### JavaScript/TypeScript

**Variáveis e Funções**: camelCase

```typescript
// ✅ Correto
let userName = "John";
const totalPrice = 100;

function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

// ❌ Incorreto
let UserName = "John";
let total_price = 100;
function CalculateTotal() {}
```

**Classes e Interfaces**: PascalCase

```typescript
// ✅ Correto
class UserProfile {
  constructor(public name: string) {}
}

interface PaymentGateway {
  processPayment(amount: number): Promise<void>;
}

// ❌ Incorreto
class userProfile {}
interface paymentGateway {}
```

**Types**: PascalCase

```typescript
// ✅ Correto
type ChamadaStatus = "pending" | "processing" | "completed" | "failed";
type ApiResponse<T> = { data: T; error?: string };

// ❌ Incorreto
type chamada_status = "pending" | "processing";
```

**Constantes**: UPPER_CASE com underscores

```typescript
// ✅ Correto
const MAX_USERS = 100;
const API_TIMEOUT = 5000;
const DEFAULT_PAGE_SIZE = 20;

// ❌ Incorreto
const maxUsers = 100;
const ApiTimeout = 5000;
```

**Enums**: PascalCase para nome, UPPER_CASE para valores

```typescript
// ✅ Correto
enum HttpStatus {
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

// ❌ Incorreto
enum httpStatus {
  ok = 200,
  notFound = 404,
}
```

**Arquivos e Diretórios**:

- Componentes React: PascalCase (ex: `UserProfile.tsx`)
- Services, Controllers, Repositories: camelCase.tipo (ex: `chamada.service.ts`)
- Utilitários: camelCase (ex: `formatDate.ts`)
- Diretórios: camelCase (ex: `components/`, `services/`)

### Python (Notebooks)

**Variáveis e Funções**: snake_case

```python
# ✅ Correto
user_name = "John"
total_price = 100

def calculate_total(price, quantity):
    return price * quantity

# ❌ Incorreto
userName = "John"
def CalculateTotal(): pass
```

**Classes**: PascalCase

```python
# ✅ Correto
class DataProcessor:
    def __init__(self):
        pass

# ❌ Incorreto
class data_processor:
    pass
```

### SQL

**Tabelas e Colunas**: snake_case

```sql
-- ✅ Correto
CREATE TABLE chamada_segments (
  segment_id SERIAL PRIMARY KEY,
  chamada_id INTEGER NOT NULL,
  speaker_tag INTEGER NOT NULL,
  text TEXT NOT NULL
);

-- ❌ Incorreto
CREATE TABLE ChamadaSegments (
  SegmentId SERIAL PRIMARY KEY
);
```

## 2.2 Formatação de Código

### Indentação

- **JavaScript/TypeScript**: 2 espaços
- **Python**: 4 espaços (PEP 8)
- **SQL**: 2 espaços

```typescript
// ✅ Correto - 2 espaços
function processData(data: string[]): void {
  if (data.length > 0) {
    data.forEach((item) => {
      console.log(item);
    });
  }
}

// ❌ Incorreto - tabs ou 4 espaços em TS
function processData(data: string[]): void {
  if (data.length > 0) {
    // ...
  }
}
```

### Linhas

- **Comprimento máximo**: 100 caracteres (flexível para strings longas)
- Quebrar linhas longas em pontos lógicos

```typescript
// ✅ Correto
const result = await chamadaRepository.findBySpeakerAndDateRange(
  speakerTag,
  startDate,
  endDate,
  limit
);

// ❌ Incorreto - linha muito longa
const result = await chamadaRepository.findBySpeakerAndDateRange(
  speakerTag,
  startDate,
  endDate,
  limit
);
```

### Chaves e Espaçamento

**Chaves**: Abertura na mesma linha (K&R style)

```typescript
// ✅ Correto
if (condition) {
  doSomething();
} else {
  doSomethingElse();
}

// ❌ Incorreto
if (condition) {
  doSomething();
}
```

**Espaçamento**:

```typescript
// ✅ Correto
const sum = a + b;
if (x === 5) {
}
function test(a: number, b: number) {}

// ❌ Incorreto
const sum = a + b;
if (x === 5) {
}
function test(a: number, b: number) {}
```

### Ponto e vírgula

- **Sempre usar** ponto e vírgula no final das declarações

```typescript
// ✅ Correto
const name = "John";
doSomething();

// ❌ Incorreto
const name = "John";
doSomething();
```

### Aspas

- **Usar aspas simples** (`'`) como padrão em TypeScript/JavaScript
- **Usar aspas duplas** para JSX/TSX attributes

```typescript
// ✅ Correto
const message = "Hello, world!";
const html = <div className="container">Content</div>;

// ❌ Incorreto
const message = "Hello, world!";
const html = <div className="container">Content</div>;
```

## 2.3 Comentários e Documentação

### Comentários de Linha

Use `//` para explicar lógica complexa ou decisões não óbvias:

```typescript
// ✅ Correto - explica o "porquê"
// Usamos 30 dias como período padrão para manter consistência com relatórios mensais
const DEFAULT_PERIOD_DAYS = 30;

// Converte speaker string para speaker_tag numérico (1=agente, 2=cliente)
const speakerTag = speaker === "agente" ? 1 : 2;

// ❌ Incorreto - explica o óbvio
// Define a variável name como "John"
const name = "John";

// Incrementa i
i++;
```

### Comentários de Bloco (JSDoc)

**Obrigatório** para:

- Funções públicas/exportadas
- Classes e interfaces
- Tipos complexos

````typescript
/**
 * Busca chamadas por similaridade semântica usando embeddings vetoriais
 *
 * @param query - Texto da consulta para gerar embedding
 * @param speakerTag - Tag do falante (1=agente, 2=cliente, null=ambos)
 * @param limit - Número máximo de resultados a retornar
 * @param minSimilarity - Similaridade mínima (0-1) para incluir resultado
 * @returns Lista de segmentos ordenados por similaridade
 * @throws {Error} Se a geração do embedding falhar
 *
 * @example
 * ```typescript
 * const results = await searchBySemantic('vazamento de gás', 2, 10, 0.7);
 * console.log(results[0].similarity); // 0.89
 * ```
 */
async function searchBySemantic(
  query: string,
  speakerTag: number | null,
  limit: number = 10,
  minSimilarity: number = 0.7
): Promise<SearchResult[]> {
  // implementação...
}
````

### Comentários TODO/FIXME

Use tags padronizadas para marcar trabalho futuro:

```typescript
// TODO: Implementar cache de embeddings para reduzir chamadas à API
// FIXME: Bug ao processar chamadas com menos de 3 segmentos
// HACK: Workaround temporário até atualização do pgvector
// NOTE: Alteração solicitada pelo parceiro Comgás
```

### Documentação da API (Swagger)

**Obrigatório** para todas as rotas da API:

```typescript
/**
 * @swagger
 * /api/v1/chamadas:
 *   get:
 *     summary: Lista todas as chamadas
 *     description: Retorna lista paginada de chamadas com filtros opcionais
 *     tags:
 *       - Chamadas
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Itens por página
 *     responses:
 *       200:
 *         description: Lista de chamadas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Chamada'
 *                 total:
 *                   type: integer
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/chamadas", chamadaController.listAll);
```

## 2.4 Organização de Imports

### TypeScript/JavaScript

Organizar imports em grupos (separados por linha em branco):

```typescript
// 1. Bibliotecas externas (node_modules)
import express from "express";
import { Router } from "express";
import axios from "axios";

// 2. Módulos internos do projeto
import { ChamadaRepository } from "../repositories/chamada.repository";
import { EmbeddingService } from "../services/embedding.service";

// 3. Types e Interfaces
import type { Chamada, ChamadaSegment } from "../types/chamada";
import type { ApiResponse } from "../types/api";

// 4. Constantes e configurações
import { DATABASE_URL } from "../config/env";
import { SPEAKER_TAGS } from "../constants";
```

### Python

```python
# 1. Biblioteca padrão
import os
import sys
from datetime import datetime

# 2. Bibliotecas externas
import pandas as pd
import numpy as np
from dotenv import load_dotenv

# 3. Módulos locais
from utils.db import get_connection
from models.sentiment import analyze_sentiment
```

## 2.5 Tratamento de Erros

### Backend (TypeScript)

**Sempre usar try-catch** em operações assíncronas:

```typescript
// ✅ Correto
async function getChamada(id: number): Promise<Chamada> {
  try {
    const chamada = await chamadaRepository.findById(id);

    if (!chamada) {
      throw new Error(`Chamada ${id} não encontrada`);
    }

    return chamada;
  } catch (error) {
    console.error("Erro ao buscar chamada:", error);
    throw error; // Re-throw para controller tratar
  }
}

// ❌ Incorreto - sem tratamento de erro
async function getChamada(id: number): Promise<Chamada> {
  const chamada = await chamadaRepository.findById(id);
  return chamada;
}
```

**Erros customizados** para casos específicos:

```typescript
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// Uso
if (!chamada) {
  throw new NotFoundError(`Chamada ${id} não encontrada`);
}
```

### Frontend (React)

**Error boundaries** para componentes críticos:

```typescript
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo deu errado. Tente recarregar a página.</h1>;
    }
    return this.props.children;
  }
}
```

**Try-catch em async operations**:

```typescript
const handleSubmit = async () => {
  try {
    setLoading(true);
    const response = await api.createChamada(data);
    setSuccess(true);
  } catch (error) {
    console.error("Erro ao criar chamada:", error);
    setError("Falha ao criar chamada. Tente novamente.");
  } finally {
    setLoading(false);
  }
};
```

---

# 3. Padrões de Projeto

## 3.1 Design Patterns

### Repository Pattern (Backend)

**Abstração de acesso a dados** - Separa lógica de negócio de acesso ao banco:

```typescript
// repositories/chamada.repository.ts
export class ChamadaRepository {
  async findById(id: number): Promise<Chamada | null> {
    const result = await db.query("SELECT * FROM chamada WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  async findAll(limit: number, offset: number): Promise<Chamada[]> {
    const result = await db.query(
      "SELECT * FROM chamada ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    return result.rows;
  }
}

// services/chamada.service.ts
export class ChamadaService {
  constructor(private repository: ChamadaRepository) {}

  async getChamada(id: number): Promise<Chamada> {
    const chamada = await this.repository.findById(id);

    if (!chamada) {
      throw new NotFoundError("Chamada não encontrada");
    }

    return chamada;
  }
}
```

### Service Layer Pattern

**Encapsulamento de lógica de negócio**:

```typescript
// services/embedding.service.ts
export class EmbeddingService {
  private openai: OpenAI;
  private cache = new Map<string, number[]>();

  async generateEmbedding(text: string): Promise<number[]> {
    // Verifica cache
    if (this.cache.has(text)) {
      return this.cache.get(text)!;
    }

    // Chama API OpenAI
    const response = await this.openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    const embedding = response.data[0].embedding;
    this.cache.set(text, embedding);

    return embedding;
  }
}
```

### Singleton Pattern

**Instância única** para conexões de banco, clientes de API:

```typescript
// config/db.ts
import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
    });
  }
  return pool;
}
```

### Factory Pattern

**Criação de objetos** baseada em condições:

```typescript
// factories/notifier.factory.ts
export class NotifierFactory {
  static create(type: "email" | "sms" | "webhook"): Notifier {
    switch (type) {
      case "email":
        return new EmailNotifier();
      case "sms":
        return new SmsNotifier();
      case "webhook":
        return new WebhookNotifier();
      default:
        throw new Error(`Unknown notifier type: ${type}`);
    }
  }
}
```

### Custom Hooks (React)

**Reutilização de lógica** em componentes:

```typescript
// hooks/useChamadas.ts
export function useChamadas(filters: ChamadaFilters) {
  const [chamadas, setChamadas] = useState<Chamada[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChamadas = async () => {
      setLoading(true);
      try {
        const data = await api.getChamadas(filters);
        setChamadas(data);
      } catch (err) {
        setError("Erro ao carregar chamadas");
      } finally {
        setLoading(false);
      }
    };

    fetchChamadas();
  }, [filters]);

  return { chamadas, loading, error };
}

// Uso no componente
function Dashboard() {
  const { chamadas, loading, error } = useChamadas({ limit: 20 });

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;

  return <Table data={chamadas} />;
}
```

## 3.2 Arquitetura de Software

### Arquitetura em Camadas

O projeto utiliza **arquitetura de três camadas** com separação clara de responsabilidades:

```
┌─────────────────────────────────────────┐
│         PRESENTATION LAYER              │
│  (Controllers, Routes, Middleware)      │
│  - Validação de entrada                 │
│  - Formatação de resposta               │
│  - Autenticação/Autorização             │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         BUSINESS LOGIC LAYER            │
│         (Services)                      │
│  - Regras de negócio                    │
│  - Orquestração de operações            │
│  - Processamento de dados               │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         DATA ACCESS LAYER               │
│         (Repositories)                  │
│  - Queries SQL                          │
│  - Mapeamento de dados                  │
│  - Transações                           │
└─────────────────────────────────────────┘
```

### Backend: MVC + Services

```
src/backend/src/
├── routes/           # Definição de rotas
├── controllers/      # Entrada HTTP, validação
├── services/         # Lógica de negócio
├── repositories/     # Acesso a dados
├── middleware/       # Autenticação, logging, etc
├── config/           # Configurações
└── types/            # Definições TypeScript
```

**Exemplo de fluxo**:

```typescript
// 1. Route
router.get("/chamadas/:id", chamadaController.getById);

// 2. Controller
export class ChamadaController {
  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const chamada = await chamadaService.getChamada(id);
      res.json({ data: chamada });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// 3. Service
export class ChamadaService {
  async getChamada(id: number): Promise<Chamada> {
    const chamada = await chamadaRepository.findById(id);

    if (!chamada) {
      throw new NotFoundError("Chamada não encontrada");
    }

    // Enriquece com dados adicionais
    chamada.segments = await segmentsRepository.findByChamadaId(id);

    return chamada;
  }
}

// 4. Repository
export class ChamadaRepository {
  async findById(id: number): Promise<Chamada | null> {
    const result = await db.query("SELECT * FROM chamada WHERE id = $1", [id]);
    return result.rows[0] || null;
  }
}
```

### Frontend: Component-Based Architecture

```
src/frontend/src/
├── pages/            # Páginas principais (Dashboard, Chat)
├── components/       # Componentes reutilizáveis
├── lib/              # Utilitários e API client
└── assets/           # Recursos estáticos
```

**Princípios**:

- **Componentes pequenos e focados** (Single Responsibility)
- **Props bem tipadas** com TypeScript
- **Separação de lógica e apresentação** (Custom Hooks)

```typescript
// ✅ Correto - Componente focado
interface KPICardProps {
  title: string;
  value: number;
  format?: "number" | "percentage" | "currency";
  trend?: "up" | "down" | "neutral";
}

export function KPICard({
  title,
  value,
  format = "number",
  trend,
}: KPICardProps) {
  const formattedValue = formatValue(value, format);
  const trendIcon = getTrendIcon(trend);

  return (
    <div className="kpi-card">
      <h3>{title}</h3>
      <p>{formattedValue}</p>
      {trendIcon}
    </div>
  );
}

// ❌ Incorreto - Componente fazendo demais
function Dashboard() {
  // Lógica de fetch, processamento, apresentação tudo junto
  const [data, setData] = useState([]);
  useEffect(() => {
    /* fetch */
  }, []);
  // 300 linhas de código...
}
```

## 3.3 Estrutura de Diretórios

### Backend

```
src/backend/
├── src/
│   ├── app/
│   │   ├── server.ts          # Entry point
│   │   └── setupApp.ts        # Configuração Express
│   ├── config/
│   │   ├── db.ts              # Pool PostgreSQL
│   │   ├── env.ts             # Variáveis de ambiente
│   │   └── swagger.ts         # Configuração Swagger
│   ├── controllers/
│   │   └── chamada.controller.ts
│   ├── services/
│   │   ├── chamada.service.ts
│   │   ├── embedding.service.ts
│   │   └── intent.service.ts
│   ├── repositories/
│   │   ├── chamada.repository.ts
│   │   └── chamadaSegments.repository.ts
│   ├── routes/
│   │   ├── index.ts           # Agregador de rotas
│   │   ├── v1.ts              # Rotas v1
│   │   └── v1/
│   │       ├── chamadas.routes.ts
│   │       ├── search.routes.ts
│   │       └── agent.routes.ts
│   ├── middleware/
│   │   └── upload.ts          # Multer config
│   ├── migrations/
│   │   ├── runMigrations.ts
│   │   └── sql/
│   │       ├── 001_enable_pgvector.sql
│   │       └── 002_create_chamada_table.sql
│   ├── scripts/
│   │   ├── seed-chamadas.ts
│   │   └── backfill-chamada-embeddings.ts
│   ├── types/
│   │   └── global.d.ts
│   └── unittests/
│       └── chamada.service.test.ts
├── package.json
└── tsconfig.json
```

### Frontend

```
src/frontend/
├── src/
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Dashboard.css
│   │   │   └── types.ts
│   │   └── ChatPage/
│   │       ├── ChatPage.tsx
│   │       ├── ChatPage.css
│   │       └── types.ts
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── Header.css
│   │   ├── Table/
│   │   │   ├── Table.tsx
│   │   │   ├── Table.css
│   │   │   └── types.ts
│   │   └── KPICard/
│   │       ├── KPICard.tsx
│   │       └── KPICard.css
│   ├── lib/
│   │   └── api.ts             # API client
│   ├── assets/
│   │   └── images/
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

# 4. Práticas de Desenvolvimento

## 4.1 Testes Automatizados

### Testes Unitários (Jest)

**Obrigatório** para:

- Services com lógica de negócio
- Utilitários e helpers
- Repositories com queries complexas

```typescript
// chamada.service.test.ts
import { ChamadaService } from "../services/chamada.service";
import { ChamadaRepository } from "../repositories/chamada.repository";

describe("ChamadaService", () => {
  let service: ChamadaService;
  let mockRepository: jest.Mocked<ChamadaRepository>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
    } as any;

    service = new ChamadaService(mockRepository);
  });

  describe("getChamada", () => {
    it("deve retornar chamada quando encontrada", async () => {
      const mockChamada = { id: 1, cliente_id: 1, atendente_id: 1 };
      mockRepository.findById.mockResolvedValue(mockChamada);

      const result = await service.getChamada(1);

      expect(result).toEqual(mockChamada);
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
    });

    it("deve lançar erro quando chamada não encontrada", async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.getChamada(999)).rejects.toThrow(
        "Chamada não encontrada"
      );
    });
  });
});
```

**Executar testes**:

```bash
npm test                    # Todos os testes
npm test -- --watch        # Watch mode
npm test -- --coverage     # Com cobertura
```

### Testes de Integração

**Recomendado** para:

- Fluxos completos de API
- Interação entre camadas

````typescript
// integration/chamadas.test.ts
import request from 'supertest';
import { app } from '../app/setupApp';

describe('Chamadas API', () => {
  it('GET /api/v1/chamadas deve retornar lista', async () => {
    const response = await request(app)
      .get('/api/v1/chamadas')
      .query({ limit: 10 })
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('POST /api/v1/chamadas deve criar nova chamada', async () => {
    const novaChamada = {
      cliente_id: 1,
      atendente_id: 1,
      transcript_json: { messages: [] }
    };

    const response = await request(app)
      .post('/api/v1/chamadas')
      .send(novaChamada)
      .expect(201);

    expect(response.body.data).toHaveProperty('id');
  });
    });
    ```

### Testes End-to-End (E2E)

**Opcional** com Cypress:
```typescript
// cypress/e2e/dashboard.cy.ts
describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve exibir lista de chamadas', () => {
    cy.get('[data-testid="chamadas-table"]').should('be.visible');
    cy.get('[data-testid="chamada-row"]').should('have.length.greaterThan', 0);
  });

  it('deve filtrar por data', () => {
    cy.get('[data-testid="date-filter"]').select('today');
    cy.get('[data-testid="chamada-row"]').each(($row) => {
      cy.wrap($row).find('.date').should('contain', new Date().toLocaleDateString());
    });
  });
});
````

### Cobertura de Testes

**Metas**:

- Services: **80%+** de cobertura
- Repositories: **70%+** de cobertura
- Controllers: **60%+** de cobertura

## 4.2 Controle de Qualidade

### ESLint

**Configuração** (`.eslintrc.json`):

```json
{
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

**Executar**:

```bash
npm run lint              # Verificar
npm run lint -- --fix     # Corrigir automaticamente
```

### Prettier (Opcional)

**Configuração** (`.prettierrc`):

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### TypeScript Strict Mode

**Sempre usar** modo strict no `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

## 4.3 Versionamento e Git

### Branching Strategy

**Git Flow simplificado**:

```
main (produção)
  └── develop (desenvolvimento)
       ├── feature/nova-funcionalidade
       ├── bugfix/corrige-bug
       └── hotfix/correcao-urgente
```

**Branches**:

- `main`: Código em produção (protegido)
- `develop`: Integração contínua
- `feature/*`: Novas funcionalidades
- `bugfix/*`: Correções de bugs
- `hotfix/*`: Correções urgentes em produção
- `docs/*`: Documentação

### Commits

**Conventional Commits**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (sem mudança de lógica)
- `refactor`: Refatoração
- `test`: Adiciona/modifica testes
- `chore`: Tarefas de manutenção

**Exemplos**:

```bash
git commit -m "feat(search): adiciona busca semântica com pgvector"
git commit -m "fix(api): corrige filtro de data no endpoint de chamadas"
git commit -m "docs(readme): atualiza instruções de instalação"
git commit -m "refactor(service): extrai lógica de embedding para serviço separado"
```

### Pull Requests

**Checklist**:

- [ ] Código segue padrões deste guia
- [ ] Testes escritos e passando
- [ ] Documentação atualizada
- [ ] ESLint sem erros
- [ ] TypeScript sem erros
- [ ] Commits seguem Conventional Commits
- [ ] Branch atualizado com `develop`

**Template de PR**:

```markdown
## Descrição

Breve descrição das mudanças

## Tipo de mudança

- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Como testar

1. Passo 1
2. Passo 2
3. Resultado esperado

## Screenshots (se aplicável)

## Checklist

- [ ] Código segue padrões
- [ ] Testes passando
- [ ] Documentação atualizada
```

## 4.4 Code Review

### Checklist do Revisor

**Arquitetura**:

- [ ] Código está na camada correta (controller/service/repository)
- [ ] Separação de responsabilidades adequada
- [ ] Não há duplicação desnecessária

**Código**:

- [ ] Nomenclatura clara e consistente
- [ ] Funções pequenas e focadas (< 50 linhas idealmente)
- [ ] Sem "magic numbers" (usar constantes)
- [ ] Tratamento de erros adequado

**Qualidade**:

- [ ] TypeScript types corretos (sem `any`)
- [ ] Testes adequados
- [ ] Sem console.log esquecidos (usar logger)
- [ ] Performance aceitável

**Segurança**:

- [ ] Sem credenciais hard-coded
- [ ] Validação de entrada de usuário
- [ ] SQL injection prevenido (queries parametrizadas)
- [ ] CORS configurado corretamente

---

# 5. Ferramentas e Tecnologias

## 5.1 Ferramentas de Desenvolvimento

### IDE Recomendado

**Visual Studio Code** com extensões:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "christian-kohler.path-intellisense",
    "eamodio.gitlens",
    "ms-python.python",
    "ms-toolsai.jupyter"
  ]
}
```

### Configurações do VS Code

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true
}
```

## 5.2 Tecnologias e Frameworks

### Backend

| Tecnologia     | Versão | Descrição                     |
| -------------- | ------ | ----------------------------- |
| **Node.js**    | 18+    | Runtime JavaScript            |
| **TypeScript** | 5.9+   | Superset tipado de JavaScript |
| **Express**    | 5.1+   | Framework web                 |
| **PostgreSQL** | 14+    | Banco de dados relacional     |
| **pgvector**   | 0.2+   | Extensão para busca vetorial  |

### Frontend

| Tecnologia       | Versão | Descrição                     |
| ---------------- | ------ | ----------------------------- |
| **React**        | 19.1+  | Biblioteca UI                 |
| **TypeScript**   | 5.8+   | Superset tipado de JavaScript |
| **Vite**         | 7.1+   | Build tool e dev server       |
| **React Router** | 7.8+   | Roteamento                    |

### Python (Análise de Dados)

| Tecnologia       | Versão | Descrição                |
| ---------------- | ------ | ------------------------ |
| **Python**       | 3.11+  | Linguagem de programação |
| **Pandas**       | Latest | Análise de dados         |
| **spaCy**        | Latest | NLP                      |
| **Transformers** | Latest | Modelos de IA            |

## 5.3 Bibliotecas Principais

### Backend

```json
{
  "dependencies": {
    "express": "^5.1.0",
    "pg": "^8.16.3",
    "pgvector": "^0.2.1",
    "openai": "^4.57.0",
    "multer": "^2.0.2",
    "axios": "^1.12.2",
    "cors": "^2.8.5",
    "dotenv": "^17.2.2",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1"
  },
  "devDependencies": {
    "typescript": "^5.9.2",
    "ts-node-dev": "^2.0.0",
    "jest": "^30.1.3",
    "ts-jest": "^29.4.4",
    "@types/express": "^5.0.3",
    "@types/node": "^24.3.1"
  }
}
```

### Frontend

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.8.2",
    "@tanstack/react-table": "^8.21.3",
    "motion": "^12.23.12"
  },
  "devDependencies": {
    "typescript": "~5.8.3",
    "vite": "^7.1.2",
    "@vitejs/plugin-react": "^5.0.0",
    "eslint": "^9.33.0"
  }
}
```

---

# 6. Segurança e Boas Práticas

## 6.1 Variáveis de Ambiente

### Nunca Commitar `.env`

```gitignore
# .gitignore
.env
.env.local
.env.*.local
```

### Criar `.env.example`

```bash
# .env.example
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/database
OPENAI_API_KEY=sk-proj-...
CORS_ORIGIN=http://localhost:5173
```

### Validar Variáveis de Ambiente

```typescript
// config/env.ts
export function loadEnv(): RuntimeEnv {
  dotenv.config();

  const PORT = Number(process.env.PORT ?? 4000);
  const DATABASE_URL = process.env.DATABASE_URL;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  // Validação
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  if (!OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY not set - AI features will be disabled");
  }

  return { PORT, DATABASE_URL, OPENAI_API_KEY };
}
```

## 6.2 Validação de Dados

### Backend - Validação de Entrada

```typescript
// ✅ Correto - Sempre validar entrada do usuário
router.post("/chamadas", async (req, res) => {
  const { cliente_id, atendente_id, transcript_json } = req.body;

  // Validação
  if (!cliente_id || typeof cliente_id !== "number") {
    return res.status(400).json({ error: "cliente_id inválido" });
  }

  if (!atendente_id || typeof atendente_id !== "number") {
    return res.status(400).json({ error: "atendente_id inválido" });
  }

  if (!transcript_json || typeof transcript_json !== "object") {
    return res.status(400).json({ error: "transcript_json inválido" });
  }

  // Processa...
});

// ❌ Incorreto - Sem validação
router.post("/chamadas", async (req, res) => {
  const chamada = await repository.create(req.body); // PERIGOSO!
});
```

### SQL Injection Prevention

```typescript
// ✅ Correto - Queries parametrizadas
const result = await db.query(
  "SELECT * FROM chamada WHERE id = $1 AND cliente_id = $2",
  [id, clienteId]
);

// ❌ Incorreto - String concatenation
const result = await db.query(
  `SELECT * FROM chamada WHERE id = ${id}` // SQL INJECTION!
);
```

## 6.3 Segurança de API

### CORS

```typescript
// ✅ Correto - CORS restritivo
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// ❌ Incorreto - CORS permissivo
app.use(cors({ origin: "*" })); // INSEGURO EM PRODUÇÃO!
```

### Rate Limiting (Recomendado)

```typescript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requisições por IP
  message: "Muitas requisições, tente novamente mais tarde",
});

app.use("/api/", limiter);
```

### Headers de Segurança

```typescript
import helmet from "helmet";

app.use(helmet()); // Adiciona headers de segurança
```

---

# 7. Performance e Otimização

## 7.1 Backend

### Connection Pooling

```typescript
// ✅ Correto - Usar pool
const pool = new Pool({
  connectionString: DATABASE_URL,
  max: 20, // máximo de conexões
  idleTimeoutMillis: 30000,
});

// ❌ Incorreto - Nova conexão a cada request
const client = new Client({ connectionString: DATABASE_URL });
await client.connect();
```

### Paginação

```typescript
// ✅ Correto - Sempre paginar resultados grandes
router.get("/chamadas", async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = (page - 1) * limit;

  const chamadas = await repository.findAll(limit, offset);
  const total = await repository.count();

  res.json({ data: chamadas, page, limit, total });
});

// ❌ Incorreto - Retornar todos os registros
router.get("/chamadas", async (req, res) => {
  const chamadas = await repository.findAll(); // Pode retornar 10.000+ registros!
});
```

### Caching

```typescript
// Cache de embeddings
class EmbeddingService {
  private cache = new Map<string, number[]>();

  async generateEmbedding(text: string): Promise<number[]> {
    if (this.cache.has(text)) {
      return this.cache.get(text)!; // Cache hit
    }

    const embedding = await this.callOpenAI(text);
    this.cache.set(text, embedding);
    return embedding;
  }
}
```

## 7.2 Frontend

### Lazy Loading

```typescript
// ✅ Correto - Lazy load páginas
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const ChatPage = lazy(() => import("./pages/ChatPage/ChatPage"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Suspense>
  );
}
```

### Memoização

```typescript
// ✅ Correto - Memoizar cálculos pesados
const expensiveValue = useMemo(() => {
  return (
    chamadas.reduce((sum, c) => sum + c.nota_qualidade, 0) / chamadas.length
  );
}, [chamadas]);

// ✅ Correto - Memoizar callbacks
const handleFilter = useCallback((filter: string) => {
  setActiveFilter(filter);
}, []);
```

### Virtual Scrolling (para listas grandes)

```typescript
import { useVirtualizer } from "@tanstack/react-virtual";

function LargeList({ items }: { items: Chamada[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: "500px", overflow: "auto" }}>
      {virtualizer.getVirtualItems().map((virtualRow) => (
        <div key={virtualRow.index}>{items[virtualRow.index].title}</div>
      ))}
    </div>
  );
}
```

## 7.3 Banco de Dados

### Índices

```sql
-- ✅ Correto - Criar índices para queries frequentes
CREATE INDEX idx_chamada_created_at ON chamada(created_at);
CREATE INDEX idx_chamada_cliente_id ON chamada(cliente_id);
CREATE INDEX idx_chamada_segments_chamada_id ON chamada_segments(chamada_id);

-- Índice vetorial para busca semântica
CREATE INDEX idx_chamada_segments_embedding
ON chamada_segments
USING ivfflat (embedding vector_cosine_ops);
```

### Query Optimization

```sql
-- ✅ Correto - SELECT específico
SELECT id, cliente_id, atendente_id, nota_qualidade
FROM chamada
WHERE created_at > NOW() - INTERVAL '7 days'
LIMIT 20;

-- ❌ Incorreto - SELECT *
SELECT * FROM chamada; -- Pode retornar colunas grandes (transcript_json)
```

---

## Conclusão

Este guia deve ser seguido por todos os desenvolvedores do projeto Com.Sigo. É um documento vivo e deve ser atualizado conforme o projeto evolui.

**Recursos adicionais**:

- [Manual de Instalação](Manual-instalacao.md)
- [Documentação do Projeto](Projeto.md)
- [Gestão de Configuração](GestaoConfiguracao.md)
- [RUNBOOK de Busca Semântica](../RUNBOOK_SEMANTIC_SEARCH.md)

**Referências externas**:

- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [React Best Practices](https://react.dev/learn)
- [Design Patterns](https://refactoring.guru/design-patterns)
- [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)

---

**Última atualização**: Outubro 2025

**Versão**: 1.0.0
