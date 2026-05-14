## Introdução

Após a primeira fase de elicitação e descoberta o grupo declarou os requisitos entendidos e subentendidos das três entrevistas e os reuniu na seguinte tabela:


## Requisitos funcionais (RFs)
| Cod | Nome | Texto estruturado | Característica do produto | Rastreabiliade | Priorização MoSCoW |
| ------ | ------ | ------ | ------ | ------ | ------ |
| Processos seletivos |  |  |  |  |  |
| RF-01 | Exibir processos seletivos abertos | O sistema deve permitir exibir todos os procesos seletivos abertos | CP5 | RF-1-01 | Must Have |
| RF-02 | Filtrar processos seletivos abertos | O sistema deve permitir filtrar processos seletivos abertos | CP5 | RF-1-01 | Must Have |
| RF-03 | Atualizar status de um processo seletivo | O sistema deve permitir a atualização do status de um processo seletivo de uma entidade | CP4 | RF-1-06 | Must Have |
| RF-04 | Cancelar um processo seletivo | O sistema deve permitir o cancelamento de um processo seletivo de uma entidade | CP4 | RF-1-07 | Must Have |
| RF-05 | Criar um processo seletivo | O sistema deve permitir a criação de um processo seletivo de uma entidade delimitando data limite para inscrição | CP4 | RF-1-07 | Must Have |
| FEED |  |  |  |  |  |
| RF-06 | Filtrar feed de acordo com preferências do usuário | O sistema deve permitir a configuração de filtros de interesses pessoais (ex: equipes de competição, PIBIC) para personalizar o feed de visualização do aluno. | CP5 | RF-2-05 | Must Have |
| RF-07 | Divulgar publicações no formato de blog | O sistema deve exibir uma interface pública no formato de blog para a divulgação das atividades publicadas no perfil de uma entidade. | CP2 | RF-3-02 | Must Have |
| RF-08 | Interagir com publicações com botões de curtida | O sistema deve possuir um botão em cada publicação para que os usuários possam interagir através de curtidas | CP2 | RF-1-05 | Could Have |
| PERFIL - ENTIDADE |  |  |  |  |  |
| RF-09 | Criar perfil da entidade publicamente | O sistema deve permitir a criação de perfis institucionais de entidades por usuários autenticados (docentes ou discentes), atribuindo automaticamente ao criador o papel de gestor da página criada. | CP1 | RF-2-01 | Must Have |
| RF-10 | Editar perfil da entidade | O sistema deve permitir a atualização dos dados de um perfil público de entidade. | CP1 | RF-2-01 | Must Have |
| RF-11 | Excluir perfil da entidade | O sistema deve permitir a exclusão dos dados de um perfil de entidade. | CP1 | RF-2-01 | Must Have |
| RF-12 | Acessar perfil da entidade | O sistema deve permitir a visualização dos dados de um perfil de entidade. | CP1 | RF-2-01 | Must Have |
| RF-13 | Gerenciar co-gestores | O sistema deve permitir a adição e a remoção de usuários (docentes ou discentes) como co-gestores de uma entidade quando a ação for realizada por um usuário que já possua privilégios de gestor nela. | CP1 | RF-2-01 | Should Have |
| PERFIL - USUÁRIO |  |  |  |  |  |
| RF-14 | Cadastrar perfil de usuário | O sistema deve permitir o cadastro de um perfil público de usuário | CP1 | RF-2-01 | Must Have |
| RF-15 | Editar perfil da usuário | O sistema deve permitir a atualização dos dados de um perfil público de usuário. | CP1 | RF-2-01 | Must Have |
| RF-16 | Excluir perfil da usuário | O sistema deve permitir a exclusão dos dados de um perfil de usuário. | CP1 | RF-2-01 | Must Have |
| RF-17 | Acessar perfil da usuário | O sistema deve permitir a visualização dos dados de um perfil de usuário. | CP1 | RF-2-01 | Must Have |
| RF-18 | Exibir painel de gestão | O sistema deve exibir um painel de gestão ao usuário autenticado, listando e permitindo o acesso rápido a todas as entidades nas quais ele possui privilégios de gestão. | CP1 | RF-2-01 | Must Have |
| PROJETO |  |  |  |  |  |
| RF-19 | Atualizar projeto | O sistema deve permitir a publicação de atualizações de projetos contendo texto e imagens. | CP6 | RF-2-02 | Must Have |
| RF-20 | Visualizar histórico de projetos | O sistema deve exibir o histórico de projetos atuais e anteriores no perfil de cada entidade. | CP6 | RF-2-04 | Should Have |
| RF-21 | Criar um novo projeto | O sistema deve permitir a publicação de projetos contendo texto e imagem. | CP6 | RF-2-02 | Must Have |
| RF-22 | Deletar um projeto | O sistema deve permitir a deleção de projetos. | CP6 | RF-2-02 | Must Have |
| PUBLICAÇÕES |  |  |  |  |  |
| RF-23 | Criar publicações | O sistema deve permitir criar posts contendo texto e imagem, podendo ser apenas um dos dois | CP4 CP6 | RF-1-02 | Must Have |
| RF-24 | Editar publicações | O sistema deve permitir editar posts | CP4 CP6 | RF-1-02 | Must Have |
| RF-25 | Apagar publicações | O sistema deve permitir a deleção de posts | CP4 CP6 | RF-1-02 | Must Have |
| RF-26 | Pesquisar publicações com filtros de busca | O sistema deve permitir a busca por posts através de filtros | CP5 | RF-3-03 | Should Have |
| NOTIFICAÇÕES |  |  |  |  |  |
| RF-27 | Personalizar conteúdos de notificação | O sistema deve permitir o usuário solicitar notificações de acordo com sua vontade | CP8 | RF-1-03 RF-2-06 | Could Have |
| RF-28 | Notificar usuários | O sistema irá notificar o usuário após aguma atualização de entidade de seu interesse | CP8 | RF-1-03 RF-2-06 | Should Have |
| MÉTRICAS |  |  |  |  |  |
| RF-29 | Exibir métricas de engajamento para as entidades | O sistema deve exibir métricas de engajamento demonstrando o número de seguidores e incrições em processos seletivps | CP3 | RF-2-07 | Should Have |
| RF-30 | Exibir métricas de engajamento para publicações | O sistema deve exibir métricas com número de interações realizadas em cada publicação. | CP3 | RF-2-07 | Should Have |
| INTEGRAÇÃO |  |  |  |  |  |
| RF-31 | Importar posts de outras redes | O sistema pode proporcionar a importação de posts de outras redes sociais | CP4 | RF-1-04 | Won't Have |



