# 🎮 GPADS CodePath

Frontend do sistema de gamificação do GPADS, desenvolvido utilizando **React + JavaScript + Vite**.

O frontend é responsável pela interface e experiência do usuário. Os dados de negócio são obtidos através da **API construída por Jonathan e Carlos**, enquanto o **Firebase Authentication** é utilizado para gerenciamento da autenticação dos usuários.

---

# 1. Objetivo do Projeto

O Dashboard Gamificado tem como objetivo apresentar uma plataforma na qual estudantes possam acompanhar sua evolução, pontuação, ranking, conquistas, desafios e demais informações relacionadas à sua participação no sistema.

O sistema deverá permitir, entre outras funcionalidades:

* autenticação de usuários;
* visualização do dashboard;
* acompanhamento de pontos;
* evolução de nível;
* visualização de ranking;
* visualização de conquistas;
* acompanhamento de desafios;
* visualização de avatar;
* visualização de relatórios;
* gerenciamento do perfil;
* integração com a API do backend;
* futura integração com o fluxo de submissão e avaliação de atividades.

---

# 2. Stack Tecnológica

## Frontend

* React
* JavaScript
* Vite
* React Router
* Firebase Authentication
* CSS
* Fetch API

## Arquitetura

* Programação Orientada a Objetos (POO)
* SOLID
* Repository Pattern
* Service Layer
* Separação entre domínio, infraestrutura e apresentação

## Backend

O backend será desenvolvido por **Jonathan e Carlos**.

O frontend não acessará diretamente o Firestore para obter dados de negócio.

Fluxo:

```text
React
  ↓
Hooks
  ↓
Services
  ↓
Repositories
  ↓
REST API
  ↓
Backend
  ↓
Firestore
```

---

# 3. Arquitetura Geral

```text
frontend/
│
├── public/
│   └── assets/
│
├── src/
│
│   ├── app/
│   │   ├── routes/
│   │   ├── providers/
│   │   └── config/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── avatar/
│   │   ├── ranking/
│   │   └── reports/
│   │
│   ├── pages/
│   │   ├── Login/
│   │   ├── Dashboard/
│   │   ├── Ranking/
│   │   ├── Avatar/
│   │   ├── Reports/
│   │   └── Profile/
│   │
│   ├── domain/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── services/
│   │
│   ├── infrastructure/
│   │   ├── api/
│   │   ├── firebase/
│   │   └── mocks/
│   │
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

# 4. Organização das Camadas

## `app/`

Responsável pela configuração geral da aplicação.

Contém:

* rotas;
* providers;
* configurações de ambiente.

### `routes/`

Contém as rotas da aplicação.

### `providers/`

Centraliza providers utilizados pelo React.

### `config/`

Contém configurações gerais da aplicação.

---

# 5. Components

A pasta `components/` contém componentes visuais reutilizáveis.

## `components/ui/`

Componentes genéricos:

* Button;
* Card;
* Input;
* Modal;
* Loading.

Esses componentes não devem conter regras de negócio.

---

## `components/layout/`

Responsável pela estrutura visual:

* Sidebar;
* Header;
* PageContainer.

---

## `components/avatar/`

Componentes relacionados ao avatar:

* Avatar;
* AvatarLevel;
* AvatarCustomization.

---

## `components/ranking/`

Componentes relacionados ao ranking:

* RankingList;
* RankingItem;
* RankingPosition.

---

## `components/reports/`

Componentes relacionados aos relatórios:

* ReportCard;
* ReportChart;
* ReportFilters.

---

# 6. Pages

As páginas representam as telas principais da aplicação.

```text
pages/
├── Login/
├── Dashboard/
├── Ranking/
├── Avatar/
├── Reports/
└── Profile/
```

As páginas devem organizar os componentes e consumir os Hooks/Services necessários.

As regras de negócio não devem ser implementadas diretamente dentro das páginas.

---

# 7. Domain

A pasta `domain/` contém as regras e conceitos centrais da aplicação.

Ela não deve depender diretamente de:

* React;
* Firebase;
* Fetch;
* componentes visuais;
* detalhes específicos do backend.

---

# 8. Entities

As entidades representam objetos importantes do sistema.

```text
domain/entities/
├── User.js
├── Avatar.js
├── Ranking.js
├── Achievement.js
├── Challenge.js
└── Report.js
```

Cada entidade deve possuir comentários explicando:

* sua finalidade;
* seus atributos;
* seus comportamentos;
* sua responsabilidade dentro do sistema.

Exemplo:

```javascript
/**
 * Entidade responsável por representar um usuário
 * dentro do sistema gamificado.
 *
 * Contém os dados e comportamentos relacionados
 * à evolução do usuário.
 */
