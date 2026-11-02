# Implantação GPADS CodePath

## 1. Firebase (mesmo projeto no front e no back)

1. Ative Authentication > Sign-in method > Email/Password.
2. Crie o Firestore em modo de produção. A aplicação usa o Admin SDK no servidor; os clientes não acessam o Firestore diretamente. Publique as regras de firestore.rules.
3. Gere uma conta de serviço em Project settings > Service accounts. O JSON é segredo e deve ser um Secret File do Render, nunca arquivo do GitHub ou variável VITE_.
4. Cadastre inicialmente o líder em Authentication e copie o UID. Em Firestore, coleção users, documento com esse UID, configure:

```json
{
  "name": "Nome do líder",
  "email": "lider@exemplo.com",
  "role": "leader",
  "ledCellIds": ["celula-backend"],
  "publicationTargets": {"GpadsTech/gpads-os-test": ["relatorios/celula-backend"]},
  "level": 1,
  "avatarId": "nova"
}
```

O papel oficial de estudante/membro é student. O servidor também reconhece user em dados antigos. Somente leader pode acessar o cadastro novo; ele não permite criar admin, evaluator ou outro líder. A nova conta recebe cellId de uma célula liderada por quem cadastrou. Senhas vão apenas para o Firebase Authentication; não são gravadas nos perfis ou respostas da API.

5. O líder entra no CodePath > Cadastrar usuários e preenche Nome, E-mail, Senha (mínimo 8 caracteres), Tipo de usuário: Estudante / membro. Havendo várias células, escolhe uma delas.
6. Para permitir entregas, crie ao menos um desafio ativo em challenges (o ID do documento é o identificador do desafio):

```json
{
  "title": "Relatório quinzenal - Sprint 1",
  "description": "Registrar atividades, aprendizados e código da quinzena",
  "status": "active",
  "cellId": "celula-backend",
  "difficulty": "medium",
  "points": 0,
  "createdAt": "2026-10-29T12:00:00Z"
}
```

A administração também pode gerenciar desafios por POST/PATCH /api/challenges/ com uma conta admin. Criar novos líderes e liberar repositórios continua sendo tarefa administrativa.

## 2. GitHub para publicação de entregas

Crie um token com Contents: Read and write nos repositórios escolhidos e autorize a organização GpadsTech quando necessário. Configure GITHUB_TOKEN somente no Render.

O repositório precisa constar tanto em GITHUB_ALLOWED_REPOSITORIES do servidor quanto em publicationTargets do perfil do líder. Cada valor de publicationTargets é uma lista de pastas base autorizadas. O líder seleciona o repositório e informa a pasta base ou uma subpasta dela na avaliação. Para liberar outro repositório GpadsTech, atualize as duas configurações.

Destino final: pasta-base/UID-do-estudante/ID-da-entrega/report.md e code.txt. O relatório inclui a data de construção informada pelo estudante, o UID e a data de envio. O UID evita confundir estudantes com nomes iguais. Arquivos existentes com conteúdo diferente não são sobrescritos. Uma publicação incompleta pode ser retomada sem duplicar pontos.

## 3. Backend no Render

1. New > Web Service > conecte GpadsTech/gpads-codepath-backend e selecione a branch alternativa desta entrega.
2. Runtime: Python. Root Directory: deixe vazio (manage.py está na raiz).
3. Build Command: pip install -r requirements.txt && python manage.py collectstatic --noinput
4. Start Command: gunicorn app.config.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 90
5. Health Check Path: /api/health/
6. Em Environment, configure:

| Variável | Valor |
| --- | --- |
| PYTHON_VERSION | 3.12.8 |
| DJANGO_SECRET_KEY | segredo aleatório longo e fixo |
| DJANGO_DEBUG | False |
| FRONTEND_URL | https://seu-projeto.vercel.app (sem barra final) |
| FIREBASE_PROJECT_ID | ID do projeto Firebase |
| FIREBASE_CREDENTIALS_PATH | /etc/secrets/firebase-service-account.json |
| GITHUB_OWNER | GpadsTech |
| GITHUB_ALLOWED_REPOSITORIES | GpadsTech/gpads-os-test (outros separados por vírgula) |
| GITHUB_TOKEN | token com permissão de escrita |
| GEMINI_API_KEY | sua chave Gemini |
| GEMINI_MODEL | gemini-3.5-flash-lite |

