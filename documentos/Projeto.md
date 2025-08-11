<Table>
  <tr>
    <td><a href= "https://www.btgpactual.com/"><img src="img/logo-btg.png" alt="Centro Paula Souza" border="0"></td>
    <td>
      <a href= "https://www.inteli.edu.br/"><img src="img/logo-Inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
    </td>
  </tr>
</table>

# Nome do Projeto: <nome do projeto>

## Nome do Grupo: <nome do grupo>

## Integrantes:

- <a href="https://www.linkedin.com/in/username/">Nome</a>
- <a href="https://www.linkedin.com/in/username/">Nome</a>
- <a href="https://www.linkedin.com/in/username/">Nome</a>
- <a href="https://www.linkedin.com/in/username/">Nome</a>
- <a href="https://www.linkedin.com/in/username/">Nome</a>
- <a href="https://www.linkedin.com/in/username/">Nome</a>
- <a href="https://www.linkedin.com/in/username/">Nome</a>
- <a href="https://www.linkedin.com/in/username/">Nome</a>

# Sumário

- [1. Introdução](#1-introdução)
  - [1.1 Termos e Abreviações](#11-termos-e-abreviações)
  - [1.2 Objetivo do Documento](#12-objetivo-do-documento)
- [2. Entendimento do Projeto e do Negócio](#2-entendimento-do-projeto-e-do-negócio)
  - [2.1 Contexto da Indústria do Parceiro](#21-contexto-da-indústria-do-parceiro)
  - [2.2 Problema](#22-problema)
  - [2.3 Visão do Projeto e do Produto](#23-visão-do-projeto-e-do-produto)
  - [2.4 Personas e Jornada do Usuário](#24-personas-e-jornada-do-usuário)
  - [2.5 Modelagem do Fluxo de Negócio](#25-modelagem-do-fluxo-de-negócio)
    - [2.5.1 Cadeia de Valor](#251-cadeia-de-valor)
    - [2.5.2 Fluxo de Negócio Proposto (AS-IS e TO-BE)](#252-fluxo-de-negócio-proposto-as-is-e-to-be)
  - [2.6 Matriz de Risco do Projeto](#26-matriz-de-risco-do-projeto)
  - [2.7 Ideação](#27-ideação)
  - [2.8 Canvas do Projeto](#28-canvas-do-projeto)
- [3. Requisitos do Projeto](#3-requisitos-do-projeto)
  - [3.1 Requisitos Funcionais (RFs)](#31-requisitos-funcionais-rfs)
  - [3.2 Requisitos Não Funcionais (RNFs)](#32-requisitos-não-funcionais-rnfs)
  - [3.3 Correlação RFs e RNFs](#33-correlação-rfs-e-rnfs)
  - [3.4 Casos de Uso](#34-casos-de-uso)
  - [3.5 Casos de Uso x Requisitos Funcionais](#35-casos-de-uso-x-requisitos-funcionais)
- [4. Modelagem de Dados](#4-modelagem-de-dados)
  - [4.1 Especificação da Base de Dados para Modelo de Recomendação](#41-especificação-da-base-de-dados-para-modelo-de-recomendação)
  - [4.2 Modelo Conceitual de Dados](#42-modelo-conceitual-de-dados)
  - [4.3 Modelo Lógico de Dados](#43-modelo-lógico-de-dados)
  - [4.4 Modelo Físico de Dados](#44-modelo-físico-de-dados)
- [5. Solução Técnica (Design)](#5-solução-técnica-design)
  - [5.1 Diagrama de Classes](#51-diagrama-de-classes)
  - [5.2 Diagrama de Componentes da UML](#52-diagrama-de-componentes-da-uml)
  - [5.3 Diagramas de Sequência da UML](#53-diagramas-de-sequência-da-uml)
- [6. Mapeamento Técnico de Infraestrutura e Implantação](#6-mapeamento-técnico-de-infraestrutura-e-implantação)
  - [6.1 Diagrama de Implantação da UML](#61-diagrama-de-implantação-da-uml)
  - [6.2 Justificativa das Escolhas de Implantação](#62-justificativa-das-escolhas-de-implantação)
  - [6.3 Considerações sobre Desempenho e Segurança](#63-considerações-sobre-desempenho-e-segurança)
- [7. Projeto Visual da Solução](#7-projeto-visual-da-solução)
  - [7.1 Desenvolvimento de Wireframes](#71-desenvolvimento-de-wireframes)
  - [7.2 Desenvolvimento de Mockups](#72-desenvolvimento-de-mockups)
  - [7.3 Guia Visual](#73-guia-visual)
- [8. Desenvolvimento do Projeto](#8-desenvolvimento-do-projeto)
  - [8.1 Arquitetura de Codificação e Estrutura de Diretórios](#81-arquitetura-de-codificação-e-estrutura-de-diretórios)
  - [8.2 Modelo de Recomendação](#82-modelo-de-recomendação)
  - [8.3 Desenvolvimento de Features](#83-desenvolvimento-de-features)
    - [8.3.1 Sprint 3](#831-sprint-3)
    - [8.3.2 Sprint 4](#832-sprint-4)
    - [8.3.3 Sprint 5](#833-sprint-5)
  - [8.4 Testes Unitários e de Integração](#84-testes-unitários-e-de-integração)
  - [8.5 Documentações automáticas](#85-documentações-automáticas)
- [9. Planejamento e Execução de Testes](#9-planejamento-e-execução-de-testes)
  - [9.1 Testes Funcionais](#91-testes-funcionais)
    - [9.1.1 Planejamento](#911-planejamento)
    - [9.1.2 Resultados](#912-resultados)
  - [9.2 Testes de RNFs](#92-testes-de-rnfs)
    - [9.2.1 Planejamento](#921-planejamento)
    - [9.2.2 Resultados](#922-resultados)
  - [9.3 Testes de Usabilidade](#93-testes-de-usabilidade)
    - [9.3.1 Planejamento](#931-planejamento)
    - [9.3.2 Resultados](#932-resultados)
- [10. Procedimentos de Implantação](#10-procedimentos-de-implantação)
  - [10.1 Implantação e Configuração do Banco de Dados](#101-implantação-e-configuração-do-banco-de-dados)
  - [10.2 Implantação do Protótipo para uso por equipe de desenvolvimento](#102-implantação-do-protótipo-para-uso-por-equipe-de-desenvolvimento)
- [Referências](#referências)


# 1. Introdução
_conteúdo_

## 1.1 Termos e Abreviações
_conteúdo_

## 1.2 Objetivo do Documento
_conteúdo_

# 2. Entendimento do Projeto e do Negócio
_conteúdo_

## 2.1 Contexto da Indústria do Parceiro
_conteúdo_

## 2.2 Problema
_conteúdo_

## 2.3 Visão do Projeto e do Produto
  _conteúdo_

  **Nota**: _Insira aqui informações sobre o que se trata o projeto e que valor ele vai entregar, Objetivos do Produto e O que o produto faz e não faz._

## 2.4 Personas e Jornada do Usuário
_conteúdo_

## 2.5 Modelagem do Fluxo de Negócio

Como parte do entendimento do negócio, foi modelado o fluxo de processo atual (AS-IS) de avaliação da qualidade do atendimento prestado aos clientes da Comgás, utilizando a notação BPMN (Business Process Model and Notation). O objetivo deste mapeamento é representar de forma clara as etapas e interações entre os principais atores responsáveis pelo atendimento e pela análise de conformidade com os padrões da empresa.

Como a única alteração relevante com a aplicação da solução proposta seria a substituição da atuação humana na etapa de monitoria por um sistema automatizado de análise com IA, optou-se por modelar apenas o fluxo atual (AS-IS). Na prática, o processo seguiria exatamente as mesmas etapas, mas a avaliação das chamadas seria executada pela IA em vez de um monitor humano, podendo, no melhor cenário, substituir totalmente o trabalho manual. A única mudança visível no diagrama seria a renomeação da lane de “Monitor” para “Sistema de Monitoramento” e a inclusão da geração automática de relatórios ou o envio direto das métricas para um dashboard.

**Atores Principais**

* **Cliente**: Consumidor dos serviços da Comgás, podendo ser pessoa física, comércio ou indústria. É quem identifica uma demanda (ex.: conta alta, religação de gás, vazamento) e aciona os canais de atendimento.

* **Cris / Canais Digitais**: Chatbot e outros canais automatizados (WhatsApp, chat no site, SMS) responsáveis por resolver demandas simples e recorrentes, como emissão de segunda via de conta ou informações básicas.

* **Atendente Humano**: Profissional terceirizado que atende demandas mais complexas, como emergências, contestações de conta e problemas técnicos. O atendente deve seguir protocolos da Comgás, como confirmar a identidade do cliente e, quando necessário, abrir uma Nota de Serviço (OS).

* **Sistema de Gravação**: Responsável por registrar 100% das ligações, conforme exigência regulatória. A gravação ocorre em paralelo ao atendimento, do início ao fim da chamada.

* **Monitor de Qualidade**: Funcionário terceirizado que avalia, por amostragem, a aderência do atendimento aos padrões da Comgás. Hoje, cerca de 1% das chamadas são avaliadas, o que corresponde a aproximadamente duas ligações por atendente.

### **Fluxo de Negócio do Processo Atual (AS-IS)**

<div align = center>
<img src="img/diagram (3).svg" alt="Mapeamento do fluxo atual de negócio em BPMN">
</div>

O fluxo inicia quando o cliente identifica uma demanda e aciona um dos canais de suporte. A partir daí:

1. **Entrada do cliente nos canais de atendimento**
   O cliente entra em contato com o suporte por telefone, chatbot Cris, WhatsApp, chat no site ou SMS.

2. **Decisão inicial**
   Se a demanda for simples e puder ser solucionada pela Cris ou outro canal automatizado, o processo é encerrado. Caso contrário, a chamada é direcionada a um atendente humano.

3. **Atendimento humano**
   O atendente segue protocolos estabelecidos: confirmar dados do cliente, compreender a demanda, verificar informações no sistema e, se necessário, abrir uma Nota de Serviço.

4. **Gravação da chamada em paralelo**
   Enquanto o atendimento ocorre, o sistema de gravação registra integralmente a ligação.

5. **Seleção da amostra de chamadas**
   Após o atendimento, o monitor de qualidade seleciona, seguindo critérios internos (ex.: 2 chamadas por atendente), as ligações que serão avaliadas.

6. **Avaliação de qualidade**
   O monitor acessa a gravação e verifica a aderência do atendimento aos padrões da Comgás, como cordialidade, cumprimento de roteiro, conferência de dados e clareza das informações prestadas.

O processo é encerrado após a conclusão da avaliação pelo monitor.

**Representação das cores no BPMN**

* **Roxo**: Representa subprocessos, indicando que a atividade é composta por várias etapas internas que não estão detalhadas no diagrama, mas fazem parte do procedimento padrão.

* **Laranja**: Indica pontos de decisão no processo, onde é avaliado um critério que determina o fluxo seguinte (ex.: demanda resolvível digitalmente ou não).

* **Vermelho**: Representa eventos de término do processo, encerrando o fluxo em diferentes cenários possíveis.

* **Azul**: Representa dados gerados ou consumidos ao longo do processo


Em conclusão, o mapeamento BPMN do processo atual de avaliação da qualidade no atendimento telefônico da Comgás permitiu identificar de forma clara o papel de cada ator, as interações entre eles e a sequência lógica das atividades. Embora o fluxo de atendimento ao cliente não se altere significativamente com a introdução da solução proposta, o uso de tecnologias de reconhecimento de voz e processamento de linguagem natural na etapa de monitoria tem potencial de multiplicar quantidade de chamadas avaliadas, aumentando a cobertura sem acréscimo de custo operacional. Esse ganho de escala contribui para maior precisão no monitoramento da experiência do cliente, reforça a capacidade de identificar desvios de padrão e oferece à Comgás mais dados para melhorar continuamente seu atendimento.

## 2.5.1 Cadeia de Valor
_conteúdo_

## 2.6 Matriz de Risco do Projeto
_conteúdo_

## 2.7 Ideação
_conteúdo_
Obs.: Seção dedicada a discussão sobre ideias e priorização de features.

## 2.8 Canvas do Projeto
_conteúdo_

# 3. Requisitos do Projeto
_conteúdo_

## 3.1 Requisitos Funcionais (RFs)
_conteúdo_ 

## 3.2 Requisitos Não Funcionais (RNFs)
_conteúdo_

## 3.3 Correlação RFs e RNFs
_conteúdo_

## 3.4 Casos de Uso
_conteúdo_

## 3.5 Casos de Uso x Requisitos Funcionais
_conteúdo_

# 4. Modelagem de Dados
_conteúdo_

## 4.1 Especificação da Base de Dados para Modelo de Recomendação
_conteúdo_
Obs.: Insira aqui informações sobre a construção do artefato da Sprint 1. 

## 4.2 Modelo Conceitual de Dados
_conteúdo_

## 4.3 Modelo Lógico de Dados
_conteúdo_

## 4.4 Modelo Físico de Dados
_conteúdo_

**Nota:** Insira uma explicação e direcionamento para o readme.md da pasta database.

# 5. Solução Técnica (Design)
_conteúdo_

## 5.1 Diagrama de Classes
_conteúdo_

## 5.2 Diagrama de Componentes da UML
_conteúdo_

## 5.3 Diagramas de Sequência da UML
_conteúdo_

# 6. Mapeamento Técnico de Infraestrutura e Implantação
_conteúdo_

## 6.1 Diagrama de Implantação da UML
_conteúdo_

## 6.2 Justificativa das Escolhas de Implantação
_conteúdo_

## 6.3 Considerações sobre Desempenho e Segurança
_conteúdo_

# 7. Projeto Visual da Solução
_conteúdo_

## 7.1 Desenvolvimento de Wireframes
_conteúdo_

## 7.2 Desenvolvimento de Mockups
_conteúdo_

## 7.3 Guia Visual
_conteúdo_

# 8. Desenvolvimento do Projeto
_conteúdo_

## 8.1 Arquitetura de Codificação e Estrutura de Diretórios
_conteúdo_

## 8.2 Modelo de Recomendação
_conteúdo_

## 8.3 Desenvolvimento de Features
_conteúdo_

**Nota:** Insira uma explicação de entregas em cada Sprint.

## 8.3.1 Sprint 3
_conteúdo_

## 8.3.2 Sprint 4
_conteúdo_

## 8.3.3 Sprint 5
_conteúdo_

## 8.4 Testes Unitários e de Integração
_conteúdo_
Obs.: Insira informações sobre estratégias para realização dos testes

## 8.5 Documentações automáticas
_conteúdo_
Obs.: Insira informações sobre quais frameworks foram usados e como acessar.

# 9. Planejamento e Execução de Testes
_conteúdo_

## 9.1 Testes Funcionais
_conteúdo_

## 9.1.1 Planejamento
_conteúdo_

## 9.1.2 Resultados
_conteúdo_

## 9.2 Testes de RNFs
_conteúdo_

## 9.2.1 Planejamento
_conteúdo_

## 9.2.2 Resultados
_conteúdo_

## 9.3 Testes de Usabilidade
_conteúdo_

## 9.3.1 Planejamento
_conteúdo_

## 9.3.2 Resultados
_conteúdo_

# 10. Procedimentos de Implantação
_conteúdo_

## 10.1 Implantação e Configuração do Banco de Dados
_conteúdo_

## 10.2 Implantação do Protótipo para uso por equipe de desenvolvimento
_conteúdo_

# Referências
_conteúdo_