export class User {
    // ...
}
```

As entidades devem encapsular comportamentos relacionados aos próprios objetos.

---

# 9. Repositories

Os repositories definem como o domínio acessa os dados.

Exemplo:

```text
UserRepository
RankingRepository
AchievementRepository
ReportRepository
```

O domínio não deve saber se os dados vêm de:

* API;
* mock;
* outro serviço.

Ele conhece somente o contrato definido pelo Repository.

---

# 10. Services

Os Services concentram regras de negócio.

Exemplo:

```text
UserService
RankingService
AchievementService
ReportService
```

Um Service pode utilizar um Repository para obter os dados e aplicar regras antes de entregá-los à interface.

---

# 11. Infrastructure

A infraestrutura contém implementações concretas relacionadas a recursos externos.

```text
infrastructure/
├── api/
├── firebase/
└── mocks/
```

---

# 12. API

A pasta:

```text
infrastructure/api/
```

é responsável pela comunicação com o backend.

Arquivos:

```text
apiClient.js
userApi.js
rankingApi.js
achievementApi.js
reportApi.js
```

O `apiClient.js` centraliza as requisições HTTP.

As classes específicas realizam chamadas relacionadas aos seus respectivos recursos.

---

# 13. Firebase

O frontend possui Firebase configurado principalmente para autenticação.

```text
infrastructure/firebase/
├── firebaseConfig.js
└── firebaseAuth.js
```

## Importante

O frontend **NÃO deve acessar diretamente o Firestore** para buscar dados de negócio.

O fluxo correto é:

```text
Frontend
    ↓
API
    ↓
Backend
    ↓
Firestore
```

O Firebase Authentication é utilizado no frontend para autenticação do usuário.

---

# 14. Firebase Authentication

O Firebase Authentication já foi **implementado e validado no frontend**.

A autenticação utiliza e-mail e senha.

A estrutura atual é:

```text
infrastructure/firebase/
├── firebaseConfig.js
└── firebaseAuth.js
```

## `firebaseConfig.js`

Responsável por:

* inicializar a aplicação Firebase;
* carregar as configurações através das variáveis de ambiente;
* inicializar o Firebase Authentication;
* disponibilizar a instância `auth`.

Exemplo da responsabilidade:

```text
Variáveis .env
      ↓
firebaseConfig.js
      ↓
initializeApp()
      ↓
getAuth()
      ↓
auth
```

## `firebaseAuth.js`

Centraliza as operações de autenticação.

Responsabilidades implementadas:

* criação de usuário;
* login;
* logout;
* observação do estado de autenticação.

Funções utilizadas:

```text
registerUser()
loginUser()
logoutUser()
observeAuthState()
```

Fluxo:

```text
Usuário
   ↓
Login / Cadastro
   ↓
firebaseAuth.js
   ↓
Firebase Authentication
   ↓
Usuário autenticado
```

---

# 15. Configuração do Firebase

Para utilizar o Firebase, deve existir um projeto configurado no Firebase Console com um aplicativo Web.

O método de autenticação utilizado atualmente é:

```text
Authentication
└── Sign-in method
    └── Email/Password
```

As configurações são armazenadas no `.env`.

Exemplo:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_API_URL=http://localhost:8000/api
```

Nunca versionar o `.env`.

Utilizar:

```text
.env.example
```

como modelo.

As credenciais administrativas do Firebase não devem ser colocadas no frontend.

---

# 16. Teste da Autenticação

A autenticação foi validada utilizando uma tela de teste temporária no `App.jsx`.

O teste permitiu validar:

