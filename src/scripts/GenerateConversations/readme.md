# Como gerar conversas

## Setup
- Na pasta `src/scripts`: `npm install`
- Crie `.env` com `OPENAI_API_KEY=...` (opcional: `OPENAI_MODEL`)

## Saída
- Os arquivos `.json` são salvos em `GenerateConversations/results` por padrão.
- Nome do arquivo no modo cenários: `{prefix}-{sNN}-{slug}-{persona}-{idx}.json`
  - `sNN`: id do cenário (ex: s01)
  - `slug`: nome curto do cenário
  - `persona`: furioso | irritado | neutro | satisfeito | polido
  - `idx`: contador por cenário

## Rodando (exemplos)
- 1 por cada um dos 10 cenários padrão, com caos e chance do atendente perder a paciência:
```bash
npm run dev -- \
  --per-scenario=1 \
  --min-turns=10 --max-turns=16 \
  --chaos=0.7 \
  --agent-snap-chance=0.12 \
  --out=GenerateConversations/results \
  --prefix=gas
```

- Cenários customizados (separados por vírgula ou pipe), 5 por cenário:
```bash
npm run dev -- --scenarios="vazamento bravo, segunda via confusa" --per-scenario=5
```

- Cenários via arquivo (um por linha):
```bash
npm run dev -- --scenarios-file=meus_cenarios.txt --per-scenario=5
```

## Controles importantes
- `two-stage` (default true): 1ª etapa criativa, 2ª estrutura JSON
- `creative-temperature` (default 1.0) e `structure-temperature` (default 0.2)
- `chaos` (0..1): intensidade de gírias/palavrões
- `agent-snap-chance` (0..1): chance do atendente responder rispidamente
- `min-turns` / `max-turns`: faixa de falas
- `prefix`, `out`, `seed`, `top_p`, `count`
