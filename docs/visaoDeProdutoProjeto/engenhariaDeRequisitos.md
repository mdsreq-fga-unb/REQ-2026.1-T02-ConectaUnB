# Engenharia de Requisitos

## Atividades e Técnicas de ER e Rapid Application Development (RAD)

### Elicitação e Descoberta:
As atividades de elicitação e descoberta buscam compreender o problema real dos stakeholders, coletando informações diretamente da fonte. No contexto do ConectaUnB, três técnicas principais foram adotadas:

- **Entrevistas e conversas informais**: Reuniões e encontros com os stakeholders, como os discentes, docentes (Prof. Paula Meyer) e representantes de equipes de competição, empresas juniores e atléticas. O objetivo é entender a frustração de cada grupo com a atual fragmentação de informações, buscando entender de quem publicará e quem consumirá as oportunidades.
- **Análise de Documentos e Sistemas Existentes**: Consultaremos as soluções utilizadas atualmente pela comunidade da UnB, como o site do Decanato de Extensão, murais físicos, SIGAA e perfis de Instagram. Essa análise servirá como base para descobrir as limitações exatas e a grande fragmentação das informações que a nova plataforma Conecta UnB precisará superar.
- **Observação Direta e Análise de Tarefas**: Durante a fase de design do usuário, realizaremos a observação do contexto real de uso por parte das entidades e discentes. O objetivo dessa técnica é extrair necessidades implícitas e descobrir "requisitos latentes" a partir da observação de como os usuários realizam suas tarefas cotidianamente, focando em suas frustrações e no trabalho real, sem a utilização de protótipos nesse momento inicial de descoberta.

### Análise e Consenso
Com os dados brutos coletados na etapa anterior, a equipe realiza atividades para alinhar entendimentos, resolver ambiguidades e priorizar o que será desenvolvido.

- **Reuniões de Análise Conjunta**: Realizaremos sessões colaborativas reunindo a equipe e os representantes para resolver ambiguidades nos requisitos brutos, construindo um entendimento compartilhado sobre como centralizar as informações atualmente fragmentadas.
- **Negociação**: Como o Conecta UnB atende a públicos com diferentes características (por exemplo, as necessidades de uma Empresa Júnior versus as de um Projeto de Extensão), buscaremos estabelecer soluções de compromisso para mediar interesses e prioridades divergentes.
- **Técnicas de Priorização (MoSCoW e Índice de Prioridade)**: Tendo o processo RAD sido adotado pelo grupo, precisaremos focar em entregas rápidas e de alto valor. Utilizaremos o MoSCoW e a Matriz de Valor de Negócio — Esforço Técnico (Índice de Prioridade) para classificar os requisitos levantados e decidir coletivamente o que é essencial para compor o escopo do nosso MVP.
- **Resolução de Conflitos**: Caso ocorram impasses durante as reuniões de alinhamento que não possam ser resolvidos apenas com diálogo, aplicaremos estratégias formais de resolução. Essa ação assegurará que as decisões sejam tomadas de forma transparente, evitando a paralisação do projeto.

### Declaração de Requisitos
A declaração de requisitos formaliza o entendimento obtido durante o levantamento, tornando os requisitos claros, verificáveis e rastreáveis ao longo do desenvolvimento.

- **Histórias de Usuário**: Sendo a principal técnica orientada a valor e experiência, elas serão utilizadas para compor o Backlog do Produto do Conecta UnB. As Histórias de Usuário descreverão as funcionalidades da plataforma a partir da perspectiva dos diferentes perfis de clientes, garantindo que as entregas iterativas do processo RAD sejam focadas no benefício real para a comunidade acadêmica.
- **Catálogos de Requisitos (Listas de RFs e RNFs)**: Utilizaremos listas estruturadas para documentar formalmente os requisitos do sistema. Os Requisitos Funcionais descreverão as ações precisas da plataforma, enquanto os Requisitos Não Funcionais serão declarados e classificados utilizando o modelo URPS+, garantindo que atributos de qualidade como usabilidade, desempenho e suportabilidade fiquem perfeitamente claros para o desenvolvimento.
- **Critérios de Aceitação**: Para garantir a verificabilidade das Histórias de Usuário e reduzir ambiguidades, definiremos condições objetivas e testáveis que a plataforma precisará atender para que uma funcionalidade seja aprovada. Essa técnica de declaração estruturada orientará a equipe técnica sobre o comportamento exato esperado de cada entrega iterativa.