* criação de usuário;
* login;
* logout;
* observação do estado de autenticação;
* recuperação do e-mail do usuário autenticado;
* recuperação do UID do usuário autenticado.

Fluxo testado:

```text
Criar conta
     ↓
Firebase Authentication
     ↓
Usuário criado
     ↓
Usuário autenticado
```

Login:

```text
E-mail + Senha
     ↓
loginUser()
     ↓
Firebase Authentication
     ↓
Usuário autenticado
```

Logout:

```text
logoutUser()
     ↓
Firebase Authentication
     ↓
Usuário desautenticado
```

Estado da sessão:

```text
observeAuthState()
     ↓
Usuário autenticado → user
Usuário não autenticado → null
```

---

# 17. Validação Realizada

A implementação atual foi testada com sucesso.

## Cadastro

* [x] Criar usuário com e-mail e senha;
* [x] Usuário aparece no Firebase Authentication;
* [x] UID é retornado;
* [x] E-mail é recuperado.

## Login

* [x] Login com usuário existente;
* [x] Firebase retorna usuário autenticado;
* [x] Estado de autenticação é atualizado.

## Logout

* [x] Logout realizado;
* [x] Estado de autenticação é atualizado;
* [x] Usuário deixa de ser considerado autenticado.

## Observação de sessão

* [x] `observeAuthState()` funcionando;
* [x] Estado atualizado automaticamente quando a autenticação muda.

### Status atual

**Firebase Authentication: IMPLEMENTADO E VALIDADO ✅**

---

# 18. Próxima etapa da autenticação

A etapa de teste do Firebase Authentication foi concluída.

A próxima implementação será conectar a autenticação à arquitetura definitiva da aplicação:

```text
Login.jsx
    ↓
useAuth.js
    ↓
firebaseAuth.js
    ↓
Firebase Authentication
```

Depois:

```text
ProtectedRoute.jsx
```

será utilizado para impedir o acesso às páginas protegidas quando o usuário não estiver autenticado.

Finalmente, o Firebase ID Token será enviado para o backend:

```text
Firebase Authentication
        ↓
Firebase ID Token
        ↓
Authorization: Bearer <TOKEN>
        ↓
REST API
        ↓
Backend
```

---

# 19. Firebase Authentication x Firestore

É importante separar as duas responsabilidades.

## Firebase Authentication

Responsável por:

* identidade do usuário;
* login;
* cadastro;
* logout;
* sessão;
* UID;
* token de autenticação.

## Firestore

Responsável pelos dados de negócio.

Exemplos:

* pontos;
* nível;
* ranking;
* conquistas;
* desafios;
* relatórios;
* perfil.

O frontend não acessará diretamente esses dados do Firestore.

Fluxo:

```text
Firebase Authentication
        ↓
      Usuário
        ↓
    ID Token
        ↓
      API
        ↓
    Backend
        ↓
    Firestore
```

---

# 20. Mock

Enquanto Jonathan e Carlos desenvolvem a API, o frontend utilizará mocks.

```text
infrastructure/mocks/
├── MockUserRepository.js
├── MockRankingRepository.js
├── MockAchievementRepository.js
└── MockReportRepository.js
```

Os mocks permitem que o frontend seja desenvolvido sem esperar a API ficar pronta.

Exemplo:

```text
Dashboard
   ↓
UserService
   ↓
MockUserRepository
   ↓
Dados simulados
```

Depois:

```text
Dashboard
   ↓
UserService
   ↓
ApiUserRepository
   ↓
UserApi
   ↓
API
```

As páginas não precisam ser reescritas.

---

# 21. Contrato da API

Frontend e backend devem trabalhar utilizando um contrato comum.

O backend deverá manter um arquivo:

```text
API_CONTRACT.md
```

Esse documento deverá informar:

* endpoint;
* método HTTP;
* parâmetros;
* body;
* resposta;
* códigos de erro;
* necessidade de autenticação.

Exemplo:

```text
GET /users/{id}
```

Resposta:

```json
{
    "id": "123",
    "name": "Usuário",
    "email": "usuario@email.com",
    "points": 850,
    "level": 8
}
```

Alane e Samara desenvolvem utilizando esse contrato mesmo antes do endpoint estar disponível.

