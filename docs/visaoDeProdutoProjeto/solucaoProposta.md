# Solução Proposta

## Objetivo Geral do Produto 

O objetivo geral do produto é facilitar o engajamento acadêmico através da centralização de informações de projetos de extensão, empresas juniores, equipes de competição dentre outras atividades extracurriculares. O produto atua como um hub de oportunidades, eliminando a busca por perfis nas redes sociais ou de murais espalhados pela faculdade, melhorando a eficácia da comunicação e garantindo que o aluno encontre tudo o que precisa para sua formação complementar em um único lugar além de proporcionar à comunidade externa informações sobre o que a universidade está produzindo. 

## Objetivos Específicos (OE) do Produto 

- **(OE1)** Centralizar a divulgação de informações para projetos, iniciativas acadêmicas e atividades extracurriculares; 
- **(OE2)** Estimular o engajamento académico através da facilitação do acesso à informação;
- **(OE3)** Ampliar e facilitar a visibilidade institucional; 
- **(OE4)** Proporcionar ao titular do projeto métricas engajamento; 
- **(OE5)** Preservar a memória institucional; 

## Características de Produto (mapeadas com os Objetivos Específicos do Produto) 

| OE principal | Contribuição secundária | ID | Característica | Descrição resumida | ID | Valor de negócio (VN) principal |
| :---: | :---: | :---: | :--- | :--- | :---: | :--- |
| OE1 | OE5, OE3 | CP1 | Perfil individual para cada entidade e usuário | Cada entidade contará com um perfil o qual trará todos os processos seletivos em aberto, projetos antigos e publicações anteriores. | VN1 | Divulgação das entidades da instituição. |
| OE2 | OE3, OE1 | CP2 | Feed de visualização | Um feed para visualização dos posts realizados na plataforma, contando com filtros para facilitar o acesso às informações desejadas. | VN2 | Melhoria no processo de exposição de projetos e ações das entidades. |
| OE4 | OE2 | CP3 | Visualização de estatística de pesquisa e busca | Dados sobre inscrições e engajamento com filtros serão coletados segundo as normas da LGPD. | VN3 | Entender melhor as maiores demandas de projetos da instituição. |
| OE2 | OE3, OE5 | CP4 | Publicações independentes | Cada entidade poderá fazer publicações com texto e fotos conforme sua necessidade, divulgando processos, conquistas e suas ações para toda comunidade. Somente publicadores terão essa possibilidade. | VN4 | Facilitação na disseminação de processos e ações de entidades independentes (EJ, equipes de competição, etc.). |
| OE3 | OE4 | CP5 | Categorização dos perfis por áreas de interesse | Os perfis serão categorizados de acordo com o tipo de sua entidade (Ex: EJ, equipes de competição, etc.), área de atuação, etc. | VN5 | Melhoria do processo de descobrimento de projetos e entidades. |
| OE5 | OE4 | CP6 | Catálogo digital de processos e entidades | Processos e entidades atuais e passadas serão armazenados e ainda poderão ser visualizados | VN6 | Melhoria na navegação, maior exposição do ecossistema da universidade e facilitação da descoberta de iniciativas atuais e já desenvolvidas. |
| OE3 | OE2 | CP7 | Navegação na plataforma sem a necessidade de perfil | A solução deverá permitir acesso público a todos os perfis, inicialmente sem a necessidade de login, permitindo visibilidade e democratizando o acesso às informações. Sendo necessário fazer login somente se o usuário quiser interagir ou participar de algum processo. | VN7 | Democratização do acesso à plataforma. |

## Tecnologias a Serem Utilizadas 

Para a construção da solução proposta para o Conecta UnB, serão adotadas tecnologias modernas e compatíveis com a necessidade de centralização de informações, alta disponibilidade e desenvolvimento iterativo.  

- **Nest.js:** Será utilizado para a criação do backend, atuando como uma API escalável. O backend será o responsável por processar as regras de negócio, gerenciar a autenticação e intermediar de forma segura a comunicação entre o frontend e o banco de dados. 

- **PostgreSQL:** É um sistema de gerenciamento de banco de dados relacional. Foi escolhido para armazenar os dados estruturados do sistema. Sua robustez garantirá a integridade das complexas relações entre os usuários, entidades acadêmicas, e suas respectivas publicações. 

- **Prisma (ORM):** Ele atuará como a ponte de comunicação entre o NestJS e o PostgreSQL. Ele assegurará a tipagem estrita de dados, proteção contra injeções SQL e a gestão versionada das alterações estruturais do banco. 

