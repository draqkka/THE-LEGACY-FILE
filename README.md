# THE LEGACY FILE
Site estático (HTML/CSS/JS). Sem build. Para publicar: suba tudo no GitHub e ative GitHub Pages (Settings > Pages > branch main, pasta /root).
Todo o conteúdo editável (textos, resposta da charada, fotos, vídeo) fica em `js/data.js`. Itens marcados TODO dependem do seu material.

Fotos em `assets/fotos/`. Pendentes: vídeo do depoimento (`assets/depoimento.mp4`) e confirmação da resposta da charada, tudo em `js/data.js`.

## Atualização: fichas e charadas
- `js/data.js` agora tem, para cada professor (Cássia, Julio, Vanessa e José): ficha completa, `area`, 6 perguntas com 3 dicas cada e o campo `video`.
- Interrogatório (tela 5): um professor por vez, uma pergunta por vez, número da sorte 17 sempre no topo. Só avança com resposta correta; o progresso fica salvo no navegador.
- Perguntas pessoais estão marcadas com `// PESSOAL` no `data.js` — não substituir nem alterar as respostas.

## Onde entram os vídeos (ainda a gravar)
- Vídeo de cada professor: campo `video` dentro de cada professor em `js/data.js` (aparece ao concluir o interrogatório dele; vazio = nada aparece). Ex.: `"assets/video-cassia.mp4"`.
- Vídeo do depoimento final (tela 9): campo `video` no fim de `js/data.js`. Ex.: `"assets/depoimento.mp4"`.
- Os pontos de código estão comentados com `▶ VÍDEO` em `js/data.js` e `js/app.js`.

## Escolha de perfil (na capa, tela 1)
- O professor escolhe o próprio perfil (com confirmação). Depois disso, os outros perfis ficam "Bloqueados" e só o interrogatório e a ficha dele abrem. A escolha fica salva no navegador.
- Para destravar o perfil neste navegador (por exemplo, para outro professor testar): abra o site com `/#liberar` no final do endereço. Isso também zera o progresso.

## Banco de dados (Neon) — progresso e respostas
- `api/registrar.js` grava na tabela `eventos` (criada sozinha): perfil escolhido, etapa, cada resposta (certa/errada), dicas usadas e conclusão. `package.json` instala `@neondatabase/serverless`.
- Na Vercel: Storage → Create Database → Neon → conectar ao projeto (isso cria a variável `DATABASE_URL`) → Redeploy.
- Se o banco não estiver conectado, o site funciona normalmente, só não registra.
- Para ver os dados: Neon → SQL Editor. Ex.: `SELECT criado_em, prof, pergunta, resposta, correta FROM eventos WHERE tipo='resposta' ORDER BY id DESC;`

## Sombra do detetive (foto dos perfis)
- As imagens ficam em `assets/sombra-mulher.jpg` (Cássia e Vanessa) e `assets/sombra-homem.jpg` (Julio e José), definidas no campo `sombra` de cada professor em `js/data.js`. Aparecem como foto dos perfis na capa, no quadro e nas fichas até a revelação final.
- Opcional: uma sombra diferente por professor — adicione `sombra: "assets/sombra-julio.png"` dentro do professor.
- Sem o arquivo, o site mostra a inicial do nome (capa) e um busto genérico (quadro/fichas).
