<Table>
  <tr>
    <td>
      <a href="https://www.querocomgas.com.br/?utm_source=google&utm_medium=cpc&utm_term=comg%C3%A1s&utm_campaign=21432544487&utm_content=765228372932&gad_source=1&gad_campaignid=21432544487&gbraid=0AAAAABVP93Y1dgkYEH7cb900l9xETrtQj&gclid=CjwKCAjwtfvEBhAmEiwA-DsKjgFtOeGUYeQECLrAI8S2y4lavUc_XcfZPp2zRsE2z1Vt1NAQdp2__xoCbvYQAvD_BwE">
        <img src="./documentos/img/image.png" alt="Comgas" width="350" border="0">
      </a>
    </td>
    <td>
      <a href="https://www.inteli.edu.br/">
        <img src="./documentos/img/logo-Inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" width="500" border="0">
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

## Professores:

### Orientador(a)

- <a href="https://www.linkedin.com/in/vanunes/">Vanessa Nunes</a>

### Instrutores

- <a href="https://www.linkedin.com/in/reginaldo-arakaki-9574222b/">Computação - Reginaldo Arakaki</a>
- <a href="https://www.linkedin.com/in/bryan-kano/">Computação - Bryan Kano Ferreira</a>
- <a href="https://www.linkedin.com/in/ovidio-netto/">Computação - Ovidio Lopes da Cruz Netto</a>
- <a href="https://www.linkedin.com/in/hermano-peixoto-1091796/">Computação - Hermano Peixoto de Oliveira Junior</a>
- <a href="https://www.linkedin.com/in/cristinagramani/">Maria Cristina Nogueira Gramani</a>
- <a href="https://www.linkedin.com/in/lisane-valdo/">Negócios - Lisane Valdo</a>
- <a href="https://www.linkedin.com/in/francisco-escobar/">Design - Francisco de Souza Escobar</a>
- <a href="https://www.linkedin.com/in/filipe-gon%C3%A7alves-08a55015b/">Liderança - Filipe Gonçalves</a>

## Descrição

Com.Sigo é um sistema inteligente de atendimento para companhias de gás que utiliza análise de conversas e busca semântica para melhorar a qualidade do atendimento ao cliente. O sistema é composto por:

- **Backend**: Node.js + Express + PostgreSQL + pgvector para armazenamento e busca semântica de chamadas
- **Frontend**: React + TypeScript + Vite para interface de dashboard e chat interativo
- **Modelo de IA**: Algoritmos de processamento de linguagem natural para análise de conversas
- **Webhooks**: Sistema de integração para recebimento de dados de chamadas em tempo real

## Links

<a href="./documentos/Manual-instalacao.md">Link para o Manual de Instruções</a> que explica como utilizar o projeto.

<a href="./documentos/Index.md">Link para a documentação geral</a> do projeto.

## 📁 Estrutura de pastas

|--> documentos<br>
&emsp;|--> img (imagens do projeto)<br>
&emsp;|--> GestaoProjeto.md<br>
&emsp;|--> GestaoConfiguracao.md<br>
&emsp;|--> GuiaPadroesDesenvolvimento.md<br>
&emsp;|--> Index.md<br>
&emsp;|--> Manual-instalacao.md<br>
&emsp;|--> Projeto.md<br>
|--> src<br>
&emsp;|--> backend (API Node.js + Express)<br>
&emsp;|--> frontend (React + TypeScript)<br>
&emsp;|--> modelo (Jupyter notebooks com algoritmos)<br>
&emsp;|--> scripts (Scripts auxiliares)<br>
|| README.md<br>

Dentre os arquivos presentes na raiz do projeto, definem-se:

- <b>README.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

- <b>documentos</b>: aqui estarão todos os documentos do projeto. Há também uma pasta denominada <b>outros</b> onde podem estar presentes documentos complementares à documentação principal.

- <b>documentos/img</b>: imagens relacionadas ao projeto como um todo (por exemplo imagens do sistema, do grupo, logotipos e afins).

- <b>src</b>: nesta pasta encontra-se todo o código fonte do sistema, dividido em:
  - **backend**: API em Node.js com Express, PostgreSQL e pgvector
  - **frontend**: Interface React com TypeScript e Vite
  - **modelo**: Notebooks Jupyter com algoritmos de análise
  - **scripts**: Scripts auxiliares para IA e processamento

## Como executar (dev)

Para configurar o desenvolvimento da aplicação, [instale o git](https://git-scm.com/downloads) e clone esse repositório em seu computador através do comando:

```
git clone https://github.com/Inteli-College/2025-2A-T13-ES07-G03.git
```

1. Backend
   ```bash
   cd src/backend
   npm install
   npm run migrate
   npm run seed
   npm run dev
   ```
2. Frontend
   ```bash
   cd src/frontend
   npm install
   npm run dev
   ```

Mais detalhes em <a href="./documentos/Manual-instalacao.md">Manual de Instalação</a>.

### Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL (versão 14 ou superior)
- npm ou yarn
- Git

## 🗃 Histórico de lançamentos

- 0.1.0 - 15/08/2025
  - ENTENDIMENTO DO NEGÓCIO
  - ESPECIFICAÇÃO DE REQUISITOS FUNCIONAIS E NÃO FUNCIONAIS
  - GESTÃO DE PROJETO E CONFIGURAÇÃO
- 0.2.0 - 29/08/2025
  - DESIGN COMPREENSIVO E PROJETO VISUAL
  - ESTRATÉGIA TÉCNICA DA SOLUÇÃO
  - GESTÃO DE PROJETOS EVOLUTIVA
- 0.3.0 - 12/09/2025
  - DESENVOLVIMENTO E DOCUMENTAÇÃO TÉCNICA DO PROJETO
  - PLANEJAMENTO DE TESTES SISTÊMICOS
  - GESTÃO DE PROJETOS EVOLUTIVA
- 0.4.0 - 26/09/2025
  - DESENVOLVIMENTO E DOCUMENTAÇÃO TÉCNICA DO PROJETO
  - EXECUÇÃO DE TESTES SISTÊMICOS
  - GESTÃO DE PROJETOS EVOLUTIVA E ANÁLISE DE VIABILIDADE FINANCEIRA
- 0.5.0 - 09/10/2025
  - DESENVOLVIMENTO E DOCUMENTAÇÃO TÉCNICA DO PROJETO
  - DOCUMENTAÇÃO TÉCNICA FINAL
  - GESTÃO DE PROJETOS EVOLUTIVA E APRESENTAÇÃO FINAL

## Licença

Este projeto está licenciado sob a licença Creative Commons Attribution 4.0 International (CC BY 4.0).
Mais informações: https://creativecommons.org/licenses/by/4.0/

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Inteli-College/2025-2A-T13-ES07-G03">Com.Sigo</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/Inteli-College/2025-2A-T13-ES07-G03">INTELI, <a href="https://www.linkedin.com/in/andre-lobo-dev/">André Eduardo Lobo de Paula</a>, <a href="https://www.linkedin.com/in/joao-souza-campos/">João Victor de Souza Campos</a>, <a href="https://www.linkedin.com/in/otavio-vasc/">Otavio de Carvalho Vasconcelos</a>, <a href="https://www.linkedin.com/in/rafaelbarbosa-dev/">Rafael Rocha Barbosa</a>, <a href="https://www.linkedin.com/in/rodrigo-lee/">Rodrigo Hu Tchie Lee</a>, <a href="https://www.linkedin.com/in/ryan-botelho-gartlan/">Ryan Botelho Gartlan</a>, <a href="https://www.linkedin.com/in/vitor-balbo/">Vitor Margarido Balbo</a></a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>
