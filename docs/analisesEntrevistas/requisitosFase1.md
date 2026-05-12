## Introdução

Após a primeira fase de elicitação e descoberta o grupo declarou os requisitos entendidos e subentendidos das três entrevistas e os reuniu na seguinte tabela:


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
| RF-2-03 | Classificar projetos | O sistema deve permitir a classificação de projetos no momento da publicação (finalizado, em andamento, etc.). | *OEX* | *CPX* | *VNX* |
| RF-2-04 | Visualizar histórico de projetos | O sistema deve exibir o histórico de projetos anteriores e inativos no perfil de cada entidade. | *OEX* | *CPX* | *VNX* |
| RF-2-05 | Filtrar feed de acordo com preferências do usuário | O sistema deve permitir a configuração de filtros de interesses pessoais (ex: equipes de competição, PIBIC) para personalizar o feed de visualização do aluno. | *OEX* | *CPX* | *VNX* |
| RF-2-06 | Enviar notificações personalizadas | O sistema deve emitir notificações direcionadas aos alunos baseadas nos filtros de interesse configurados em seus perfis. | *OEX* | *CPX* | *VNX* |
| RF-2-07 | Exibir métricas de engajamento para as entidades | O sistema deve gerar um painel de métricas de acesso para a entidade exibindo o número de interações realizadas. | *OEX* | *CPX* | *VNX* |
| RF-3-01 | Administrar posts na plataforma | O sistema deve permitir o cadastro, a edição e a exclusão de postagens contendo texto e mídias (fotos e vídeos) sobre as visitas e os projetos de extensão realizados. | *OEX* | *CPX* | *VNX* |
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


### RN-01
- **ID:** RN-01
- **Nome da Regra:** Permissão para gestão da entidade.
- **Descrição:** Apenas usuários autenticados e previamente cadastrados como "Líder" ou "Coordenador" de uma entidade possuem permissão para gerenciar as informações do perfil, criar ou editar postagens e alterar o status dos projetos daquela entidade específica.
- **Justificativa:** Garantir a segurança e a veracidade das informações, evitando que visitantes ou alunos não vinculados alterem dados oficiais da equipe.
- **Fonte:** Entrevistas com Stakeholders.
- **Impacto Esperado:** O sistema deverá validar o vínculo do usuário com a entidade antes de liberar os botões e ferramentas de edição do "Módulo de Perfis Institucionais".
- **Rastreabilidade - CPs:** Restringe a CP1 (Módulo de Perfis Institucionais) e afeta a CP4 (Publicações independentes).


---


### RN-02
- **ID:** RN-02
- **Nome da Regra:** Autenticação e distinção de comunidade acadêmica.
- **Descrição:** Para ser reconhecido como "Aluno" e ter a capacidade de se vincular a um perfil institucional (como membro de uma entidade), o usuário deve obrigatoriamente possuir um vínculo institucional da Universidade de Brasília (e-mail institucional), diferenciando-se de usuários "de fora" (visitantes).
- **Justificativa:** Resolver a ambiguidade mapeada sobre "quem é aluno e quem é de fora", garantindo que a composição das entidades e a métrica de engajamento sejam precisas e restritas à comunidade acadêmica real.
- **Fonte:**  Entrevistas com Stakeholders.
- **Impacto Esperado:** O cadastro de usuários com privilégios de membro no Módulo de Perfis será com base no email institucional; contas não institucionais terão acesso apenas de leitura.
- **Rastreabilidade - CPs:** Condiciona a CP1 (Módulo de Perfis Institucionais) e a CP3 (Métricas de Engajamento).


---


### RN-03
- **ID:** RN-03
- **Nome da Regra:** Exclusividade de notificação por filtro de interesse.
- **Descrição:** A emissão de notificações não devem ser enviadas em massa. O conteúdo entregue ao aluno logado deve ser obrigatoriamente condicionado e filtrado pelas preferências e interesses pessoais (ex: PIBIC, vagas de EJ, Atléticas) previamente configurados em seu perfil.
- **Justificativa:** Resolver a frustração da comunidade com a comunicação atual (como os e-mails do SIGAA que notificam tudo e acabam ignorados, e a confusão de cartazes nos murais), garantindo que a notificação seja centrada apenas em informações relevantes para quem as lê, evitando a sobrecarga de avisos desnecessários.
- **Fonte:** Entrevistas com Stakeholders.
- **Impacto Esperado:** O algoritmo responsável pelas notificações deverá obrigatoriamente cruzar as *tags* da postagem/aviso recém-criada com as *tags* de interesse do usuário antes de disparar qualquer alerta.
- **Rastreabilidade - CPs:** Condiciona diretamente a CP2 (Feed de visualização) e a CP5 (Mecanismo de Busca e Filtragem).


