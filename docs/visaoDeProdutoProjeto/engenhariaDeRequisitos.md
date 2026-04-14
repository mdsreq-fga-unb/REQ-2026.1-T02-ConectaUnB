# Engenharia de Requisitos

## Atividades e Técnicas de ER e Rapid Application Development (RAD)

### Elicitação e Descoberta

- **Entrevistas e conversas informais:**  Reuniões e encontros com os stakeholders, como os discentes, docentes (Prof. Paula Mayer) e representantes de equipes de competição, empresas juniores e atléticas.  O objetivo é entender a frustração de cada grupo com a atual fragmentação de informações, buscando entender de quem publicará e quem consumirá as oportunidades. 

- **Workshops de Design do Usuário:** Como prática central do processo RAD, realizaremos reuniões colaborativas entre desenvolvedores e representantes dos usuários. Tais encontros servirão para debater as barreiras dos meios de divulgação atuais e refinar os requisitos iniciais em conjunto, de forma ágil. 

- **Prototipagem Rápida (Evolutiva):** Utilizaremos protótipos funcionais e de baixa fidelidade apresentando-os aos stakeholders. Isso permitirá a descoberta de requisitos ocultos e necessidades implícitas a partir do feedback contínuo e imediato dos usuários. 

- **Análise de Documentos e Sistemas Existentes:** Consultaremos as soluções utilizadas atualmente pela comunidade da UnB, como o site do Decanato de Extensão, murais físicos, SIGAA e perfis de Instagram. Essa análise servirá como base para descobrir as limitações exatas e a grande fragmentação das informações que a nova plataforma Conecta UnB precisará superar. 

### Análise e Consenso 

- **Workshops de Requisitos:** Realizaremos sessões colaborativas reunindo a equipe e os representantes para resolver ambiguidades nos requisitos brutos, construindo um entendimento compartilhado sobre como centralizar as informações atualmente fragmentadas. 

- **Negociação:** Como o Conecta UnB atende a públicos com diferentes características (por exemplo, as necessidades de uma Empresa Júnior versus as de um Projeto de Extensão), buscaremos estabelecer soluções de compromisso para mediar interesses e prioridades divergentes. 

- **Técnicas de Priorização (MoSCoW e Índice de Prioridade):** Tendo o processo RAD sido adotado pelo grupo, precisaremos focar em entregas rápidas e de alto valor. Utilizaremos o MoSCoW e a Matriz de Valor de Negócio × Esforço Técnico (Índice de Prioridade) para classificar os requisitos levantados e decidir coletivamente o que é essencial para compor o escopo do nosso MVP. 

- **Resolução de Conflitos:** Caso ocorram impasses durante os workshops que não possam ser resolvidos apenas com diálogo, aplicaremos estratégias formais de resolução. Essa ação assegurará que as decisões sejam tomadas de forma transparente, evitando a paralisação do projeto. 

### Declaração de Requisitos 

- **Histórias de Usuário:** Sendo a principal técnica orientada a valor e experiência, elas serão utilizadas para compor o Backlog do Produto do Conecta UnB. As Histórias de Usuário descreverão as funcionalidades da plataforma a partir da perspectiva dos diferentes perfis de clientes, garantindo que as entregas iterativas do processo RAD sejam focadas no benefício real para a comunidade acadêmica. 

- **Catálogos de Requisitos (Listas de RFs e RNFs):** Utilizaremos listas estruturadas para documentar formalmente os requisitos do sistema. Os Requisitos Funcionais descreverão as ações precisas da plataforma, enquanto os Requisitos Não Funcionais serão declarados e classificados utilizando o modelo URPS+, garantindo que atributos de qualidade como usabilidade, desempenho e suportabilidade fiquem perfeitamente claros para o desenvolvimento. 

- **Critérios de Aceitação:** Para garantir a verificabilidade das Histórias de Usuário e reduzir ambiguidades, definiremos condições objetivas e testáveis que a plataforma precisará atender para que uma funcionalidade seja aprovada. Essa técnica de declaração estruturada orientará a equipe técnica sobre o comportamento exato esperado de cada entrega iterativa.

### Representação de Requisitos

- **Protótipos de Baixa Fidelidade (Representações Semiestruturadas):** Como a Prototipagem é o coração do processo RAD, utilizaremos protótipos simples para dar forma visual aos requisitos já levantados. Diferente da fase de elicitação, aqui o objetivo é estruturar visualmente e simular a navegação do Conecta UnB. Isso nos permitirá validar os fluxos de divulgação de editais e inscrição junto aos representantes (como a Prof. Paula Meyer), confirmando o entendimento da interface antes da codificação formal. 

- **Diagrama de Contexto (Representação Sistêmica):** Desenvolveremos diagramas de contexto para definir claramente as fronteiras do Conecta UnB. Isso nos ajudará a visualizar como a nova plataforma se posiciona no ambiente universitário e quais serão suas trocas de informação com os atores externos (discentes, docentes, entidades) e possíveis limitações em relação a sistemas oficiais já existentes.

### Verificação e Validação de Requisitos 

- **Validação com Protótipos e Demonstrações:** Como o processo RAD é fortemente orientado ao feedback contínuo, utilizaremos a apresentação de protótipos interativos e incrementos do sistema em reuniões com os stakeholders. O objetivo é garantir a qualidade externa, confirmando visualmente com o cliente se estamos "construindo o requisito correto" e se ele atende às reais necessidades de divulgação da comunidade acadêmica. 