- **Swagger:** Ferramenta que será acoplada ao backend para gerar uma documentação viva, automática e interativa das rotas da API, facilitando os testes e a integração clara entre as equipes de desenvolvimento do frontend e backend sendo útil para uma visualização do que foi desenvolvido no backend. 

- **Next.js:** Utilizaremos esse framework para o frontend, sendo um framework moderno e robusto, facilitando a criação de interfaces responsivas, renderização otimizada e boa indexação nos motores de busca, garantindo a acessibilidade pública da plataforma.

- **Tailwind CSS:** Framework CSS utilitário que será integrado ao frontend para que possamos acelerar a construção das interfaces. Ele permitirá a criação de um design responsivo, moderno e consistente de maneira ágil. 

- **Docker:** Será usado na conteinerização para empacotar as aplicações e suas dependências. Isso garantirá um ambiente de desenvolvimento padronizado, evitando conflitos e assegurando que o código funcione de forma consistente em qualquer máquina. 

- **Jest:** Framework de testes que será adotado para a criação e execução de testes automatizados. 

- **Figma:** É a plataforma de design colaborativa que vamos utilizar para a ideação, prototipagem das telas e validação da experiência do usuário antes da fase de implementação em código. 

- **GitHub:** Plataforma de hospedagem do código-fonte que centralizará o repositório do projeto.  

- **Cloudflare R2:** É um serviço de armazenamento de objetos (Object Storage) em nuvem focado em Edge Computing. Será utilizado para hospedar os arquivos de mídia (como fotos das publicações, logos das entidades, etc), caracterizando-se pela isenção de taxas de transferência de dados para a internet. 

- **Koyeb:** Será a plataforma onde o contêiner Docker do backend (NestJS) será hospedado. Garantirá a disponibilidade contínua da API de forma gratuita para a fase inicial de operação. 

- **Neon.tech:** Plataforma provedora de banco de dados PostgreSQL gerenciado na nuvem. Hospedará os dados da aplicação em produção, destacando-se por sua segurança e escalabilidade automática. 

- **Vercel:** Plataforma de nuvem otimizada para o ecossistema frontend, escolhida para hospedar a aplicação Next.js. Ela automatizará as entregas contínuas e garantirá tempos de resposta ultrarrápidos através de sua rede de distribuição global (Edge Network), além de prover certificados SSL nativos. 

- **Turborepo:** Orquestrador para arquiteturas monorepo, ele irá gerenciar a convivência do Next.js e NestJS no mesmo repositório, otimizando os fluxos de integração que reduzirão o tempo de compilação. 

- **GitHub Actions:** Serviço de automação integrado ao repositório, utilizado para implementar as esteiras de Integração e Entrega Contínuas (CI/CD). Ele será responsável por acionar testes automatizados a cada atualização de código e orquestrar o deploy para a Vercel e para a Koyeb de forma automática. 

- **JWT (JSON Web Token):** Será utilizado para emitir tokens de acesso seguros. Isso garantirá que apenas usuários autenticados e autorizados possam realizar ações como publicações e edições. 

Além das ferramentas de desenvolvimento, também serão considerados mecanismos de segurança, privacidade e estrita conformidade com a LGPD (Lei Geral de Proteção de Dados Pessoais), em alinhamento com as características do produto e garantindo a proteção das informações dos alunos e da comunidade acadêmica. 

## PESQUISA DE MERCADO E ANÁLISE COMPETITIVA  

Algumas soluções são atualmente empregadas para a divulgação no contexto da Universidade de Brasília, entre as mais utilizadas pelos alunos estão os grupos da faculdade no WhatsApp, que servem para comunicação entre os discentes e para a publicação das oportunidades disponíveis. Contudo, por se tratar de um aplicativo de mensagem, os avisos e publicações são rapidamente perdidos quando novas mensagens são enviadas, além da fragmentação da informação, uma vez que grupos específicos recebem publicações específicas, fazendo com que alunos estejam em múltiplos grupos para se manterem informados. 

Outra solução já empregada é o site do decanato de extensão, atuando como um canal mais formal de propagação de oportunidades. O site disponibiliza atividades de extensão, como PIBEX e ações da semana universitária, entretanto o site deixa de fora oportunidades de empresas juniores e seleção de projetos.  

Além de que a informação fica fragmentada entre os diversos sites da UnB, temos o exemplo do projeto Imagine do professor Ricardo Fragelli, que pode ser encontrado no site UnB Notícias, mas não no Decanato de extensão. 