---

# 22. Integração com Jonathan e Carlos

## Alane e Samara

Responsáveis pelo:

* React;
* JavaScript;
* Vite;
* componentes;
* páginas;
* POO;
* SOLID;
* Services;
* Repositories;
* consumo da API;
* autenticação no frontend;
* integração da interface.

## Jonathan e Carlos

Responsáveis pelo:

* backend;
* API;
* Firebase Admin;
* Firestore;
* autenticação no backend;
* endpoints;
* regras de negócio do servidor;
* persistência;
* integração com GitHub;
* contrato da API.

---

# 23. Fluxo de integração

```text
Alane/Samara
     │
     │ desenvolvem usando Mock
     ▼
Frontend
     │
     │ API Contract
     ▼
Jonathan/Carlos
     │
     │ implementam endpoint
     ▼
Backend
     │
     ▼
Firestore
```

Quando um endpoint estiver pronto:

```text
MockRepository
       ↓
ApiRepository
```

A implementação real passa a ser utilizada.

---

# 24. GitHub

O projeto será versionado no GitHub.

Estrutura recomendada:

```text
GPADS/
│
├── frontend-gamificada
│
└── backend-gamificada
```

O frontend será desenvolvido por Alane e Samara.

O backend será desenvolvido por Jonathan e Carlos.

---

# 25. Branches

Não desenvolver diretamente na `main`.

Branches principais:

```text
main
develop
```

Branches de funcionalidades:

```text
feature/login
feature/dashboard
feature/ranking
feature/avatar
feature/reports
feature/profile
feature/firebase-auth
feature/api-integration
```

Para criar uma branch:

```bash
git checkout -b feature/nome-da-feature
```

Depois:

```bash
git add .
git commit -m "feat: descrição da alteração"
git push origin feature/nome-da-feature
```

Após finalizar, abrir Pull Request para a branch de desenvolvimento definida pelo projeto.

---

# 26. Commits

Utilizar mensagens claras.

Exemplos:

```text
feat: add login page
feat: implement firebase authentication
feat: add ranking component
feat: create user service
feat: add mock user repository
feat: integrate ranking api
```

Correções:

```text
fix: correct authentication redirect
fix: handle api error
fix: adjust ranking response
```

Documentação:

```text
docs: update api integration guide
docs: update readme
```

---

# 27. POO

As classes do domínio devem representar conceitos reais do sistema.

Exemplo:

```javascript
export class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.points = data.points;
        this.level = data.level;
    }

    addPoints(points) {
        this.points += points;
    }
}
```

Evitar criar classes apenas por obrigação.

A POO deve ser utilizada para organizar responsabilidades e comportamentos.

---

# 28. SOLID

O projeto deve seguir os princípios SOLID.

## S — Single Responsibility

Cada classe deve possuir uma responsabilidade principal.

```text
UserApi
```

faz comunicação HTTP.

```text
UserService
```

cuida das regras de negócio.

```text
UserRepository
```

define o acesso aos dados.

## O — Open/Closed

Componentes e classes devem poder ser estendidos sem precisar alterar comportamentos existentes desnecessariamente.

## L — Liskov Substitution

Implementações concretas de um Repository devem poder substituir o Repository definido pelo domínio.

```text
UserRepository
     ↑
     ├── MockUserRepository
     └── ApiUserRepository
```

## I — Interface Segregation

Evitar contratos gigantes.

Cada Repository deve possuir apenas as operações necessárias ao seu contexto.

## D — Dependency Inversion

O domínio não deve depender diretamente de Firebase ou Fetch.

```text
UserService
     ↓
UserRepository
     ↑
     ├── MockUserRepository
     └── ApiUserRepository
```

---

# 29. Hooks

Os Hooks conectam React ao domínio.

Exemplo:

```text
useUser
useRanking
useReports
useAuth
```

O componente React não deve concentrar toda a lógica de acesso aos dados.

Preferir:

```text
Component
   ↓
Hook
   ↓
Service
   ↓
Repository
```

---

# 30. Desenvolvimento Local

Clonar o projeto:

```bash
git clone URL_DO_REPOSITORIO
```

