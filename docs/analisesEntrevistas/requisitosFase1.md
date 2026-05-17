## Introdução

Após a primeira fase de elicitação e descoberta o grupo declarou os requisitos entendidos e subentendidos das três entrevistas e os reuniu na seguinte tabela:


## Requisitos funcionais (RFs)
| Cod | Nome | Texto estruturado | Característica do produto | Rastreabilidade | Priorização MoSCoW | Critérios de aceitação |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| Processos seletivos |  |  |  |  |  |  |
| RF-01 | Exibir processos seletivos abertos | O sistema deve permitir exibir todos os procesos seletivos abertos | CP5 | RF-1-01 | Must Have |CA1: O sistema deve exibir os processos seletivos abertos quando qualquer usuário (autenticado ou não) acessar a listagem de processos <br>CA2: Aenas as seleções não expiradas sejam exibidas. |
| RF-02 | Filtrar processos seletivos abertos | O sistema deve permitir filtrar processos seletivos abertos | CP5 | RF-1-01 | Must Have | CA1: O sistema deve filtrar os processos seletivos abertos quando o usuário aplicar um ou mais parâmetros de categorização na busca, exibindo apenas as categorias selecionadas. |
| RF-03 | Atualizar status de um processo seletivo | O sistema deve permitir a atualização do status de um processo seletivo de uma entidade | CP4 | RF-1-06 | Must Have | CA1: O sistema deve atualizar o status de um processo seletivo quando o usuário com privilégios de gestor da entidade submeter a alteração. <br>CA2: A mudança deve surtir efeito em até 5 segundos. |
| RF-04 | Cancelar um processo seletivo | O sistema deve permitir o cancelamento de um processo seletivo de uma entidade | CP4 | RF-1-07 | Must Have | CA1: O sistema deve cancelar um processo seletivo quando o gestor da entidade confirmar a ação de cancelamento. <br>CA2:Seu estado deve ser alterado para "Cancelado" <br>CA3: Processos cancelados não devem aparecer publicamente. |
| RF-05 | Criar um processo seletivo | O sistema deve permitir a criação de um processo seletivo de uma entidade delimitando data limite para inscrição | CP4 | RF-1-07 | Must Have | CA1: O sistema deve criar um processo seletivo quando o gestor da entidade submeter o formulário preenchido corretamente. <br> CA2: É necessário delimitar uma data de término de inscrição válida. |
| FEED |  |  |  |  |  |  |
| RF-06 | Filtrar feed de acordo com preferências do usuário | O sistema deve permitir a configuração de filtros de interesses pessoais (ex: equipes de competição, PIBIC) para personalizar o feed de visualização do aluno. | CP5 | RF-2-05 | Must Have | CA1: O sistema deve filtrar as publicações do feed quando o usuário autenticado tiver filtros de interesses pessoais configurados, restringindo a exibição exclusivamente às postagens que possuam as tags ou categorias correspondentes às suas preferências. |
| RF-07 | Divulgar publicações no formato de blog | O sistema deve exibir uma interface pública no formato de blog para a divulgação das atividades publicadas no perfil de uma entidade. | CP2 | RF-3-02 | Must Have | CA1: O sistema deve exibir as publicações de uma entidade quando o usuário acessar o perfil institucional correspondente. |
| PERFIL - ENTIDADE |  |  |  |  |  |  |
| RF-09 | Criar perfil da entidade publicamente | O sistema deve permitir a criação de perfis institucionais de entidades por usuários autenticados (docentes ou discentes), atribuindo automaticamente ao criador o papel de gestor da página criada. | CP1 | RF-2-01 | Must Have | CA1: A criação do perfil da entidade só será considerada concluída quando o usuário preencher os campos obrigatórios corretamente, o banco de dados der o feedback de insert concluído, fazendo o usuário receber a mensagem de confirmação “Cadastro concluído com sucesso” na tela e for redirecionado para a página de login. <br>CA2: Se houver um problema em qualquer parte da criação de conta o usuário deve ser avisado como prosseguir |
| RF-10 | Editar perfil da entidade | O sistema deve permitir a atualização dos dados de um perfil público de entidade. | CP1 | RF-2-01 | Must Have |CA1: A edição do perfil da entidade só será considerada concluída quando o usuário salvar as alterações realizadas, o banco de dados der o feedback de atualização concluída, o user receberá a mensagem “Edição concluída com sucesso” na tela e for redirecionado para a página de perfil com as informações atualizadas. <br>CA2: Caso haja falha na edição o usuário deve ser avisado como prosseguir. |
| RF-11 | Excluir perfil da entidade | O sistema deve permitir a exclusão dos dados de um perfil de entidade. | CP1 | RF-2-01 | Must Have | CA1: A exclusão do perfil da entidade só será considerada concluída quando o usuário confirmar a ação de exclusão, receber a mensagem “Conta excluída com sucesso” na tela e for redirecionado para a página inicial exibida no formato deslogado. <br>CA2: O perfil só será considerado excluído quando todas as suas evidências forem removidas do banco de dados, incluindo mas não se limitando a tags, posts, comentários, etc. |
| RF-12 | Acessar perfil da entidade | O sistema deve permitir a visualização dos dados de um perfil de entidade. | CP1 | RF-2-01 | Must Have | CA1: O acesso ao perfil da entidade só será considerado concluído quando o usuário for redirecionado para a visualização da entidade e conseguir visualizar corretamente as informações cadastradas, incluindo nome, nome de usuário, foto, publicações e número de seguidores. |
| RF-13 | Gerenciar co-gestores | O sistema deve permitir a adição e a remoção de usuários (docentes ou discentes) como co-gestores de uma entidade quando a ação for realizada por um usuário que já possua privilégios de gestor nela. | CP1 | RF-2-01 | Should Have | CA1: O gerenciamento de co-gestores só será considerado concluído quando o administrador da entidade conseguir adicionar ou remover co-gestores do perfil da entidade, visualizar a lista atualizada de co-gestores e receber uma mensagem de confirmação da ação realizada na tela ("Co-gestor adicionado com sucesso" ou "Co-gestor removido com sucesso"). |
| PERFIL - USUÁRIO |  |  |  |  |  |  |
| RF-14 | Cadastrar perfil de usuário | O sistema deve permitir o cadastro de um perfil público de usuário | CP1 | RF-2-01 | Must Have | CA1: O cadastro do perfil de usuário só será considerado concluído quando o usuário preencher corretamente os campos obrigatórios, receber a mensagem “Cadastro concluído com sucesso” na tela e for redirecionado para a página de login. |
| RF-15 | Editar perfil da usuário | O sistema deve permitir a atualização dos dados de um perfil público de usuário. | CP1 | RF-2-01 | Must Have | CA1: A edição do perfil de usuário só será considerada concluída quando o usuário salvar as alterações realizadas, receber a mensagem “Edição concluída com sucesso” na tela e visualizar as informações atualizadas em sua página de perfil. <br>CA2: O usuário deve ser capaz de alterar foto de perfil/foto do banner/nome/descrição/campus <br>CA3: O usuário só deve receber a mensagem "Edição concluída com sucesso" após o banco de dados der o feedback de alteração concluída. |
| RF-16 | Excluir perfil da usuário | O sistema deve permitir a exclusão dos dados de um perfil de usuário. | CP1 | RF-2-01 | Must Have | CA1: A exclusão do perfil de usuário só será considerada concluída quando o usuário confirmar a exclusão da conta, receber a mensagem “Conta excluída com sucesso” na tela e for redirecionado para a página inicial com a barra de navegação no formato deslogado. <br>CA2: O perfil só será considerado excluído quando todas as suas evidências forem removidas do banco de dados, incluindo mas não se limitando a comentários, configurações de notificações, seguindo, etc. <br> CA3: Por se tratar de dados anonimizados a exclusão de um perfil de usuário não deve afetar as métricas. |
| RF-17 | Acessar perfil da usuário | O sistema deve permitir a visualização dos dados de um perfil de usuário. | CP1 | RF-2-01 | Must Have | CA1:O acesso ao perfil de usuário só será considerado concluído quando o usuário conseguir visualizar corretamente suas informações cadastradas, incluindo nome, nome de usuário e foto de perfil. |
| RF-18 | Exibir painel de gestão | O sistema deve exibir um painel de gestão ao usuário autenticado, listando e permitindo o acesso rápido a todas as entidades nas quais ele possui privilégios de gestão. | CP1 | RF-2-01 | Must Have |  |
| PROJETO |  |  |  |  |  |  |
| RF-19 | Atualizar projeto | O sistema deve permitir a publicação de atualizações de projetos contendo texto e imagens. | CP6 | RF-2-02 | Must Have |  |
| RF-20 | Visualizar histórico de projetos | O sistema deve exibir o histórico de projetos atuais e anteriores no perfil de cada entidade. | CP6 | RF-2-04 | Should Have |  |
| RF-21 | Criar um novo projeto | O sistema deve permitir a publicação de projetos contendo texto e imagem. | CP6 | RF-2-02 | Must Have |  |
| RF-22 | Deletar um projeto | O sistema deve permitir a deleção de projetos. | CP6 | RF-2-02 | Must Have |  |
| PUBLICAÇÕES |  |  |  |  |  |  |
| RF-23 | Criar publicações | O sistema deve permitir criar posts contendo texto e imagem, podendo ser apenas um dos dois | CP4 CP6 | RF-1-02 | Must Have |  |
| RF-24 | Editar publicações | O sistema deve permitir editar posts | CP4 CP6 | RF-1-02 | Must Have |  |
| RF-25 | Apagar publicações | O sistema deve permitir a deleção de posts | CP4 CP6 | RF-1-02 | Must Have |  |
| RF-26 | Pesquisar publicações com filtros de busca | O sistema deve permitir a busca por posts através de filtros | CP5 | RF-3-03 | Should Have |  |
| NOTIFICAÇÕES |  |  |  |  |  |  |
| RF-27 | Personalizar conteúdos de notificação | O usuário deve poder gerenciar suas preferências de notificação escolhendo quais tipos de alertas receber. | CP8 | RF-1-03 RF-2-06 | Could Have | CA01: O sistema deve permitir que o usuário configure suas preferências de notificação.<br>CA02: O sistema deve oferecer a ativação ou desativação dos tipos de notificação disponíveis, como e-mail, push e SMS.<br>CA03: Ao salvar as alterações, o sistema deve atualizar as preferências no banco de dados e aplicá-las imediatamente nos próximos envios. |
| RF-28 | Notificar usuários | O sistema deve enviar uma notificação sempre que houver alteração de status em uma entidade que o usuário segue. | CP8 | RF-1-03 RF-2-06 | Should Have | CA01: Quando uma entidade sofrer alteração de dados ou de status, o sistema deve identificar os usuários que a seguem ou favoritaram.<br>CA02: O sistema deve disparar a notificação em até X minutos após a atualização da entidade.<br>CA03: A notificação deve levar o usuário diretamente ao conteúdo atualizado da entidade. |
| MÉTRICAS |  |  |  |  |  |
| RF-29 | Exibir métricas de engajamento para as entidades | O sistema deve mostrar métricas de engajamento da entidade, indicando o total de seguidores e o número de inscrições em processos seletivos. | CP3 | RF-2-07 | Should Have | CA01: O sistema deve disponibilizar as métricas de engajamento da entidade de forma visível ao usuário autorizado.<br>CA02: O contador de seguidores deve mostrar o número exato de usuários vinculados à entidade.<br>CA03: O contador de inscrições deve mostrar a soma de todas as inscrições realizadas nos processos seletivos da entidade. |
| RF-30 | Exibir métricas de engajamento para publicações | O sistema deve mostrar métricas de interações para cada publicação. | CP3 | RF-2-07 | Should Have | CA01: O sistema deve apresentar o total de interações em cada publicação.<br>CA02: O sistema deve contabilizar e exibir separadamente os tipos de interação, como curtidas, comentários e compartilhamentos.<br>CA03: Os dados de interação devem ser atualizados dinamicamente ou quando houver recarregamento do conteúdo. |
| INTEGRAÇÃO |  |  |  |  |  |  |
| RF-31 | Importar posts de outras redes | O sistema deve permitir importar publicações de redes sociais externas integradas pelo usuário. | CP4 | RF-1-04 | Won't Have | CA01: O sistema deve permitir que o usuário vincule sua conta em uma rede externa, como LinkedIn ou Instagram.<br>CA02: Após a integração, o sistema deve listar os posts recentes da rede externa para que o usuário escolha quais deseja importar.<br>CA03: O post importado deve manter o texto original e as imagens associadas. |



