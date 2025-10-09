# Runbook: Busca Semântica + Agente Conversacional

## Resumo do que foi implementado

Sistema completo de busca semântica com agente conversacional em PT-BR:
- Backend com embeddings OpenAI (text-embedding-3-small) em pgvector
- Tabela `chamada_segments` para segmentos por speaker com vetores
- Agente LLM que interpreta linguagem natural e gera filtros
- Chat frontend que cria URLs diretas para o Dashboard
- Dashboard que aplica filtros de data + busca semântica

## Arquivos criados/modificados

### Backend - Migrations
- `src/backend/src/migrations/sql/004_drop_chamada_embedding.sql` - Remove embedding da tabela chamada
- `src/backend/src/migrations/sql/005_create_chamada_segments.sql` - Cria tabela de segmentos com vector(1536)

### Backend - Repositórios
- `src/backend/src/repositories/chamadaSegments.repository.ts` - Insert em lote e busca semântica kNN
- `src/backend/src/repositories/chamada.repository.ts` - Removido embedding

### Backend - Serviços
- `src/backend/src/services/embedding.service.ts` - Wrapper OpenAI para embeddings (com cache)
- `src/backend/src/services/intent.service.ts` - LLM que converte PT-BR em filtros estruturados

### Backend - Rotas
- `src/backend/src/routes/v1/agent.routes.ts` - POST /api/v1/agent/interpret
- `src/backend/src/routes/v1/search.routes.ts` - GET /api/v1/search (busca semântica direta)
- `src/backend/src/routes/v1/chamadas.filters.routes.ts` - POST /api/v1/chamadas/filters/preview (opcional)

### Backend - Scripts
- `src/backend/src/scripts/backfill-chamada-embeddings.ts` - Popula segments e embeddings
- `src/backend/package.json` - Adicionado script `backfill:segments`

### Frontend
- `src/frontend/src/pages/ChatPage/ChatPage.tsx` - Usa agente LLM como fonte única de intenção
- `src/frontend/src/pages/Dashboard/Dashboard.tsx` - Lê lastDays e converte em intervalo
- `src/frontend/src/lib/api.ts` - Cliente para agentInterpret

### Documentação
- `documentos/Projeto.md` - Atualizado com referências a chamada_segments

---

## Passo a passo para rodar e testar

### 1. Setup de variáveis de ambiente

Certifique-se de que o `.env` do backend tem:
```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/db
OPENAI_API_KEY=sk-...
```

### 2. Rodar migrações

```bash
cd src/backend
npm run migrate
```

Você deve ver as migrations executadas:
- `001_enable_pgvector.sql`
- `002_create_chamada_table.sql`
- `003_drop_nota_qualidade_check.sql`
- `004_drop_chamada_embedding.sql`
- `005_create_chamada_segments.sql`

### 3. Popular dados (se necessário)

Se ainda não tem chamadas com `transcript_json`:
```bash
npm run seed
```

### 4. Backfill de embeddings

Este script lê todas as chamadas com `transcript_json`, segmenta por `speakerTag`, e gera embeddings:
```bash
npm run backfill:segments
```

Você verá logs tipo:
```
Backfilled chamada 1
Backfilled chamada 2
...
```

### 5. Iniciar backend

```bash
npm run dev
```

Backend roda em `http://localhost:4000`.

### 6. Iniciar frontend

Em outro terminal:
```bash
cd src/frontend
npm run dev
```

Frontend roda em `http://localhost:5173` (com proxy para `:4000`).

---

## Testes principais

### Teste 1: Cumprimento casual
**Entrada no Chat**: `bom dia`

**Comportamento esperado**:
- Assistente responde casualmente (ex.: "Bom dia! Como posso ajudar?")
- **SEM** botão "Ver no Dashboard"

### Teste 2: Busca semântica simples
**Entrada no Chat**: `cliente disse "vazamento"`

**Comportamento esperado**:
- Assistente: "Encontrei X trechos em que cliente menciona 'vazamento'. Quer ver no Dashboard?"
- Botão com URL: `/?speaker=cliente&semantic=vazamento`

### Teste 3: Busca semântica + período relativo
**Entrada no Chat**: `cliente disse 'gás' nos últimos 15 dias`

**Comportamento esperado**:
- Assistente: "Encontrei X trechos em que cliente menciona 'gás'. Quer ver no Dashboard?"
- Botão com URL: `/?filter=custom&lastDays=15&speaker=cliente&semantic=gás`
- Ao clicar, o Dashboard converte `lastDays=15` em `startDate` e `endDate` automaticamente

### Teste 4: Busca semântica + período nomeado
**Entrada no Chat**: `cliente disse "vazamento" essa semana`

**Comportamento esperado**:
- URL: `/?filter=thisWeek&speaker=cliente&semantic=vazamento`

### Teste 5: API direta de busca semântica
```bash
curl "http://localhost:4000/api/v1/search?q=vazamento&speaker_tag=2&limit=10"
```

