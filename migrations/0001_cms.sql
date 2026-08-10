CREATE TABLE IF NOT EXISTS allowed_users (
  email TEXT PRIMARY KEY COLLATE NOCASE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Sem categoria',
  status TEXT NOT NULL DEFAULT 'Rascunho',
  link TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT '',
  link TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Ativo',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO allowed_users (email) VALUES ('amandalarasantos0914@gmail.com');
INSERT OR IGNORE INTO allowed_users (email) VALUES ('a270056@dac.unicamp.br');
INSERT OR IGNORE INTO products (name, detail, link) VALUES ('Camiseta EnE', 'Vista a educação pública', 'https://www.instagram.com/ene.unicamp/');
INSERT OR IGNORE INTO products (name, detail, link) VALUES ('Caneca EnE', 'Economia para todo dia', 'https://www.instagram.com/ene.unicamp/');
INSERT OR IGNORE INTO products (name, detail, link) VALUES ('Ecobag EnE', 'Conhecimento em circulação', 'https://www.instagram.com/ene.unicamp/');
