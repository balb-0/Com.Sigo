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
  - [2.7 Matriz SWOT](#26-matriz-swot)
  - [ Ideação](#27-ideação)
  - [2.9 Canvas do Projeto](#28-canvas-do-projeto)
  - [2.10 Business Drivers](#210-business-drivers)
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

A Comgás (Companhia de Gás de São Paulo) é a maior distribuidora de gás natural encanado da América Latina, atuando no estado de São Paulo. A empresa é responsável por levar gás natural canalizado para residências, comércios, indústrias e outros segmentos em sua área de concessão, que inclui a região metropolitana de São Paulo, Campinas, Vale do Paraíba e Baixada Santista

## 1.1 Termos e Abreviações

* RF (Requisitos Funcionais) – Descrevem as funcionalidades e comportamentos esperados do sistema ou software.
* RNF (Requisitos Não Funcionais) – Especificações que definem restrições e qualidades do sistema, como desempenho, segurança e usabilidade.
* CA (Critério de Aceite) – Conjunto de condições que um produto ou funcionalidade deve atender para ser considerado aceito pelo cliente ou equipe.
* T (Teste) – Processo de verificação para garantir que um sistema, software ou produto funciona conforme esperado.
* API (Application Programming Interface) – Conjunto de definições e protocolos que permite a comunicação entre diferentes sistemas ou softwares.
* Features – Funcionalidades ou características específicas de um software ou produto.
* MVP (Minimum Viable Product) – Produto mínimo viável, versão inicial de um produto com funcionalidades básicas para validar sua viabilidade.
* ISO (International Organization for Standardization) – Organização internacional responsável pela padronização e normatização de processos e produtos em diversas áreas.

## 1.2 Objetivo do Documento

&nbsp;&nbsp;&nbsp;&nbsp;Para registrar nosso processo de criação do projeto, desde a idealização até a entrega, desenvolvemos esta documentação. Além de detalhar as fases iniciais de desenvolvimento, o documento explica as tecnologias utilizadas e como foram aplicadas, facilitando a implementação do sistema.

# 2. Entendimento do Projeto e do Negócio

&ensp; Nesta seção, é apresentado o detalhamento completo do entendimento do negócio que norteia este projeto. O objetivo é fornecer uma visão 360º do desafio proposto pela Comgás, começando pela definição clara do problema de negócio e seus impactos diretos na operação e na estratégia da companhia. Em seguida, será apresentada a visão do produto concebido para solucionar este problema, incluindo seus objetivos, funcionalidades e escopo. A análise se aprofunda ao mapear as personas que serão beneficiadas pela solução, os fluxos de negócio envolvidos, e uma matriz estratégica de riscos e oportunidades, culminando na apresentação do Canvas do MVP que guiará o desenvolvimento.

## 2.1 Contexto da Indústria do Parceiro

**Visão Geral do Setor**:

O setor de distribuição de gás natural no Brasil atua em um ambiente altamente regulado, com forte exigência de segurança, confiabilidade e qualidade no atendimento ao cliente. A crescente demanda por energia limpa e eficiente tem impulsionado a digitalização dos serviços, mas o atendimento humano ainda é essencial para resolver questões sensíveis, emergenciais ou complexas. Um dos principais desafios do setor é garantir uma experiência consistente e de alta qualidade, mesmo diante do alto volume de interações e da diversidade de perfis de clientes atendidos.

A Comgás, maior distribuidora de gás natural canalizado da América Latina, atende mais de 2,6 milhões de clientes no Estado de São Paulo. A companhia atende três perfis distintos: pessoas físicas, clientes comerciais (como restaurantes e pequenos comércios) e clientes industriais (como fábricas e grandes indústrias). Enquanto as pessoas físicas representam o maior volume de atendimentos, os clientes industriais são os mais estratégicos, pois o setor industrial responde por mais de 20% do PIB brasileiro e possui alto consumo de gás, sendo um segmento fundamental para a sustentabilidade do negócio.

**Posicionamento do Parceiro**:

A Comgás atua como referência nacional em distribuição de gás natural, não apenas pela escala de sua operação, mas por seu papel de liderança em inovação e experiência do cliente. Em um setor tradicionalmente conservador, a empresa se diferencia por adotar tecnologias avançadas de automação e inteligência artificial como pilares da sua estratégia de atendimento. Com 94% dos atendimentos já resolvidos por canais digitais, como chatbot, URA, WhatsApp e site, a Comgás demonstra um alto nível de maturidade digital, raro entre empresas de infraestrutura no Brasil.

Esse posicionamento a coloca na vanguarda do setor, onde o próximo passo natural não é apenas automatizar mais, mas tornar a qualidade do serviço mensurável, escalável e inteligente. Projetos como o de automação do monitoramento de chamadas com PLN e reconhecimento de áudio são consequência direta dessa postura: enquanto muitas empresas ainda avaliam atendimento de forma manual e pontual, a Comgás busca transformar dados de voz em insights acionáveis, em tempo real e com cobertura massiva. Isso reforça seu compromisso com a excelência operacional e posiciona a empresa como uma utility inteligente, alinhada às demandas de um mercado cada vez mais exigente.

**Contexto Operacional e Desafio Atual**:

A central de atendimento da Comgás recebe entre 120 mil e 150 mil ligações por mês, com toda a operação de atendimento humano terceirizada. Os atendentes, em sua maioria jovens entre 20 e 30 anos, atendem em diversos turnos, 24 horas por dia nos canais de emergência, como vazamentos de gás, e em horário comercial para demandas não emergenciais, como dúvidas sobre faturas, religações e troca de titularidade.

Todas as chamadas são gravadas por obrigatoriedade regulatória. No entanto, apenas cerca de 1% delas são avaliadas manualmente por monitores de qualidade, que escutam cada gravação por completo e verificam critérios como confirmação de dados do cliente (CPF, endereço), cumprimento de roteiros, clareza nas respostas e postura do atendente. Esse processo é lento, pouco escalável e consome tempo operacional, limitando a capacidade da empresa de garantir a qualidade em larga escala.

O atendimento é desafiador por diversos fatores operacionais e comportamentais. A maioria das chamadas chega sem identificação do cliente, exigindo confirmação de dados antes do atendimento. Há também uma forte sazonalidade: no inverno, o consumo de gás aumenta naturalmente, mesmo sem mudança nos hábitos de uso, pois a água entra mais fria e exige mais gás para aquecimento. Isso gera um pico de ligações de clientes preocupados com o valor da conta, muitas vezes por motivos improcedentes, como ter regulado o medidor, recebido visitas que usaram mais água quente ou não compreendido o funcionamento do consumo sazonal.

Apesar de 94% dos atendimentos serem resolvidos por canais digitais, os 6% que transbordam para o atendimento humano trazem os casos mais sensíveis, urgentes ou emocionais. Essas interações muitas vezes envolvem situações de emergência, reclamações financeiras ou risco de perda de cliente. Por isso, a qualidade dessas interações é crítica: resolver rápido, com empatia e precisão é essencial para manter a reputação e a fidelidade.

Nesse cenário, a automação do monitoramento de qualidade se torna um diferencial estratégico. A meta é aumentar a cobertura de análise de 1% para pelo menos 20% das ligações, sem impacto nos custos operacionais. A aplicação de tecnologias como reconhecimento de áudio, processamento de linguagem natural (PLN) e análise de sentimento permite não apenas escalar a avaliação, mas também identificar padrões, mapear boas práticas, detectar falhas recorrentes e realimentar o treinamento de atendentes.

Essa iniciativa está diretamente ligada à estratégia de experiência do cliente (CX) da Comgás: garantir que cada interação, mesmo em larga escala, seja resolutiva, ágil e empática. Automatizar a escuta qualificada não é apenas uma evolução operacional, é uma alavanca para melhoria contínua, retenção de clientes e fortalecimento da reputação da marca.

## 2.2 Problema

### Descrição do Problema
&ensp;A Comgás, maior distribuidora de gás natural canalizado da América Latina, enfrenta um desafio significativo na monitoria da qualidade do seu atendimento telefônico. Com uma central que recebe entre 120 e 150 mil ligações mensais, o método atual de avaliação de qualidade é predominantemente manual e limitado, operando de duas formas:

**Avaliação Direta:** Baseada na nota de satisfação que o cliente atribui ao final do atendimento.

**Análise por Amostragem:** Uma equipe de analistas de qualidade escuta manualmente as gravações de aproximadamente 1% do volume total de chamadas para verificar a conformidade com um checklist de qualidade pré-definido.

&ensp;Este processo, embora importante, é inerentemente lento, caro e não escalável. A amostragem de apenas 1% é insuficiente para gerar uma visão estatisticamente relevante da qualidade geral do serviço, deixando uma lacuna de 99% das interações sem análise aprofundada. Com o crescimento contínuo da base de clientes (cerca de 450 novos por dia), a manutenção desse modelo manual se torna cada vez mais insustentável, gerando um gargalo operacional e estratégico.

&ensp;O cerne do problema é a incapacidade de escalar a monitoria de qualidade na mesma proporção do crescimento da operação, o que impede a Comgás de ter uma visão abrangente e em tempo hábil sobre a experiência real de seus clientes no canal de voz.

### Impacto
&ensp;O problema descrito gera impactos negativos diretos para o negócio e seu posicionamento no setor:

#### Impacto no Negócio:

**Visibilidade Limitada da Experiência do Cliente (CX):** A baixa cobertura da amostragem impede a identificação de problemas sistêmicos, falhas recorrentes em scripts e oportunidades de melhoria no atendimento. Isso pode levar a uma degradação silenciosa da satisfação do cliente.

**Ineficiência Operacional:** O custo de manter uma equipe de analistas para cobrir uma fração tão pequena do total de chamadas é alto. Escalar essa equipe para atingir uma cobertura maior (como os 20% desejados) seria financeiramente inviável no modelo atual.

**Feedback Impreciso para Atendentes:** Com dados limitados, o feedback fornecido aos operadores da central de atendimento pode não ser representativo, dificultando o desenvolvimento e o treinamento direcionado da equipe.

**Tomada de Decisão Reativa:** A falta de dados abrangentes força a gestão a tomar decisões baseadas em informações parciais ou apenas após a escalada de reclamações, em vez de agir proativamente.

#### Impacto no Setor:

**Perda de Competitividade:** No setor de serviços, a experiência do cliente é um diferencial competitivo crucial. Concorrentes que utilizam tecnologias de automação para análise de atendimento podem obter vantagens significativas em eficiência e qualidade.

**Desalinhamento com a Transformação Digital:** Enquanto 94% dos atendimentos da Comgás já ocorrem em canais digitais, a monitoria do canal de voz permanece artesanal. Essa dissonância enfraquece a estratégia de integração e eficiência da companhia.

**Risco à Reputação da Marca:** Falhas de qualidade não detectadas podem levar a experiências negativas que se espalham rapidamente, especialmente em mídias sociais, afetando a percepção pública da marca.

## 2.3 Visão do Projeto e do Produto

### Visão Geral e Objetivo do Produto

&ensp;A solução proposta é uma plataforma de automação para monitoria e análise da qualidade de atendimento (Quality Assurance Automation). O produto visa transformar o processo atual, substituindo a escuta manual e limitada por uma análise automatizada, escalável e baseada em dados, utilizando tecnologias de Inteligência Artificial.

&ensp;O objetivo principal do produto é desenvolver um protótipo funcional que automatize a transcrição e a análise das gravações das chamadas telefônicas, aumentando a cobertura de monitoria de 1% para, no mínimo, 20% do total de ligações, sem acarretar aumento nos custos operacionais.

Como objetivos secundários, a plataforma busca:

- Fornecer insights objetivos e acionáveis para a área de Experiência do Cliente (CX).

- Padronizar os critérios de avaliação, reduzindo a subjetividade humana.

- Reduzir drasticamente o tempo entre a ocorrência da chamada e a sua análise.

- Gerar uma base de dados estruturada para futuras análises preditivas e de causa raiz.

#### O que o Produto Faz (Principais Funcionalidades)

**Processamento de Entradas:** Aceita o envio de arquivos de áudio (gravações de chamadas) e texto para análise.

**Transcrição Automática:** Converte os arquivos de áudio em texto utilizando um serviço de speech-to-text.

**Análise de Conteúdo por PLN:** Utiliza Processamento de Linguagem Natural para analisar o texto transcrito, identificando:

- Sentimento do cliente e do atendente.

- Cumprimento de etapas do script (saudação, despedida, etc.).

- Uso de palavras-chave (positivas ou negativas, como "problema" ou "resolvido").

- Detecção de interrupções, sobreposição de voz e uso de linguagem imprópria.

**Geração de Score de Qualidade:** Atribui uma pontuação objetiva e personalizável a cada chamada com base em critérios pré-definidos (ex: cordialidade, eficiência, conformidade).

**Visualização de Dados:** Apresenta os resultados em uma interface simples (dashboard), exibindo o score da ligação, a transcrição e métricas agregadas (pontuação média, tendências, etc.).

#### O que o Produto Não Faz (Escopo e Limitações)

&ensp;Conforme as restrições do projeto, o protótipo não contemplará:

**Análise em Tempo Real:** A análise será feita em lote (batch processing), a partir de gravações já finalizadas, não durante a chamada.

**Produto Comercializável:** A entrega é um protótipo funcional para validação de conceito, não um software pronto para comercialização.

**Coleta e Rotulagem de Dados:** O projeto assume o recebimento de um conjunto de dados já preparado para o desenvolvimento.

**Disponibilidade Contínua em Nuvem:** A solução não será mantida em ambiente de produção na nuvem após a conclusão do módulo acadêmico.

**Substituição Completa da Análise Humana:** A ferramenta é projetada para escalar a monitoria e direcionar a atenção dos analistas de qualidade para os casos mais críticos ou complexos, e não para eliminar 100% a necessidade de supervisão humana.

## 2.4 Personas e Jornada do Usuário

&emsp;Esta seção apresenta as duas principais personas (Julia Souza, Analista de Qualidade de Atendimento, e Carlos Martins, Supervisor de Atendimento Humano) e suas respectivas jornadas antes e depois da implantação da solução. É importante esclarecer que ambas as personas são usuárias diretas do sistema, utilizando a plataforma para otimizar seus respectivos processos de trabalho. Esses mapas de jornada foram elaborados para revelar as necessidades, pensamentos e pontos de atrito em cada etapa do processo e assim orientar o desenvolvimento das telas, dos fluxos e das funcionalidades do sistema, garantindo que ambos os usuários tenham uma experiência fluida, com mais eficiência, clareza e confiança.

&emsp; Abaixo a imagem da persona **Julia Souza** (Analista de Qualidade de Atendimento):

<div align="center">
  <sub>Figura X - Persona 1 - Julia Souza (Analista de Qualidade de Atendimento)</sub> <br>

  <img src="img/section2/Persona 1 Julia.png" alt="Persona 1 - Julia Souza (Analista de Qualidade de Atendimento)" style="max-width: 700px; width: 100%; height: auto;">

  <sup>Fonte: Material produzido pelos autores (2025).</sup>
</div>


&emsp; Abaixo as imagens das jornadas da persona **Julia Souza** (Analista de Qualidade de Atendimento):

<div align="center">
  <sub>Figura X – Jornada do Usuário Antes da Solução (Julia Souza, Analista de Qualidade de Atendimento)</sub> <br>

  <img src="img/section2/Jornada de Usuário Julia Antes.png" alt="Jornada do Usuário Antes da Solução (Julia Souza, Analista de Qualidade de Atendimento)" style="max-width: 600px; width: 100%; height: auto;">

  <sup>Fonte: Material produzido pelos autores (2025).</sup>
</div>

<div align="center">
  <sub>Figura X – Jornada do Usuário Depois da Solução (Julia Souza, Analista de Qualidade de Atendimento)</sub> <br>

  <img src="img/section2/Jornada de Usuário Julia Depois.png" alt="Jornada do Usuário Depois da Solução (Julia Souza, Analista de Qualidade de Atendimento)" style="max-width: 600px; width: 100%; height: auto;">

  <sup>Fonte: Material produzido pelos autores (2025).</sup>
</div>


&emsp; Abaixo a imagem da persona **Carlos Martins** (Supervisor de Atendimento Humano):

<div align="center">
  <sub>Figura X - Persona 2 - Carlos Martins (Supervisor de Atendimento Humano)</sub> <br>

  <img src="img/section2/Persona 2 Carlos.png" alt="Persona 2 - Carlos Martins (Supervisor de Atendimento Humano)" style="max-width: 700px; width: 100%; height: auto;">

  <sup>Fonte: Material produzido pelos autores (2025).</sup>
</div>

&emsp; Abaixo as imagens das jornadas da persona **Carlos Martins** (Supervisor de Atendimento Humano):

<div align="center">
  <sub>Figura X – Jornada do Usuário Antes da Solução (Carlos Martins, Supervisor de Atendimento Humano)</sub> <br>

  <img src="img/section2/Jornada do Usuário Carlos Antes.png" alt="Jornada do Usuário Antes da Solução (Carlos Martins, Supervisor de Atendimento Humano)" style="max-width: 600px; width: 100%; height: auto;">

  <sup>Fonte: Material produzido pelos autores (2025).</sup>
</div>

<div align="center">
  <sub>Figura X – Jornada do Usuário Depois da Solução (Carlos Martins, Supervisor de Atendimento Humano)</sub> <br>

  <img src="img/section2/Jornada do Usuário Carlos Depois.png" alt="Jornada do Usuário Depois da Solução (Carlos Martins, Supervisor de Atendimento Humano)" style="max-width: 600px; width: 100%; height: auto;">

  <sup>Fonte: Material produzido pelos autores (2025).</sup>
</div>

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

### Matriz de Risco

&emsp;Nesta seção se encontra a matriz de riscos do projeto.

<div align="center"> <sub>Imagem 2.6.1 - Matriz de Riscos</sub><br>

<img src="img/section2/matriz_riscos.png" alt="Matriz de riscos" border="0">

<sup>Fonte: Material produzido pelos autores (2025)</sup>

</div>

<div align="center"> <sub>Tabela 2.6.1 - Tabela de Riscos</sub><br>

| Nº  | Risco                                         | Probabilidade | Impacto    | Mitigação                                                                                 |
| --- | --------------------------------------------- | ------------- | ---------- | ----------------------------------------------------------------------------------------- |
| 1   | Processamento lento ou falha em áudios longos | Média         | Alto       | Otimizar algoritmos de transcrição; usar processamento assíncrono; limitar simultaneidade |
| 2   | Baixa acurácia na identificação de intenções  | Média         | Muito alto | Treinar e validar modelos com dados variados; implementar feedback para correção manual   |
| 3   | Vazamento ou perda de dados sensíveis         | Baixa         | Muito Alto | Implementar criptografia local; políticas rígidas de acesso; logs de auditoria            |
| 4   | Interface pouco intuitiva para operadores     | Baixa         | Média      | Realizar testes de usabilidade; coletar feedback dos usuários e iterar no design          |
| 5   | Incompatibilidade com formatos de áudio       | Média         | Média      | Suportar múltiplos formatos comuns; validar arquivos antes do processamento               |

<sup>Fonte: Material produzido pelos autores (2025)</sup>

</div>

### Matriz de Oportunidade

&emsp;Nesta seção se encontra a matriz de riscos do projeto.

<div align="center"> <sub>Imagem 2.6.2 - Matriz de Oportunidades</sub><br>

<img src="img/section2/matriz_oportunidades.png" alt="Matriz de oportunidades" border="0">

<sup>Fonte: Material produzido pelos autores (2025)</sup>

</div>

<div align="center"> <sub>Tabela 2.6.2 - Tabela de Oportunidades</sub><br>

| Nº  | Oportunidade                                                | Probabilidade | Impacto | Mitigação/Ação Potencial                                                                 |
| --- | ----------------------------------------------------------- | ------------- | ------- | ---------------------------------------------------------------------------------------- |
| 3   | Oferecer relatórios automáticos com métricas de atendimento | Alta          | Médio   | Desenvolver módulo de relatórios integrado; coletar métricas-chave de forma automatizada |
| 4   | Integrar análise de sentimentos mais detalhada              | Média         | Alto    | Implementar modelos de NLP mais avançados e treinar com dados específicos da empresa     |
| 8   | Incorporar tradução automática das transcrições             | Baixa         | Alto    | Integrar APIs de tradução; permitir configuração de idiomas prioritários                 |
| 10  | Criar interface personalizável para operadores              | Alta          | Médio   | Adicionar opções de layout, atalhos e personalização de dashboards                       |

<sup>Fonte: Material produzido pelos autores (2025)</sup>

</div>

## 2.7 Análise SWOT

&nbsp;&nbsp;&nbsp;&nbsp;A matriz SWOT é uma ferramenta de análises de mercado utilizada para identificar e analisar as forças (Strengths), fraquezas (Weaknesses), oportunidades (Opportunities) e ameaças (Threats) de uma empresa ou projeto. O objetivo dessa análise é oferecer uma visão clara e agrangente das condições internas e externas que podem impactar no desenvolvimento de um projeto e no desempenho da empresa, o que ajuda na formulação de estratégias eficientes para alcançar os objetivos empresariais.

<div align="center">
<sub>Figura 2.7.1 - Matriz Swot</sub><br>
<img src="../documentos/img/matriz-swot.png" width="80%" ><br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

#### Forças (Strengths)

1. **Alto volume de dados disponível**

   - A **Comgás** possui alto volume de dados de atendimento acumulados, com ligações e interações por canais digitais. Isso nos ajuda a criar e validar modelos de análise, com representatividade e confiabilidade estatística.

2. **Equipe ativa para suporte**

   - O projeto conta com o envolvimento direto de profissionais das áreas de inovação, tecnologia e canais digitais da **Comgás**. Esse suporte ajuda no alinhamento com as necessidades reais da empresa, facilita o acesso a dados e aumenta as chances de adoção futura.

3. **Escopo bem definido**
   - O projeto possui objetivos claros e delimitados, com entregáveis tangíveis do MVP. Essa definição garante a organização da equipe, no controle das entregas e na avaliação das métricas do projeto.

#### Fraquezas (Weaknesses)

1. **Alta margem para melhora de análise**

   - Atualmente, apenas cerca de 1% das ligações é analisada manualmente, o que indica pouca visibilidade sobre a qualidade do atendimento. Isso limita a base de comparação para validação e pode dificultar a melhora inicial dos modelos.

2. **Processo manual é custoso**

   - O modelo atual de escuta humana consome tempo e recursos operacionais significativos, dificultando a escalabilidade. Essa dependência do fator humano compromete a eficiência e impõe limites rígidos à expansão da análise.

3. **Dependência de dados padronizados**
   - O projeto exige que os dados de entrada (transcrições, gravações e anotações) estejam limpos e padronizados. Isso pode se tornar um gargalo, caso os dados sejam entregues de forma desorganizada.

#### Oportunidades (Opportunities)

1. **Alta escalabilidade**

   - Uma vez validado, o modelo de análise automatizada pode ser ampliado para cobrir grande parte ou até a totalidade dos atendimentos. A **Comgás** poderá multiplicar a cobertura da monitoria e extrair insights em tempo real.

2. **Alta margem para melhora de análise**

   - A baixa cobertura atual representa também uma grande oportunidade: há um espaço amplo para crescimento do volume de interações analisadas, o que pode gerar impactos diretos na qualidade do atendimento e na experiência do cliente.

3. **Adoção de automações na área de CX**
   - O mercado está em crescente movimento de automação de processos de Customer Experience, com ampla aceitação de tecnologias como NLP e IA. Isso cria um ambiente favorável para que a **Comgás** adote soluções inovadoras com bom retorno estratégico.

#### Ameaças (Threats)

1. **Possíveis mudanças de regulamentos**

   - Alterações na legislação de proteção de dados (como a LGPD) ou novas diretrizes internas podem restringir o uso de gravações ou exigir anonimização mais rigorosa, afetando a viabilidade do projeto.

2. **Falta de alinhamento durante o projeto**

   - O envolvimento de múltiplos pontos de contato (negócio, inovação, dados) pode gerar desalinhamentos de expectativa ou prioridades, o que pode comprometer prazos e decisões técnicas ao longo do desenvolvimento.

3. **Dependência de ferramentas externas**
   - A solução depende de serviços externos (como speech-to-text e PLN em nuvem), que podem ter custos variáveis, limitações de uso gratuito, falhas de integração ou até descontinuidade, impactando a estabilidade e escalabilidade do protótipo.

## 2.8 Ideação
Esta seção apresenta o levantamento de funcionalidades potenciais para o projeto, com base no contexto da Comgás, no problema de negócio, nos requisitos funcionais (RFs) e não funcionais (RNFs) definidos, e nas diretrizes do MVP.

O objetivo é identificar funcionalidades que atendam ao escopo do projeto, com alto impacto na qualidade do atendimento e viabilidade técnica, priorizando aquelas essenciais para o MVP.

### 2.8.1 Metodologia de Priorização

Utilizamos uma matriz Impacto vs Viabilidade, considerando:

- **Impacto**:
  1. Alinhamento com o objetivo principal: automatizar e escalar a avaliação de qualidade
  2. Contribuição para retenção de clientes, reputação e melhoria contínua
  3. Geração de insights acionáveis para gestão e treinamento

- **Viabilidade**:
  1. Alinhamento com os requisitos funcionais e não funcionais
  2. Adequação ao MVP (protótipo funcional com score, dashboard e validação)

As funcionalidades foram classificadas em:
- **MVP (Must Have)** – Essenciais para entrega
- **Futuro (Nice to Have)** – Estratégicas, mas fora do escopo atual

<div align="center">

| ID | Nome da Feature | Descrição | Vinculação com RFs/RNFs | Classificação |
|----|------------------|-----------|--------------------------|---------------|
| F01 | Classificação Automática de Entrada (Áudio/Texto) | Identifica automaticamente se a entrada é áudio ou texto e direciona para o fluxo adequado. | RF01, RF04, RNF02, RNF03 | MVP |
| F02 | Transcrição de Áudio com Suporte a Longas Durações | Converte arquivos de áudio (até 75 min) em texto, garantindo completude. | RF01, RNF01, RNF02 | MVP |
| F03 | Geração de Score de Qualidade (0 a 5) | Atribui pontuação com base em três critérios objetivos, conforme RF02. | RF02, RNF03 | MVP |
| F04 | Análise de Sentimento e Intenção | Detecta emoções e intenções com precisão ≥90%, conforme RNF03. | RF02, RF06, RNF03 | MVP |
| F05 | Dashboard de Indicadores de Qualidade | Painel com métricas agregadas: média de score, % de chamadas abaixo do limite. | RF03, RF06 | MVP |
| F06 | Upload em Lote de Chamadas | Permite envio simultâneo de múltiplas chamadas para análise em massa. | RF05, RNF01 | MVP |
| F07 | Armazenamento Seguro de Dados | Armazena entrada, transcrição, score e metadados com segurança. | RF07, RNF01, RNF03 | MVP |
| F08 | Destaque de Atendimentos Críticos | Identifica e destaca chamadas com score abaixo do limite definido. | RF06 | MVP |
| F09 | Identificação de Atendimentos "Top" (Excelência) | Destaca chamadas com desempenho máximo para uso em treinamento. | — | Futuro |
| F10 | Análise de Transbordo do Canal Digital | Cruzamento entre chamadas que vieram do chatbot e motivo do atendimento. | — | Futuro |
| F11 | Detecção de Risco de Perda de Cliente | Identifica frases de insatisfação ou ameaça de cancelamento. | — | Futuro |
| F12 | Recomendação de Treinamento por Padrão de Erro | Mapeia erros recorrentes e sugere treinamentos personalizados. | — | Futuro |
</div>

Tabela de Priorização: Impacto vs Viabilidade

<div align="center">

| Feature | Impacto | Viabilidade | Prioridade Final | Categoria |
|--------|--------|------------|------------------|----------|
| F01 – Classificação Automática | Alto | Alta | Alta | MVP |
| F02 – Transcrição de Áudio | Alto | Alta | Alta | MVP |
| F03 – Geração de Score | Alto | Alta | Alta | MVP |
| F04 – Análise de Sentimento | Alto | Média | Alta | MVP |
| F05 – Dashboard | Médio | Alta | Alta | MVP |
| F06 – Upload em Lote | Médio | Alta | Alta | MVP |
| F07 – Armazenamento de Dados | Médio | Alta | Alta | MVP |
| F08 – Destaque de Críticos | Médio | Alta | Alta | MVP |
| F09 – Atendimentos "Top" | Médio | Média | Média | Futuro |
| F10 – Análise de Transbordo | Alto | Média | Média | Futuro |
| F11 – Risco de Perda | Alto | Baixa | Média | Futuro |
| F12 – Recomendação de Treinamento | Alto | Média | Média | Futuro |
</div>

Alinhamento com Requisitos

<div align="center">

| Feature | RF01 | RF02 | RF03 | RF04 | RF05 | RF06 | RF07 | RNF01 | RNF02 | RNF03 |
|--------|------|------|------|------|------|------|------|-------|-------|-------|
| F01 | ✅ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ | ✅ |
| F02 | ✅ | ⬜ | ⬜ | ⬜ | ✅ | ⬜ | ✅ | ✅ | ✅ | ⬜ |
| F03 | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ |
| F04 | ✅ | ✅ | ✅ | ✅ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ✅ |
| F05 | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ⬜ | ✅ |
| F06 | ✅ | ⬜ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ |
| F07 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ✅ |
| F08 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ⬜ | ✅ |

</div>

### 2.8.2 Roadmap Previsto

A priorização das funcionalidades foi desenvolvida com base na facilidade de implementação, no valor entregue para a Comgás e na coerência com o cronograma acadêmico. As features foram distribuídas entre as sprints 3, 4 e 5 de forma a garantir um desenvolvimento incremental, viabilizando a integração contínua entre processamento de áudio, geração de score, armazenamento de dados e interface de visualização, sempre alinhado ao escopo do MVP.

<div align="center">

| Sprint | Funcionalidades | Objetivo |
|--------|------------------|---------|
| 3 | F01, F02, F03, F04 | Implementar a recepção e classificação de entradas (áudio/texto), transcrição de áudio, análise de sentimento e geração inicial do score com base em três critérios. Inicia-se a base do motor de avaliação automatizada. |
| 4 | F05, F06, F07 | Desenvolver o dashboard básico, habilitar upload em lote de chamadas e implementar o armazenamento seguro dos dados processados, integrando a solução com o banco de dados. |
| 5 | F08 | Implementar o destaque automático de chamadas com desempenho abaixo do limite definido, permitindo ações corretivas rápidas. Concluir com a validação cruzada entre análise automática e avaliação humana. |

</div>

Em conclusão, todas as funcionalidades do MVP estão diretamente vinculadas aos requisitos definidos no projeto. A solução proposta permite automatizar a avaliação de qualidade com foco em escalabilidade, acurácia e custo-efetividade. Ao final da sprint 5, o protótipo entregue será capaz de processar chamadas em áudio ou texto, gerar um score de qualidade com base em três critérios, exibir métricas em um dashboard simples e destacar atendimentos abaixo do padrão, atendendo integralmente ao escopo do MVP.

## 2.9 Definição da Estratégia de Entrega para as Sprints 3, 4 e 5

Esta seção detalha a estratégia de entrega das sprints 3, 4 e 5, com foco no desenvolvimento e integração do backend. A abordagem é incremental, alinhada aos requisitos funcionais e não funcionais definidos, e compatível com as exigências acadêmicas do projeto. As etapas de design, desenvolvimento, testes e implantação são estruturadas para garantir qualidade, escalabilidade e integração contínua.

A estratégia foi construída com base no roadmap do MVP, nas entregas obrigatórias por sprint e na especificação técnica inicial, com evoluções documentadas conforme o avanço do projeto.

### Sprint 3: Fundação do Backend e Processamento Inicial

Nesta sprint, é desenvolvida a base do backend para recepção, classificação e processamento inicial de entradas em áudio e texto.

São implementadas:
- API para upload de arquivos de áudio e texto (RF01, RF04)
- Classificação automática do tipo de entrada, com identificação precisa entre áudio e texto
- Integração com serviço de transcrição (Speech-to-Text) para conversão de áudio em texto
- Módulo inicial de processamento com NLP para detecção de intenções e sentimento (RNF03)
- Geração de score preliminar com base em três critérios de qualidade (RF02)

O armazenamento é temporário, com metadados registrados para suporte ao fluxo de avaliação.

Paralelamente, é realizado o planejamento dos testes:

- Testes funcionais baseados nos requisitos (RFs)
- Testes não funcionais focados em desempenho (RNF02) e precisão (RNF03)
- Testes de integração entre componentes internos e serviços externos
- Roteiro de testes de usabilidade com 5 usuários externos, incluindo cenários, perfis e métricas (ex: SUS)
- Definição das ferramentas e bibliotecas a serem utilizadas
- Implementação do módulo VHS para cache de respostas da API externa

As especificações técnicas da Sprint 1 são revisadas e atualizadas com base no progresso, garantindo coerência com o MVP. Alterações no modelo de dados e nos fluxos de processamento são documentadas no `Projeto.md`.

### Sprint 4: Persistência, Integração e Implantação

Nesta sprint, o backend é consolidado com armazenamento persistente, integração assíncrona e início da implantação em ambiente de produção.

São implementadas:
- Integração com o banco de dados definido na seção de pilha de tecnologias para armazenamento seguro de chamadas, transcrições, scores e metadados (RF07)
- Upload em lote de chamadas (RF05)
- Configuração de dois webhooks para notificação de eventos (ex: conclusão de transcrição e avaliação)
- Sistema de mensageria para orquestração de processos assíncronos
- Endpoints para consulta e exportação de dados, apoiando a geração de indicadores

O backend é integrado ao frontend em desenvolvimento, permitindo a visualização de resultados.

Nesta fase, são executados os testes planejados na Sprint 3:
- Casos de teste detalhados são aplicados, com cobertura total dos requisitos funcionais
- Registros de execução incluem logs, capturas de tela e evidências de sucesso ou falha
- Testes de usabilidade são realizados com usuários externos, com documentação de feedback e sugestões de melhoria
- Resultados são analisados criticamente, com identificação de problemas funcionais e oportunidades de ajuste

É realizada a configuração do ambiente de produção e documentado o processo de deploy. O sistema é preparado para a validação final.

### Sprint 5: Integração Completa, Validação e Entrega Final

Nesta sprint, o sistema é finalizado com integração total entre frontend e backend, validação cruzada e correção de bugs.

São concluídas:
- Geração de score com base nos três critérios definidos (RF02)
- Destaque automático de chamadas com desempenho abaixo do limite (RF06)
- Exposição de dados agregados para o dashboard (RF03)
- Tratamento robusto de erros e logs detalhados

O frontend é totalmente integrado ao backend, com testes de integração validando todas as funcionalidades.

É realizada a validação do MVP:
- Comparação entre a análise automática e a avaliação humana de uma amostra de chamadas
- Correção de bugs e ajustes com base em feedback de professores e parceiro
- Revisão final das especificações técnicas, com atualização de qualquer componente que tenha evoluído

O protótipo é finalizado, documentado e entregue conforme o escopo do projeto.

Em conclusão, a estratégia de entrega para as sprints 3, 4 e 5 assegura o desenvolvimento progressivo e integrado do backend, alinhado ao MVP e às exigências acadêmicas. Cada sprint entrega valor funcional, com foco em qualidade, escalabilidade e integração.

## 3. Canvas do Projeto

&nbsp;&nbsp;&nbsp;&nbsp;Segue abaixo, o Canvas MVP da aplicação web desenvolvido a partir das atividades realizadas durante os encontros com o parceiro e as discussões em grupo.

<div align="center">
<sub>Figura 2.9.1 - Canvas MVP do projeto</sub><br>
<img src="img/canvas_mvp.png"><br>
<sup>Fonte: Material produzido pelos autores (2025) </sup>
</div>

## 2.10 Business Drivers

### 1. Contexto
A **Comgás**, maior distribuidora de gás natural canalizado da América Latina, atende mais de **2,6 milhões de clientes**, com média de **450 novos clientes por dia**.
O atendimento ocorre por múltiplos canais, sendo **94% das interações digitais** (WhatsApp, aplicativo, site e chatbot).

O monitoramento de qualidade das ligações telefônicas hoje é feito por:
- Avaliação direta da nota atribuída pelo cliente.
- Escuta manual de aproximadamente **1% das chamadas**, realizada por analistas de qualidade.

Essa abordagem manual, embora útil, apresenta **baixa cobertura, alto custo relativo e pouca escalabilidade**.

---

### 2. Problema de Negócio
- Cobertura de monitoramento limitada (apenas 1% das ligações).
- Dependência de recursos humanos, dificultando escalabilidade.
- Métricas pouco padronizadas e variáveis entre avaliadores.
- Demora na detecção de problemas de atendimento.
- Risco de queda na qualidade com a rápida expansão da base de clientes.

---

### 3. Necessidade de Mudança
Para manter a qualidade do atendimento e sustentar o crescimento, é necessário **automatizar a escuta e avaliação das chamadas**.
O uso de **Inteligência Artificial (IA)** e **Processamento de Linguagem Natural (NLP)** permitirá:
- Aumentar a amostragem analisada de forma massiva.
- Garantir padronização e consistência de métricas.
- Reduzir o tempo entre a ocorrência e a correção de problemas.
- Manter custos sob controle mesmo com aumento de volume.

---

### 4. Oportunidade
O projeto prevê o desenvolvimento de uma solução **automatizada e escalável** de monitoramento de qualidade, utilizando:
- **Speech-to-Text** para transcrição automática das ligações.
- **NLP** para análise de intenção e cumprimento de roteiro.
- **Análise de sentimento** para medir cordialidade e empatia.
- **Dashboards** para visualização de métricas e alertas.

---

### 5. Fluxos de Negócios Automatizados com Indicadores

#### **Fluxo 1 – Avaliação Automática de Qualidade de Atendimento**
1. Chamada gravada → Transcrição via Speech-to-Text.
2. NLP identifica **intenções**, **cumprimento de roteiro** e **expressões-chave**.
3. Modelo de análise de sentimento classifica cordialidade e empatia.
4. Resultado integrado ao dashboard de Qualidade.

**Indicadores computacionais:**
- Taxa de cumprimento de roteiro (%)
- Índice de cordialidade (escala 0–1)
- Precisão da detecção de intenção (%)
- Tempo médio de processamento por chamada (segundos)

---

#### **Fluxo 2 – Classificação de Chamadas e Detecção de Problemas**
1. Transcrição analisada por modelo de classificação por **tags temáticas** (ex.: “atraso na fatura”, “vazamento de gás”, “reclamação de tarifa”).
2. Identificação automática de **chamadas críticas** (palavras de alto risco, tom agressivo, urgência).
3. Geração de alertas em tempo real para supervisores.

**Indicadores computacionais:**
- Precisão na classificação por tags (%)
- Recall na detecção de chamadas críticas (%)
- Tempo entre detecção e alerta (segundos)
- Redução no tempo de resposta a problemas (%)

---

### 6. Benefícios Estratégicos
1. **Escalabilidade**: aumentar a amostragem analisada de 1% para ≥20% sem aumento de custo.
2. **Eficiência**: substituição parcial do processo manual por automação.
3. **Padronização**: métricas objetivas e consistentes.
4. **Velocidade**: insights em tempo real para ações corretivas.
5. **Integração Omnichannel**: mesma qualidade em interações humanas e digitais.
6. **Conformidade**: anonimização e boas práticas de segurança de dados.

---

### 7. Alinhamento Estratégico
O projeto está alinhado com os pilares corporativos da Comgás:
- **Experiência do Cliente (CX)**: garantir excelência em todos os canais.
- **Inovação e Digitalização**: uso de IA para ganho de eficiência.
- **Sustentabilidade Operacional**: escalar atendimento sem aumento proporcional de custos.


# 3. Requisitos do Projeto

&emsp; Nesta seção é apresentado os requisitos da solução desenvolvida, sendo que os requisitos são divididos em duas classificações: requisitos funcionais (RFs) e requisitos não funcionais (RNFs). Os requisitos funcionais são funcionalidades que o sistema apresenta, já os não funcionais são características para obter qualidade e desempenho na aplicação.

## 3.1 Requisitos Funcionais (RFs)

Nessa seção constam os requisitos funcionais da solução.

<div align="center"> <sub>Tabela 3.1.1 - Requisitos Funcionais</sub><br>

| **ID**   | **User Story (Requisito Funcional)**                                                                                                                       | **Pré-condição**                          | **Procedimento**                                  | **Resultado Esperado**                                                 | **Pós-condição**                                    | **Critérios de Aceite**                                                                                           |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **RF01** | Como usuário, desejo enviar entradas em formato de áudio ou texto, para que o sistema possa processar e avaliar o conteúdo.                                | Acesso ao sistema                         | Submeter uma entrada em áudio ou texto            | Sistema recebe e reconhece o tipo de entrada                           | Entrada registrada para processamento               | Sistema aceita entrada em áudio ou texto e identifica corretamente o tipo da entrada.                             |
| **RF02** | Como usuário, desejo receber três critérios de avaliação com notas de 0 a 5 para cada chamada, para compreender a qualidade do atendimento.                | Entrada processada                        | Solicitar a avaliação após o processamento        | Sistema exibe três critérios de avaliação com notas 0 a 5              | Avaliação armazenada junto à chamada                | Avaliação retorna 3 critérios com notas entre 0 e 5, e dados são armazenados corretamente.                        |
| **RF03** | Como gestor, desejo visualizar um painel com indicadores gerais de atendimento, para obter uma visão consolidada da performance.                           | Dados processados e avaliados disponíveis | Acessar o painel de indicadores                   | Sistema exibe gráficos e métricas consolidadas                         | Visualização registrada no log de acessos           | Painel mostra indicadores consolidados, gráficos atualizados e acesso ao painel é registrado.                     |
| **RF04** | Como usuário, preciso que o sistema identifique automaticamente se a entrada recebida é áudio ou texto, para aplicar o processamento adequado a cada tipo. | Entrada enviada pelo usuário              | Enviar áudio e, em seguida, texto                 | Sistema classifica corretamente o tipo da entrada                      | Tipo da entrada registrado                          | Entrada é classificada com 100% de assertividade e o fluxo correto é acionado para cada tipo.                     |
| **RF05** | Como usuário, desejo realizar o upload de múltiplas chamadas simultaneamente, para otimizar o envio e análise em lote.                                     | Acesso à funcionalidade de upload         | Selecionar e enviar mais de um arquivo de chamada | Sistema aceita múltiplos arquivos e os coloca na fila de processamento | Chamadas registradas individualmente para análise   | Sistema aceita uploads múltiplos simultâneos sem erro, e cada chamada é registrada separadamente.                 |
| **RF06** | Como gestor, desejo que o sistema destaque chamadas com desempenho abaixo de um limite definido, para facilitar a identificação de problemas.              | Chamadas avaliadas e notas registradas    | Definir limite e acessar lista de chamadas        | Chamadas com desempenho abaixo do limite aparecem destacadas           | Destaques registrados no histórico de visualização  | Chamadas abaixo do limite configurado são claramente destacadas visualmente e histórico de destaque é registrado. |
| **RF07** | Como usuário preciso que o sistema armazene os dados de cada chamada processada, para manter o histórico e possibilitar consultas futuras.                 | Chamada processada                        | Concluir o processamento de uma chamada           | Dados da chamada (entrada, notas e metadados) armazenados com sucesso  | Registro disponível no banco de dados para consulta | Dados da chamada ficam disponíveis para consulta, com integridade e sem perdas.                                   |

<sup>Fonte: Material produzido pelos autores (2025)</sup>

</div>

## 3.2 Requisitos Não Funcionais (RNFs)

Nessa seção constam os requisitos não funcionais da solução.

<div align="center"> <sub>Tabela 3.2.1 - Requisitos Não Funcionais</sub><br>

| Requisito                                                                                                                          | Teste Necessário                                                                                | Pré-condição                                                                  | Procedimento                                                                                                  | Resultado Esperado                                                      | Pós-condição                                                 | Critérios de Aceitação                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| **RNF01 - Suporte a Arquivos Longos**<br>O sistema deve aceitar e processar arquivos de áudio com até 75 minutos de duração.       | Testar upload e processamento de áudios de até 75 minutos.                                      | Sistema com módulo de transcrição funcional.                                  | Realizar upload de áudios com durações variadas (30, 60, 75 min) e validar transcrição completa.              | Sistema processa o áudio de até 75 min sem falhas ou interrupções.      | Transcrição gerada com sucesso e disponível para análise.    | O sistema deve suportar arquivos de até **75 minutos**, garantindo completude da transcrição.                                      |
| **RNF02 - Desempenho de Transcrição**<br>Transcrições de até 15 minutos devem ser concluídas entre 2 e 5 minutos em 90% dos casos. | Medir tempo de transcrição em diversos áudios de até 15 minutos.                                | Ambiente estável e sem sobrecarga.                                            | Cronometrar o tempo de resposta para transcrição de diferentes áudios e registrar estatísticas de desempenho. | Transcrição concluída entre 2 e 5 minutos em pelo menos 90% dos testes. | Transcrição disponível dentro do tempo esperado.             | O sistema deve atender ao tempo de transcrição de **2 a 5 minutos** para **90% da demanda** com áudios de até 15 minutos.          |
| **RNF03 - Precisão na Detecção de Intenção**<br>O sistema deve identificar corretamente pelo menos 90% das intenções em chamadas.  | Testar a detecção de intenções com base em um conjunto validado de áudios anotados manualmente. | Base de áudios rotulada com intenções (elogios, reclamações, palavrões etc.). | Comparar as detecções automáticas com os rótulos manuais e calcular acurácia.                                 | Precisão ≥ 90% na identificação das intenções.                          | Intenções extraídas corretamente e classificadas no sistema. | O sistema deve garantir **acurácia mínima de 90%** na detecção de intenções e expressões em chamadas, com base em dados validados. |

<sup>Fonte: Material produzido pelos autores (2025)</sup>

</div>

## 3.3 Correlação RFs e RNFs

<div align="center"> <sub>Tabela 3.3.1 - Correlação entre RFs e RNFs</sub><br>

| **Requisito Funcional (RF)**                                 | **RNF01 - Suporte a Arquivos Longos** | **RNF02 - Desempenho de Transcrição** | **RNF03 - Precisão na Detecção de Intenção** | **Justificativa**                                                                                                            |
| ------------------------------------------------------------ | ------------------------------------- | ------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **RF01** – Enviar entradas em áudio ou texto                 | ✅                                    | ✅                                    | ✅                                           | Necessita suportar áudios longos (RNF01), processar no tempo esperado (RNF02) e identificar corretamente a intenção (RNF03). |
| **RF02** – Receber três critérios de avaliação               | ⬜                                    | ⬜                                    | ✅                                           | Avaliação depende da precisão da detecção de intenção para gerar notas corretas.                                             |
| **RF03** – Visualizar painel de indicadores                  | ⬜                                    | ⬜                                    | ✅                                           | Indicadores refletem a precisão da detecção de intenções, garantindo métricas confiáveis.                                    |
| **RF04** – Identificar automaticamente áudio ou texto        | ⬜                                    | ✅                                    | ✅                                           | Precisa identificar rápido o tipo de entrada (RNF02) e classificar intenções com acurácia (RNF03).                           |
| **RF05** – Upload múltiplo de chamadas                       | ✅                                    | ✅                                    | ⬜                                           | Necessita suportar áudios longos (RNF01) e manter bom desempenho de processamento (RNF02).                                   |
| **RF06** – Destacar chamadas com desempenho abaixo do limite | ⬜                                    | ⬜                                    | ✅                                           | Depende da precisão da detecção para identificar corretamente chamadas problemáticas.                                        |
| **RF07** – Armazenar dados de cada chamada                   | ✅                                    | ⬜                                    | ✅                                           | Deve armazenar arquivos longos (RNF01) e manter registro fiel das intenções detectadas (RNF03).                              |

<sup>Fonte: Material produzido pelos autores (2025)</sup>

</div>

## 3.4 Casos de Uso

_conteúdo_

## 3.5 Casos de Uso x Requisitos Funcionais

_conteúdo_

# 4. Modelagem de Dados

## 4.1. Modelagem conceitual

<div align="center">
<sub>Figura 4.1.1 - Modelagem Conceitual</sub><br>
<img src="img/modelagem_conceitual.png" width="80%"><br>
<sup>Fonte: Material produzido pelos autores (2025) </sup>
</div>

### 4.1.1. Identificação das Entidades

1. **CLIENTE**  
   Representa a pessoa que realizou uma chamada no sistema. Cada cliente pode estar associado a diversas chamadas registradas.

2. **ATENDENTE**  
   Entidade que descreve o profissional responsável por atender a chamada. Um atendente pode realizar múltiplos atendimentos ao longo do tempo.

3. **CHAMADA**  
   Entidade central que registra cada ligação realizada entre um Cliente e um Atendente.  
   Armazena a data/hora de criação, a avaliação do atendimento (em formato JSON), a nota de qualidade atribuída e a transcrição da conversa (também em JSON).  
   Cada chamada está associada a **um único Cliente** e a **um único Atendente**, mas tanto Cliente quanto Atendente podem estar vinculados a várias chamadas diferentes.

---

### 4.1.2. Estabelecimento das Relações

1. **CLIENTE** – **CHAMADA**  
   - Relação **1:N** (um Cliente pode realizar várias chamadas).  
   - Do ponto de vista do banco de dados, `CHAMADA` contém a chave estrangeira `cliente_id` que aponta para `CLIENTE.cliente_id`.  
   - Exemplo: um mesmo Cliente pode ligar diversas vezes em dias diferentes, cada ligação sendo registrada como uma nova CHAMADA.

2. **ATENDENTE** – **CHAMADA**  
   - Relação **1:N** (um Atendente pode atender diversas chamadas).  
   - `CHAMADA` contém a chave estrangeira `atendente_id` que aponta para `ATENDENTE.atendente_id`.  
   - Exemplo: o mesmo Atendente pode atender clientes diferentes ao longo do expediente, gerando vários registros de CHAMADA.

---

### 4.1.3. Fluxo Geral

- Um **CLIENTE** é a pessoa que entra em contato com o sistema realizando chamadas. Ele é identificado unicamente por seu `cliente_id` e pode originar diversas chamadas ao longo do tempo.  

- Um **ATENDENTE** é o profissional responsável por receber e conduzir as chamadas realizadas pelos Clientes. Cada Atendente pode atender vários Clientes diferentes em momentos distintos.  

- Cada **CHAMADA** é um registro histórico que descreve a interação entre Cliente e Atendente. A chamada contém a data/hora em que ocorreu (`createdAt`), a avaliação realizada (em formato JSON), a **nota de qualidade** atribuída e o **transcript** da conversa armazenado em JSON.  

- O relacionamento entre as entidades garante que uma chamada sempre esteja vinculada a **um único Cliente** e a **um único Atendente**, permitindo análises posteriores sobre desempenho, qualidade do atendimento e histórico de interações.

---

### 4.1.4. Sobre a Modelagem Lógica

Embora o modelo conceitual represente três entidades distintas (**CLIENTE**, **ATENDENTE** e **CHAMADA**) para facilitar o entendimento das relações e do fluxo de dados, na implementação prática essa separação não será mantida.

Devido a restrições legais e de conformidade com a **LGPD (Lei Geral de Proteção de Dados)**, o sistema **não armazenará informações de identificação pessoal de Clientes ou Atendentes**.  
Assim, na **modelagem lógica e física** do banco de dados, todos os registros estarão consolidados em uma única tabela **CHAMADA**, contendo apenas os dados necessários para auditoria, análise de qualidade e histórico de interações (por exemplo: `chamada_id`, `createdAt`, `avaliacao_json`, `nota_qualidade`, `transcript_json`).  

Dessa forma, garantimos a integridade do modelo conceitual para fins acadêmicos e de documentação, ao mesmo tempo em que respeitamos os limites legais na modelagem real do projeto.



## 4.2 Modelo Lógico de Dados

_conteúdo_

## 4.3 Modelo Físico de Dados

_conteúdo_

**Nota:** Insira uma explicação e direcionamento para o readme.md da pasta database.

# 5. Solução Técnica (Design)

Esta seção busca mostrar os diagramas que vão compor a solução final.

## 5.1 Diagrama de Classes

&emsp; Um Diagrama de Classes UML é essencial para a identificação das principais entidades de uma aplicação, seus atributos, métodos e relacionamentos. Esse tipo de diagrama permite visualizar como cada classe interage com as demais.

&emsp; A seguir, apresenta-se o Diagrama de Classes para o sistema de gestão de chamadas, transcrições e avaliações de atendimento.

<div align="center">
<sub>Figura 5.1.1 - Diagrama de Classes</sub><br>
<img src="img/section5/diagrama-de-classes.png" width="80%"><br>
<sup>Fonte: Material produzido pelos autores (2025) </sup>
</div>

| Classe | Descrição |
| :--- | :--- |
| **Cliente** | Representa o cliente que realiza chamadas. Contém informações básicas como `id`, `nome` e `telefone`, e o método `fazerLigacao` para iniciar uma chamada. |
| **Chamada** | Registra os dados de cada chamada, incluindo `tipoEntrada`, `conteudo`, `duracao` e `dataHora`. Possui métodos para `receberEntrada`, `identificarTipoEntrada` e `registrar`. Serve como base para a transcrição e checklist. |
| **Checklist** | Classe responsável pelo acompanhamento do atendimento. Possui atributos booleanos como `iniciarChamada`, `entenderProblema`, `resolverProblema` e `finalizarAtendimento`. Inclui o método `validarChecklist` e mantém correlação com a **Avaliacao**. |
| **Avaliacao** | Representa a avaliação do atendimento baseada no checklist, incluindo critérios numéricos (`criterio1`, `criterio2`, `criterio3`), `notaFinal` e flags de acompanhamento (`problemaResolvido`, `duracaoAtingiuLimite`). Possui o método `calcularNotaFinal`. |
| **Transcricao** | Classe responsável por processar entradas de áudio. Contém o método `transcrever` que recebe um arquivo de áudio e retorna a transcrição em formato de string. |

### **Relacionamentos Entre as Classes**

1. **Cliente → Chamada**
   - O Cliente realiza uma Chamada, iniciando o fluxo de atendimento. Essa etapa, o usuário vai imputar os dados da chamada que já ocorreu.
   <br>

2. **Chamada → Checklist**
   - A Chamada mantém uma correlação com o Checklist, permitindo acompanhar o progresso do atendimento.
   <br>

3. **Checklist → Avaliacao**
   - O Checklist serve como base para gerar uma Avaliacao do atendimento, calculando a nota final e verificando se os critérios foram cumpridos.
   <br>

4. **Chamada → Transcricao**
   - A Chamada utiliza a classe Transcricao quando a entrada é do tipo áudio, convertendo o áudio em texto para análise posterior.


## 5.2 Diagrama de Componentes da UML

&emsp; Um Diagrama de Componentes UML é essencial para a identificação dos principais módulos de uma aplicação, seus relacionamentos e suas responsabilidades dentro de uma arquitetura de software. Esse tipo de diagrama permite visualizar, de forma modular, como cada parte do sistema se comunica, garantindo organização, coesão e clareza estrutural.

&emsp; A seguir, apresenta-se o Diagrama de Componentes para o sistema de análise automática de transcrições de áudios.

<div align="center">
<sub>Figura 5.2.1 - Diagrama de Componentes </sub><br>
<img src="img/section5/diagrama_componentes.png" width="80%"><br>
<sup>Fonte: Material produzido pelos autores (2025) </sup>
</div>

| Componente                                         | Descrição                                                                                                                                                  |
| :------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Aplicação Monolítica**                           | Representa o sistema centralizado que integra todos os componentes internos para fornecer as funcionalidades de transcrição e análise de áudio.            |
| **Frontend**                                       | Interface web que permite ao operador fazer o upload dos arquivos de áudio, visualizar as transcrições e os resultados da análise de intenção.             |
| **Backend**                                        | Responsável por receber as requisições do frontend, gerenciar a lógica de negócio, orquestrar o processamento dos dados e persistir as informações.        |
| **Banco de Dados (PostgreSQL)**                    | Armazena os dados da aplicação, como informações dos arquivos de áudio, as transcrições geradas e os resultados da análise (reclamações, elogios, etc.).   |
| **Modelo de Processamento de Dados (API Interna)** | Componente interno que realiza a transcrição do áudio e se comunica com serviços externos para identificar as intenções do cliente no texto transcrito.    |
| **API Externa (ChatGPT/Gemini)**                   | Serviço de IA externo utilizado pelo Modelo de Processamento para analisar o texto da transcrição e identificar com alta precisão as intenções do cliente. |

### **Divisão interna da Aplicação Monolítica**

O **Frontend** permite a interação do usuário final com a aplicação, garantindo a usabilidade para os operadores. Dentro do mesmo sistema, o **Backend** gerencia as requisições, coordena o fluxo de trabalho e interage diretamente com o **Banco de Dados (PostgreSQL)** para persistência. Quando uma análise é solicitada, o Backend aciona o **Modelo de Processamento de Dados**, que atua como uma API interna. Este modelo, por sua vez, consome a **API Externa (ChatGPT/Gemini)** para realizar a análise de sentimento e intenção, garantindo a segurança ao não expor dados sensíveis diretamente.

### **Relacionamentos Entre os Componentes**

1.  **Frontend** → **Backend**

    - O Frontend envia requisições do usuário (como upload de áudio) para o Backend via chamadas HTTP/JSON.
      <br>

2.  **Backend** ↔ **Banco de Dados (PostgreSQL)**

    - O Backend lê e grava informações no Banco de Dados, como o estado do processamento e os resultados da análise, garantindo a persistência dos dados.
      <br>

3.  **Backend** → **Modelo de Processamento de Dados (API Interna)**

    - O Backend invoca o Modelo de Processamento através de uma chamada de função interna para iniciar a análise de um arquivo de áudio.
      <br>

4.  **Modelo de Processamento de Dados** → **API Externa (ChatGPT/Gemini)**
    - O Modelo de Processamento envia o texto transcrito para a API Externa para obter a análise de intenção e sentimento.
      <br>

## 5.3 Diagramas de Sequência da UML

&emsp; Um Diagrama de Sequência UML é essencial para entender o fluxo temporal de interações entre os componentes de um sistema durante a execução de um processo. Este tipo de diagrama permite visualizar a ordem das mensagens trocadas, os responsáveis por cada ação e como os dados são processados ao longo do fluxo.

&emsp; A seguir, apresenta-se o Diagrama de Sequência para o fluxo de avaliação de chamadas.

<div align="center">
<sub>Figura 5.3.1 - Diagrama de Sequência </sub><br>
<img src="img/section5/diagrama-de-sequencia.png" width="80%"><br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

| Elemento | Descrição |
| :--- | :--- |
| **Cliente** | Inicia o processo enviando uma entrada, que pode ser um áudio ou texto, para avaliação. |
| **Frontend** | Recebe a entrada do cliente, envia os dados para o backend via HTTP/JSON e exibe o resultado final da avaliação. |
| **Backend** | Gerencia o fluxo do processamento, encaminhando o áudio ou texto para o modelo de processamento e gerando registros no banco de dados. |
| **Modelo de Processamento** | Processa a entrada de áudio convertendo-a em texto (quando necessário) e envia a transcrição ou texto ao backend. |
| **Banco de Dados (PostgreSQL)** | Persiste informações da chamada, checklist e avaliação, garantindo rastreabilidade e histórico do fluxo. |
| **API Externa (ChatGPT/Gemini)** | Recebe a transcrição e realiza a análise de intenção do texto, retornando os resultados ao backend. |
| **Checklist** | Cria um checklist da chamada baseado nos dados recebidos para auxiliar na avaliação. |
| **Avaliação** | Gera a avaliação final com base no checklist e retorna o resultado ao backend, que envia ao frontend para exibição ao cliente. |


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

