# Interação entre Equipe e Clientes

## Composição da equipe

| Papel | Descrição | Responsável | Participantes |
| :--- | :--- | :--- | :--- |
| **Gerente do Projeto** | Coordena o projeto, garante a comunicação entre cliente e equipe, controla prazos e entrega. | Pedro Américo | Gabriel Diniz e João |
| **Desenvolvedor Frontend** | Responsável pela interface do usuário, design e implementação das funcionalidades do lado do cliente. | João Cruz | Gustavo Abrantes, Giovanna e Gabriel Diniz |
| **Desenvolvedor Backend** | Implementa a lógica de negócios, integração com banco de dados e APIs. | Matheus Lemes | Pedro Américo |
| **Analista QA** | Garante a qualidade do produto, executando testes de funcionalidades, performance e usabilidade. | Gabriel Diniz | **TODOS** |
| **Analista de Requisitos** | Define os requisitos funcionais (RF) e não funcionais (RNF) do sistema e garante que eles sejam atendidos. | Giovana | **TODOS** |

## Comunicação 

As ferramentas de comunicação são essenciais para que a equipe desenvolvimento possa se comunicar entre si, mais não só isso, são indispensáveis para uma boa interação e comunicação efetiva com os clientes do projeto, garantindo um melhor entendimento do projeto de ambas as partes. Tendo isso em mente, as ferramentas selecionadas foram as seguintes: 

### Comunicação com o cliente: 

- **Ferramenta principal:** As reuniões de revisão e planejamento das etapas com o cliente serão realizadas por vídeo conferência, utilizando o Google meet. Essas reuniões permitirão a validação das entregas, coleta de feedback e discussões sobre as próximas atividades. 
    - **Frequência e Método:** O cliente estará diretamente envolvido nas revisões e entregas de cada ciclo, validando entregas e fornecendo feedback. Durante a fase de planejamento de requisitos e User Design o grupo terá reuniões constantes com o cliente, e durante a fase de desenvolvimento o foco será em validações e feedback, ocorrendo no início e fim de cada sub iteração da construção.
- **Ferramenta secundária:** Utilizaremos o whatsapp como meio rápido de comunicação informal para comunicações mais eficientes. 

### Comunicação entre membros da equipe: 

- **Ferramenta principal:** Entre os membros da equipe, serão usadas duas ferramentas principais, sendo: 	 
    - **Microsoft Teams:** Utilizado para reuniões de planejamento, acompanhamento e validação com o cliente. 
    - **WhatsApp:** Usado para alinhamentos rápidos e diários da equipe de desenvolvimento. 
- **Frequência e Método:**
    - **Reuniões internas da equipe:** Encontros curtos, realizados conforme necessidade, para sincronizar atividades, discutir impedimentos e planejar os próximos passos. 
    - **Reunião de revisão geral:** Ao final de cada ciclo de desenvolvimento, a equipe revisa as entregas, analisa os aprendizados e define melhorias para os próximos ciclos.

## Processo de Validação 

Para assegurar que o Conecta UnB atenda de forma precisa às necessidades da comunidade acadêmica e reduza o retrabalho técnico, o produto passará por ciclos de validação rigorosos antes de sua implementação final. Esse processo será guiado por três pilares principais:  

1. **Definition of Ready (DoR):** O DoR atua como o "filtro de entrada" para a equipe de desenvolvimento e será aplicado ao final da fase de User Design. Ele garante que nenhuma linha de código seja escrita antes que a necessidade do usuário esteja perfeitamente compreendida e detalhada. Uma tarefa ou História de Usuário só será puxada para o desenvolvimento se cumprir os seguintes requisitos: 
    - O escopo e a regra de negócio estão claros e sem ambiguidades. 
    - Os Critérios de Aceitação estão explicitamente documentados e são testáveis. 
    - As dependências técnicas (como rotas de API no NestJS ou tabelas no PostgreSQL) estão mapeadas. 
    - Protótipos aprovados pelos clientes.

2. **Definition of Done (DoD):** O DoD atua como o "filtro de saída", sendo utilizado para averiguar qualidade do que foi construído. Ele será aplicado ao final da fase de Construção do RAD. Uma funcionalidade não será apresentada ao cliente a menos que cumpra um checklist rigoroso de engenharia de software, garantindo o alinhamento com padrões de qualidade e métricas de adequação. Os critérios incluem: 
    - A entrega cumpre com os critérios de aceitação
    - A funcionalidade foi implementada de ponta a ponta (integração entre Next.js e NestJS). 
    - O código foi coberto e aprovado em testes automatizados (utilizando o Jest). 
    - O código passou por revisões via Pull Requests no GitHub. 
    - O deploy foi realizado com sucesso nos ambientes de homologação na Vercel e Koyeb. 

3. **Validação com o Cliente:** Esta é a etapa final de validação do ponto de vista do negócio. Ao final do ciclo de desenvolvimento, a equipe realizará uma reunião de revisão a fim de garantir que o produto está nos correto. 
    - Nesse momento, as funcionalidades que já passaram pelo DoD serão apresentadas em um ambiente navegável. 
    - Os representantes dos stakeholders (como docentes do Catavento, membros da Gama CubeDesign, Atlética Pesadelo, EJ CJR e representantes discentes) testarão a aplicação na prática. 
    - A validação ocorre confirmando se o incremento de software resolve a dor inicialmente eliciada pelo requisito, cumprindo os critérios de aceitação e garantindo que o produto gera o valor esperado para o contexto da universidade. 