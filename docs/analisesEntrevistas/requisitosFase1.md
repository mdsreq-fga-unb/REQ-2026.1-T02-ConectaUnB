## Introdução

Após a primeira fase de elicitação e descoberta o grupo reuniu os requisitos declarados nas 3 entrevistas e os reuniu na seguinte tabela:


## Requisitos funcionais (RFs)
| Cod | Nome | Texto estruturado | Objetivo Específico | Característica do produto | Valor de negócio (VN) principal |
| :---: | :--- | :--- | :--- | :---: | :---: |
| RF-1-01 | Filtrar processos seletivos abertos | O sistema deve permitir filtrar procesos seletivos abertos | OE2 OE3 | CP5 | *VNX* |
| RF-1-02 | Criar publicações | O sistema deve permitir criar posts com apenas textos, sem necessidade de imagens | OE1 OE2 OE3 OE5 | CP4 CP6 | *VNX* |
| RF-1-03 | Notificar usuários personalizadamente | O sistema poderia permitir o usuário solicitar notificações de acordo com sua vontade | OE2 OE3 | *CPX* | *VNX* |
| RF-1-04 | Importar posts de outras redes | Seria legal se o sistema permitisse importar posts de outras redes sociais | OE1 OE2 OE3 | CP2 CP4 CP6 | *VNX* |
| RF-1-05 | Registrar métricas de engajamento | O sistema deve registrar métricas de engajamentos de posts individuais | OE4 | CP3 | VN3 |
| RF-1-06 | Atualizar status processo seletivo | O sistema deve permitir a atualização do status de um processo seletivo | OE1 OE2 OE3 | CP4 | *VNX* |
| RF-1-07 | Cancelar processo seletivo | O sistema deve permitir o cancelamento de um processo seletivo | OE1 OE2 OE3 | CP4 | VN2 |
| RF-2-01 | Cadastrar perfil da entidade publicamente | O sistema deve permitir o cadastro de um perfil público de entidade contendo a descrição detalhada do propósito e das atividades. | OE1 OE2 OE3 | *CPX* | *VNX* |
| RF-2-02 | Atualizar andamento de projetos | O sistema deve permitir a publicação de atualizações de projetos contendo texto e imagens. | OE1 OE2 OE3 OE5 | *CPX* | *VNX* |
| RF-2-03 | Atualizar andamento de projetos | O sistema deve permitir a classificação de projetos no momento da publicação (finalizado, em andamento, etc.). | *OEX* | *CPX* | *VNX* |
| RF-2-04 | Visualizar histórico de projetos | O sistema deve exibir o histórico de projetos anteriores e inativos no perfil de cada entidade. | *OEX* | *CPX* | *VNX* |
| RF-2-05 | Filtrar feed de acordo com preferências do usuário | O sistema deve permitir a configuração de filtros de interesses pessoais (ex: equipes de competição, PIBIC) para personalizar o feed de visualização do aluno. | *OEX* | *CPX* | *VNX* |
| RF-2-06 | Enviar notificações | O sistema deve emitir notificações direcionadas aos alunos baseadas nos filtros de interesse configurados em seus perfis. | *OEX* | *CPX* | *VNX* |
| RF-2-07 | Exibir métricas de engajamento para as entidades | O sistema deve gerar um painel de métricas de acesso para a entidade exibindo o número de interações realizadas. | *OEX* | *CPX* | *VNX* |
| RF-3-01 | Administrar posts na plataforma | O sistema deve permitir o cadastro, a edição e a exclusão de postagens contendo texto e mídias (fotos e vídeos) sobre as visitas e os projetos de extensão realizados [2, 4]. | *OEX* | *CPX* | *VNX* |
| RF-3-02 | Divulgar publicações no formato de portifólio | O sistema deve exibir uma interface pública no formato de portfólio (ou blog) para a divulgação das atividades de extensão cadastradas no perfil.| *OEX* | *CPX* | *VNX* |
| RF-3-03 | Pesquisar posts usando filtros de busca | O sistema deve permitir a aplicação de filtros para pesquisar as métricas de impacto e as postagens.| *OEX* | *CPX* | *VNX* |
| RF-3-04 | Registrar atividades de extensão | O sistema deve permitir o registro de atividades de extensão, associando-as obrigatoriamente a uma data e a um tipo de ação.| *OEX* | *CPX* | *VNX* |


## Requisitos não funcionais (RNFs)
| Cod | Classificação URPS+ | Nome | Texto descritivo | Objetivo Específico | Característica do produto | Valor de negócio (VN) principal |
| :---: | :---: | :---: | :--- | :--- | :---: | :--- |
| RNF-1-01 | Usabilidade | Acessar plataforma sem login | O sistema deve permitir o primeiro acesso a plataforma sem necessidade de login | OE1 OE2 OE3 | CP7 | *VNX* |
| RNF-2-01 | Usabilidade | Personalizar visualização | O sistema deve exibir os avisos e conteúdos de forma personalizada, filtrando as informações para evitar a poluição visual característica dos murais gerais. | *OEX* | *CPX* | *VNX* |
| RNF-3-01 | Usabilidade | Facilidade no uso |O sistema deve apresentar uma interface minimalista e extremamente intuitiva, garantindo uma baixa curva de aprendizado para que usuários idosos ou com pouca afinidade tecnológica consigam realizar postagens sem necessidade de treinamento prévio. | *OEX* | *CPX* | *VNX* |
| RNF-3-02 | Usabilidade | Manter consistência visual | O sistema deve manter uma consistência visual padronizada para todos os perfis de acesso, reduzindo a confusão e a complexidade de navegação. | *OEX* | *CPX* | *VNX* |
| RNF-3-03 | Desemepnho | Garantir responsividade | O sistema deve possuir interface responsiva, facilitando postagens rápidas pelo celular durante a realização de visitas ou atividades de campo. | *OEX* | *CPX* | *VNX* |


## Regras de negócio
| Cod | Texto descritivo | OE | Característica do produto | Valor de negócio (VN) principal |
| :---: | :--- | :---: | :---: | :---: |
| RN-1-01 | Suportar sistemas já usados pelas entidades nos atos de inscrição, como por exemplo google forms e microsoft forms | OE1 OE2 |  *CPX* | *VNX* |
| RN-2-01 | Restringir a publicação de atualizações de projetos apenas aos usuários que estiverem previamente vinculados ao perfil da entidade publicadora. | *OEX* | *CPX* | *VNX* |
| RN-2-02 | Utilizar obrigatoriamente *tags* de status padronizadas e de domínio fechado pelo sistema para a classificação dos projetos. | *OEX* | *CPX* | *VNX* |
| RN-3-01 | Manter a unicidade de ferramentas de edição na gestão do perfil, aplicando hierarquias ou níveis de permissão para usuários logados vinculados ao projeto. | *OEX* | *CPX* | *VNX* |
