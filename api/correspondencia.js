// Função da Vercel: correspondências do PROFESSOR para a Rebeca (e as respostas dela).
// Usa a mesma variável DATABASE_URL (Neon) do registro de progresso.
//   GET  ?prof=N                  -> conversa do professor N + quantas respostas ainda não foram lidas
//   POST {acao:'enviar', prof, texto, vid}
//   POST {acao:'lido', prof}      -> marca as respostas da Rebeca como lidas
const { conectar, garantirTabela, corpo, profValido, limpar } = require('./_db');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const sql = conectar();
    await garantirTabela(sql);

    if (req.method === 'GET') {
      const prof = profValido(req.query && req.query.prof);
      if (prof === null) return res.status(400).json({ ok: false });
      const itens = await sql`SELECT id, de, texto, criado_em, lida FROM correspondencias
        WHERE prof = ${prof} ORDER BY id ASC LIMIT 200`;
      const novas = itens.filter((i) => i.de === 'admin' && !i.lida)
        .map((i) => ({ id: i.id, texto: i.texto, criado_em: i.criado_em }))
        .reverse();
      return res.status(200).json({ ok: true, itens, novas, naoLidas: novas.length });
    }

    if (req.method === 'POST') {
      const b = corpo(req);
      const prof = profValido(b.prof);
      if (prof === null) return res.status(400).json({ ok: false });

      if (b.acao === 'lido') {
        await sql`UPDATE correspondencias SET lida = true WHERE prof = ${prof} AND de = 'admin' AND lida = false`;
        return res.status(200).json({ ok: true });
      }

      if (b.acao === 'enviar') {
        const texto = limpar(b.texto);
        if (texto.length < 2) return res.status(400).json({ ok: false, erro: 'vazio' });
        const r = await sql`SELECT count(*)::int AS n FROM correspondencias
          WHERE prof = ${prof} AND de = 'prof' AND criado_em > now() - interval '1 hour'`;
        if (r[0].n >= 15) return res.status(429).json({ ok: false, erro: 'muitas' });
        const vid = String(b.vid || '').slice(0, 64) || null;
        await sql`INSERT INTO correspondencias (prof, de, texto, vid) VALUES (${prof}, 'prof', ${texto}, ${vid})`;
        return res.status(200).json({ ok: true });
      }
      return res.status(400).json({ ok: false });
    }
    return res.status(405).json({ ok: false });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false });
  }
};
