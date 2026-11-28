// Apoio das funções de correspondência (o "_" no nome faz a Vercel NÃO tratar este arquivo como uma rota).
const { neon } = require('@neondatabase/serverless');
let pronto = false;

const conectar = () => neon(process.env.DATABASE_URL);

async function garantirTabela(sql) {
  if (pronto) return;
  await sql`CREATE TABLE IF NOT EXISTS correspondencias (
    id BIGSERIAL PRIMARY KEY,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    prof SMALLINT NOT NULL,
    de TEXT NOT NULL,
    texto TEXT NOT NULL,
    vid TEXT,
    lida BOOLEAN NOT NULL DEFAULT false
  )`;
  await sql`CREATE INDEX IF NOT EXISTS correspondencias_prof_idx ON correspondencias (prof, id)`;
  pronto = true;
}

const corpo = (req) => (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {}));
const profValido = (v) => { const n = Number(v); return v !== '' && v != null && Number.isInteger(n) && n >= 0 && n <= 3 ? n : null; };
const limpar = (t) => String(t || '').replace(/\r/g, '').trim().slice(0, 2000);

module.exports = { conectar, garantirTabela, corpo, profValido, limpar };