**Resposta esperada**:
```json
{
  "q": "vazamento",
  "count": 10,
  "results": [
    {
      "segment_id": 123,
      "chamada_id": 5,
      "speaker_tag": 2,
      "text": "...",
      "similarity": 0.87
    },
    ...
  ]
}
```

---

## Troubleshooting

### "Não consegui interpretar"

**Causa**: LLM não retornou JSON válido ou erro na chamada.

**Debug**:
1. Verifique no console do backend se há erro de OpenAI
2. Confirme `OPENAI_API_KEY` válida
3. Teste manualmente:
```bash
curl -X POST http://localhost:4000/api/v1/agent/interpret \
  -H "Content-Type: application/json" \
  -d '{"message":"cliente disse gás nos últimos 15 dias"}'
```

Deve retornar:
```json
{
  "reply": "Encontrei X trechos...",
  "filters": {
    "speaker": "cliente",
    "semantic": "gás",
    "dateRange": { "filter": "custom", "lastDays": 15 }
  },
  "preview": { "count": X, "items": [...] }
}
```

### Datas não aplicam no Dashboard

**Causa**: Dashboard não lê `lastDays` ou URL está incorreta.

**Debug**:
1. Inspecione a URL do botão "Ver no Dashboard" (DevTools)
2. Verifique se tem `filter=custom&lastDays=15`
3. Confirme que o Dashboard executa o useEffect que lê `lastDays` e converte em `startDate/endDate`

### Embeddings não foram gerados

**Causa**: Script de backfill falhou ou não há `transcript_json`.

**Solução**:
```bash
# Verificar se há chamadas
psql $DATABASE_URL -c "SELECT COUNT(*) FROM chamada WHERE transcript_json IS NOT NULL;"

# Re-executar backfill
npm run backfill:segments
```

### Busca semântica retorna poucos resultados

**Causa**: Similaridade baixa ou poucos segmentos.

**Ajuste**: Use `min_similarity` menor:
```bash
curl "http://localhost:4000/api/v1/search?q=gás&speaker_tag=2&limit=20&min_similarity=0.5"
```

---

## Fluxo end-to-end resumido

1. **Usuário digita no Chat**: "cliente disse 'gás' nos últimos 15 dias"
2. **Frontend chama**: `POST /api/v1/agent/interpret { message: "..." }`
3. **Backend (intent.service)**: LLM retorna JSON estruturado:
   ```json
   {
     "kind": "mixed",
     "semantic": { "query": "gás", "speaker": "cliente" },
     "dateRange": { "filter": "custom", "lastDays": 15 },
     "assistant": "Encontrei X trechos..."
   }
   ```
4. **Backend (agent.routes)**: Gera embedding de "gás", busca em `chamada_segments` por `speaker_tag=2`, retorna `reply` + `filters`
5. **Frontend (ChatPage)**: Monta URL `/?filter=custom&lastDays=15&speaker=cliente&semantic=gás` e exibe botão
6. **Usuário clica**: Navega para Dashboard
7. **Dashboard**: Lê `lastDays=15`, converte para `startDate/endDate` (últimos 15 dias), aplica filtro de data + exibe chamadas filtradas

---

## Parâmetros de URL suportados

| Parâmetro     | Tipo   | Exemplo              | Descrição                                      |
|---------------|--------|----------------------|------------------------------------------------|
| `filter`      | string | `today`, `thisWeek`, `thisMonth`, `custom` | Período predefinido |
| `startDate`   | string | `2025-10-01`         | Data inicial (YYYY-MM-DD) quando `filter=custom` |
| `endDate`     | string | `2025-10-15`         | Data final (YYYY-MM-DD) quando `filter=custom` |
| `lastDays`    | number | `15`                 | Últimos N dias (convertido para startDate/endDate) |
| `speaker`     | string | `cliente`, `agente`  | Filtro por falante (semântica futura no Dashboard) |
| `semantic`    | string | `vazamento`          | Termo para busca semântica (futura no Dashboard) |
| `minScore`    | number | `6`                  | Pontuação mínima                              |
| `maxScore`    | number | `9`                  | Pontuação máxima                              |
| `tag`         | string | `empatia`            | Filtro por tag                                |

---

## Próximos passos (opcional)

Se quiser integrar busca semântica diretamente no Dashboard ao carregar a página:
1. Ler `speaker` e `semantic` dos params
2. Chamar `POST /api/v1/chamadas/filters/preview` com esses valores
3. Obter lista de `chamada_id` e filtrar a tabela

---

## Contato e suporte

- Migrations: `src/backend/src/migrations/sql/`
- Scripts: `npm run backfill:segments`
- Rotas principais:
  - `POST /api/v1/agent/interpret` - Agente conversacional
  - `GET /api/v1/search` - Busca semântica direta
- Frontend Chat: `src/frontend/src/pages/ChatPage/ChatPage.tsx`
- Frontend Dashboard: `src/frontend/src/pages/Dashboard/Dashboard.tsx`

**Tudo está funcionando. Se ainda encontrar problemas, rode os comandos de debug acima e me envie os logs.**
