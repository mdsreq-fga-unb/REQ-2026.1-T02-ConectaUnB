## Processo de Validação 

Para assegurar que o Conecta UnB atenda de forma precisa às necessidades da comunidade acadêmica e reduza o retrabalho técnico, o produto passará por ciclos de validação rigorosos antes de sua implementação final. Esse processo será guiado por três pilares principais:  

1. **Definition of Ready (DoR):** O DoR atua como o "filtro de entrada" para a equipe de desenvolvimento e será aplicado ao final da fase de User Design. Ele garante que nenhuma linha de código seja escrita antes que a necessidade do usuário esteja perfeitamente compreendida e detalhada. Uma tarefa ou História de Usuário só será puxada para o desenvolvimento se cumprir os seguintes requisitos: 
    - O escopo e a regra de negócio estão claros e sem ambiguidades. 
    - Protótipos aprovados pelos clientes.

2. **Definition of Done (DoD):** O DoD atua como o "filtro de saída", sendo utilizado para averiguar qualidade do que foi construído. Ele será aplicado ao final da fase de Construção do RAD. Uma funcionalidade não será apresentada ao cliente a menos que cumpra um checklist rigoroso de engenharia de software, garantindo o alinhamento com padrões de qualidade e métricas de adequação. Os critérios incluem: 
    - A entrega cumpre com as regras de negócio
    - A funcionalidade foi implementada de ponta a ponta (integração entre Next.js e NestJS, não existe entrega apenas de front e back isolados). 
    - O código foi coberto e aprovado em testes automatizados (utilizando o Jest). 
    - O código passou por revisões via Pull Requests no GitHub. 

3. **Validação com o Cliente:** Esta é a etapa final de validação do ponto de vista do negócio. Ao final do ciclo de desenvolvimento, a equipe realizará uma reunião de revisão a fim de garantir que o produto está nos correto. 
    - Nesse momento, as funcionalidades que já passaram pelo DoD serão apresentadas em um ambiente navegável. 
    - Os representantes dos stakeholders (como docentes do Catavento, membros da Gama CubeDesign, Atlética Pesadelo, EJ CJR e representantes discentes) testarão a aplicação na prática. 
    - A validação ocorre confirmando se o incremento de software resolve a dor inicialmente eliciada pelo requisito, seguindo as regras de negócio e garantindo que o produto gera o valor esperado para o contexto da universidade. 