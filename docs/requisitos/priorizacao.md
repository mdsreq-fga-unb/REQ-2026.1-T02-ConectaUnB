## Introdução

Neste artefato explicamos em detalhes a priorização dos requisitos elencados, bom como o detalhamento de cada passo.

## Relação de Funcionalidades por Valor - Notas médias no Forms

Os critérios utilizados estão descritos em Valor de Negócio.

| Funcionalidade | Nota Média |
| :--- | :---: |
| **Requisitos Funcionais** | |
| Cadastrar/ Editar/ Excluir/ Acessar perfil de usuário | 5 |
| Criar/ Editar/ Excluir/ Acessar perfil de entidade (EJs, Equipes de competição, projetos de extensão...) | 5 |
| Exibir painel de gestão de entidades | 4 |
| Filtrar feed de acordo com preferências do usuário | 4 |
| Criar/ Filtrar/ Atualizar/ Cancelar/ Exibir um processo seletivo | 4 |
| Interagir com publicações | 3 |
| Gerenciar Co-gestores das entidades | 4 |
| Criar/ Visualizar/ Editar/ Deletar um projeto de uma entidade | 5 |
| Criar/ Visualizar/ Editar/ Apagar publicações de uma entidade | 5 |
| Personalizar conteúdos de notificação | 3 |
| Exibir métricas de engajamento para as entidades | 3 |
| Exibir métricas de engajamento para publicações | 3 |
| Importar posts de outras redes | 3 |
| Criar/ Visualizar/ Editar/ Apagar/ Comentários | 2 |
| **Requisitos não funcionais** | |
| Acessar plataforma sem login | 4 |
| Acessar aplicações com menos de 6 cliques | 3 |
| Manter consistência visual | 4 |
| Feedback responsivo | 4 |
| Uso mobile e desktop | 5 |
| Carregamento rápido de páginas (em menos de 8 segundos) | 4 |
| Coleta de métricas de acordo com LGPD | 5 |
| Criptografar dados sensíveis de usuários e entidades | 5 |
| Notificar usuários | 4 |

**OBS:** Agrupamos os requisitos para não confundir os stakeholders e facilitar a analise deles das funcionalidades.

## Valor de negócio x Esforço da equipe

