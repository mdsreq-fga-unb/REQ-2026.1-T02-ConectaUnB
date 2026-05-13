## Introdução

Após a primeira fase de elicitação e descoberta o grupo declarou os requisitos entendidos e subentendidos das três entrevistas e os reuniu na seguinte tabela:


## Requisitos funcionais (RFs)
| Cod | Nome | Texto estruturado | Característica do produto | Rastreabiliade vídeos
| :---: | :--- | :--- | :--- | :---: | 
| Processos seletivos | |  |  |  |
| RF-01 | Exibir processos seletivos abertos | O sistema deve permitir exibir todos os procesos seletivos abertos | CP5 | RF-1-01 |
| RF-02 | Filtrar processos seletivos abertos | O sistema deve permitir filtrar processos seletivos abertos | CP5 | RF-1-01 |
| RF-03 | Atualizar status de um processo seletivo | O sistema deve permitir a atualização do status de um processo seletivo | CP4 | RF-1-06 |
| RF-04 | Cancelar um processo seletivo | O sistema deve permitir o cancelamento de um processo seletivo | CP4 | RF-1-07 |
| RF-05 | Criar um processo seletivo | O sistema deve permitir a criação de um processo seletivo delimitando data limite para inscrição | CP4 | RF-1-07 |
| FEED | |  |  |  |
| RF-06 | Filtrar feed de acordo com preferências do usuário | O sistema deve permitir a configuração de filtros de interesses pessoais (ex: equipes de competição, PIBIC) para personalizar o feed de visualização do aluno. | CP5 | RF-2-05 |
| RF-07 | Divulgar publicações no formato de blog | O sistema deve exibir uma interface pública no formato de blog para a divulgação das atividades de extensão cadastradas no perfil.| CP2 | RF-3-02 |
| PERFIL | |  |  |  |
| RF-08 | Cadastrar perfil da entidade publicamente | O sistema deve permitir o cadastro de um perfil público de entidade contendo a descrição detalhada do propósito e das atividades. | CP1 | RF-2-01 |
| RF-09 | Editar perfil da entidade | O sistema deve permitir a atualização dos dados de um perfil público de entidade. | CP1 | RF-2-01 |
| RF-10 | Excluir perfil da entidade | O sistema deve permitir a exclusão dos dados de um perfil de entidade. | CP1 | RF-2-01 |
| RF-11 | Acessar perfil da entidade | O sistema deve permitir a visualização dos dados de um perfil de entidade. | CP1 | RF-2-01 |
| PROJETO | |  |  |  |
| RF-12 | Atualizar andamento de projetos | O sistema deve permitir a publicação de atualizações de projetos contendo texto e imagens. | CP6 | RF-2-02 |
| RF-13 | Visualizar histórico de projetos | O sistema deve exibir o histórico de projetos anteriores e inativos no perfil de cada entidade. | CP6 | RF-2-04 |
| RF-14 | Criar um novo projeto | O sistema deve permitir a publicação de atualizações de projetos contendo texto e imagens. | CP6 | RF-2-02 |
| RF-15 | Deletar um projeto | O sistema deve permitir a deleção de projetos. | CP6 | RF-2-02 |
| PUBLICAÇÕES | |  |  |  |
| RF-16 | Criar publicações | O sistema deve permitir criar posts com apenas textos, sem necessidade de imagens | CP4 CP6 | RF-1-02|
| RF-17 | Editar publicações | O sistema deve permitir editar posts | CP4 CP6 | RF-1-02|
| RF-18 | Apagar publicações | O sistema deve permitir a deleção de posts | CP4 CP6 | RF-1-02|
| RF-19 | Pesquisar publicações com filtros de busca | O sistema deve permitir a busca por posts através de filtros como tipo de entidade | CP5 | RF-3-03 |
| NOTIFICAÇÕES | |  |  |  |
| RF-20 | Notificar usuários personalizadamente | O sistema poderia permitir o usuário solicitar notificações de acordo com sua vontade | CP8 | RF-1-03 RF-2-06|
| MÉTRICAS | |  |  |  |
| RF-21 | Exibir métricas de engajamento para as entidades | O sistema deve gerar um painel de métricas de acesso para a entidade exibindo o número de interações realizadas. | CP3 | RF-2-07 |
| INTEGRAÇÃO | |  |  |  |
| RF-22 | Importar posts de outras redes | Seria legal se o sistema permitisse importar posts de outras redes sociais | CP4 | RF-1-04 |

## Requisitos não funcionais (RNFs)
| Cod | Classificação URPS+/Sommervile | Nome | Texto descritivo | Característica do produto | Rastreabiliade vídeos |
| :---: | :---: | :---: | :--- | :--- | :--- |
| RNF-01 | Usabilidade | Acessar plataforma sem login | O sistema deve permitir o primeiro acesso a plataforma sem necessidade de login | CP7 | RNF-1-01 |
| RNF-02 | Usabilidade | Facilidade no uso | O sistema deve apresentar uma interface minimalista, possibilitando o acesso de qualquer funcionalidade da aplicação com menos de 4 cliques. | CP7 | RNF-3-01 |
| RNF-03 | Usabilidade | Manter consistência visual | O sistema deve manter uma consistência visual padronizada para todos os perfis de acesso, reduzindo a confusão e a complexidade de navegação. | CP7 | RNF-3-02 |
| RNF-04 | Usabiliadade | Garantir responsividade | O sistema deve possuir interface responsiva, sempre comunicando com o usuário se o processamento foi concluído ou não, se houve algum erro e como o usuário pode corrigir. | CP7 | RNF-3-03 |
| RNF-06 | Suportabilidade | Uso mobile e desktop | O sistema deve ser funcional em desktops e mobile (através do navegador). | CP7 | XXXX |
| RNF-07 | Desempenho | Carregamento rápido de páginas | As páginas devem carregar em menos de 10 segundos em média. | CP7 | XXXX |
| RNF-08 | Requisito externo | Coleta de métricas de acordo com LGPD | As coletas de dados para métricas devem ser realizadas de maneira anonimizada e é necessário avisar ao usuário que esta informação será coletada | CP9 | XXXX |


## Valor de negócio x Esforço da equipe

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

![Menor valor e menor esforço](../assets/fotos/valorXesforco/LVME.png)