---


### RN-04
- **ID:** RN-04
- **Nome da Regra:** Nomenclatura padronizada para oportunidades e projetos.
- **Descrição:** Os status indicativos dos projetos e das publicações (especialmente os indicativos de "Processo de Inscrição Aberto") não podem ser de preenchimento livre em texto por parte do publicador. Eles devem obrigatoriamente respeitar um domínio fechado e padronizado pelo sistema (ex: "Inscrições Abertas", "Em andamento", "Finalizado").
- **Justificativa:** Garantir que o mecanismo de busca funcione de forma consistente e que os usuários encontrem facilmente informações claras sobre quais entidades estão com processos de inscrição abertos, impedindo a criação de nomenclaturas diversas que quebrem a filtragem no feed.
- **Fonte:** Entrevistas com Stakeholders.
- **Impacto Esperado:** A interface de criação de publicações de projetos deverá fornecer uma lista restrita de status, e o Feed de Visualização utilizará esses valores padronizados para gerar indicativos visuais claros nos posts.
- **Rastreabilidade - CPs:** Condiciona a CP2 (Feed de visualização), afeta a CP4 (Publicações independentes) e a CP5 (Mecanismo de Busca e Filtragem).


---


### RN-05
- **ID:** RN-05
- **Nome da Regra:** Diferenciação de engajamento por perfil institucional.
- **Descrição:** Os dados apresentados no painel de métricas das incrições devem obrigatoriamente segmentar o público, diferenciando interações realizadas por "Alunos" autenticados com e-mail institucional, segmentados por curso.
- **Justificativa:** Resolver a frustração relatada de que "likes do Instagram não dizem nada", entregando a profundidade necessária para que as entidades saibam exatamente a taxa de conversão e qual perfil acadêmico querem se inscrever.
- **Fonte:** Entrevistas com Stakeholders.
- **Impacto Esperado:** O algoritmo de coleta de métricas deverá registrar dados de perfil a cada inscrição, para gerar os dados segmentados na visualização de métricas durante o período de inscrição.
- **Rastreabilidade - CPs:** Condiciona a CP3 (Métricas de Engajamento) e depende da CP1 (Módulo de Perfis Institucionais).


---


### RN-06
- **ID:** RN-06
- **Nome da Regra:** Anonimização e agregação de dados de engajamento.
- **Descrição:** Os dados de interação (visualizações, cliques e acessos) apresentados nas métricas das entidades devem ser exibidos de forma estritamente agregada e anonimizada. É terminantemente proibida a exibição de logs transacionais ou dados que permitam a identificação, direta ou indireta, do aluno que consumiu o conteúdo (como nome, matrícula ou e-mail institucional).
- **Justificativa:** Garantir conformidade com a LGPD, onde o dado anonimizado perde a possibilidade de associação ao indivíduo, deixando de ser classificado como dado pessoal.
- **Fonte:** Lei Geral de Proteção de Dados.
- **Impacto Esperado:** Deverá realizar o agrupamento das visualizações por categorias genéricas, impossibilitando a reversão dos dados para o perfil do usuário original.
- **Rastreabilidade - CPs:** Condiciona e restringe diretamente a CP3 (Métricas de Engajamento).


---


### RN-07
- **ID:** RN-07
- **Nome da Regra:** Princípio da Necessidade e proteção de dados sensíveis.
- **Descrição:** O rastreamento de perfil para fins de geração de métricas de engajamento na plataforma deve se limitar ao mínimo necessário para a finalidade da análise acadêmica. É expressamente vedada a coleta, o cruzamento ou o uso de "dados pessoais sensíveis" do discente (como raça/cor, etnia, saúde, ou renda familiar) para a formação de perfis comportamentais nas métricas de publicações.
- **Justificativa:** Atender ao Princípio da Necessidade imposto pela LGPD (limitação do tratamento ao mínimo necessário). No contexto da UnB, dados sensíveis gozam de uma camada extra de proteção rigorosa, pois seu vazamento ou tratamento discriminatório pode gerar prejuízos existenciais graves aos indivíduos.
- **Fonte:** Lei Geral de Proteção de Dados.
- **Impacto Esperado:** O sistema não devem possuir permissão para ler, cruzar ou espelhar tabelas da API de alunos da UnB que contenham marcadores socioeconômicos ou de saúde.
- **Rastreabilidade - CPs:** Restringe a CP3 (Métricas de Engajamento).