- **Listas de Verificação:** Para assegurar a qualidade interna dos requisitos antes de passarem para a codificação, a equipe de desenvolvimento aplicará listas de verificação estruturadas. O propósito é responder à pergunta "estamos realizando o requisito da maneira correta?", avaliando se as histórias de usuário e os catálogos estão consistentes, completos, testáveis e sem ambiguidades. 

- **Testes de Aceitação do Usuário:** Para garantir que as funcionalidades implementadas cumprem as expectativas, os representantes dos usuários validarão o produto confrontando-o com os critérios de aceitação previamente definidos. Essa técnica comprova que o comportamento do Conecta UnB respeita as regras de negócio e as demandas específicas de entidades como EJs e Atléticas. 

- **Revisões Técnicas por Pares (Inspeções):** A equipe técnica realizará revisões conjuntas dos artefatos de requisitos produzidos para verificar sua conformidade técnica. Essa prática de verificação busca identificar precocemente inconsistências, lacunas ou falhas nos Requisitos Funcionais e Não Funcionais antes que se tornem problemas na fase de desenvolvimento. 

### Organização e Atualização de Requisitos 

- **Gerenciamento de Backlog:** Por termos optado pelo processo RAD iterativo e incremental com framework kanban, organizaremos os requisitos em um backlog dinâmico. Essa técnica estruturará as funcionalidades em uma lista priorizada, que será atualizada continuamente à medida que o entendimento do problema de fragmentação da UnB amadurece e novos feedbacks são coletados.

- **Matriz de Rastreabilidade:** Utilizaremos uma matriz de rastreabilidade para conectar cada requisito à sua fonte original (por exemplo, a demanda de recrutamento da Empresa Júnior CJR ou de divulgação de eventos da Atlética Pesadelo) e aos artefatos do sistema. Essa técnica de organização garantirá que a evolução do entendimento coletivo não se perca e funcionará como uma memória estruturada das decisões e mudanças adotadas no projeto.

- **Revisão Iterativa de Requisitos:** Sendo o projeto fortemente baseado em feedback rápido, aplicaremos revisões e atualizações contínuas ao conjunto de requisitos documentados. Temos o objetivo de manter a organização dos requisitos sempre em seu estado mais atual, refletindo imediatamente as mudanças, aprendizados e os novos consensos emergentes entre a equipe e os stakeholders.

## Engenharia de Requisitos e o RAD

| Fases do Processo | Atividades ER | Prática | Técnica | Resultado Esperado |
| :---: | :---: | :--- | :--- | :--- |
| **Fase 1: Planejamento de Requisitos** | Elicitação e Descoberta | Interação direta com stakeholders e pesquisa de campo | Entrevistas, conversas informais e Análise de Documentos | Entendimento claro da fragmentação de informações e identificação exata das limitações atuais. |
| | Análise e Consenso | Alinhamento de escopo e definição de valor | Workshops de Requisitos e Técnicas de Priorização (MoSCoW e dependências/trade-offs) | Definição objetiva e priorização do escopo essencial para compor o Produto Mínimo Viável (MVP). |
| | Declaração | Entendimento do contexto de uso | Catálogos de Requisitos (RFs/RNFs) | Documentação estruturada inicial das ações e qualidades exigidas para o Conecta UnB. |
| **Fase 2: Design do Usuário** | Elicitação e Descoberta | Descoberta guiada por colaboração e feedback visual | Workshops de Design do Usuário e Prototipagem Rápida | Descoberta de requisitos latentes e necessidades implícitas a partir da interação visual e feedback |
| | Representação | Modelagem de fronteiras e ideias | Diagrama de Contexto e Protótipos de Baixa Fidelidade | Navegação e estrutura visual da plataforma do Conecta UnB simuladas para aprovação. |
| | Análise e Consenso | Mediação de interesses e resolução de impasses | Workshops de Requisitos, Negociação e Resolução de Conflitos | Soluções de compromisso viáveis para alinhar interesses divergentes entre diferentes entidades. |
| | Declaração | Detalhamento orientado a valor para desenvolvimento | Histórias de Usuário e Critérios de Aceitação | Backlog focado em valor, com condições testáveis prontas para a equipe técnica iniciar a codificação. |
| | Verificação e Validação | Validação contínua de qualidade externa | Validação com Protótipos e Demonstrações | Confirmação visual com o cliente de que o design atende às reais necessidades de divulgação. |
| **Fase 3: Construção** | Verificação e Validação | Verificação de qualidade interna (técnica) | Checklists de Verificação e Revisões Técnicas por Pares | Requisitos implementados de forma consistente, garantindo que estejam completos e sem ambiguidades. |
| | Organização e Atualização | Adaptação contínua ao desenvolvimento | Gerenciamento de Backlog via Kanban e Revisão Iterativa | Lista de funcionalidades priorizada e dinamicamente atualizada conforme o progresso do desenvolvimento. |
| **Fase 4: Cutover (Implementação)** | Verificação e Validação | Testes finais de aceitação do produto com o cliente | Testes de Aceitação do Usuário | Comprovação final de que o Conecta UnB atende às regras de negócio e expectativas da comunidade. |
| | Organização e Atualização | Manutenção da evolução do projeto | Revisão Iterativa de Requisitos e Matriz de rastreabilidade | Conexão documentada entre as demandas originais das entidades e as entregas finais para futuras manutenções. |