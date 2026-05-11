## Introdução

A seguir apresentamos a análise da entrevista realizada em 01 de Maio com a stakeholder Paula Meyer, representante do projeto Catavento.

O objetivo desta análise é mapear a visão específica deste stakeholder em relação aos problemas de comunicação e divulgação no ambiente universitário. O documento explora as limitações e os gargalos das ferramentas atualmente utilizadas pela comunidade.

Optamos por fazer a análise através de algumas perguntas sugeridas pelo professor em aula, identificamos em grupo que essas perguntas serviriam como uma boa base para a condução da análise.

## Desenvolvimento da análise

**Os diferentes stakeholders têm a mesma visão do problema?**

No momento, temos apenas a visão da coordenadora (Paula). É necessário validar em reuniões futuras se os alunos de graduação e o público atendido compartilham da percepção de que o problema é apenas a divulgação, ou se há gargalos na execução das atividades.

**Liste desejos**

- Ter uma presença ativa em redes sociais;
- Realizar posts frequentes sobre as visitas e projetos;
- Ter uma plataforma extremamente intuitiva;
- Autonomia na gestão de conteúdo.

**Liste necessidades**

- Registro e acompanhamento de métricas (alunos de graduação envolvidos, alunos atendidos na extensão e número de atividades anuais);
- Uma ferramenta que centralize a divulgação dos projetos.

**Liste frustrações**

- Projeto não possui boas fontes de divulgação nem alimentação constante de conteúdos;
- Canais atuais (Instagram) estão parados;
- Falta de braço operacional para a comunicação;
- Invisibilidade do projeto.

**Existem necessidades implícitas?**

Necessidade de um fluxo simplificado de entrada de dados, já que o maior gargalo é a falta de tempo/pessoal para alimentar as plataformas.

**Quais funcionalidades aparecem?**

- Módulo de postagens (estilo blog/notícias); 
- Dashboard de métricas anuais;
- Painel de gerenciamento de projetos de extensão;
- Repositório de histórico de atividades.

**Quais características de qualidade são mencionadas?**

- Usabilidade: simplicidade e intuitividade acima de tudo. 
- Consistência: interface padronizada igual para todos os perfis.
- Baixa curva de aprendizado.

**Há sinais de resistência à mudança? Onde?**

Sim, de forma indireta na parte operacional. Já que não tem uma pessoa para divulgar, isso indica que qualquer solução complexa enfrentará resistência por falta de tempo da equipe.

**Como fatores humanos podem influenciar os requisitos?**

A falta de um responsável dedicado à comunicação exige que o sistema se alimente quase automaticamente ou de forma muito rápida para evitar o abandono, como ocorreu com o Instagram.

**Identifique ambiguidades**

A definição de “igual para todos os usuários” na parte em que ela fala da plataforma. Não está claro se ela se refere à estética visual ou se deseja que não existam níveis de permissão diferentes.

**Identifique incompletudes**

Falta saber se o sistema deve gerar as métricas, com cálculo, ou apenas exibir dados inseridos manualmente.

**Há contradições ou redundâncias?**

Contradição entre a vontade de ter “alimentação constante” e a afirmação de que “não tem pessoa para divulgar”.

**Quais requisitos são implícitos?**

Armazenamento de mídia, como fotos e vídeos para posts, e possível integração com sistemas acadêmicos para extração e exibição das métricas de alunos.

**Existem conflitos entre stakeholders? Quais?**

Não identificado.

## Requisitos identificados

Utilizamos em um primeiro momento o **texto estruturado** para elicitar e declarar, de forma simples, antes de utilizarmos técnicas mais formais de declaração.

- O sistema deve ... COMPLETE

<!-- ## Requisitos identificados

Lista de requisitos preliminares, ainda pouco formalizados, incluindo requisitos funcionais, não funcionais e regras de negócio.

**Requisitos Funcionais**

O que o sistema deve fazer:

- RF01 - Gestão de Conteúdo: o sistema deve permitir o cadastro, edição e exclusão de posts contendo texto e mídia, como fotos e vídeos, sobre visitas e projetos.
- RF02 - Registro de Atividades: o sistema deve permitir o registro de atividades de extensão, associando data e tipo de ação.
- RF03 - Painel de Métricas: o sistema deve gerar um dashboard ou relatório visual contendo:
	- total de alunos de graduação envolvidos;
	- total de alunos ou público atendido pela extensão;
	- número de atividades realizadas no período.
- RF04 - Feed Público: o sistema deve exibir uma interface pública, no estilo blog ou portfólio, para divulgação das atividades.
- RF05 - Filtro Temporal: o sistema deve permitir filtrar as métricas e postagens por ano letivo.

**Requisitos Não Funcionais**
Como o sistema deve se comportar:

- RNF01 - Usabilidade (Simplicidade): a interface deve ser minimalista, com o menor número possível de cliques para realizar uma postagem.
- RNF02 - Curva de Aprendizado: o sistema deve ser intuitivo o suficiente para que um novo usuário consiga postar uma atividade sem treinamento prévio.
- RNF03 - Consistência Visual: a interface deve ser padronizada e idêntica para todos os perfis de acesso, mantendo a familiaridade visual.
- RNF04 - Responsividade (Mobile): o sistema deve ser totalmente funcional em dispositivos móveis para facilitar postagens rápidas durante as visitas.
- RNF05 - Eficiência: o processo de upload de uma nova atividade ou postagem não deve levar mais do que 2 minutos.

**Regras de Negócio**
As diretrizes e restrições do processo:

- RN01 - Periodicidade das Métricas: as métricas de impacto, como alunos e atividades, devem ser obrigatoriamente agrupadas e fechadas anualmente para fins de relatório.
- RN02 - Unicidade de Perfis: baseado na ambiguidade identificada, não haverá distinção de visualização entre administradores e usuários comuns; todos os usuários logados acessam as mesmas ferramentas de edição.
- RN03 - Validação de Dados: uma atividade de extensão só pode ser contabilizada nas métricas se houver o registro do número de alunos atendidos. -->