---


### RN-08
- **ID:** RN-08
- **Nome da Regra:** Retenção temporal do histórico e eliminação de dados.
- **Descrição:** O repositório manterá o histórico e as informações vitais de processos e iniciativas passadas de forma perene. Contudo, dados pessoais sensíveis ou de identificação direta de alunos coletados em formulários internos de inscrição deverão ser eliminados ou irreversivelmente anonimizados após o encerramento do processo seletivo correspondente.
- **Justificativa:** Adequar a manutenção do histórico institucional ao Art. 16 da LGPD, que determina que os dados pessoais devem ser eliminados após o término de seu tratamento (finalidade alcançada), evitando o acúmulo de dados desnecessários no banco do sistema.
- **Fonte:** Lei Geral de Proteção de Dados Pessoais.
- **Impacto Esperado:** O sistema deverá possuir uma rotina que, ao detectar que uma postagem de processo seletivo foi finalizada, limpe automaticamente eventuais listagens nominais de inscritos atreladas a ela.
- **Rastreabilidade - CPs:** Condiciona e restringe a CP6 (Repositório Histórico de Iniciativas).


---


### RN-09
- **ID:** RN-09
- **Nome da Regra:** Permissão de redirecionamento para fluxos externos.
- **Descrição:** As publicações de processos seletivos e eventos não são obrigadas a utilizar formulários internos da plataforma. É expressamente permitido o uso de links de redirecionamento para ferramentas externas no corpo das publicações.
- **Justificativa:** Respeitar a autonomia das entidades para manterem seus fluxos de inscrição originais.
- **Fonte:** Análise de Entrevista.
- **Impacto Esperado:** O módulo de criação de postagens deve renderizar hiperlinks clicáveis com segurança, direcionando o aluno para fora da plataforma em uma nova aba do navegador.
- **Rastreabilidade - CPs:** Condiciona a CP4 (Publicações independentes).


---


### RN-10
- **ID:** RN-10
- **Nome da Regra:** Moderação descentralizada de publicações.
- **Descrição:** O gerenciamento, a edição, a exclusão e a moderação do conteúdo das publicações independentes serão de inteira responsabilidade da própria entidade publicadora, não existindo uma etapa de moderação ou aprovação central da universidade antes da postagem ir ao ar.
- **Justificativa:** Promover a agilidade na comunicação (respondendo à dor de que as redes atuais são pouco eficientes e lentas) e garantir que as próprias entidades possuam e gerenciem as ferramentas de moderação de seu conteúdo.
- **Fonte:** Análise de Entrevista.
- **Impacto Esperado:** A interface deve fornecer aos "Líderes" ou "Coordenadores" da entidade os botões de controle para excluírem e editarem suas próprias postagens publicadas, atuando como moderadores diretos.
- **Rastreabilidade - CPs:** Condiciona a CP4 (Publicações independentes).


### RN-11
- **ID:** RN-11
- **Nome da Regra:** Obrigatoriedade de categorização para rastreabilidade de busca.
- **Descrição:** Para que uma entidade ou projeto seja indexado e localizado com precisão nos filtros do sistema, é obrigatória a sua associação no momento do cadastro a categorias padronizadas.
- **Justificativa:** Solucionar a dor do desconhecimento e desorganização da informação das atividades de extesão.
- **Fonte:** Análise de Entrevista.
- **Impacto Esperado:** O mecanismo de indexação e os componentes visuais de filtro só funcionarão consumindo a listagem dessas tags.
- **Rastreabilidade - CPs:** Condiciona a CP5 (Mecanismo de Busca e Filtragem) e restringe a CP1 (Módulo de Perfis Institucionais).


---


### RN-12
- **ID:** RN-12
- **Nome da Regra:** Acesso livre ao catálogo institucional.
- **Descrição:** A navegação pelo portfólio das entidades e pela leitura das publicações independentes não deve exigir nenhum tipo de cadastro prévio, login, ou barreiras restritivas para os visitantes externos.
- **Justificativa:** Garantir o alcance democrático da plataforma para a sociedade e resolver a dor das entidades em atingir novos públicos, especialmente calouros recém-ingressos que ainda estão construindo suas redes de contatos.
- **Fonte:** Análise de Entrevista.
- **Impacto Esperado:** A aplicação deve manter as páginas de perfil das entidades e o feed geral como rotas públicas.
- **Rastreabilidade - CPs:** Condiciona e define o funcionamento base da CP7 (Portal de Acesso Público).

