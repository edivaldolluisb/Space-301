# 🚀 Space301 - Sistema de Monitoramento de Lançamentos Espaciais

Bem-vindo ao **Space301**! Este projeto é um sistema de monitoramento em tempo real de foguetoes, focado em fornecer dados cruciais durante os lançamentos espaciais. Ele inclui desde o acompanhamento dos parâmetros do foguete até a análise dos sinais vitais da tripulação a bordo.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Uso](#uso)
- [Autores](#autores)

## 🌌 Sobre o Projeto

O **Space301** foi desenvolvido para atender à necessidade de monitoramento completo de lançamentos espaciais, garantindo uma interface para engenheiros, operadores e o público em geral acompanhar os lançamentos em tempo real. Ele inclui:
- Monitoramento de dados em tempo real como velocidade, aceleração e temperatura.
- Sistema de alertas quando parâmetros estão fora do padrão.
- Monitoramento da tripulação, integridade do foguete e da carga.
- Acesso a estatísticas de lançamentos anteriores para análise.

## ✨ Funcionalidades

- **Monitoramento em Tempo Real**: Velocidade, aceleração, combustível, temperatura e muito mais.
- **Alertas Automáticos**: Notificações para parâmetros fora dos padrões seguros.
- **Análise do Histórico de Lançamentos**: Dados históricos e relatórios de desempenho.
- **Monitoramento de Tripulação**: Sinais vitais dos tripulantes a bordo.
- **Acompanhamento Público**: Gráficos e informações em tempo real para o público.

## 🛠️ Instalação

### Pré-requisitos


### Passos


## 🚀 Uso

  
### Exemplos de Endpoints


## 👨‍🚀 Autores

- **Shelton Agostinho** - 115697
    > **Role:** Product owner
- **Edivaldo Bonfim** - 110124
    > **Role:** Architect
- **Giovanni Santos** - 115637
    > **Role:** DevOps master
- **Rafael Semedo** - 115665
    > **Role:** Team manager

---

# Backlog - Empresa de Exploração Espacial

## 1. Acesso aos dados históricos dos lançamentos
**User Story**:  
**Como** engenheiro de dados, **quero** acessar os dados do histórico dos lançamentos anteriores, **para** que possa analisar o desempenho dos foguetões e detetar padrões que possam melhorar próximos lançamentos.  

**Critérios de Aceitação**:
- Acesso aos dados em formato JSON.
- Filtros por missão, tipo de foguete e parâmetros específicos.
- Ferramentas de visualização de padrões em gráficos e tabelas.

---

## 2. Análises do foguete em tempo real
**User Story**:  
**Como** engenheiro da missão, **quero** realizar análises do foguete em tempo real, como parâmetros, nível de integridade e estados da tripulação/carga, **para** que possa ser feita a análise do desempenho ou para uso na manutenção.  

**Critérios de Aceitação**:
- Visualização em tempo real dos principais parâmetros e estados.
- Alertas automáticos em caso de discrepância em dados.
- Acesso a dados históricos e em tempo real para comparação.

---

## 3. Gerenciamento de permissões dos usuários
**User Story**:  
**Como** administrador de sistemas, **quero** gerenciar e definir permissões dos usuários, **para** que apenas as pessoas autorizadas possam ver e modificar os dados do lançamento.  

**Critérios de Aceitação**:
- Interface para gerenciamento de usuários e permissões.
- Definição de permissões por grupo (Admin, Operador, Visualizador).

---

## 4. Acompanhamento de lançamentos para o público
**User Story**:  
**Como** público, **quero** acompanhar os lançamentos dos foguetes através de gráficos que mostrem os parâmetros, **para** entender mais sobre os lançamentos e entretenimento.  

**Critérios de Aceitação**:
- Gráficos em tempo real com informações como velocidade, altitude e combustível.
- Interface simples e acessível.
- Atualizações automáticas durante o lançamento.

---

## 5. Estatísticas financeiras de lançamentos *
**User Story**:  
**Como** gerente de projeto, **quero** traçar estatísticas de lançamentos com base nos gastos e perdas, **para** fornecer feedback financeiro.  

**Critérios de Aceitação**:
- Relatório de gastos por missão, com gráficos detalhados.
- Comparação de custos entre lançamentos e identificação de tendências.

---

## 6. Monitoramento de sinais vitais em tempo real
**User Story**:  
**Como** médico de missão, **quero** monitorar em tempo real os sinais vitais da tripulação, **para** ver se as condições atuais da nave encontram-se estáveis.  

**Critérios de Aceitação**:
- Exibição contínua dos sinais vitais (frequência cardíaca, pressão arterial, etc.).
- Alertas automáticos em caso de sinais fora do padrão.
- Histórico de sinais vitais com comparação a períodos anteriores da missão.

---

## 7. Monitoramento do estado de sinal entre foguete e base
**User Story**:  
**Como** equipe de comunicação, **quero** monitorar o estado de sinal entre o foguete e a base, **para** garantir que a comunicação permaneça estável.  

**Critérios de Aceitação**:
- Exibição da qualidade do sinal em tempo real.
- Alertas automáticos sobre possíveis quedas de comunicação.

---

## 8. Receber dados de avisos para emergências
**User Story**:  
**Como** equipe de resposta a emergências, **queremos** receber os dados dos avisos quando os parâmetros estão fora do padrão, **para** poder elaborar as medidas necessárias e comunicar aos tripulantes.  

**Critérios de Aceitação**:
- Sistema de alerta que notifica automaticamente a equipe de emergência.
- Detalhamento de parâmetros anômalos e causas potenciais.
- Acesso rápido ao histórico de alertas para diagnóstico.

---

## 9. Monitoramento do primeiro estágio do foguete
**User Story**:  
**Como** engenheiro da missão, **quero** monitorar o “primeiro estágio” que vai ser separado do foguete principal, **para** ver se este pode ser reutilizado para futuros lançamentos.  

**Critérios de Aceitação**:
- Monitoramento da integridade do primeiro estágio após a separação.
- Localização em tempo real e status do estágio.
- Registro de histórico de reutilizações.

---

# Parâmetros a Monitorar
1. Velocidade
2. Aceleração
3. Quantidade de combustível
4. Taxa de combustão
5. Temperaturas dos motores
6. Níveis de oxigênio (combustão e tripulação)
7. Energia elétrica (gerada e armazenada)
8. Mantimentos (para tripulação)
9. Qualidade do sinal transmitido
10. Temperatura interna e externa da nave
11. Pressão interna e externa da nave
12. Altitude da nave (em relação ao nível do mar)
13. Dimensão da nave
14. Força G no interior da nave
15. Nível de radiação
16. Pressao arterial
17. Niveis de oxigeneo no sangue
18. Frequencia cardiaca

# Tabela de Requisitos - Empresa de Exploração Espacial

| ID   | User Story / Requisito | Descrição | Estimativa | Prioridade | Responsável | Critérios de Aceitação | Status |
|------|------------------------|-----------|------------|------------|-------------|------------------------|--------|
| R01 | **Monitoramento em tempo real de foguetes lançados** | Permitir a visualização dos parâmetros do foguete em tempo real. |  | Alta | N/A | Interface que exibe parâmetros como velocidade, altitude e aceleração. Atualização em tempo real. | Não Iniciado |
| R02  | **Sistema de alertas para parâmetros fora do padrão** | Notificações automáticas para avisar quando parâmetros de voo estiverem fora dos limites estabelecidos. |  | Alta | N/A | Notificações configuráveis para alertar sobre velocidade, temperatura e combustível fora dos padrões. | Não Iniciado |
| R03 | **Monitoramento de sinais vitais da tripulação** | Monitorar em tempo real os sinais vitais da tripulação (em caso de presença de humanos a bordo). |  | Alta | N/A | Monitoramento contínuo de sinais como frequência cardíaca e pressão arterial. Alertas automáticos. | Não Iniciado |
| R04  | **Monitoramento do estado da carga** | Acompanhar as condições da carga transportada durante o voo. |  | Média | N/A | Exibição da temperatura e pressão da carga. Alertas em caso de falha de integridade. | Não Iniciado |
| R05  | **Trajetória completa do lançamento** | Fornecer uma visualização detalhada da trajetória em 2D durante o lançamento. |  | Alta | N/A | Trajetória em tempo real, altitude, velocidade e rota simulada. | Não Iniciado |
| R06  | **Histórico de lançamentos** | Exibir informações e estatísticas dos lançamentos anteriores para análise. |  | Média | N/A | Histórico com filtros por data, tipo de foguete, e tripulação. Estatísticas automáticas de desempenho. | Não Iniciado   |
| R07  | **Localização e status das estações de lançamento** | Mostrar a localização e condições das estações de lançamento no mapa. |  | Baixa | N/A | Mapa global com status da estação, incluindo condições meteorológicas e prontidão para o lançamento. | Não Iniciado   |
| R08  | **Monitoramento da integridade da nave** | Monitorar a integridade física da nave durante o voo. |  | Alta | N/A  | Exibição de dados sobre danos e temperatura externa. Alertas automáticos em caso de falha. | Não Iniciado   |
| R09  | **Login e permissões dos membros da missão** | Permitir login seguro e gerenciamento de permissões para diferentes níveis de acesso. |  | Baixa | N/A | Diferentes níveis de acesso (admin, operador, visualizador). | Não Iniciado |
| R10  | **Monitoramento de estágios reutilizáveis** | Acompanhar os estágios do foguete que se separam e que podem ser reutilizados. |  | Baixa | N/A | Monitoramento de localização e integridade dos estágios reutilizáveis. | Não Iniciado   |
| R11  | **Dashboard dentro da nave** | Interface dentro da nave para monitorar parâmetros críticos do voo. |  | Baixa | N/A | Exibição de dados críticos como velocidade, combustível e temperatura. | Não Iniciado |
| R12  | **Acesso aos dados históricos de lançamentos** | Acesso aos dados de lançamentos anteriores para análise e identificação de padrões. |  | Média | N/A | Acesso a dados JSON com ferramentas de visualização e gráficos. | Não Iniciado |
| R13  | **Análise do foguete em tempo real** | Permitir análise em tempo real dos parâmetros do foguete, nível de integridade e estados da tripulação e carga. |  | Alta | N/A | Visualização contínua e alertas automáticos para parâmetros fora do normal. | Não Iniciado |
| R14  | **Acompanhamento público de lançamentos** | Permitir que o público acompanhe os lançamentos em tempo real através de gráficos e dados. |  | Média | N/A | Exibição pública de gráficos com dados em tempo real (velocidade, altitude, posicao). | Não Iniciado |
| R15  | **Monitoramento de sinais vitais em tempo real** | Monitorar sinais vitais da tripulação durante o voo. |  | Alta | N/A | Monitoramento contínuo de sinais vitais, com alertas automáticos se necessário. | Não Iniciado |
| R16  | **Monitoramento do sinal de comunicação** | Acompanhar o estado de comunicação entre o foguete e a base. |  | Alta | N/A | Monitoramento contínuo da qualidade do sinal e alertas de queda de comunicação. | Não Iniciado   |
| R17  | **Receber dados de emergência para resposta rápida** | Receber avisos automáticos de problemas nos parâmetros para rápida resposta de emergência. |  | Alta | N/A | Sistema de alerta que notifica automaticamente e detalha causas de anomalias. | Não Iniciado |
| R18  | **Monitoramento do primeiro estágio do foguete após separação** | Acompanhar a separação e a integridade do primeiro estágio do foguete para possível reutilização. |  | Alta | N/A | Monitoramento em tempo real da separação e integridade do primeiro estágio. Histórico de reutilizações. | Não Iniciado |

---

### Legenda:

- **ID**: Identificador único do requisito.
- **User Story / Requisito**: Breve descrição da funcionalidade ou necessidade.
- **Descrição**: Explicação mais detalhada do requisito.
- **Prioridade**: Classificação de importância do requisito (Alta, Média, Baixa).
- **Responsável**: A equipe ou pessoa responsável pelo desenvolvimento do requisito.
- **Critérios de Aceitação**: Requisitos mínimos que devem ser atendidos para o requisito ser considerado completo.
- **Status**: O andamento atual do requisito (Não Iniciado, Em Progresso, Concluído).