## Requisitos não funcionais (RNFs)
| Cod | Classificação URPS+/Sommervile | Nome | Texto descritivo | Característica do produto | Rastreabiliade | Priorização MoSCoW | Critérios de aceitação |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| RNF-01 | Usabilidade | Acessar plataforma sem login | O sistema deve permitir o acesso à plataforma e a visualização de conteúdos públicos sem exigência de login ou cadastro. | CP7 | RNF-1-01 | Must Have | CA01: Um usuário não autenticado deve conseguir acessar conteúdos públicos da plataforma sem ser redirecionado para login.<br>CA02: Se o usuário tentar executar uma ação restrita, o sistema deve exigir autenticação antes de continuar. |
| RNF-02 | Usabilidade | Facilidade no uso | O sistema deve ter uma interface simples, permitindo que qualquer funcionalidade principal seja alcançada em no máximo 5 cliques. | CP7 | RNF-3-01 | Must Have | CA01: O usuário deve conseguir concluir os fluxos principais do sistema em até 5 cliques.<br>CA02: Os fluxos essenciais devem ser validados por testes para garantir que nenhuma funcionalidade importante exija 6 cliques ou mais. |
| RNF-03 | Usabilidade | Manter consistência visual | O sistema deve manter consistência visual, com a mesma paleta de cores, tipografia e componentes em todas as partes da aplicação. | CP7 | RNF-3-02 | Must Have | CA01: O sistema deve usar o mesmo padrão visual em toda a aplicação.<br>CA02: Componentes iguais devem manter o mesmo comportamento, aparência e funcionamento em todos os perfis de acesso. |
| RNF-04 | Usabiliadade | Garantir responsividade | O sistema deve possuir interface responsiva, sempre comunicando com o usuário se o processamento foi concluído ou não, se houve algum erro e como o usuário pode corrigir. | CP7 | RNF-3-03 | Must Have |  |
| RNF-06 | Suportabilidade | Uso mobile e desktop | O sistema deve ser funcional em desktops e mobile (através do navegador). | CP7 | requisito implícito | Must Have |  |
| RNF-07 | Desempenho | Carregamento rápido de páginas | As páginas devem carregar em menos de 10 segundos em média. | CP7 | requisito implícito | Must Have |  |
| RNF-08 | Requisito externo | Coleta de métricas de acordo com LGPD | As coletas de dados para métricas devem ser realizadas de maneira anonimizada e é necessário avisar ao usuário que esta informação será coletada | CP9 | LGPD | Must Have |  |
| RNF-09 | Requisito externo | Criptografar dados seníveis de usuários e entidades | O sistema deve criptografar os dados sensíveis dos usuários e entidades, como matrículas, senhas, etc. | CP9 | LGPD | Must Have |  |



