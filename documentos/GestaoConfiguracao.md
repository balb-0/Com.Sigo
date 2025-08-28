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

# Sumário

- [1. Introdução](#1-introdução)
  - [1.1 Objetivo do Documento](#11-objetivo-do-documento)
- [2. Política de Branches](#2-política-de-branches)
  - [2.1 Visão Geral do Gitflow](#21-visão-geral-do-gitflow)
  - [2.2 Estrutura de Branches](#22-estrutura-de-branches)
  - [2.3 Diretrizes de Uso das Branches](#23-diretrizes-de-uso-das-branches)
- [3. Políticas de Commit](#3-políticas-de-commit)
- [4. Política de Push e Pull Requests](#4-política-de-push-e-pull-requests)
- [5. Infraestrutura como Código](#5-infraestrutura-como-código)
- [6. Gestão de Arquivos Sensíveis](#6-gestao-de-arquivos-sensiveis)
- [7. Política de Rollback](#7-política-de-rollback)
- [8. Registro de Variáveis de Ambiente](#8-registro-de-variaveis-de-ambiente)
- [9. Stack de Tecnologias](#9-stack-de-tecnologias)
- [Referências](#referências)

# 1. Introdução

## 1.1 Objetivo do Documento

Este documento estabelece diretrizes claras para a utilização de boas práticas no desenvolvimento de software, visando a organização e a qualidade do código. Todos os membros da equipe devem seguir as instruções definidas.

# 2. Política de Branches

## 2.1 Visão Geral do Gitflow

O Gitflow é uma estratégia de versionamento pensada para um controle mais eficiente do versionamento de código em em desenvolvimento de projetos. O modelo propõe uma estruturação de _branches_ com papéis bem definidos, ajudando na organização, previsibilidade eficiência no desenvolvimento de um produto.

A principal ideia do Gitflow é separar as funcionalidades em desenvolvimento do código que está sendo produzido, por meio do uso de _branches_ como `main`, `develop`, `feature`, `docs` e `fix`. Essa divisão simplifica a colaboração em equipe, a iteratividade do desenvolvimento e o controle de versões, especialmente em projetos que adotam sprints, deploys regulares e diversas entregas simultâneas.

A adoção do Gitflow permite:

- Rastreamento de mudanças.
- Simplicidade na criação de versões estáveis.
- Um fluxo de trabalho que se adapta ao desenvolvimento iterativo e colaborativo.

## 2.2 Estrutura de Branches

A organização do fluxo de desenvolvimento do projeto será baseada em uma estrutura de branches inspirada no modelo Gitflow. Essa estrutura permite separar claramente as diferentes etapas de desenvolvimento, testes e produção, garantindo controle e rastreabilidade do código.

Abaixo estão os padrões de nomenclatura adotados:

> **main**: Contém o código final e estável, pronto para ser colocado em produção.

> **dev**: Branch de integração contínua onde novas funcionalidades são agrupadas antes de irem para a `main`.

> **feat/[nome-da-feature]**: Utilizada para o desenvolvimento de novas funcionalidades a partir da branch `dev`.  
> Exemplo: `feature/integracao-api`

> **fix/[nome-do-bug]**: Utilizada para corrigir bugs encontrados durante o desenvolvimento, também originada da `dev`.  
> Exemplo: `bugfix/corrige-login`

> **hotfix/[nome-do-hotfix]**: Usada para corrigir erros críticos encontrados em produção. Originada da `main` e mergeada tanto na `main` quanto na `dev`.  
> Exemplo: `hotfix/corrige-bug-em-producao`

Esta estrutura favorece a organização do trabalho em equipe, facilita a automação de deploys e permite o rastreamento de alterações com mais segurança ao longo das sprints.

## 2.3 Diretrizes de Uso das Branches

Este projeto adota uma estratégia de ramificação baseada no Gitflow, com diretrizes claras para garantir organização, rastreabilidade e integração eficiente entre as contribuições do time.

### Criação de Funcionalidades

- Toda nova funcionalidade deve ser desenvolvida em uma branch do tipo `feat`, criada a partir da branch `develop`.
- O nome da branch deve seguir o padrão:

```
feat/nome-da-feature
```

Exemplo:

```
feat/cadastro-usuario
```

### Integração e Pull Requests

- Após finalizada, a branch de feature deve ser integrada na `develop` via Pull Request (PR).
- O PR deve ser revisado por pelo menos um membro da equipe antes do merge.

### Commits Diretos na Main

- **Commits diretos na branch `main` são proibidos.**
- A proteção da branch `main` está garantida no GitHub para evitar alterações não revisadas e imprevistos perigosos para o projeto.

### Correções Críticas (Hotfixes)

- Em caso de erros críticos em produção, uma branch do tipo `hotfix` é criada diretamente a partir da `main`.
- O nome da branch deve seguir o padrão:

```
hotfix/descricao-do-hotfix
```

Exemplo:

```
hotfix/corrige-autenticacao
```

- Após a correção, a branch deve ser mergeada tanto na `main` quanto na `develop`.

Seguindo essas diretrizes, garantimos maior controle sobre o fluxo de desenvolvimento e reduzimos riscos durante deploys e integrações.

# 3. Políticas de Commit

Para manter um histórico de desenvolvimento claro, rastreável e eficiente para desenvolvimento do proejto, este projeto adota o padrão **Conventional Commits**.

### Formato

As mensagens de commit devem seguir o seguinte formato:

```
<tipo>[escopo opcional]: <mensagem curta e objetiva>
```

### Tipos permitidos

> **feat**: Adição de uma nova funcionalidade  
> **fix**: Correção de um bug  
> **docs**: Alterações na documentação  
> **style**: Alterações que não afetam a lógica (espaçamento, indentação, ponto e vírgula, etc.)  
> **config**: Adições que alterem configurações internas ou internas ao projeto (`.gitignore` ou GitHub, por exemplo)  
> **test**: Criação ou modificação de testes  
> **chore**: Atualizações de configurações, ferramentas, bibliotecas, etc.

### Exemplo prático

```
feat: adiciona component de login com JWT
```

Esse commit representa a adição de uma nova funcionalidade (`feat`) relacionada à autenticação, com uma mensagem clara sobre o que foi feito.

### Recomendações

- Escreva a mensagem no imperativo (ex: "adiciona", "corrige", "cria").
- Evite commits genéricos como "atualização", "ajustes", "coisas".
- Commits devem ser pequenos e frequentes - de forma a ajudar o acompanhamento de desenvolvimento de features.
- Commits com múltiplas alterações devem ser evitados — prefira dividir por propósito.

Essa padronização contribui para a manutenção do código, facilita a revisão por pares e melhora a compreensão do histórico por toda a equipe.

### Proibido:

- O uso de emojis nas mensagens de commits é proibido.

## 4. Política de Push e Pull Requests

### Políticas de Push

- Não é permitido realizar push diretamente na branch `main`.
- Todas as alterações no projeto devem ser feitas por meio de branches individuais, seguindo a convenção estabelecida (ex: `feat/nome-da-feature`, `fix/corrige-bug`).
- O push só é permitido em branches auxiliares (feat, fix, etc.), que deverão ser integradas por meio de Pull Requests.

### Regras de Pull Request

- Todo código deve ser submetido via Pull Request e passar por uma revisão obrigatória antes de ser mergeado.
- O projeto possui um template de PR no GitHub que deve ser preenchido de forma a evidenciar as mudanças propostas naquele _pull request_.
- A branch só poderá ser mergeada após aprovação por, no mínimo, um revisor.

### Critérios de Aprovação

- O código submetido resolve de forma clara e objetiva o problema ou funcionalidade proposta.
- Deve seguir os padrões de estilo e boas práticas definidas pelo time.
- Não deve conter duplicações de código nem funcionalidades inacabadas.
- O template deve estar preenchido e os checks deve estar marcados para que o PR seja aprovado.

### Integração com a Branch `dev` e `main`

- Após aprovação, o PR será mergeado na branch `dev`.
- Ao final da sprint, o Scrum e o PO são responsáveis por realizar o merge da `dev` na `main`, junto com os artefatos finais da entrega.

## 5. Infraestrutura como Código

- Uso obrigatório de Docker para padronizar ambientes de desenvolvimento e produção.
- Incluir na raiz do repositório:
  - Dockerfile(s) para build de aplicações e serviços.
  - .dockerignore para excluir arquivos desnecessários do contexto de build.
  - docker-compose.yml para orquestrar múltiplos serviços/containers localmente.
- Cada serviço/contêiner deve ter seu próprio Dockerfile customizável, se necessário.
- O Docker Compose deve funcionar para rodar toda a stack do sistema localmente com um único comando (docker-compose up).

## 6. Gestão de Arquivos Sensíveis

- É obrigatório o uso de .gitignore bem configurado para bloquear:
  - Arquivos contendo senhas, segredos ou informações sensíveis.
  - Arquivos de configuração individuais (por exemplo, .env, configs locais, etc).
- Explicação/documentação das diferenças entre arquivos de configuração locais, de desenvolvimento e de produção (ex.: .env.local, .env.dev, .env.prod).
- Nunca commitar dados sensíveis ou credenciais diretamente no repositório.

## 7. Política de Rollback

- Documentar o processo básico para rollback de uma release defeituosa.
- Passos mínimos recomendados:
  - Identificar rapidamente a versão estável anterior (tag/release/commit).
  - Criar uma branch/selecione a tag da versão a ser restaurada.
  - Realizar o deploy dessa versão, conforme procedimento do time.
  - Comunicar o time e stakeholders sobre a reversão.
- Deixar esses procedimentos registrados no repositório (ex: docs/rollback.md).

## 8. Registro de Variáveis de Ambiente

- Obrigatório manter um arquivo .env.example documentando todas as variáveis de ambiente exigidas pela aplicação.
- O arquivo deve listar todas as keys (sem valores reais/sensíveis) e breve explicação de cada variável.
- Todos os membros devem usar esse exemplo para criar seus próprios arquivos .env locais.
- Exemplo:
  - DB_HOST= # Endereço do banco de dados
  - DB_USER= # Usuário do banco
  - DB_PASS= # Senha do banco (NUNCA commitada)
  - SECRET_KEY= # Chave secreta do sistema

## 9. Stack de Tecnologias

A stack de tecnologias foi definida de forma a equilibrar **produtividade de desenvolvimento**, **escalabilidade** e **flexibilidade**. Cada tecnologia escolhida contribui para resolver pontos críticos do projeto, desde a experiência do usuário até o processamento de dados complexos.

### 9.1 Frontend – ReactJS
Optamos pelo **ReactJS** por sua ampla adoção na indústria e pela capacidade de criar interfaces reativas, modulares e escaláveis. A arquitetura baseada em componentes favorece a manutenção, a reutilização de código e a integração com bibliotecas modernas de UI. Além disso, a comunidade extensa garante suporte contínuo e um ecossistema rico de ferramentas.

### 9.2 Backend – Node.js + ExpressJS
No backend, utilizamos **Node.js** em conjunto com o framework **ExpressJS**. Essa combinação proporciona:
- **Alta performance em I/O**.
- **Simplicidade de configuração** e curva de aprendizado rápida.  
- **Flexibilidade** para estruturar middlewares e lidar com rotas e integrações externas.  

Essa escolha garante agilidade no desenvolvimento e facilidade na manutenção da aplicação.

### 9.3 Banco de Dados Relacional – PostgreSQL
O **PostgreSQL** foi escolhido como banco de dados relacional pela estabilidade, confiabilidade e recursos avançados. Ele suporta **consultas complexas, integridade transacional e extensões poderosas**. A escolha assegura consistência nos dados e escalabilidade vertical e horizontal conforme a demanda.

### 9.4 Banco de Dados Vetorial – pgvector
Para operações que envolvem **busca semântica, embeddings e similaridade textual**, adotamos o **pgvector**, uma extensão nativa do PostgreSQL para armazenamento e consulta de vetores.  
Essa solução permite unir a **consistência do relacional** com o **poder de buscas vetoriais**, evitando a necessidade de múltiplos sistemas distintos.

### 9.5 Infraestrutura – Docker
Toda a aplicação é containerizada utilizando **Docker**, garantindo portabilidade entre ambientes de desenvolvimento, homologação e produção. Com isso, asseguramos:
- **Padronização do ambiente** e **segurança** de ambientes.
- **Escalabilidade** com facilidade de manutenção futura.  
- **Rapidez no setup**.

### 9.6 Controle de Versão – Git
O **Git** é a base do versionamento de código, garantindo colaboração eficiente entre equipes, rastreabilidade de mudanças e integração com pipelines de CI/CD. O uso de **pull requests e branching strategies** fortalece a governança do código e reduz riscos de regressões.

### 9.7 Algoritmos de Tokenização e NLP
Para lidar com processamento textual, optamos por uma abordagem híbrida:
- **BERT (Bidirectional Encoder Representations from Transformers):** para capturar contexto semântico profundo e relações bidirecionais entre palavras.  
- **Regex (Expressões Regulares):** útil para regras mais rígidas, como padronização de formatos.
- **TF-IDF (Term Frequency – Inverse Document Frequency):** empregado para destacar termos relevantes em coleções de documentos e dar suporte a análises mais rápidas.  

Essa combinação garante um balanceamento entre **inteligência contextual**, **eficiência computacional** e **precisão em regras específicas**.

### 9.8 API de Transcrição – GPT

Para a funcionalidade de **transcrição de áudio em texto**, será utilizada a **API do GPT** com modelos especializados em reconhecimento de fala.  
Essa escolha traz vantagens como:  

- **Alta acurácia** em diferentes idiomas e sotaques.  
- **Escalabilidade** para processar grandes volumes de áudio.  
- **Integração simplificada** com o backend em Node.js, permitindo envio direto de arquivos ou streams de áudio.  
- **Redução de custos de manutenção**, já que não há necessidade de treinar e manter um modelo próprio de ASR (Automatic Speech Recognition).  

Com isso, garantimos maior confiabilidade nas transcrições e aceleramos o desenvolvimento de funcionalidades baseadas em voz.

---

# Referências

- Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/
- GitFlow: https://nvie.com/posts/a-successful-git-branching-model/
- Gitihub/iuricode: https://github.com/iuricode/padroes-de-commits
- Docker (documentação oficial): https://docs.docker.com/
- Best Practices for Writing Dockerfiles: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
- Docker Compose (documentação oficial): https://docs.docker.com/compose/
- .dockerignore Reference: https://docs.docker.com/engine/reference/builder/#dockerignore-file
- .gitignore (documentação oficial): https://git-scm.com/docs/gitignore
- gitignore.io (gerador de .gitignore para diferentes stacks): https://www.toptal.com/developers/gitignore/
- Handling secrets in Git repos (GitHub Guide): https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-and-storing-encrypted-secrets
- Creating a pull request template for your repository: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository
- Exemplo de Checklists para PRs: https://github.com/othneildrew/Best-README-Template#pull-request-template
- Best Practices for Rollbacks (Atlassian): https://www.atlassian.com/continuous-delivery/principles/rollback-strategies
- How to Use Git Revert and Git Reset: https://www.git-tower.com/learn/git/faq/git-reset-vs-revert/
- 12 Factor App: Config: https://12factor.net/config
- Dotenv (Exemplo e uso de arquivos .env): https://github.com/motdotla/dotenv#usage