O SIGAA também possibilita o acesso a informações de atividades de extensão, mas também se limita a atividades ofertadas pelos professores, não abarcando atléticas, empresas juniores e equipes de competição. Ademais, o sistema é pouco intuitivo com a interface “ultrapassada”, não permitindo uma visualização de vídeos e imagens que demonstrem o que é desenvolvido nas atividades extensionistas. 

Há também as plataformas externas como o Instagram, que são meios de comunicação amplamente utilizados pelas entidades estudantis para divulgação de processos seletivos, projetos e eventos. O maior problema que aflige essas plataformas é a dependência do algoritmo de recomendação, onde as informações postadas não alcançam o público de maneira linear, divulgando apenas para usuários que já estão inseridos no meio. Esse fator gera uma bolha que impede que a comunidade conheça tais projetos, tornando o trabalho de divulgação mais manual e orgânico. 

Diante desse cenário, evidencia-se uma carência de uma plataforma unificada, pois o ecossistema atual força os discentes e docentes a buscas e pesquisas manuais exaustivas. Vale ressaltar que a principal dificuldade diante das outras plataformas é o processo de adesão da comunidade diante de plataformas mais consolidadas, pois, apesar dos inúmeros problemas elencados, o usuário tende a utilizar os meios já conhecidos de divulgação, mesmo que sejam mais trabalhosos. 

## Viabilidade da Proposta 

A proposta é viável no contexto da disciplina, considerando o acesso ao cliente, o escopo definido e a possibilidade de entrega incremental de um MVP até o encerramento do semestre, previsto para 7 de julho de 2026. A equipe é composta por seis integrantes com habilidades variadas, sendo que parte deles possui experiência consolidada na Stack  adotada, o que proporciona uma base técnica suficiente para sustentar o desenvolvimento. O contato estabelecido com representantes de empresas juniores, atléticas, equipes de competição, professores e alunos viabiliza validações frequentes e garante aderência às necessidades reais dos usuários ao longo do projeto. 

A Stack tecnológica escolhida é amplamente difundida, bem documentada e compatível com o escopo do MVP. Aspectos de segurança, privacidade e conformidade com a LGPD também serão considerados desde o início do desenvolvimento, em alinhamento com as características do produto. 

Os principais riscos identificados estão na adesão dos representantes institucionais à plataforma, integração e padronização de informações provenientes de diferentes setores da universidade, na conciliação de agendas entre equipe e stakeholders, na gestão de diferentes expectativas dos grupos envolvidos e na pressão de prazo combinada com outras demandas acadêmicas dos integrantes. Cada um desses riscos conta com uma estratégia de mitigação específica:  

- A adesão dos representantes será incentivada pelo contato já estabelecido com empresas juniores e projetos da FCTE. 
- A padronização dos dados será endereçada por meio de um modelo de dados estruturado e de um fluxo de cadastro uniforme na plataforma. 
- A gestão de agendas será facilitada pela colaboração assíncrona via Git e GitHub. 
- A divergência de expectativas será tratada por meio de priorização e mediação contínua das demandas. 
- A pressão de prazo será contornada pela priorização das funcionalidades essenciais, garantindo uma entrega viável e de valor dentro do prazo da disciplina.  

Assim, a proposta é considerada viável, desde que: 

- O escopo do MVP permaneça controlado; 
- As prioridades sejam mantidas ao longo das entregas; 
- A equipe mantenha uma divisão de tarefas clara e equilibrada;  
- O alinhamento com os stakeholders ocorra de forma regular e estruturada. 

## Benefícios Esperados 

A implementação da Conecta UnB visa otimizar a comunicação institucional e o engajamento da comunidade acadêmica. Os principais benefícios dividem-se entre os gestores das atividades e o público geral: 

Para as entidades e organizações estudantis: 

- Centralização e padronização das divulgações em um canal oficial; 
- Aumento de alcance na captação de novos membros e bolsistas; 
- Otimização operacional com marketing;
- Fortalecimento da memória institucional. 
 
Para os usuários e comunidade acadêmica:

- **Experiência de descoberta:** acesso simplificado e ágil às informações por meio de uma navegação fluída no catálogo de projetos; 
- **Transparência:** facilidade no acompanhamento de editais e períodos de inscrição em processos seletivos; 
- **Visibilidade de impacto:** visão clara do impacto social e das tecnologias desenvolvidas dentro do ambiente universitário. 