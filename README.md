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