### Representação de Requisitos
A representação dá forma visual e sistêmica aos requisitos já levantados, servindo de base para a comunicação com stakeholders e para o desenvolvimento.

- **Protótipos de Baixa/Média Fidelidade (Representações Semiestruturadas)**: Como a Prototipagem é o coração do processo RAD, utilizaremos protótipos simples para dar forma visual aos requisitos já levantados. Diferente da fase de elicitação, aqui o objetivo é estruturar visualmente e simular a navegação do Conecta UnB. Isso nos permitirá validar os fluxos de divulgação de editais e inscrição junto aos representantes (como a Prof. Paula Meyer), confirmando o entendimento da interface antes da codificação formal.
- **Diagrama de Contexto (Representação Sistêmica)**: Desenvolveremos diagramas de contexto para definir claramente as fronteiras do Conecta UnB. Isso nos ajudará a visualizar como a nova plataforma se posiciona no ambiente universitário e quais serão suas trocas de informação com os atores externos (discentes, docentes, entidades) e possíveis limitações em relação a sistemas oficiais já existentes.

### Verificação e Validação de Requisitos
As atividades de Verificação e Validação garantem tanto a qualidade interna quanto a qualidade externa. Elas permeiam todas as fases do RAD.

- **Validação com Protótipos e Demonstrações**: Como o processo RAD é fortemente orientado ao feedback contínuo, utilizaremos a apresentação de protótipos interativos e incrementos do sistema em reuniões com os stakeholders. O objetivo é garantir a qualidade externa, confirmando visualmente com o cliente se estamos "construindo o requisito correto" e se ele atende às reais necessidades de divulgação da comunidade acadêmica.
- **Listas de Verificação**: Para assegurar a qualidade interna dos requisitos antes de passarem para a codificação, a equipe de desenvolvimento aplicará listas de verificação estruturadas. O propósito é responder à pergunta "estamos realizando o requisito da maneira correta?", avaliando se as histórias de usuário e os catálogos estão consistentes, completos, testáveis e sem ambiguidades.
- **Validação de Requisitos em Ambiente de Aceitação**: Para garantir que as necessidades de negócio foram atendidas, os representantes dos usuários validarão os incrementos confrontando-os estritamente com os critérios de aceitação previamente definidos. Essa técnica comprova que o comportamento do Conecta UnB respeita as regras de negócio e as demandas específicas, focando na aprovação do requisito mapeado e não apenas na busca por falhas no produto final.
- **Revisões Técnicas por Pares (Inspeções)**: A equipe técnica realizará revisões conjuntas dos artefatos de requisitos produzidos para verificar sua conformidade técnica. Essa prática de verificação busca identificar precocemente inconsistências, lacunas ou falhas nos Requisitos Funcionais e Não Funcionais antes que se tornem problemas na fase de desenvolvimento.

### Organização e Atualização de Requisitos
A organização e atualização dos requisitos está presente desde o Planejamento, estruturando o backlog inicial e a rastreabilidade, e se estende continuamente pelas fases de Construção e Cutover.