## Requisitos não funcionais (RNFs)
| Cod | Classificação URPS+/Sommervile | Nome | Texto descritivo | Característica do produto | Rastreabiliade | Priorização MoSCoW |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| RNF-01 | Usabilidade | Acessar plataforma sem login | O sistema deve permitir o primeiro acesso a plataforma sem necessidade de login | CP7 | RNF-1-01 | Must Have |
| RNF-02 | Usabilidade | Facilidade no uso | O sistema deve apresentar uma interface minimalista, possibilitando o acesso de qualquer funcionalidade da aplicação com menos de 6 cliques. | CP7 | RNF-3-01 | Must Have |
| RNF-03 | Usabilidade | Manter consistência visual | O sistema deve manter uma consistência visual padronizada para todos os perfis de acesso, reduzindo a confusão e a complexidade de navegação. | CP7 | RNF-3-02 | Must Have |
| RNF-04 | Usabiliadade | Garantir responsividade | O sistema deve possuir interface responsiva, sempre comunicando com o usuário se o processamento foi concluído ou não, se houve algum erro e como o usuário pode corrigir. | CP7 | RNF-3-03 | Must Have |
| RNF-06 | Suportabilidade | Uso mobile e desktop | O sistema deve ser funcional em desktops e mobile (através do navegador). | CP7 | requisito implícito | Must Have |
| RNF-07 | Desempenho | Carregamento rápido de páginas | As páginas devem carregar em menos de 10 segundos em média. | CP7 | requisito implícito | Must Have |
| RNF-08 | Requisito externo | Coleta de métricas de acordo com LGPD | As coletas de dados para métricas devem ser realizadas de maneira anonimizada e é necessário avisar ao usuário que esta informação será coletada | CP9 | LGPD | Must Have |
| RNF-09 | Requisito externo | Criptografar dados seníveis de usuários e entidades | O sistema deve criptografar os dados sensíveis dos usuários e entidades, como matrículas, senhas, etc. | CP9 | LGPD | Must Have |



## Justificativa da Priorização (Visão de Negócio)

*   **Must Have (Obrigatórios para o MVP):** Foram priorizadas as funções que atacam o coração do problema: a fragmentação da informação.
*   **Should Have (Importantes, mas não bloqueiam o lançamento):** São fundamentais para a experiência completa, mas a plataforma já gera valor sem eles.
*   **Could Have (Desejáveis):** Botões de curtida e customizações complexas de notificações (RF-08, RF-27) geram conforto, mas não são o foco principal.
*   **Won't Have (Fora do Escopo Inicial):** A importação de dados de outras redes (RF-31) foi isolada. Demandaria esforço alto de integração com APIs externas.

## Matriz de Avaliação Técnica × Valor de Negócio (Atualizada e Ordenada)

