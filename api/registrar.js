// Função da Vercel: grava o progresso e as respostas no Neon (Postgres).
// Precisa da variável de ambiente DATABASE_URL (a integração Neon da Vercel cria sozinha).
const { neon } = require('@neondatabase/serverless');

const TIPOS = ['escolha', 'etapa', 'resposta', 'dica', 'concluiu'];
let pronto = false;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  try {
    const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (!TIPOS.includes(b.tipo)) return res.status(400).json({ ok: false });
    const num = (v, max) => (Number.isInteger(v) && v >= 0 && v <= max ? v : null);
    const vid = String(b.vid || '').slice(0, 64);
    if (!vid) return res.status(400).json({ ok: false });

    const sql = neon(process.env.DATABASE_URL);
    if (!pronto) {
      await sql`CREATE TABLE IF NOT EXISTS eventos (
        id BIGSERIAL PRIMARY KEY,
        criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
        vid TEXT NOT NULL,
        prof SMALLINT,
        tipo TEXT NOT NULL,
        etapa SMALLINT,
        pergunta SMALLINT,
        n SMALLINT,
        resposta TEXT,
        correta BOOLEAN
      )`;
      pronto = true;
    }
    await sql`INSERT INTO eventos (vid, prof, tipo, etapa, pergunta, n, resposta, correta)
      VALUES (${vid}, ${num(b.prof, 3)}, ${b.tipo}, ${num(b.etapa, 20)}, ${num(b.q, 5)}, ${num(b.n, 3)},
              ${b.r == null ? null : String(b.r).slice(0, 200)}, ${b.ok == null ? null : !!b.ok})`;
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false });
  }
};
