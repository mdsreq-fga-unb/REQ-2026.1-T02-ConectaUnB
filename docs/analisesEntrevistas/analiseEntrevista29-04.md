## Introdução

A seguir apresentamos a análise da entrevista realizada em 29 de abril com o stakeholder João Pedro, representante da equipe de competição Gama CubeDesign.

O objetivo desta análise é mapear a visão específica deste stakeholder em relação aos problemas de comunicação e divulgação no ambiente universitário. O documento explora as limitações e os gargalos das ferramentas atualmente utilizadas pela comunidade.

Optamos por fazer a análise através de algumas perguntas indicadas pelo professor para a realização de uma atividade em aula, identificamos em grupo que essas perguntas nos orientaria bem para a condução da análise.

## Desenvolvimento da análise

**Os diferentes stakeholders têm a mesma visão do problema?**

Essa análise foca em apenas um stakeholder, mas estive presente nas outras reuniões e notei que os outros grupos tiveram visões semelhantes. A comunicação atual (cartazes, redes sociais) é falha, e eles acreditam que um local dedicado agregaria valor na captação e busca de integrantes. 

**Liste desejos**

- Entregar o conteúdo para todo o público e não apenas aos interessados.  
- Saber o percentual de alunos e de outros tipos de perfis que consomem o conteúdo da equipe.  
- O “post”  funcionar como um “mini” artigo.  
      
**Liste necessidades.**
    
- Receber ou poder procurar informações de interesse
- Perfil (Por que participar, o que é, o que faz, mostrar que a faculdade também tem pesquisa…).  
- Status da missão (projeto).  
- Poderia ser um desejo, mas coloco o “histórico” de projetos como uma necessidade para ele, pois para a área de pesquisas, ter esse “histórico” economiza tempo para a equipe.


**Liste frustrações**

- A confusão dos murais, o João cita que alguém buscando sobre a equipe pode acabar se perdendo devido à grande quantidade de cartazes nos murais, o que se traduz numa possível perda de interesse.  
- Também em relação aos cartazes, não conseguem expor o que de fato é a Gama CubeDesign.  
- Dependência do algoritmo ou de conhecimento prévio para entregar os conteúdos da equipe.  
- Perda de prazos de inscrições por não encontrar informações suficientes.  
- Avisos desnecessários na plataforma SIGAA.  
- Perda de informações de projetos anteriores.


**Existem necessidades implícitas?**
    
Expor o que é e o que faz a Gama CubeDesign.  
      
**Quais funcionalidades aparecem?**
    
- Ter um perfil com informações sobre a equipe (o que é, o que faz) \> criar perfil \> editar \> consultar.  
- Receber ou poder procurar informações de interesse.  
- Publicar um item como um “mini” artigo.  
- Parte específica ou tags de status (em andamento, fechado, completo, incompleto…).  
- Histórico.  
      
**Quais características de qualidade (desempenho, segurança, etc.) são mencionadas?**
    
Interface limpa, personalizada e livre de distrações.  
      
**Há sinais de resistência à mudança? Onde?**
    
Não.  
      
**Como fatores humanos podem influenciar os requisitos?**
    
É cansativo ficar vendo diversos avisos ou informações, então manter isso de forma enxuta ajuda a manter o foco do interesse.   
      
**Identifique ambiguidades.**
    
- "Uma métrica de saber quem é aluno e quem é de fora". Como o sistema fará essa diferenciação? Um "aluno" é alguém logado com matrícula e o "de fora" é alguém sem login?. Isso precisa ser esclarecido.  
- “Mini” Artigos/ Postagens simples: Apenas texto ou inclui imagens? Limite de caracteres?   
      
**Identifique incompletudes.**
    
- O sistema de filtro, como o usuário recebe isso? Por notificações, email ou um filtro de fato no sistema?  
- “Status” da publicação: quem irá manter e atualizar?  
      
**Há contradições ou redundâncias?**
    
Uma contradição pode ser a questão do excesso de informações dos sistemas atuais, mas o desejo de publicar os mini artigos (que podem ser muitos considerando todas as partes que podem fazer isso). É algo que o sistema pode resolver com um filtro, como o João mesmo citou.  
      
**Quais requisitos são implícitos?**
    
- Plataforma centrada nas informações, sem coisas irrelevantes ou que distraiam.  
- Descobrir como seria realizada a métrica de percentual das partes que acessam.  
      
**Existem conflitos entre stakeholders? Quais?**
    
Não identificado nessa análise.  

## Requisitos identificados

Utilizamos em um primeiro momento o **texto estruturado** para elicitar e declarar, de forma simples, antes de utilizarmos tecnicas mais formais de declaração.

- O sistema deve ... COMPLETE

<!-- * Liste os Requisitos identificados, nada muito bem estabelecido, apenas as ideias identificadas, podem ser requisitos funcionais, não funcionais e regras de negócio  
    
- **Requisitos Funcionais (RFs)** \- O que o sistema deve fazer:  
    **RF01**: Cadastrar perfil público de entidade (Equipe de Competição, Empresa Júnior, Atlética, Projeto de Extensão), contendo descrição detalhada do propósito e atividades.  
    **RF02**: Consultar perfil de entidades cadastradas na plataforma.  
    **RF03**: Publicar atualizações de projetos (mini artigos) vinculados ao perfil da entidade, contendo texto e imagens.  
    **RF04**: Classificar projetos com tags de status (ex: em andamento, finalizado, incompleto).  
    **RF05**: Consultar o histórico de projetos anteriores e inativos de uma entidade.  
    **RF06**: Configurar filtros de interesses pessoais no perfil do aluno (ex: PIBIC, vagas de EJ, eventos).  
    **RF07**: Emitir notificações direcionadas aos alunos baseadas nos filtros de interesse configurados.  
    **RF08**: Gerar painel de métricas de acesso para a entidade, exibindo o percentual de visualizações realizadas por alunos logados versus visitantes não logados.  
      
- **Requisitos Não Funcionais (RNFs)** \- Qualidades e Restrições:  
    **RNF01** (Usabilidade): O sistema deve fornecer uma interface de avisos estritamente filtrada pelas preferências do usuário, evitando poluição visual análoga à de murais gerais.  
    **RNF02** (Interoperabilidade/Interface Externa): O sistema deve consumir a API de autenticação da Universidade de Brasília para distinguir contas de alunos matriculados de acessos de visitantes (necessário para o RF08).  
      
* **Regras de Negócio (RNs)** \- Políticas e Condições do Domínio: 

  **RN01**: Apenas usuários autenticados e cadastrados como "Membros" ou "Líderes" de uma entidade possuem permissão para criar ou editar postagens, alterar o status de projetos e visualizar o painel de métricas do perfil.

  **RN02:** Os status dos projetos não podem ser de preenchimento livre, devendo respeitar um domínio padronizado pelo sistema (ex: "Em concepção", "Em andamento", "Finalizado", "Cancelado") para facilitar buscas futuras. 

  A RN02 pode não se aplicar ao projeto todo. -->