Entrar na pasta:

```bash
cd frontend
```

Instalar dependências:

```bash
npm install
```

Criar o `.env` utilizando o `.env.example` como referência.

Executar:

```bash
npm run dev
```

O Vite disponibilizará a aplicação localmente.

---

# 31. Desenvolvimento sem API

Enquanto a API estiver em desenvolvimento:

```text
MockRepository
```

deve ser utilizado.

Não é necessário esperar Jonathan e Carlos terminarem todo o backend.

O frontend deve avançar utilizando o contrato definido em:

```text
API_CONTRACT.md
```

---

# 32. Desenvolvimento por Sprints

O desenvolvimento do frontend ocorrerá entre:

**05/10/2026 e 26/10/2026**

Serão utilizadas três Sprints de uma semana, seguidas de um dia de finalização e homologação.

| Sprint      | Período       | Objetivo                       |
| ----------- | ------------- | ------------------------------ |
| Sprint 1    | 05/10 → 11/10 | Fundação do frontend           |
| Sprint 2    | 12/10 → 18/10 | Construção das funcionalidades |
| Sprint 3    | 19/10 → 25/10 | Integração com a API           |
| Finalização | 26/10         | Homologação e entrega          |

---

# 33. SPRINT 1 — Fundação do Frontend

## Período

**05/10/2026 → 11/10/2026**

## Objetivo

Criar a base estrutural do frontend para que Alane e Samara possam desenvolver independentemente da API estar totalmente pronta.

---

## Alane — Sprint 1

### 05/10

* configurar React + Vite;
* instalar dependências;
* configurar React Router;
* configurar Firebase;
* criar `.env`;
* criar `.env.example`;
* revisar `.gitignore`.

### 06/10

Implementar Firebase Authentication:

* `firebaseConfig.js`;
* `firebaseAuth.js`;
* `useAuth.js`;
* `ProtectedRoute.jsx`.

Fluxo esperado:

```text
Login
 ↓
Firebase Authentication
 ↓
Usuário autenticado
 ↓
Dashboard
```

**Status atual:** `firebaseConfig.js` e `firebaseAuth.js` já foram implementados e testados com sucesso.

### 07/10

Criar as entidades:

```text
User.js
Avatar.js
Ranking.js
Achievement.js
Challenge.js
Report.js
```

Cada classe deverá possuir comentários explicativos.

### 08/10

Criar:

```text
UserRepository.js
RankingRepository.js
AchievementRepository.js
ReportRepository.js
```

e:

```text
UserService.js
RankingService.js
AchievementService.js
ReportService.js
```

### 09/10

Criar:

```text
apiClient.js
userApi.js
rankingApi.js
achievementApi.js
reportApi.js
```

e os respectivos mocks.

O `apiClient.js` deverá estar preparado para enviar:

```http
Authorization: Bearer <Firebase ID Token>
```

### 10/10 → 11/10

* revisar arquitetura;
* revisar comentários;
* revisar imports;
* testar autenticação;
* verificar `.env`;
* verificar Git;
* atualizar documentação.

### Entregável da Alane — 11/10

**Base arquitetural funcionando, Firebase Authentication configurado e validado, domínio estruturado, Services e Repositories criados, API Client preparado e mocks disponíveis.**

---

## Samara — Sprint 1

### 05/10

Criar componentes base:

```text
Button.jsx
Card.jsx
Input.jsx
Modal.jsx
Loading.jsx
```

### 06/10

Criar layout:

```text
Sidebar.jsx
Header.jsx
PageContainer.jsx
```

### 07/10

Criar páginas e rotas:

```text
Login
Dashboard
Ranking
Avatar
Reports
Profile
```

### 08/10

Construir visualmente a tela de Login e preparar integração com `useAuth`.

### 09/10

Criar componentes:

```text
avatar/
ranking/
reports/
```

### 10/10 → 11/10

Criar e padronizar:

```text
global.css
variables.css
```

Trabalhar:

* tipografia;
* espaçamento;
* cards;
* botões;
* loading;
* responsividade inicial.

### Entregável da Samara — 11/10

**Estrutura visual inicial do sistema pronta, navegação funcionando, login construído e componentes reutilizáveis criados.**