| Requisito | VB | CX | ES | PT | IP | Quadrante | Prioridade Sugerida |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- | :--- |
| **RF-12** - Acessar perfil da entidade | 5 | 1 | 1 | 1.0 | 5.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-17** - Acessar perfil de usuário | 5 | 1 | 1 | 1.0 | 5.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-03** - Atualizar status de um processo seletivo | 4 | 1 | 1 | 1.0 | 4.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-04** - Cancelar um processo seletivo | 4 | 1 | 1 | 1.0 | 4.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-22** - Deletar um projeto | 4 | 1 | 1 | 1.0 | 4.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-25** - Apagar publicações | 4 | 1 | 1 | 1.0 | 4.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-01** - Exibir processos seletivos abertos | 5 | 1 | 2 | 1.5 | 3.33 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-14** - Cadastrar perfil de usuário | 5 | 2 | 2 | 2.0 | 2.50 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-15** - Editar perfil de usuário | 5 | 2 | 2 | 2.0 | 2.50 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-02** - Filtrar processos seletivos abertos | 4 | 2 | 2 | 2.0 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-05** - Criar um processo seletivo | 5 | 2 | 3 | 2.5 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-06** - Filtrar feed por preferências do usuário | 5 | 3 | 2 | 2.5 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-09** - Criar perfil da entidade publicamente | 5 | 2 | 3 | 2.5 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-10** - Editar perfil da entidade | 4 | 2 | 2 | 2.0 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-16** - Excluir perfil de usuário (LGPD) | 5 | 3 | 2 | 2.5 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-19** - Atualizar projeto | 4 | 2 | 2 | 2.0 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-21** - Criar um novo projeto | 5 | 2 | 3 | 2.5 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-24** - Editar publicações | 4 | 2 | 2 | 2.0 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-07** - Divulgar publicações no formato de blog | 4 | 2 | 3 | 2.5 | 1.60 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-23** - Criar publicações | 5 | 2 | 2 | 2.5 | 2.00 | Q2 - Alto valor / Alta carga | Prioridade 1 |
| **RF-18** - Exibir painel de gestão | 4 | 3 | 3 | 3.0 | 1.33 | Q2 - Alto valor / Alta carga | Prioridade 2 |
| **RF-08** - Interagir com publicações (curtidas) | 2 | 1 | 1 | 1.0 | 2.00 | Q3 - Baixo valor / Baixa carga | Prioridade 2 |
| **RF-11** - Excluir perfil da entidade | 3 | 2 | 2 | 2.0 | 1.50 | Q3 - Baixo valor / Baixa carga | Prioridade 3 |
| **RF-20** - Visualizar histórico de projetos | 3 | 2 | 2 | 2.0 | 1.50 | Q3 - Baixo valor / Baixa carga | Prioridade 3 |
| **RF-13** - Gerenciar co-gestores | 3 | 3 | 2 | 2.5 | 1.20 | Q3 - Baixo valor / Baixa carga | Prioridade 3 |
| **RF-26** - Pesquisar publicações c/ filtros de busca | 3 | 3 | 3 | 3.0 | 1.00 | Q4 - Baixo valor / Alta carga | Prioridade 4 |
| **RF-30** - Exibir métricas para publicações | 3 | 3 | 3 | 3.0 | 1.00 | Q4 - Baixo valor / Alta carga | Prioridade 4 |
| **RF-29** - Exibir métricas para entidades | 3 | 3 | 4 | 3.5 | 0.86 | Q4 - Baixo valor / Alta carga | Prioridade 4 |
| **RF-28** - Notificar usuários automaticamente | 3 | 4 | 4 | 4.0 | 0.75 | Q4 - Baixo valor / Alta carga | Prioridade 4 |
| **RF-27** - Personalizar conteúdos de notificação | 2 | 3 | 3 | 3.0 | 0.67 | Q4 - Baixo valor / Alta carga | Prioridade 4 |
| **RF-31** - Importar posts de outras redes | 1 | 5 | 5 | 5.0 | 0.20 | Q4 - Baixo valor / Alta carga | Prioridade 4 |

<!-- ## Valor de negócio x Esforço da equipe

O quadro foi feito na plataforma miro e pode ser acessado [clicando aqui](https://miro.com/app/board/uXjVHTrU614=/?share_link_id=624567294148)

### Quadro valor de negócio x esforço da equipe
![Quadro valor de negócio x esforço da equipe](../assets/fotos/valorXesforco/matrix.jpg)



### Maior valor de negócio e menor esforço

![Maior valor e menor esforço](../assets/fotos/valorXesforco/MVLE.png)

### Maior valor de negócio e maior esforço

![Maior valor e maior esforço](../assets/fotos/valorXesforco/MVME.png)

### Menor valor de negócio e menor esforço

![Menor valor e menor esforço](../assets/fotos/valorXesforco/LVLE.png)

### Menor valor de negócio e maior esforço

![Menor valor e menor esforço](../assets/fotos/valorXesforco/LVME.png) -->


