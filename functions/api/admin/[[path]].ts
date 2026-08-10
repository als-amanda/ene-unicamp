interface Env { DB: D1Database; ACCESS_AUD?: string }

const json = (data: unknown, status = 200) => Response.json(data, { status });
const emailFrom = (request: Request) => request.headers.get("Cf-Access-Authenticated-User-Email")?.trim().toLowerCase() || "";

async function authorized(request: Request, env: Env) {
  const email = emailFrom(request);
  if (!email) return null;
  return await env.DB.prepare("SELECT email FROM allowed_users WHERE email = ? COLLATE NOCASE").bind(email).first<{ email: string }>();
}

export const onRequest: PagesFunction<Env> = async ({ request, env, params }) => {
  if (!env.ACCESS_AUD) return json({ error: "A proteção de acesso ainda está sendo configurada." }, 503);
  const user = await authorized(request, env);
  if (!user) return json({ error: "Acesso não autorizado." }, 403);

  const path = Array.isArray(params.path) ? params.path.join("/") : String(params.path || "state");
  if (request.method === "GET" && path === "state") {
    const [posts, products, users] = await Promise.all([
      env.DB.prepare("SELECT * FROM posts ORDER BY id DESC").all(),
      env.DB.prepare("SELECT * FROM products ORDER BY id DESC").all(),
      env.DB.prepare("SELECT email, created_at FROM allowed_users ORDER BY created_at").all(),
    ]);
    return json({ email: user.email, posts: posts.results, products: products.results, users: users.results });
  }

  if (request.method === "POST") {
    const body = await request.json<Record<string, string>>();
    if (path === "users") {
      const email = body.email?.trim().toLowerCase();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "E-mail inválido." }, 400);
      await env.DB.prepare("INSERT OR IGNORE INTO allowed_users (email) VALUES (?)").bind(email).run();
    } else if (path === "products") {
      if (!body.name?.trim() || !body.link?.trim()) return json({ error: "Nome e link são obrigatórios." }, 400);
      await env.DB.prepare("INSERT INTO products (name, detail, link, status) VALUES (?, ?, ?, 'Ativo')").bind(body.name.trim(), body.detail?.trim() || "", body.link.trim()).run();
    } else if (path === "posts") {
      if (!body.title?.trim()) return json({ error: "Título obrigatório." }, 400);
      await env.DB.prepare("INSERT INTO posts (title, category, status, link) VALUES (?, ?, 'Rascunho', ?)").bind(body.title.trim(), body.category?.trim() || "Sem categoria", body.link?.trim() || "").run();
    } else return json({ error: "Recurso não encontrado." }, 404);
    return json({ ok: true }, 201);
  }

  if (request.method === "DELETE") {
    const [resource, id] = path.split("/");
    if (resource === "users") {
      const email = decodeURIComponent(id || "").toLowerCase();
      if (email === user.email.toLowerCase()) return json({ error: "Você não pode remover seu próprio acesso." }, 400);
      const count = await env.DB.prepare("SELECT COUNT(*) AS total FROM allowed_users").first<{ total: number }>();
      if ((count?.total || 0) <= 1) return json({ error: "O painel precisa manter ao menos um usuário." }, 400);
      await env.DB.prepare("DELETE FROM allowed_users WHERE email = ? COLLATE NOCASE").bind(email).run();
    } else if (resource === "products") await env.DB.prepare("DELETE FROM products WHERE id = ?").bind(Number(id)).run();
    else if (resource === "posts") await env.DB.prepare("DELETE FROM posts WHERE id = ?").bind(Number(id)).run();
    else return json({ error: "Recurso não encontrado." }, 404);
    return json({ ok: true });
  }

  return json({ error: "Método não permitido." }, 405);
};