Em Secret Files, crie firebase-service-account.json com o JSON da conta de serviço. O hostname fornecido pelo Render é adicionado automaticamente a ALLOWED_HOSTS. Para domínio próprio, acrescente-o em DJANGO_ALLOWED_HOSTS. FRONTEND_URL aceita uma lista explícita de origens separadas por vírgula; previews da Vercel devem ser adicionados individualmente se precisarem chamar este backend.

Alternativamente, render.yaml permite criar o serviço por Blueprint; preencha as variáveis marcadas como segredo/configuração e o Secret File. Os dados da aplicação e a cota de IA ficam no Firestore e sobrevivem a reinícios e múltiplos workers. SQLite não armazena os dados de negócio.

## 4. Frontend na Vercel

1. Add New > Project > conecte GpadsTech/gpads-codepath-frontend.
2. Selecione Vite, Root Directory vazio, Node.js 22.x ou 24.x, Build Command npm run build, Output Directory dist.
3. Em Settings > Git, configure a branch alternativa como Production Branch se quiser publicar esta versão como produção. Sem essa alteração, a Vercel pode gerar apenas um Preview Deployment.
4. Configure todas as variáveis de .env.example para os ambientes desejados:
   - VITE_API_URL=https://SEU-BACKEND.onrender.com/api (inclua /api, sem barra final).
   - VITE_FIREBASE_API_KEY
   - VITE_FIREBASE_AUTH_DOMAIN
   - VITE_FIREBASE_PROJECT_ID
   - VITE_FIREBASE_STORAGE_BUCKET
   - VITE_FIREBASE_MESSAGING_SENDER_ID
   - VITE_FIREBASE_APP_ID
5. Copie a configuração Web App do mesmo Firebase usado no backend. A configuração pública Firebase não substitui as regras/permissões do servidor.
6. Em Firebase Authentication > Settings > Authorized domains, adicione o domínio Vercel e eventual domínio próprio.
7. Publique/republique o frontend após alterar variáveis VITE_, pois elas são incorporadas no build.
8. Atualize FRONTEND_URL no Render com a URL final da Vercel e redeploy o backend. vercel.json já encaminha URLs como /reports, /avatar e /users para a SPA.

## 5. IA e limites

POST /api/ai/report/ recebe activities e code e devolve um rascunho editável. GET no mesmo endereço consulta apenas a cota, sem chamar o Gemini. O estudante revisa o texto antes de enviá-lo.

Limite fixo: duas tentativas por usuário por dia, renovado à meia-noite de America/Sao_Paulo. A reserva é transacional no Firestore, antes da chamada externa, para evitar ultrapassar a cota em cliques simultâneos. Tentativas com erro/timeout contam no limite; não há repetição automática. Uma chamada ao Gemini nunca acontece dentro de uma transação que o Firestore possa repetir.

Nesta entrega, as duas chamadas reais de teste foram usadas com o modelo 2.5 e falharam; o diagnóstico final retornou 404 NOT_FOUND. O padrão foi atualizado para gemini-3.5-flash-lite, listado como estável no catálogo atual do Google. A geração com esse modelo final não foi consultada novamente para respeitar o limite autorizado. Configure a chave e a disponibilidade do modelo no seu projeto Google antes do uso em produção.

## 6. Verificação após deploy

- Abra /api/health/ e confirme status ok.
- Entre como líder e cadastre um estudante; confirme que estudantes não veem nem acessam /users.
- Entre com o novo estudante e escolha um avatar. Recarregue e confira a persistência.
- Envie relatório e código com desafio e data de construção.
- Como líder, solicite revisão ou aprove com feedback, pontos, repositório e pasta.
- Confira os links publicados e a data no report.md.
- Ao verificar IA, lembre que cada clique de geração consome uma das duas tentativas diárias.

## Referências

- [Render: Django](https://render.com/docs/deploy-django)
- [Vercel: Vite e rotas SPA](https://vercel.com/docs/frameworks/frontend/vite)
- [Google: modelos Gemini atuais](https://ai.google.dev/gemini-api/docs/models)
- [Google: generateContent](https://ai.google.dev/api/generate-content)
