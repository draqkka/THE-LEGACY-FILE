// Função da Vercel: grava o progresso e as respostas no Neon (Postgres).
// Variável de ambiente: DATABASE_URL (a integração Neon da Vercel cria sozinha).
// Diagnóstico: abra https://SEU-SITE.vercel.app/api/registrar no navegador -> mostra {"db":true} se estiver tudo certo.
const { neon } = require('@neondatabase/serverless');

const TIPOS = ['escolha', 'etapa', 'resposta', 'dica', 'concluiu'];

// Aceita DATABASE_URL ou a variável criada pela integração com outro nome/prefixo (ex.: STORAGE_DATABASE_URL, POSTGRES_URL).
function urlBanco() {
  const e = process.env;
  if (e.DATABASE_URL) return e.DATABASE_URL;
  const k = Object.keys(e).find((n) => /(DATABASE_URL|POSTGRES_URL)$/.test(n) && !/(UNPOOLED|NON_POOLING|NO_SSL)/.test(n));
  return k ? e[k] : '';
}

// Cria a tabela uma vez. Duas requisições simultâneas no primeiro acesso podiam fazer o CREATE TABLE falhar
// (erro 23505/42P07 do Postgres), o que gerava o 500. Esses erros são ignorados: a tabela já existe.
let tabela = null;
function garantirTabela(sql) {
  if (!tabela) {
    tabela = (async () => {
      try {
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
      } catch (e) {
        if (!e || !['23505', '42P07'].includes(e.code)) throw e;
      }
    })().catch((e) => { tabela = null; throw e; });
  }
  return tabela;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const url = urlBanco();

  if (req.method === 'GET') { // diagnóstico (não mostra segredos)
    if (!url) return res.status(200).json({ db: false, motivo: 'variavel_DATABASE_URL_ausente_neste_deploy' });
    try {
      const sql = neon(url);
      await garantirTabela(sql);
      await sql`SELECT 1`;
      return res.status(200).json({ db: true });
    } catch (e) {
      console.error('diagnostico', e);
      return res.status(200).json({ db: false, motivo: 'falha_na_conexao_ou_na_tabela (veja os Logs da Vercel)' });
    }
  }
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  try {
    const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (!TIPOS.includes(b.tipo)) return res.status(400).json({ ok: false });
    const num = (v, max) => (Number.isInteger(v) && v >= 0 && v <= max ? v : null);
    const vid = String(b.vid || '').slice(0, 64);
    if (!vid) return res.status(400).json({ ok: false });
    if (!url) { console.error('DATABASE_URL ausente: conecte o Neon ao projeto e faça um novo deploy.'); return res.status(500).json({ ok: false, erro: 'sem_banco' }); }

    const sql = neon(url);
    await garantirTabela(sql);
    await sql`INSERT INTO eventos (vid, prof, tipo, etapa, pergunta, n, resposta, correta)
      VALUES (${vid}, ${num(b.prof, 3)}, ${b.tipo}, ${num(b.etapa, 20)}, ${num(b.q, 5)}, ${num(b.n, 3)},
              ${b.r == null ? null : String(b.r).slice(0, 200)}, ${b.ok == null ? null : !!b.ok})`;
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('registrar', e);
    return res.status(500).json({ ok: false });
  }
};