---

# 34. SPRINT 2 — Construção das Funcionalidades

## Período

**12/10/2026 → 18/10/2026**

## Objetivo

Construir as principais funcionalidades do Dashboard Gamificado utilizando os mocks.

---

## Alane — Sprint 2

Responsável pela camada de domínio e dados.

### 12/10 → 13/10

Implementar as regras das entidades:

* User;
* Ranking;
* Achievement;
* Challenge;
* Avatar.

### 14/10 → 15/10

Implementar Services:

```text
UserService
RankingService
AchievementService
ReportService
```

### 16/10

Criar mocks realistas seguindo o formato definido no contrato da API.

### 17/10

Validar com Jonathan e Carlos:

* nomes dos campos;
* tipos de dados;
* respostas esperadas;
* endpoints planejados;
* autenticação.

### 18/10

Testar o fluxo:

```text
Page
 ↓
Hook
 ↓
Service
 ↓
Repository
 ↓
Mock
```

### Entregável da Alane — 18/10

**Toda a camada de domínio e dados funcionando com mocks e preparada para receber a API real.**

---

## Samara — Sprint 2

Responsável pela construção visual das funcionalidades.

### 12/10 → 13/10

Construir o Dashboard:

```text
Dashboard
├── saudação
├── avatar
├── nível
├── pontos
├── progresso
├── conquistas
├── desafios
└── ranking resumido
```

### 14/10

Construir o Ranking:

```text
RankingList
RankingItem
RankingPosition
```

### 15/10

Construir:

```text
Avatar
AvatarLevel
AvatarCustomization
```

### 16/10 → 17/10

Construir:

```text
ReportCard
ReportChart
ReportFilters
```

utilizando dados mockados.

### 18/10

* revisar responsividade;
* corrigir problemas visuais;
* revisar navegação;
* revisar componentes.

### Entregável da Samara — 18/10

**Principais telas do Dashboard Gamificado funcionando visualmente com dados simulados.**

---

# 35. SPRINT 3 — Integração com a API

## Período

**19/10/2026 → 25/10/2026**

## Objetivo

Substituir progressivamente os mocks pela API real construída por Jonathan e Carlos.

---

## Alane — Sprint 3

Responsável principal pela integração técnica.

### 19/10

Validar com Jonathan e Carlos:

* Base URL;
* endpoints;
* métodos HTTP;
* headers;
* autenticação;
* formato JSON;
* códigos de resposta.

### 20/10

Integrar:

```text
User API
```

Substituir:

```text
MockUserRepository
```

por:

```text
ApiUserRepository
```

### 21/10

Integrar:

```text
Ranking API
Achievement API
```

### 22/10

Integrar:

```text
Reports API
```

e demais endpoints disponíveis.

### 23/10

Garantir o fluxo:

```text
Firebase Authentication
        ↓
ID Token
        ↓
Authorization: Bearer TOKEN
        ↓
Backend
```

Testar:

* usuário autenticado;
* usuário não autenticado;
* token inválido;
* sessão expirada.

### 24/10

Implementar tratamento de:

```text
400
401
403
404
500
```

e estados:

```text
loading
success
error
empty
```

### 25/10

* integração completa;
* correção dos problemas;
* revisão da arquitetura;
* revisão dos mocks restantes.

### Entregável da Alane — 25/10

**Frontend conectado à API real, com autenticação Firebase, repositories reais, tratamento de erros e substituição dos mocks.**

---

## Samara — Sprint 3

Responsável principal pelo ajuste da interface aos dados reais.

### 19/10 → 20/10

Integrar as telas com os Services:

```text
Dashboard
Ranking
Avatar
Reports
Profile
```

### 21/10

Ajustar componentes para trabalhar exclusivamente com os dados recebidos pelos Services.

Evitar dados fixos como:

```javascript
points = 850;
```

Preferir:

```javascript
points={user.points}
```

### 22/10

Implementar estados:

```text
Carregando...
```

```text
Nenhum dado encontrado.
```

```text
Erro ao carregar informações.
```

### 23/10

Tratar casos como:

