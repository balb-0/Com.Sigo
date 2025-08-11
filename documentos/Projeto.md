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
  - [2.7 Matriz SWOT](#26-matriz-swot)
  - [2.8 Ideação](#27-ideação)
  - [2.9 Canvas do Projeto](#28-canvas-do-projeto)
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

_conteúdo_

## 2.5.1 Cadeia de Valor

_conteúdo_

## 2.5.2 Fluxo de Negócio Proposto (AS-IS e TO-BE)

_conteúdo_

## 2.6 Matriz de Risco do Projeto

_conteúdo_

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

_conteúdo_
Obs.: Seção dedicada a discussão sobre ideias e priorização de features.

## 2.9 Canvas do Projeto

_conteúdo_

# 3. Requisitos do Projeto

&emsp; Nesta seção é apresentado os requisitos da solução desenvolvida, sendo que os requisitos são divididos em duas classificações: requisitos funcionais (RFs) e requisitos não funcionais (RNFs). Os requisitos funcionais são funcionalidades que o sistema apresenta, já os não funcionais são características para obter qualidade e desempenho na aplicação.

## 3.1 Requisitos Funcionais (RFs)

Nessa seção constam os requisitos funcionais da solução.

<div align="center"> <sub>Tabela 3.1.1 - Requisitos Funcionais</sub><br>

| **ID**   | **User Story (Requisito Funcional)**                                                                                                                                                                                                                                                                   | **Pré-condição**                         | **Procedimento**                                       | **Resultado Esperado**                                        | **Pós-condição**                                      | **Critérios de Aceite**                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **RF01** | Como usuário, desejo enviar entradas em formato de áudio ou texto, para que o sistema possa processar e avaliar o conteúdo.                                                                                                                                                                             | Acesso ao sistema                      | Submeter uma entrada em áudio ou texto                  | Sistema recebe e reconhece o tipo de entrada                   | Entrada registrada para processamento                | Sistema aceita entrada em áudio ou texto e identifica corretamente o tipo da entrada.                                    |
| **RF02** | Como usuário, desejo receber três critérios de avaliação com notas de 0 a 5 para cada chamada, para compreender a qualidade do atendimento.                                                                                                                                                            | Entrada processada                     | Solicitar a avaliação após o processamento              | Sistema exibe três critérios de avaliação com notas 0 a 5       | Avaliação armazenada junto à chamada                  | Avaliação retorna 3 critérios com notas entre 0 e 5, e dados são armazenados corretamente.                                 |
| **RF03** | Como gestor, desejo visualizar um painel com indicadores gerais de atendimento, para obter uma visão consolidada da performance.                                                                                                                                                                       | Dados processados e avaliados disponíveis | Acessar o painel de indicadores                          | Sistema exibe gráficos e métricas consolidadas                  | Visualização registrada no log de acessos              | Painel mostra indicadores consolidados, gráficos atualizados e acesso ao painel é registrado.                              |
| **RF04** | Como usuário, preciso que o sistema identifique automaticamente se a entrada recebida é áudio ou texto, para aplicar o processamento adequado a cada tipo.                                                                                                                                                             | Entrada enviada pelo usuário          | Enviar áudio e, em seguida, texto                        | Sistema classifica corretamente o tipo da entrada               | Tipo da entrada registrado                            | Entrada é classificada com 100% de assertividade e o fluxo correto é acionado para cada tipo.                             |
| **RF05** | Como usuário, desejo realizar o upload de múltiplas chamadas simultaneamente, para otimizar o envio e análise em lote.                                                                                                                                                                                 | Acesso à funcionalidade de upload     | Selecionar e enviar mais de um arquivo de chamada       | Sistema aceita múltiplos arquivos e os coloca na fila de processamento | Chamadas registradas individualmente para análise    | Sistema aceita uploads múltiplos simultâneos sem erro, e cada chamada é registrada separadamente.                         |
| **RF06** | Como gestor, desejo que o sistema destaque chamadas com desempenho abaixo de um limite definido, para facilitar a identificação de problemas.                                                                                                                                                         | Chamadas avaliadas e notas registradas | Definir limite e acessar lista de chamadas               | Chamadas com desempenho abaixo do limite aparecem destacadas   | Destaques registrados no histórico de visualização   | Chamadas abaixo do limite configurado são claramente destacadas visualmente e histórico de destaque é registrado.         |
| **RF07** | Como usuário preciso que o sistema armazene os dados de cada chamada processada, para manter o histórico e possibilitar consultas futuras.                                                                                                                                                                            | Chamada processada                    | Concluir o processamento de uma chamada                  | Dados da chamada (entrada, notas e metadados) armazenados com sucesso | Registro disponível no banco de dados para consulta | Dados da chamada ficam disponíveis para consulta, com integridade e sem perdas.                                           |

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
