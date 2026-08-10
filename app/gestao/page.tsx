"use client";

import { useState } from "react";

const initialPosts = [
  { title: "O que faz um governador?", category: "Estado e sociedade", status: "Publicado", date: "17 jul. 2026" },
  { title: "Economia está em todo lugar", category: "Economia no cotidiano", status: "Rascunho", date: "10 ago. 2026" },
];
const initialProducts = [
  { name: "Camiseta EnE", link: "instagram.com/ene.unicamp", status: "Ativo" },
  { name: "Caneca EnE", link: "instagram.com/ene.unicamp", status: "Ativo" },
  { name: "Ecobag EnE", link: "instagram.com/ene.unicamp", status: "Ativo" },
];

export default function Gestao() {
  const [tab, setTab] = useState<"inicio" | "posts" | "produtos" | "usuarios">("inicio");
  const [posts, setPosts] = useState(initialPosts);
  const [products, setProducts] = useState(initialProducts);
  const [editor, setEditor] = useState<"post" | "produto" | null>(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("https://www.instagram.com/ene.unicamp/");
  const [allowedEmails, setAllowedEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState("");

  function addEmail() {
    const email = newEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || allowedEmails.includes(email)) return;
    setAllowedEmails([...allowedEmails, email]); setNewEmail("");
  }

  function save() {
    if (!title.trim()) return;
    if (editor === "post") setPosts([{ title, category: "Sem categoria", status: "Rascunho", date: "Agora" }, ...posts]);
    if (editor === "produto") setProducts([{ name: title, link: link.replace(/^https?:\/\//, ""), status: "Ativo" }, ...products]);
    setTitle(""); setEditor(null);
  }

  return <main className="admin">
    <aside className="admin-sidebar"><a className="admin-logo" href="/">ENE<span>gestão</span></a><nav><button className={tab === "inicio" ? "active" : ""} onClick={() => setTab("inicio")}>▦ Visão geral</button><button className={tab === "posts" ? "active" : ""} onClick={() => setTab("posts")}>◇ Publicações</button><button className={tab === "produtos" ? "active" : ""} onClick={() => setTab("produtos")}>□ Produtos</button><button>○ Páginas do site</button><button>⌁ Eventos</button><button className={tab === "usuarios" ? "active" : ""} onClick={() => setTab("usuarios")}>◎ Usuários</button><button>⚙ Configurações</button></nav><a href="/">← Ver site</a></aside>
    <section className="admin-content">
      <header><div><p>PAINEL DA GESTÃO</p><h1>{tab === "inicio" ? "Boa tarde, equipe EnE." : tab === "posts" ? "Publicações" : tab === "produtos" ? "Produtos" : "Usuários autorizados"}</h1></div>{tab !== "usuarios" && <button onClick={() => setEditor(tab === "produtos" ? "produto" : "post")}>+ {tab === "produtos" ? "Novo produto" : "Nova publicação"}</button>}</header>
      <div className="admin-notice"><b>Protótipo do painel</b><span>As alterações são demonstrativas nesta versão. A persistência online será ativada com banco de dados e acesso protegido.</span></div>
      {tab === "inicio" && <><div className="admin-stats"><article><span>Publicações</span><strong>{posts.length}</strong><small>1 rascunho</small></article><article><span>Produtos</span><strong>{products.length}</strong><small>todos ativos</small></article><article><span>Última atualização</span><strong>Hoje</strong><small>há poucos minutos</small></article></div><div className="admin-shortcuts"><button onClick={() => setTab("posts")}><span>◇</span><b>Gerenciar publicações</b><small>Posts e reels do Instagram</small></button><button onClick={() => setTab("produtos")}><span>□</span><b>Gerenciar produtos</b><small>Itens, fotos e links de compra</small></button></div></>}
      {(tab === "inicio" || tab === "posts") && <div className="admin-table"><div className="admin-table-head"><h2>Publicações recentes</h2>{tab === "inicio" && <button onClick={() => setTab("posts")}>Ver todas →</button>}</div>{posts.map((post, i) => <div className="post-row" key={`${post.title}-${i}`}><span className="post-thumb">ENE</span><div><b>{post.title}</b><small>{post.category}</small></div><em className={post.status === "Publicado" ? "published" : "draft"}>{post.status}</em><time>{post.date}</time><button aria-label={`Opções para ${post.title}`}>•••</button></div>)}</div>}
      {tab === "produtos" && <div className="admin-table"><div className="admin-table-head"><h2>Vitrine do site</h2><span className="table-help">O link pode apontar para Instagram, formulário ou loja.</span></div>{products.map((product, i) => <div className="product-row" key={`${product.name}-${i}`}><span className="post-thumb">ENE</span><div><b>{product.name}</b><small>{product.link}</small></div><em className="published">{product.status}</em><button aria-label={`Editar ${product.name}`}>Editar</button></div>)}</div>}
      {tab === "usuarios" && <div className="users-panel"><div><h2>Adicionar usuário</h2><p>O usuário receberá acesso ao painel após a sincronização com a política de segurança.</p><label>E-mail institucional ou pessoal<div><input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="nome@exemplo.com" /><button onClick={addEmail}>Adicionar</button></div></label></div><div><h2>Com acesso</h2>{allowedEmails.length === 0 && <p>Nenhum endereço é armazenado no código público. Os usuários serão carregados pela infraestrutura segura.</p>}{allowedEmails.map(email => <div className="user-row" key={email}><span>{email.slice(0,1).toUpperCase()}</span><b>{email}</b><button onClick={() => setAllowedEmails(allowedEmails.filter(item => item !== email))}>Remover</button></div>)}</div></div>}
    </section>
    {editor && <div className="modal-backdrop" onClick={() => setEditor(null)}><div className="editor-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setEditor(null)}>×</button><p>{editor === "produto" ? "NOVO PRODUTO" : "NOVA PUBLICAÇÃO"}</p><h2>{editor === "produto" ? "Adicione à vitrine" : "Comece pelo título"}</h2><label>{editor === "produto" ? "Nome do produto" : "Título"}<input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder={editor === "produto" ? "Ex.: Caderno EnE" : "Ex.: Por que os preços aumentam?"} /></label>{editor === "produto" ? <label>Link ao clicar<input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..." /></label> : <label>Categoria<select><option>Economia no cotidiano</option><option>Estado e sociedade</option><option>Universidade pública</option></select></label>}<div><button className="ghost" onClick={() => setEditor(null)}>Cancelar</button><button onClick={save}>{editor === "produto" ? "Adicionar produto" : "Criar rascunho"} →</button></div></div></div>}
  </main>;
}
