"use client";

import { useEffect, useState } from "react";

const activities = [
  { number: "01", title: "Aulas de Educação Financeira", text: "Conceitos básicos de educação financeira, com atenção à poupança e ao controle de gastos no cotidiano." },
  { number: "02", title: "Clube de Leitura", text: "Um espaço para conhecer e discutir conceitos econômicos que vão além das aulas de educação financeira." },
  { number: "03", title: "Aulas Especiais e Visitas", text: "Encontros que aproximam estudantes dos debates atuais e da vida na universidade." },
  { number: "04", title: "Instagram", text: "Conteúdos para levar a conversa sobre economia a mais pessoas.", href: "https://www.instagram.com/ene.unicamp/" },
  { number: "05", title: "Projeto Cartilha", text: "Material físico e digital de fácil acesso para apoiar a reflexão sobre economia, inclusive em sala de aula." },
];

function ProjectLogo({ compact = false }: { compact?: boolean }) {
  return <img className={`project-logo ${compact ? "project-logo--compact" : ""}`} src="/ene-logo.png" alt="EnE, Economia nas Escolas" />;
}

function ProjectMark() {
  return <span className="official-mark" aria-label="Símbolo do lobo-guará do EnE"><img src="/ene-logo.png" alt="" /></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailNotice, setEmailNotice] = useState(false);

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.15 });
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));
    return () => reveal.disconnect();
  }, []);

  function sendContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = `Nome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\n\n${message}`;
    setEmailNotice(true);
    window.location.href = `mailto:economianasescolas@unicamp.br?subject=${encodeURIComponent(`[Site EnE] ${subject}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main>
      <header className="nav-shell">
        <a className="brand brand--official" href="#inicio" aria-label="EnE - início"><ProjectLogo compact /></a>
        <button className="menu-button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Navegação principal">
          <a href="#sobre" onClick={() => setMenuOpen(false)}>O projeto</a>
          <a href="#projeto" onClick={() => setMenuOpen(false)}>Atuação</a>
          <a href="#equipes" onClick={() => setMenuOpen(false)}>Equipes</a>
          <a className="nav-cta" href="#contato" onClick={() => setMenuOpen(false)}>Leve o EnE à sua escola <span>↗</span></a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Economia nas Escolas • Unicamp</p>
          <h1>Economia que educa.<br /><em className="scribble-target">Educação que transforma.<i className="scribble-ring" aria-hidden="true" /></em></h1>
          <p className="hero-lead">Pela democratização do acesso ao conhecimento e à universidade pública.</p>
          <div className="hero-actions">
            <a className="button button--primary" href="#projeto">Conheça o projeto <span>↓</span></a>
            <a className="text-link" href="https://www.instagram.com/ene.unicamp/" target="_blank" rel="noreferrer">Acompanhe no Instagram ↗</a>
          </div>
        </div>
        <div className="hero-art" aria-label="Símbolo geométrico inspirado no guará da identidade EnE">
          <div className="orbit orbit--one" /><div className="orbit orbit--two" />
          <ProjectMark />
          <span className="hero-note">Conhecimento que<br />muda de forma.</span>
        </div>
        <div className="ticker" aria-hidden="true"><div className="ticker-track">{[0, 1].map((group) => <div className="ticker-group" key={group}>{[0, 1, 2, 3].map((item) => <span key={item}>ECONOMIA • CIDADANIA • UNIVERSIDADE PÚBLICA • FUTURO •&nbsp;</span>)}</div>)}</div></div>
      </section>

      <section className="statement" id="sobre" data-reveal>
        <p className="section-index">[ 01 | POR QUÊ ]</p>
        <div>
          <h2>Economia não precisa<br />ser <span>distante.</span></h2>
          <p>O EnE é um projeto de extensão do Instituto de Economia da Unicamp. Aproximamos o conhecimento econômico de estudantes da educação básica com conversas acessíveis, críticas e conectadas ao cotidiano.</p>
        </div>
        <div className="scribble" aria-hidden="true">↗</div>
      </section>

      <section className="method" id="projeto">
        <div className="method-heading" data-reveal>
          <p className="section-index section-index--light">[ 02 | O QUE FAZEMOS ]</p>
          <h2>Eixos de <i>atuação.</i></h2>
          <p>Educação econômica em diferentes formatos, dentro e fora da sala de aula.</p>
        </div>
        <div className="activity-grid">
          {activities.map((activity) => <article className="activity-card" key={activity.number} data-reveal><span>{activity.number}</span><h3>{activity.title}</h3><p>{activity.text}</p>{activity.href && <a href={activity.href} target="_blank" rel="noreferrer">Ver no Instagram ↗</a>}</article>)}
        </div>
      </section>

      <section className="inside" id="equipes">
        <div className="inside-heading" data-reveal><p className="section-index">[ 03 | EQUIPES ]</p><h2>EnE por dentro.</h2><p>O projeto nasceu de uma assembleia estudantil em 2018 e é construído coletivamente por diferentes áreas.</p></div>
        <div className="inside-grid">{["Administração","Conteúdo","Marketing","Financeiro","Recursos Humanos"].map((team, index) => <article key={team} data-reveal><span>0{index + 1}</span><h3>{team}</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Em breve, conheça as pessoas e atividades desta equipe.</p></article>)}</div>
      </section>

      <section className="contact" id="contato">
        <div className="contact-info" data-reveal>
          <p className="section-index">[ 04 | CONTATO ]</p>
          <h2>Fale conosco.</h2>
          <p className="contact-intro">Tem dúvidas, sugestões ou quer ser nosso parceiro? Entre em contato conosco.</p>
          <div className="contact-details">
            <div><span>E-mail</span><a href="mailto:economianasescolas@unicamp.br">economianasescolas@unicamp.br ↗</a></div>
            <div><span>Instagram</span><a href="https://www.instagram.com/ene.unicamp/" target="_blank" rel="noreferrer">@ene.unicamp ↗</a></div>
            <div><span>Localização</span><p>Instituto de Economia, UNICAMP<br />Rua Pitágoras, 353, Cidade Universitária<br />Campinas, SP</p></div>
          </div>
        </div>
        <form className="contact-form" onSubmit={sendContact} data-reveal>
          <h3>Envie uma mensagem</h3>
          <label htmlFor="contact-name">Nome completo</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required />
          <label htmlFor="contact-email">E-mail</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="contact-subject">Assunto</label>
          <select id="contact-subject" name="subject" defaultValue="" required><option value="" disabled>Selecione um assunto</option><option>Dúvida geral</option><option>Quero ser uma escola parceira</option><option>Processo seletivo</option><option>Imprensa</option></select>
          <label htmlFor="contact-message">Mensagem</label>
          <textarea id="contact-message" name="message" rows={5} required />
          <button className="button button--primary" type="submit">Enviar mensagem <span>↗</span></button>
          <p className="contact-form-note" role="status">{emailNotice ? "Seu aplicativo de e-mail será aberto para revisar e enviar a mensagem." : "Ao enviar, seu aplicativo de e-mail será aberto para você revisar a mensagem."}</p>
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand"><a className="brand brand--footer brand--official" href="#inicio"><ProjectLogo /></a><p>Projeto de extensão universitária do Instituto de Economia da Unicamp.</p></div>
          <nav className="footer-links" aria-label="Links rápidos"><h2>Links rápidos</h2><a href="#sobre">Sobre</a><a href="#projeto">Atuação</a><a href="#equipes">Equipes</a><a href="#contato">Contato</a></nav>
          <div className="footer-institutions"><span>UNICAMP · INSTITUTO DE ECONOMIA</span><div className="institutional-logos" aria-label="Realização"><img src="/unicamp-white.gif" alt="Universidade Estadual de Campinas" /><img src="/ie-white.png" alt="Instituto de Economia da Unicamp" /></div></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Economia nas Escolas. Todos os direitos reservados.</span></div>
      </footer>
    </main>
  );
}