* avatar sem imagem;
* ranking vazio;
* usuário sem conquistas;
* relatório sem dados;
* campos opcionais ausentes.

### 24/10

* responsividade;
* refinamento visual;
* correção de componentes;
* acessibilidade básica.

### 25/10

Realizar testes completos das telas utilizando a API real.

### Entregável da Samara — 25/10

**Interface integrada aos dados reais e preparada para loading, erro, vazio e respostas reais da API.**

---

# 36. 26/10 — Finalização e Homologação

**26/10/2026 não será uma nova Sprint.**

Será utilizado para:

* integração final;
* testes;
* correções;
* homologação;
* documentação;
* entrega.

Não devem ser iniciadas funcionalidades estruturais novas neste dia.

---

# 37. Checklist de Homologação — 26/10

## Autenticação

* [x] Firebase Authentication configurado
* [x] Criação de usuário
* [x] Login
* [x] Logout
* [x] Observação do estado de autenticação
* [ ] Persistência de sessão validada na aplicação definitiva
* [ ] Rotas protegidas
* [ ] Firebase ID Token integrado à API
* [ ] Token enviado para API

## Dashboard

* [ ] Dados reais
* [ ] Pontuação
* [ ] Nível
* [ ] Progresso
* [ ] Avatar

## Ranking

* [ ] Ranking real
* [ ] Posição
* [ ] Pontuação
* [ ] Usuários

## Conquistas

* [ ] Lista
* [ ] Status
* [ ] Progresso

## Desafios

* [ ] Lista
* [ ] Progresso
* [ ] Conclusão

## Relatórios

* [ ] Dados reais
* [ ] Gráficos
* [ ] Filtros

## Integração

* [ ] Frontend → API
* [ ] API → Firestore
* [ ] Firebase Auth → API
* [ ] Tratamento de erros
* [ ] Loading
* [ ] Empty states

---

# 38. Divisão Definitiva de Responsabilidades

| Área                 |     Alane     |     Samara    |
| -------------------- | :-----------: | :-----------: |
| Arquitetura frontend | **Principal** |     Apoio     |
| POO                  | **Principal** |     Apoio     |
| SOLID                | **Principal** |     Apoio     |
| Entities             | **Principal** |       —       |
| Repositories         | **Principal** |       —       |
| Services             | **Principal** |       —       |
| API Client           | **Principal** |       —       |
| Firebase Auth        | **Principal** |     Apoio     |
| Mocks                | **Principal** |       —       |
| API Integration      | **Principal** |     Apoio     |
| Componentes UI       |     Apoio     | **Principal** |
| Layout               |     Apoio     | **Principal** |
| Dashboard visual     |     Apoio     | **Principal** |
| Ranking visual       |     Apoio     | **Principal** |
| Avatar visual        |     Apoio     | **Principal** |
| Reports visual       |     Apoio     | **Principal** |
| Responsividade       |     Apoio     | **Principal** |
| Estados visuais      |     Apoio     | **Principal** |
| Testes de integração | **Principal** | **Principal** |
| Homologação          | **Principal** | **Principal** |

---

# 39. Checkpoints entre as equipes

Para evitar que frontend e backend sejam desenvolvidos isoladamente, existirão três checkpoints.

## Checkpoint 1 — 11/10

### Alane + Samara

Frontend base funcionando:

* estrutura;
* Firebase Auth;
* rotas;
* componentes;
* domínio inicial;
* mocks.

### Jonathan + Carlos

Backend base funcionando:

* Firebase;
* Firestore;
* estrutura da API;
* autenticação;
* contrato inicial.

---

## Checkpoint 2 — 18/10

### Alane + Samara

Frontend funcional com:

* Dashboard;
* Ranking;
* Avatar;
* Conquistas;
* Relatórios;
* mocks.

### Jonathan + Carlos

Backend com:

* endpoints principais definidos;
* contratos estabilizados;
* primeiros endpoints disponíveis;
* autenticação funcionando.

---

## Checkpoint 3 — 25/10

Os quatro integrantes devem possuir o fluxo:

```text
React
 ↓
Firebase Authentication
 ↓
ID Token
 ↓
REST API
 ↓
Backend
 ↓
Firestore
```

