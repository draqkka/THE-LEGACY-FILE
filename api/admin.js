// Função da Vercel: área da REBECA (admin). Exige a senha da variável de ambiente ADMIN_SENHA,
// enviada no cabeçalho "x-admin-senha" pela página /admin. Os professores nunca recebem essa senha.
//   GET            -> resumo por professor + correspondências novas (sino)
//   GET  ?prof=N   -> conversa completa com o professor N
//   POST {acao:'responder', prof, texto}
//   POST {acao:'lido', prof}
const crypto = require('crypto');
const { conectar, garantirTabela, corpo, profValido, limpar } = require('./_db');

const hash = (s) => crypto.createHash('sha256').update(String(s)).digest();
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const senha = process.env.ADMIN_SENHA;
  if (!senha) return res.status(503).json({ ok: false, erro: 'sem_senha' });
  const enviada = String(req.headers['x-admin-senha'] || '');
  if (!crypto.timingSafeEqual(hash(enviada), hash(senha))) {
    await espera(600);
    return res.status(401).json({ ok: false, erro: 'senha' });
  }
  try {
    const sql = conectar();
    await garantirTabela(sql);

    if (req.method === 'GET') {
      if (req.query && req.query.prof != null && req.query.prof !== '') {
        const prof = profValido(req.query.prof);
        if (prof === null) return res.status(400).json({ ok: false });
        const itens = await sql`SELECT id, de, texto, criado_em, lida FROM correspondencias
          WHERE prof = ${prof} ORDER BY id ASC LIMIT 500`;
        return res.status(200).json({ ok: true, itens });
      }
      const resumo = await sql`SELECT prof, count(*)::int AS total,
          count(*) FILTER (WHERE de = 'prof' AND NOT lida)::int AS nao_lidas,
          max(criado_em) AS ultima
        FROM correspondencias GROUP BY prof`;
      const novas = await sql`SELECT id, prof, texto, criado_em FROM correspondencias
        WHERE de = 'prof' AND NOT lida ORDER BY id DESC LIMIT 30`;
      const naoLidas = resumo.reduce((a, r) => a + r.nao_lidas, 0);
      return res.status(200).json({ ok: true, resumo, novas, naoLidas });
    }

    if (req.method === 'POST') {
      const b = corpo(req);
      const prof = profValido(b.prof);
      if (prof === null) return res.status(400).json({ ok: false });
      if (b.acao === 'lido') {
        await sql`UPDATE correspondencias SET lida = true WHERE prof = ${prof} AND de = 'prof' AND lida = false`;
        return res.status(200).json({ ok: true });
      }
      if (b.acao === 'responder') {
        const texto = limpar(b.texto);
        if (texto.length < 1) return res.status(400).json({ ok: false, erro: 'vazio' });
        await sql`INSERT INTO correspondencias (prof, de, texto) VALUES (${prof}, 'admin', ${texto})`;
        await sql`UPDATE correspondencias SET lida = true WHERE prof = ${prof} AND de = 'prof' AND lida = false`;
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