## Justificativa da Priorização (Visão de Negócio)

*   **Must Have (Obrigatórios para o MVP):** Foram priorizadas as funções que atacam o coração do problema: a fragmentação da informação.
*   **Should Have (Importantes, mas não bloqueiam o lançamento):** São fundamentais para a experiência completa, mas a plataforma já gera valor sem eles.
*   **Could Have (Desejáveis):** Botões de curtida e customizações complexas de notificações (RF-08, RF-27) geram conforto, mas não são o foco principal.
*   **Won't Have (Fora do Escopo Inicial):** A importação de dados de outras redes (RF-31) foi isolada. Demandaria esforço alto de integração com APIs externas.


## Valor de negócio x Esforço da equipe

O quadro foi feito na plataforma miro e pode ser acessado [clicando aqui](https://miro.com/app/board/uXjVHTrU614=/?share_link_id=644318895415)

### Quadro valor de negócio x esforço da equipe
![Quadro valor de negócio x esforço da equipe](../assets/fotos/valorXesforco/matrix.jpg)



### Maior valor de negócio e menor esforço

![Maior valor e menor esforço](../assets/fotos/valorXesforco/MVLE.png)

### Maior valor de negócio e maior esforço

![Maior valor e maior esforço](../assets/fotos/valorXesforco/MVME.png)

### Menor valor de negócio e menor esforço

![Menor valor e menor esforço](../assets/fotos/valorXesforco/LVLE.png)

### Menor valor de negócio e maior esforço

![Menor valor e menor esforço](../assets/fotos/valorXesforco/LVME.png) 

## Matriz de Avaliação Técnica × Valor de Negócio (Atualizada e Ordenada)

| Requisito | Valor de negócio | Complexidade técnica | Esforço | Pontuação técnica | Índice de prioridade | Quadrante | Prioridade Sugerida |
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