funcionando de ponta a ponta.

---

# 40. Cronograma Resumido

| Data         | Alane                  | Samara                    | Integração               |
| ------------ | ---------------------- | ------------------------- | ------------------------ |
| **05/10**    | Setup + Firebase       | Componentes base          | —                        |
| **06/10**    | Auth                   | Layout                    | —                        |
| **07/10**    | Entities               | Páginas/rotas             | —                        |
| **08/10**    | Repositories           | Login                     | —                        |
| **09/10**    | API + Mocks            | Avatar/Ranking/Reports    | —                        |
| **10–11/10** | Revisão                | Estilos/revisão           | **Checkpoint 1 — 11/10** |
| **12–13/10** | Domínio                | Dashboard                 | —                        |
| **14–15/10** | Services               | Ranking/Avatar            | —                        |
| **16–17/10** | Mocks/API Contract     | Reports/integração visual | —                        |
| **18/10**    | Testes                 | Revisão                   | **Checkpoint 2 — 18/10** |
| **19/10**    | Preparar API           | Integrar telas            | —                        |
| **20/10**    | User API               | Dados reais               | —                        |
| **21/10**    | Ranking + Achievements | Ajustes                   | —                        |
| **22/10**    | Reports API            | Estados                   | —                        |
| **23/10**    | Auth/Token             | Tratamento visual         | —                        |
| **24/10**    | Erros                  | Responsividade            | —                        |
| **25/10**    | Integração final       | Testes finais             | **Checkpoint 3 — 25/10** |
| **26/10**    | Homologação            | Homologação               | **ENTREGA**              |

---

# 41. Regra de Integração entre Frontend e Backend

Nenhuma equipe deve assumir o formato dos dados da outra.

O frontend deve utilizar o `API_CONTRACT.md` como referência.

O backend deve manter os endpoints compatíveis com o contrato ou comunicar qualquer alteração antes da integração.

Exemplo:

```text
Contrato:

GET /users/{id}

Frontend espera:

{
    id,
    name,
    points,
    level
}
```

Se o backend alterar:

```text
points
```

para:

```text
score
```

a alteração deve ser comunicada e o contrato atualizado antes da integração.

---

# 42. Regra Final do Projeto

O frontend deve ser independente da implementação interna do backend.

Alane e Samara devem conhecer:

```text
Endpoint
Método
Request
Response
Autenticação
Erros
```

Mas não precisam conhecer:

```text
Coleções internas do Firestore
Queries do backend
Credenciais administrativas
Implementação interna dos Services do backend
```

O backend deve ser responsável por esconder esses detalhes.

---

# 43. Status Atual do Frontend

## Implementado

* [x] React + Vite
* [x] JavaScript
* [x] Estrutura inicial de pastas
* [x] CSS global
* [x] Variáveis de estilo
* [x] Firebase configurado
* [x] Firebase Authentication
* [x] Cadastro com e-mail e senha
* [x] Login
* [x] Logout
* [x] Observação do estado de autenticação
* [x] Validação do usuário no Firebase Console
* [x] `.env`
* [x] `.env.example`

## Em desenvolvimento

* [ ] `useAuth.js`
* [ ] `ProtectedRoute.jsx`
* [ ] Entities
* [ ] Repositories
* [ ] Services
* [ ] API Client
* [ ] Mocks
* [ ] Componentes definitivos
* [ ] Dashboard
* [ ] Ranking
* [ ] Avatar
* [ ] Reports
* [ ] Profile
* [ ] Integração com backend

---

# 44. Resultado esperado em 26/10

Ao final do período, o Dashboard Gamificado deverá possuir:

```text
React + Vite
      │
      ├── Firebase Authentication
      │
      ├── POO
      ├── SOLID
      ├── Repository Pattern
      ├── Services
      ├── Hooks
      ├── Components
      └── Pages
              │
              ▼
          REST API
              │
              ▼
        Backend GPADS
              │
              ▼
          Firestore
```

O objetivo é entregar um frontend **organizado, desacoplado, documentado e integrado ao backend**, permitindo que futuras funcionalidades sejam adicionadas sem precisar reconstruir a arquitetura existente.