O quadro foi feito na plataforma miro e pode ser acessado [clicando aqui](https://miro.com/app/board/uXjVHTrU614=/?share_link_id=644318895415)

### Quadro valor de negócio x esforço da equipe
![Quadro valor de negócio x esforço da equipe](../assets/fotos/valorXesforco/matrix.png)

### Maior valor de negócio e menor esforço

![Maior valor e menor esforço](../assets/fotos/valorXesforco/pri1.png)

### Maior valor de negócio e maior esforço

![Maior valor e maior esforço](../assets/fotos/valorXesforco/pri2.png)

### Menor valor de negócio e menor esforço

![Menor valor e menor esforço](../assets/fotos/valorXesforco/pri3.png)

### Menor valor de negócio e maior esforço

![Menor valor e menor esforço](../assets/fotos/valorXesforco/pri4.png) 

## Priorização Backlog e MVP

Para **Valor de Negócio** utilizamos a classificação de 1 a 5 dos stakeholders em um formulário, sendo:

1. **Não vejo valor** - Está fora da proposta do projeto
2. **Fica para depois** - Funcionalidades que estão na proposta, mas não são importantes podem ficar para o futuro
3. **Desejável** - Funcionalidades que seriam úteis
4. **Importante** - Funcionalidades que são importantes para a plataforma, agregam muito valor na experiência
5. **Essencial** - Funcionalidades que se não existirem a plataforma não funciona e/ou não atende o mínimo da proposta

Para **Complexidade Técnica** utilizamos uma classificação de 1 a 5, sendo:

1. **Muito Baixa** - Lógica trivial e interfaces simples. Operações básicas de leitura sem regras de negócio (ex: página estática).
2. **Baixa** - Operações básicas de CRUD (Criar, Ler, Atualizar, Apagar) em uma única tabela do banco de dados. Validações de formulário padrão. Tecnologias e bibliotecas totalmente dominadas pela equipe.
3. **Média** - Funcionalidades moderadas envolvendo múltiplas tabelas. Necessidade de controle de permissões e autenticação. Requer criação de componentes de UI personalizados no frontend.
4. **Alta** - Lógica de negócio complexa. Necessidade de integração com APIs ou ferramentas externas. Processamento de dados mais denso (ex: cálculo de métricas de engajamento) ou manipulação de arquivos (upload de imagens).
5. **Muito Alta** - Requisitos que exigem alta segurança ou arquitetura que a equipe não domina. Alta probabilidade de bugs que impactem o sistema inteiro.

Para **Esforço** utilizamos uma classificação de 1 a 5, que avalia puramente o volume de trabalho e o tempo necessário (horas), independentemente de ser difícil ou fácil, sendo:

1. **Muito Baixo** - Até 4 horas totais;
2. **Baixo** - De 5 a 12 horas totais;
3. **Médio** - De 13 a 24 horas totais;
4. **Alto** - De 25 a 40 horas totais;
5. **Muito Alto** - Mais de 40 horas totais;

Para **Pontuação Técnica** utilizamos: (Complexidade Técnica + Esforço)/2

Para **Índice de Prioridade** utilizamos: Valor de Negócio/Pontuação Técnica 

Para **Quadrante** e sugestão de **Prioridade** colocamos:

- Q1 - Alto Valor / Baixa Carga Técnica (Prioridade 1)
    - **Regra matemática:** VN ≥ 4 e PT < 3.0

- Q2 - Alto Valor / Alta Carga Técnica (Prioridade 2)
    - **Regra matemática:** VN ≥ 4 e PT ≥ 3.0

- Q3 - Baixo Valor / Baixa Carga Técnica (Prioridade 3)
    - **Regra matemática:** VN ≤ 3 e PT < 3.0

- Q4 - Baixo Valor / Alta Carga Técnica (Prioridade 4)
    - **Regra matemática:** VN ≤ 3 e PT ≥ 3.0

| Requisito | Valor de Negócio | Complexidade Técnica | Esforço | Pontuação Técnica | Índice de Prioridade | Quadrante | Prioridade Sugerida |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- | :--- |
| **RF-15** - Acessar perfil da entidade | 5 | 1 | 2 | 1.5 | 3.33 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-20** - Acessar perfil de usuário | 5 | 1 | 2 | 1.5 | 3.33 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-25** - Deletar um projeto | 5 | 1 | 2 | 1.5 | 3.33 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-28** - Apagar publicações | 5 | 1 | 2 | 1.5 | 3.33 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-11** - Visualizar publicações no feed | 5 | 2 | 2 | 2.0 | 2.50 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-14** - Excluir perfil da entidade | 5 | 2 | 2 | 2.0 | 2.50 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-19** - Excluir perfil da usuário | 5 | 2 | 2 | 2.0 | 2.50 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-12** - Criar perfil da entidade publicamente | 5 | 2 | 3 | 2.5 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-13** - Editar perfil da entidade | 5 | 2 | 3 | 2.5 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-17** - Cadastrar perfil de usuário | 5 | 2 | 3 | 2.5 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-18** - Editar perfil da usuário | 5 | 2 | 3 | 2.5 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-22** - Atualizar projeto | 5 | 2 | 3 | 2.5 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-23** - Visualizar histórico de projetos | 5 | 2 | 3 | 2.5 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-24** - Criar um novo projeto | 5 | 2 | 3 | 2.5 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-26** - Criar publicações | 5 | 2 | 3 | 2.5 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-27** - Editar publicações | 5 | 2 | 3 | 2.5 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-01** - Exibir processos seletivos abertos | 4 | 2 | 2 | 2.0 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-02** - Filtrar processos seletivos abertos | 4 | 2 | 2 | 2.0 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-03** - Atualizar status de um processo seletivo | 4 | 2 | 2 | 2.0 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-04** - Finalizar um processo seletivo | 4 | 2 | 2 | 2.0 | 2.00 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-05** - Criar um processo seletivo | 4 | 2 | 3 | 2.5 | 1.60 | Q1 - Alto valor / Baixa carga | Prioridade 1 |
| **RF-06** - Filtrar feed de acordo com preferências | 4 | 3 | 3 | 3.0 | 1.33 | Q2 - Alto valor / Alta carga | Prioridade 2 |
| **RF-16** - Administrar Co-gestores das entidades | 4 | 3 | 3 | 3.0 | 1.33 | Q2 - Alto valor / Alta carga | Prioridade 2 |
| **RF-21** - Exibir painel de gestão de entidades | 4 | 3 | 3 | 3.0 | 1.33 | Q2 - Alto valor / Alta carga | Prioridade 2 |
| **RF-29** - Pesquisar publicações com filtros | 4 | 3 | 3 | 3.0 | 1.33 | Q2 - Alto valor / Alta carga | Prioridade 2 |
| **RF-30** - Personalizar conteúdos de notificação | 3 | 2 | 3 | 2.5 | 1.20 | Q3 - Baixo valor / Baixa carga | Prioridade 3 |
| **RF-31** - Exibir métricas para as entidades | 3 | 2 | 3 | 2.5 | 1.20 | Q3 - Baixo valor / Baixa carga | Prioridade 3 |
| **RF-32** - Exibir métricas para publicações | 3 | 2 | 3 | 2.5 | 1.20 | Q3 - Baixo valor / Baixa carga | Prioridade 3 |
| **RF-33** - Importar posts de outras redes | 3 | 3 | 2 | 2.5 | 1.20 | Q3 - Baixo valor / Baixa carga | Prioridade 3 |
| **RF-07** - Criar comentários em publicações | 2 | 3 | 3 | 3.0 | 0.67 | Q4 - Baixo valor / Alta carga | Prioridade 4 |
| **RF-08** - Visualizar comentários em publicações | 2 | 3 | 3 | 3.0 | 0.67 | Q4 - Baixo valor / Alta carga | Prioridade 4 |
| **RF-09** - Editar comentários próprios | 2 | 3 | 3 | 3.0 | 0.67 | Q4 - Baixo valor / Alta carga | Prioridade 4 |
| **RF-10** - Apagar comentários | 2 | 3 | 3 | 3.0 | 0.67 | Q4 - Baixo valor / Alta carga | Prioridade 4 |

**OBS:** Para a classificação da tabela no miro e no Backlog consideramos tanto o calculo de priorização quando os valores MOSCOW dos requisitos.