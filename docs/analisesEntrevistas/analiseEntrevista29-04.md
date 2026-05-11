## Introdução

A seguir apresentamos a análise da entrevista realizada em 29 de abril com o stakeholder João Pedro, representante da equipe de competição Gama CubeDesign.

O objetivo desta análise é mapear a visão específica deste stakeholder em relação aos problemas de comunicação e divulgação no ambiente universitário. O documento explora as limitações e os gargalos das ferramentas atualmente utilizadas pela comunidade.

Optamos por fazer a análise através de algumas perguntas sugeridas pelo professor em aula, identificamos em grupo que essas perguntas serviriam como uma boa base para a condução da análise.

## Vídeo da Entrevita

<div style="text-align: center;">
    <iframe width="100%" height="400" src="https://www.youtube.com/embed/NNQucqIT3x4" title="Reunião stakeholder - fase 1 - 29 04 - João Gama Clube" frameborder="0" allowfullscreen></iframe>
    <figcaption>
        <a href="https://www.youtube.com/watch?v=NNQucqIT3x4">Clique para assistir no YouTube</a>.
    </figcaption>
</div>

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

Utilizamos em um primeiro momento o **texto estruturado** para elicitar e declarar, de forma simples, antes de utilizarmos técnicas mais formais de declaração.

- **Requisitos Funcionais (RFs)** \- O que o sistema deve fazer:  

    **RF-2-01**: O sistema deve permitir o cadastro de um perfil público de entidade contendo a descrição detalhada do propósito e das atividades.

    **RF-2-02**: O sistema deve permitir a publicação de atualizações de projetos contendo texto e imagens.

    **RF-2-03**: O sistema deve permitir a classificação de projetos no momento da publicação.

    **RF-2-04**: O sistema deve exibir o histórico de projetos anteriores e inativos no perfil de cada entidade.

    **RF-2-05**: O sistema deve permitir a configuração de filtros de interesses pessoais (ex: equipes de competição, PIBIC) para personalizar o feed de visualização do aluno.

    **RF-2-06**: O sistema deve emitir notificações direcionadas aos alunos baseadas nos filtros de interesse configurados em seus perfis.

    **RF-2-07**: O sistema deve gerar um painel de métricas de acesso para a entidade exibindo o número de interações realizadas.


- **Requisitos Não Funcionais (RNFs)** \- Qualidades e Restrições:  

    **RNF-2-01**: O sistema deve exibir os avisos e conteúdos de forma personalizada, filtrando as informações para evitar a poluição visual característica dos murais gerais.

* **Regras de Negócio (RNs)** \- Políticas e Condições do Domínio: 

    **RN-2-01**: Restringir a publicação de atualizações de projetos apenas aos usuários que estiverem previamente vinculados ao perfil da entidade publicadora.

    **RN-2-02**: Utilizar obrigatoriamente *tags* de status padronizadas e de domínio fechado pelo sistema para a classificação dos projetos.
