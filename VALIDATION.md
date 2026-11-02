# Validação da entrega - 29/10/2026

- Backend: 50 testes aprovados e 1 ignorado (teste Firestore condicionado a ambiente próprio). Nenhum teste automatizado chama o Gemini ou GitHub real.
- Django: system check sem problemas.
- Frontend: build Vite de produção aprovado; oxlint sem erros ou avisos.
- Cota Gemini: testes de isolamento por usuário, renovação por dia e oito tentativas simultâneas limitadas a duas chamadas; falhas contam na cota e não são repetidas automaticamente.
- Gemini real: duas consultas autorizadas usadas no modelo 2.5; diagnóstico 404 NOT_FOUND. Padrão corrigido para gemini-3.5-flash-lite conforme catálogo atual, sem terceira consulta. O modelo final ainda requer confirmação real no projeto Google.
- Cadastro real Firebase: criação e login por senha aprovados; perfil student vinculado à célula, sem senha armazenada; conta temporária removida. Repositório de perfis em memória nesse teste, Firebase Authentication real.
- GitHub real: fluxo de criação de entrega e avaliação pelos serviços publicou report.md e code.txt no gpads-os-test com sucesso. Perfis/repos de domínio em memória, cliente GitHub real; não é um teste de sessão de líder já implantada.
- Destino: validacoes-codepath/estudante-teste-codepath/8f66f9458ecd4734b0ada38065c0a240/. O relatório inclui a data de construção 2026-10-29.
- Não foi encontrado no Firebase um líder com publicationTargets autorizado para gpads-os-test. DEPLOY.md explica o provisionamento; perfis existentes não foram alterados.

## Relatório publicado

https://github.com/GpadsTech/gpads-os-test/blob/HEAD/validacoes-codepath/estudante-teste-codepath/8f66f9458ecd4734b0ada38065c0a240/report.md

- Interface: cenários de navegação, envio, escolha de avatar, cadastro e bloqueio de estudante verificados no Edge headless com dados locais simulados; sete capturas desktop/mobile revisadas. Nenhuma chamada Gemini nesses testes.
