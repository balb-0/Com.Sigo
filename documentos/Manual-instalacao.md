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

# Nome do Projeto: Com.Sigo

## Nome do Grupo: Com.Segue

## Integrantes:

- <a href="https://www.linkedin.com/in/andre-lobo-dev/">André Eduardo Lobo de Paula</a>
- <a href="https://www.linkedin.com/in/joao-souza-campos/">João Victor de Souza Campos</a>
- <a href="https://www.linkedin.com/in/otavio-vasc/">Otavio de Carvalho Vasconcelos</a>
- <a href="https://www.linkedin.com/in/rafaelbarbosa-dev/">Rafael Rocha Barbosa</a>
- <a href="https://www.linkedin.com/in/rodrigo-lee/">Rodrigo Hu Tchie Lee</a>
- <a href="https://www.linkedin.com/in/ryan-botelho-gartlan/">Ryan Botelho Gartlan</a>
- <a href="https://www.linkedin.com/in/vitor-balbo/">Vitor Margarido Balbo</a>


Explica como montar, conectar e utilizar o protótipo.

## Seed do Banco de Dados (Chamadas)

Pré-requisitos:
- Banco PostgreSQL acessível via `DATABASE_URL` no `.env` do backend.

Passos:
1. Aplicar migrações (cria tabela `chamada`):
   ```bash
   cd src/backend
   npm run migrate
   ```
2. Popular a base com as conversas geradas (truncate + restart identity):
   ```bash
   cd src/backend
   npm run seed
   ```

O seed insere uma chamada por arquivo JSON presente em `src/scripts/GenerateConversations/results`, preenchendo apenas `transcript_json`. Os IDs seguem:
- `cliente_id`: 1, 2, 3, ... (sequencial)
- `atendente_id`: 1, 2, 3, 4 (rotativo)

## Gerar Conversas (opcional)

Há um gerador de conversas em `src/scripts/GenerateConversations/generateConversations.ts`.

Executar com defaults (gera arquivos em `GenerateConversations/results`):
```bash
cd src/scripts
npm run dev
```
Para volumes maiores, veja também `npm run gen:500` em `src/scripts/package.json`.
