## Introdução

A seguir apresentamos a análise da entrevista realizada em 30 de Abril com a stakeholder Paula Meyer, representante do projeto Catavento.

O objetivo desta análise é mapear a visão específica deste stakeholder em relação aos problemas de comunicação e divulgação no ambiente universitário. O documento explora as limitações e os gargalos das ferramentas atualmente utilizadas pela comunidade.

Optamos por fazer a análise através de algumas perguntas indicadas pelo professor para a realização de uma atividade em aula, identificamos em grupo que essas perguntas nos orientaria bem para a condução da análise.

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

- **Requisitos Funcionais (RFs)** \- O que o sistema deve fazer:  

    **RF-3-01**: O sistema deve permitir o cadastro, a edição e a exclusão de postagens contendo texto e mídias (fotos e vídeos) sobre as visitas e os projetos de extensão realizados [2, 4].

    **RF-3-02**: O sistema deve exibir uma interface pública no formato de portfólio (ou blog) para a divulgação das atividades de extensão cadastradas no perfil.

    **RF-3-03**: O sistema deve permitir a aplicação de filtros para pesquisar as métricas de impacto e as postagens.

    **RF-3-04**: O sistema deve permitir o registro de atividades de extensão, associando-as obrigatoriamente a uma data e a um tipo de ação.

- **Requisitos Não Funcionais (RNFs)** \- Qualidades e Restrições:  

    **RNF-3-01**: O sistema deve permitir o cadastro, a edição e a exclusão de postagens contendo texto e mídias (fotos) sobre as visitas e os projetos de extensão realizados.

    **RNF-3-02**: O sistema deve apresentar uma interface minimalista e extremamente intuitiva, garantindo uma baixa curva de aprendizado para que usuários idosos ou com pouca afinidade tecnológica consigam realizar postagens sem necessidade de treinamento prévio.

    **RNF-3-03**: O sistema deve manter uma consistência visual padronizada para todos os perfis de acesso, reduzindo a confusão e a complexidade de navegação.

    **RNF-3-04**: O sistema deve possuir interface responsiva, facilitando postagens rápidas pelo celular durante a realização de visitas ou atividades de campo.


* **Regras de Negócio (RNs)** \- Políticas e Condições do Domínio: 

    **RN-3-01**: Manter a unicidade de ferramentas de edição na gestão do perfil, aplicando hierarquias ou níveis de permissão para usuários logados vinculados ao projeto.