- **Organização e Atualização de Backlog**: Por termos optado pelo processo RAD iterativo e incremental com framework kanban, organizaremos os requisitos em um backlog dinâmico. Essa técnica estruturará as funcionalidades em uma lista priorizada, que será atualizada continuamente à medida que o entendimento do problema de fragmentação da UnB amadurece e novos feedbacks são coletados.
- **Matriz de Rastreabilidade**: Utilizaremos uma matriz de rastreabilidade para conectar cada requisito à sua fonte original (por exemplo, a demanda de recrutamento da Empresa Júnior CJR ou de divulgação de eventos da Atlética Pesadelo) e aos artefatos do sistema. Essa técnica de organização garantirá que a evolução do entendimento coletivo não se perca e funcionará como uma memória estruturada das decisões e mudanças adotadas no projeto.


## Engenharia de Requisitos e o RAD

| Fases do Processo | Atividades ER | Prática | Técnica | Resultado Esperado |
| :--- | :--- | :--- | :--- | :--- |
| **Fase 1: Planejamento de Requisitos** | Elicitação e Descoberta | Interação direta com stakeholders e pesquisa de campo | Entrevistas, conversas informais e Análise de Documentos | Entendimento claro da fragmentação de informações e identificação exata das limitações atuais. |
| | Análise e Consenso | Alinhamento de escopo e definição de valor | Reuniões de Análise Conjunta e Técnicas de Priorização (MoSCoW e dependências/trade-offs) | Definição objetiva e priorização do escopo essencial para compor o Produto Mínimo Viável (MVP). |
| | Declaração | Documentação estruturada de requisitos funcionais e não funcionais | Catálogos de Requisitos (RFs/RNFs) | Documentação estruturada inicial das ações e qualidades exigidas para o Conecta UnB. |
| | Organização e Atualização | Estruturação inicial do backlog e rastreabilidade | Organização e Atualização de Backlog e Matriz de Rastreabilidade | Backlog preliminar priorizado e rastreabilidade das demandas estabelecida. |
| | Verificação e Validação | Confirmação da qualidade interna desde o início | Listas de Verificação de Qualidade Interna | Requisitos iniciais validados quanto à completude e ausência de ambiguidades antes da prototipagem. |
| **Fase 2: Design do Usuário** | Elicitação e Descoberta | Observação do contexto de uso | Observação Direta e Análise de Tarefas | Descoberta de requisitos latentes a partir de como o usuário realiza tarefas. |
| | Representação | Modelagem de fronteiras e jornada | Diagrama de Contexto e Protótipos de Baixa/Média Fidelidade (Figma) | Navegação e estrutura visual da plataforma simuladas para aprovação. |
| | Análise e Consenso | Mediação de interesses e impasses visuais | Negociação e Resolução de Conflitos | Soluções de compromisso para alinhar interfaces divergentes entre entidades. |
| | Declaração | Detalhamento para desenvolvimento | Histórias de Usuário e Critérios de Aceitação | Backlog refinado em valor, com condições testáveis prontas para codificação. |
| | Verificação e Validação | Validação contínua externa | Validação com Protótipos e Demonstrações | Confirmação visual de que o design atende às necessidades de divulgação. |
| | Organização e Atualização | Ajuste de escopo pós-validação visual | Organização e Atualização de Backlog | Inclusão ou remoção de requisitos descobertos/refutados durante o design. |
| **Fase 3: Construção** | Verificação e Validação | Verificação de qualidade interna (técnica) | Listas de Verificação e Revisões Técnicas por Pares (Inspeções em Pull Requests) | Requisitos implementados de forma consistente com a documentação. |
| | Organização e Atualização | Adaptação contínua ao desenvolvimento | Revisão Iterativa de Requisitos no Kanban | Lista de funcionalidades atualizada conforme o progresso do código. |
| **Fase 4: Cutover (Implementação)** | Verificação e Validação | Verificação do atendimento às necessidades de negócio | Validação de Requisitos em Ambiente de Aceitação | Comprovação estrita de que os critérios de aceitação dos requisitos foram integralmente cumpridos. |
| | Organização e Atualização | Manutenção da evolução do projeto | Fechamento da Matriz de Rastreabilidade | Conexão final documentada entre demandas originais e código entregue. |