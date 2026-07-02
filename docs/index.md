
Somos estudantes da **Universidade de Brasília (UnB) | Faculdade de Ciências e Tecnologias em Engenharia (FCTE)** e este projeto está sendo desenvolvido no contexto da disciplina de **Requisitos de Software**, ministrada pelo professor e doutor **George Marsicano Correia**, sendo o nome escolhido para o grupo **Capoeira**.

## Visualização de rastreabilidade
Caso o iframe não carregue você pode [acessar nosso miro](https://miro.com/app/board/uXjVHTrU614=/?share_link_id=361857912339), visualizar o [pdf do miro](https://drive.google.com/file/d/1kBZ7op6atCi08PjgWoICVVxFz5fD078_/view?usp=sharing) ou acessar a [página de backup de rastreabilidade](assets/rastreabilidade/rastreabilidade.md).
<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVHTrU614=/?embedMode=view_only_without_ui&moveToViewport=26669,18490,30824,14416&embedId=650722289560" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

O **Conecta UnB** é uma plataforma digital integradora concebida para centralizar a comunicação e as oportunidades dentro do ecossistema acadêmico da Universidade de Brasília (UnB), buscando democratizar o acesso à informação na universidade, impulsionar o engajamento dos estudantes em projetos práticos, reduzir o trabalho de divulgação das entidades e preservar a memória institucional das organizações acadêmicas.

## Cronograma


| Fase (Início - fim) | Atividades + técnicas + evidências | Entregas | Resumo + observações |
| :--- | :--- | :--- | :--- |
|Entrega unidade 1 (14/04)| | | |
| **Fase 1: Requirements Planning**<br><br>10/04 - 24/04 | &bull; Elicitação e descoberta de requisitos<br> &bull; [Entrevista com cliente 1](../userDesign/Fase1/analiseEntrevista24-04.md)<br> &bull; [Entrevista com cliente 2](../userDesign/Fase1/analiseEntrevista29-04.md)<br> &bull; [Entrevista com cliente 3](../userDesign/Fase1/analiseEntrevista30-04.md)<br> &bull; [Análise de documentos e sistemas existentes](../visaoDeProdutoProjeto/solucaoProposta.md#pesquisa-de-mercado-e-analise-competitiva)<br> | &bull; [Lista de requisitos priorizada para o MVP](../requisitos/priorizacao.md) <br> &bull; [Rich picture](../visaoDeProdutoProjeto/cenarioAtual.md#rich-picture)<br> &bull; [Ishikawa](../visaoDeProdutoProjeto/cenarioAtual.md#identificacao-da-oportunidade-ou-problema)<br> &bull; [Mapa de stakeholders](../visaoDeProdutoProjeto/cenarioAtual.md#mapa-de-stakeholders)<br>  | Reunião geral com clientes para entender o problema e planejar abordagem |
| **Fase 2: User Design**<br><br>27/04 - 20/05 | &bull; [Reunião de validação de requisitos e verificação do protótipo 1](../userDesign/Fase2/entrevista1.md) <br>&bull; [Evidências da validação dos requisitos pelos clientes (formulário)](../userDesign/Fase2/evidenciasForms.md)<br>&bull; [Validação do protótipo 2 pelos clientes](../userDesign/Fase2/evidenciasPrototipo2.md) | &bull; [Diagrama de contexto](../visaoDeProdutoProjeto/solucaoProposta.md#diagrama-de-contexto)<br>&bull; [Protótipo 1](../userDesign/Fase2/prototipos.md) <br>&bull; [Protótipo 2](../userDesign/Fase2/evidenciasPrototipo2.md)  | Feedback sobre fluxo de interação, usabilidade e protótipos, além de validar a nossa declaração de requisitos |
|Entrega unidade 2 (19/05)| | | |
| **Fase 3: Construction parte 1**<br><br>21/05 - 31/05 |  | Preparação do ambiente de desenvolvimento| Precisamos replanejar essa semana, tivemos diversos problemas no começo da construção relacionados a execução local e docker. Havíamos planejado entregar os requisitos relacionados ao perfil do usuário nessa fase (Cadastro, login, edição e exclusão da conta de usuário), contudo empurramos essa entrega para a próxima iteração |
| **Construction parte 2**<br><br>01/06 - 16/06 | &bull; Organização e atualização dos requisitos de acordo com [sugestões do outro grupo que nos avaliou](https://www.figma.com/board/IMHjnjS2ZOAbM3Sz0Z7g5l/Ver-e-Val?node-id=0-1&t=iyYJ21VqeF9EfKxP-1) <br> &bull; [Entregas](../../userDesign/Fase3/entregas/entregas/) <br> &bull; [Página Cadastro](https://conectaunb.app/auth/cadastro)<br> &bull; [Página Login](https://conectaunb.app/auth/login) <br> &bull; [Página Perfil](https://conectaunb.app/conecta/perfil/11) | &bull; [**RF-17**](../RFuncionais/RF_17.md) - Cadastrar perfil de usuário <br>&bull; [**RF-18**](../RFuncionais/RF_18.md) - Editar perfil da usuário<br> &bull; [**RF-20**](../RFuncionais/RF_20.md) - Acessar perfil de usuário<br>&bull; [**RF-19**](../RFuncionais/RF_19.md) - Excluir perfil da usuário | Implementamos a porta de acesso da aplicação, funcionalidades de cadastro, login e edição da conta do usuário (mesmo que as funcionalidades relacionadas a entidade tenham sido avaliadas como mais importantes pelos clientes, precisamos que os usuários criem uma conta na plataforma antes de criar uma entidade) |
|Entrega unidade 3 (16/06)| | | |
| **Construction parte 3**<br><br>16/06 - 21/06 | &bull; [Entregas](../../userDesign/Fase3/entregas/entregas/) <br> &bull; [Gestão Entidade](https://conectaunb.app/conecta/entidades/gestao) <br> &bull; [Pagina entidade - Conecta](https://conectaunb.app/conecta/entidades/4) | &bull; [**RF-15**](../RFuncionais/RF_15.md) - Acessar perfil da entidade<br>&bull; [**RF-14**](../RFuncionais/RF_14.md) - Excluir perfil da entidade<br>&bull;[**RF-12**](../RFuncionais/RF_12.md) - Criar perfil da entidade publicamente<br>&bull; [**RF-13**](../RFuncionais/RF_13.md) - Editar perfil da entidade<br>&bull; [**RF-21**](../RFuncionais/RF_21.md) - Exibir entidades nas quais o usuário é gestor/membro | Trabalhamos nos requisitos relacionados às entidades para permitir a implementação dos projetos e publicações na próxima iteração. Buscamos opções de deploy do nosso projeto. |
| **Construction parte 4** <br><br> 21/06 - 28/06<br><br> | &bull; [Entregas](../../userDesign/Fase3/entregas/entregas/) <br> &bull; [Pagina entidade - Conecta](https://conectaunb.app/conecta/entidades/4) (Abrir modais para ver) | &bull; [**RF-25**](../RFuncionais/RF_25.md) - Deletar um projeto<br> &bull; [**RF-22**](../RFuncionais/RF_22.md) - Atualizar projeto<br> &bull; [**RF-23**](../RFuncionais/RF_23.md) - Visualizar histórico de projetos<br> &bull; [**RF-24**](../RFuncionais/RF_24.md) - Criar um novo projeto<br> &bull; [**RF-26**](../RFuncionais/RF_26.md) - Criar publicações<br> &bull; [**RF-27**](../RFuncionais/RF_27.md) - Editar publicações<br> &bull; [**RF-28**](../RFuncionais/RF_28.md) - Apagar publicações| Desenvolvemos os requisitos relacionados a projetos e publicações. Ficamos devendo o feed de publicações que foi empurrado para a próxima iteração |
| **Construction parte 5**<br><br>28/06 - 01/07 | &bull; [Entregas](../../userDesign/Fase3/entregas/entregas/) <br> &bull; [Pagina entidade - Conecta](https://conectaunb.app/conecta/entidades/4) (Abrir modais para ver) <br> &bull; [Gestão Entidade](https://conectaunb.app/conecta/entidades/gestao) (abrir modais para ver) <br> &bull; [Feed](https://conectaunb.app/conecta/feed) <br> &bull; [Notificações](https://conectaunb.app/conecta/notificacoes) |<br> &bull; [**RF-11**](../RFuncionais/RF_11.md) - Visualizar publicações no feed<br> &bull; [**RF-01**](../RFuncionais/RF_01.md) - Exibir processos seletivos abertos<br> &bull; [**RF-02**](../RFuncionais/RF_02.md) - Filtrar processos seletivos abertos<br> &bull; [**RF-03**](../RFuncionais/RF_03.md) - Atualizar status de um processo seletivo<br> &bull; [**RF-05**](../RFuncionais/RF_05.md) - Criar um processo seletivo<br> &bull; [**RF-04**](../RFuncionais/escopo/RF_04.md) - Finalizar um processo seletivo<br> &bull; [**RF-16.1**](../RFuncionais/escopo/RF_16.1.md) - Adicionar Co-gestores das entidades<br> &bull; [**RF-16.2**](../RFuncionais/escopo/RF_16.2.md) - Remover Co-gestores das entidades<br> &bull; [**RF-16.3**](../RFuncionais/escopo/RF_16.3.md) - Visualizar Co-gestores das entidades<br> &bull; [**RF-16.4**](../RFuncionais/escopo/RF_16.4.md) - Atualizar cargos dos Co-gestores das entidades<br> &bull; [**RF-06**](../RFuncionais/escopo/RF_06.md) - Filtrar feed em relação a capums/área de interesse/tipo da entidade<br> &bull; [**RF-29**](../RFuncionais/escopo/RF_29.md) - Pesquisar publicações com filtros de busca de capums/área de interesse/tipo da entidade<br> &bull; [**RF-30**](../RFuncionais/escopo/RF_30.md) - Personalizar preferências de notificação de processo seletivo abertos/publicações/atualização de projetos| Fase final de construção. Houve um replanejamento devido a antecipação da entrega acordada com o professor |
| **Fase 4: Cutover**<br><br> 01/07 | &bull; [Entregas](../../userDesign/Fase4/cutover) |  &bull; Entrega do MVP da aplicação estabilizada <br> &bull; Aplicação devidamente implantada (deploy) e em produção oficial. | Feedback final da aplicação |
|Entrega unidade 4 (02/07)| | | |

## Backlog Realizado

| Requisitos | Referência | Status |
| :--- | :--- | :--- |
| [**RF-15**](../RFuncionais/RF_15.md) - Acessar perfil da entidade | [Referência](https://conectaunb.app/conecta/entidades/4) | Done |
| [**RF-20**](../RFuncionais/RF_20.md) - Acessar perfil de usuário | [Referência](https://conectaunb.app/conecta/perfil/5) | Incompleto |
| [**RF-25**](../RFuncionais/RF_25.md) - Deletar um projeto | [Referência](https://conectaunb.app/conecta/entidades/4) | Done |
| [**RF-28**](../RFuncionais/RF_28.md) - Apagar publicações | [Referência](https://conectaunb.app/conecta/entidades/4) | Incompleto |
| [**RF-11**](../RFuncionais/RF_11.md) - Visualizar publicações no feed | [Referência](https://conectaunb.app/conecta/feed) | Done |
| [**RF-14**](../RFuncionais/RF_14.md) - Excluir perfil da entidade | [Referência](https://conectaunb.app/conecta/entidades/gestao) | Done |
| [**RF-19**](../RFuncionais/RF_19.md) - Excluir perfil de usuário | [Referência](https://conectaunb.app/conecta/perfil/5) | Incompleto |
| [**RF-12**](../RFuncionais/RF_12.md) - Criar perfil da entidade publicamente | [Referência](https://conectaunb.app/conecta/entidades/gestao) | Done |
| [**RF-13**](../RFuncionais/RF_13.md) - Editar perfil da entidade | [Referência](https://conectaunb.app/conecta/entidades/4) | Done |
| [**RF-17**](../RFuncionais/RF_17.md) - Cadastrar perfil de usuário | [Referência](https://conectaunb.app/auth/cadastro) | Done |
| [**RF-18**](../RFuncionais/RF_18.md) - Editar perfil de usuário | [Referência](https://conectaunb.app/conecta/perfil/5) | Incompleto |
| [**RF-22**](../RFuncionais/RF_22.md) - Atualizar projeto | [Referência](https://conectaunb.app/conecta/entidades/4) | Incompleto |
| [**RF-23**](../RFuncionais/RF_23.md) - Visualizar histórico de projetos | [Referência](https://conectaunb.app/conecta/entidades/4) | Done |
| [**RF-24**](../RFuncionais/RF_24.md) - Criar um novo projeto | [Referência](https://conectaunb.app/conecta/entidades/4) | Done |
| [**RF-26**](../RFuncionais/RF_26.md) - Criar publicações | [Referência](https://conectaunb.app/conecta/entidades/4) | Incompleto |
| [**RF-27**](../RFuncionais/RF_27.md) - Editar publicações | [Referência](https://conectaunb.app/conecta/entidades/4) | Done |
| [**RF-01**](../RFuncionais/RF_01.md) - Exibir processos seletivos abertos | [Referência](https://conectaunb.app/conecta/feed) | Done |
| [**RF-02**](../RFuncionais/RF_02.md) - Filtrar processos seletivos abertos | [Referência](https://conectaunb.app/conecta/feed) | Incompleto |
| [**RF-03**](../RFuncionais/RF_03.md) - Atualizar status de um processo seletivo | [Referência](https://conectaunb.app/conecta/entidades/4) | Done |
| [**RF-05**](../RFuncionais/RF_05.md) - Criar um processo seletivo | [Referência](https://conectaunb.app/conecta/entidades/4) | Done |
| [**RF-21**](../RFuncionais/RF_21.md) - Exibir entidades nas quais o usuário é gestor/membro | [Referência](https://conectaunb.app/conecta/entidades/gestao) | Done |
| Escopo realizado| | |
| [**RF-04**](../RFuncionais/escopo/RF_04.md) - Finalizar um processo seletivo | [Referência](https://conectaunb.app/conecta/entidades/4) | Done |
| [**RF-16.1**](../RFuncionais/escopo/RF_16.1.md) - Adicionar Co-gestores das entidades | [Referência](https://conectaunb.app/conecta/entidades/gestao) | Done |
| [**RF-16.2**](../RFuncionais/escopo/RF_16.2.md) - Remover Co-gestores das entidades | [Referência](https://conectaunb.app/conecta/entidades/gestao) | Done |
| [**RF-16.3**](../RFuncionais/escopo/RF_16.3.md) - Visualizar Co-gestores das entidades | [Referência](https://conectaunb.app/conecta/entidades/gestao) | Done |
| [**RF-16.4**](../RFuncionais/escopo/RF_16.4.md) - Atualizar cargos dos Co-gestores das entidades | [Referência](https://conectaunb.app/conecta/entidades/gestao) | Done |
| [**RF-06**](../RFuncionais/escopo/RF_06.md) - Filtrar feed em relação a campus/área de interesse/tipo da entidade | [Referência](https://conectaunb.app/conecta/feed) | Incompleto |
| [**RF-29**](../RFuncionais/escopo/RF_29.md) - Pesquisar publicações com filtros de busca de campus/área de interesse/tipo da entidade | [Referência](https://conectaunb.app/conecta/feed) | Incompleto |
| [**RF-30**](../RFuncionais/escopo/RF_30.md) - Personalizar preferências de notificação (Processos Seletivos/Atualizações de Projetos/Novas Publicações) | [Referência](https://conectaunb.app/conecta/notificacoes) | Done |

## Requisitos Não Funcionais

| Requisitos | Referência | Status |
| :--- | :--- | :--- |
| [**RNF-01**](../RNAOFuncionais/RNF_01.md) - Acessar plataforma sem login | [Referência](https://conectaunb.app/conecta/feed) (caso esteja logado, faça o logout) | Done |
| [**RNF-02**](../RNAOFuncionais/RNF_02.md) - Facilidade no uso | Evidênciado em Vídeo | Done |
| [**RNF-03**](../RNAOFuncionais/RNF_03.md) - Manter consistência visual | Evidênciado em Vídeo | Done |
| [**RNF-04**](../RNAOFuncionais/RNF_04.md) - Feedback responsivo | Evidênciado em Vídeo | Done |
| [**RNF-05**](../RNAOFuncionais/RNF_05.md) - Uso mobile e desktop | Evidenciado em Vídeo | Done |
| [**RNF-06**](../RNAOFuncionais/RNF_06.md) - Carregamento rápido de páginas | Evidênciado em Vídeo | Done |
| [**RNF-07**](../RNAOFuncionais/RNF_07.md) - Coleta de métricas de acordo com LGPD | - | Não Implementado |
| [**RNF-08**](../RNAOFuncionais/RNF_08.md) - Criptografar senhas de usuários e entidades | Evidênciado em Vídeo | Done |

## Integrantes

### Grupo 04

<div align="center" markdown="1">

| ![](assets/fotos/integrantes/gabriel.png){: .foto-equipe } | ![](assets/fotos/integrantes/giovanna.png){: .foto-equipe } | ![](assets/fotos/integrantes/ana.png){: .foto-equipe } | ![](assets/fotos/integrantes/joao.png){: .foto-equipe } | ![](assets/fotos/integrantes/matheus.png){: .foto-equipe } | ![](assets/fotos/integrantes/pedro.png){: .foto-equipe } | 
|:-:|:-:|:-:|:-:|:-:|:-:|
| [Gabriel Diniz](https://github.com/GabrielDiniz12) | [Giovanna Brito](https://github.com/giovannabrito19) | [Ana Luiza Abrantes](https://github.com/luabrantess) | [João Pedro](https://github.com/ojplc) | [Mathues Lemes](https://github.com/matheuslemesam) | [Pedro Américo](https://github.com/dev-americo) |

</div>

