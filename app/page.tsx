"use client";

import { useEffect, useState } from "react";

const lessons = [
  { number: "01", title: "Economia no cotidiano", text: "Inflação, renda e escolhas explicadas a partir do que já faz parte da vida." },
  { number: "02", title: "Estado e sociedade", text: "Instituições, políticas públicas e cidadania sem economês." },
  { number: "03", title: "Universidade pública", text: "Caminhos, possibilidades e pertencimento para aproximar estudantes da Unicamp." },
];

const products = [
  { name: "Camiseta EnE", detail: "Vista a educação pública" },
  { name: "Caneca EnE", detail: "Economia para todo dia" },
  { name: "Ecobag EnE", detail: "Conhecimento em circulação" },
];

function Mark({ small = false }: { small?: boolean }) {
  return <span className={`mark ${small ? "mark--small" : ""}`} aria-hidden="true"><i /><i /><i /><i /></span>;
}

function ProjectLogo({ compact = false }: { compact?: boolean }) {
  return <img className={`project-logo ${compact ? "project-logo--compact" : ""}`} src="/ene-logo.png" alt="EnE, Economia nas Escolas" />;
}

function ProjectMark() {
  return <span className="official-mark" aria-label="Símbolo do lobo-guará do EnE"><img src="/ene-logo.png" alt="" /></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.15 });
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));
    return () => reveal.disconnect();
  }, []);

  return (
    <main>
      <header className="nav-shell">
        <a className="brand brand--official" href="#inicio" aria-label="EnE - início"><ProjectLogo compact /></a>
        <button className="menu-button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Navegação principal">
          <a href="#sobre" onClick={() => setMenuOpen(false)}>O projeto</a>
          <a href="#projeto" onClick={() => setMenuOpen(false)}>Projeto</a>
          <a href="#equipes" onClick={() => setMenuOpen(false)}>Equipes</a>
          <a href="#eventos" onClick={() => setMenuOpen(false)}>Eventos</a>
          <a className="nav-cta" href="#parceria" onClick={() => setMenuOpen(false)}>Leve o EnE à sua escola <span>↗</span></a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Economia nas Escolas • Unicamp</p>
          <h1>Economia que educa.<br /><em className="scribble-target">Educação que transforma.<i className="scribble-ring" aria-hidden="true" /></em></h1>
          <p className="hero-lead">Pela democratização do acesso ao conhecimento e à universidade pública.</p>
          <div className="hero-actions">
            <a className="button button--primary" href="#como-funciona">Conheça o projeto <span>↓</span></a>
            <a className="text-link" href="https://www.instagram.com/ene.unicamp/" target="_blank" rel="noreferrer">Acompanhe no Instagram ↗</a>
          </div>
        </div>
        <div className="hero-art" aria-label="Símbolo geométrico inspirado no guará da identidade EnE">
          <div className="orbit orbit--one" /><div className="orbit orbit--two" />
          <ProjectMark />
          <span className="hero-note">Conhecimento que<br />muda de forma.</span>
        </div>
        <div className="ticker" aria-hidden="true"><div><span>ECONOMIA • CIDADANIA • UNIVERSIDADE PÚBLICA • FUTURO • </span><span>ECONOMIA • CIDADANIA • UNIVERSIDADE PÚBLICA • FUTURO • </span></div></div>
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
          <p className="section-index section-index--light">[ 02 | COMO FUNCIONA ]</p>
          <h2>Da universidade<br /><i>para a sala de aula.</i></h2>
          <p>Encontros feitos para provocar perguntas e construir respostas em conjunto.</p>
        </div>
        <div className="lesson-grid">
          {lessons.map((lesson) => <article className="lesson-card" key={lesson.number} data-reveal><span>{lesson.number}</span><div className="lesson-placeholder"><i /><i /><i /></div><h3>{lesson.title}</h3><p>{lesson.text}</p><b>Explorar tema →</b></article>)}
        </div>
      </section>

      <section className="impact" id="conteudos" data-reveal>
        <p className="section-index">[ 03 | NOSSO NORTE ]</p>
        <blockquote>“Democratizar o acesso ao conhecimento e à universidade pública.”</blockquote>
      </section>

      <section className="store" id="produtos">
        <div className="store-intro" data-reveal><p className="section-index section-index--light">[ 04 | PRODUTOS ENE ]</p><h2>Leve o EnE<br />com você.</h2><p>Apoie ações de educação econômica e guarde uma lembrança de um projeto que acredita na universidade pública para todos.</p><a href="https://www.instagram.com/ene.unicamp/" target="_blank" rel="noreferrer">Falar com a equipe ↗</a></div>
        <div className="product-grid">{products.map((product, index) => <a href="https://www.instagram.com/ene.unicamp/" target="_blank" rel="noreferrer" className="product-card" key={product.name} data-reveal><div className={`product-placeholder product-placeholder--${index + 1}`}><span>FOTO EM BREVE</span><Mark small /></div><small>PRODUTO ENE</small><h3>{product.name}</h3><p>{product.detail}</p><b>Quero saber mais ↗</b></a>)}</div>
      </section>

      <section className="inside" id="equipes">
        <div className="inside-heading" data-reveal><p className="section-index">[ 05 | EQUIPES ]</p><h2>EnE por dentro.</h2><p>O projeto nasceu de uma assembleia estudantil em 2018 e é construído coletivamente por diferentes áreas.</p></div>
        <div className="inside-grid">{["Administração","Conteúdo","Marketing","Financeiro","Recursos Humanos"].map((team, index) => <article key={team} data-reveal><span>0{index + 1}</span><h3>{team}</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Em breve, conheça as pessoas e atividades desta equipe.</p></article>)}</div>
      </section>

      <section className="events" id="eventos">
        <div data-reveal><p className="section-index section-index--light">[ 06 | EVENTOS ]</p><h2>Próximos encontros.</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Em breve, esta área reunirá aulas abertas, visitas, formações e atividades do EnE.</p></div>
        <div className="event-placeholder" data-reveal><span>EM BREVE</span><h3>Novos eventos serão publicados aqui</h3><p>Acompanhe nossas redes para não perder as próximas atividades.</p><a href="https://www.instagram.com/ene.unicamp/" target="_blank" rel="noreferrer">Seguir no Instagram ↗</a></div>
      </section>

      <section className="partnership" id="parceria">
        <div className="partnership-copy" data-reveal>
          <p className="eyebrow eyebrow--dark"><span /> Para escolas e educadores</p>
          <h2>Que tal levar o EnE<br /><em>pra sua escola?</em></h2>
          <p>Leve uma atividade do EnE para a sua escola ou construa uma parceria com o projeto.</p>
          <a className="button button--dark" href="mailto:ene@unicamp.br">Quero falar com o EnE <span>↗</span></a>
        </div>
        <div className="partnership-art"><ProjectLogo /></div>
      </section>

      <footer>
        <div className="footer-brand"><a className="brand brand--footer brand--official" href="#inicio"><ProjectLogo /></a><p>Pela democratização do acesso ao conhecimento e à universidade pública.</p></div>
        <div className="footer-institutions"><span>PROJETO DE EXTENSÃO DO</span><div className="institutional-logos" aria-label="Realização"><img src="/unicamp-white.gif" alt="Universidade Estadual de Campinas" /><img src="/ie-white.png" alt="Instituto de Economia da Unicamp" /></div></div>
        <div className="footer-social"><span>ACOMPANHE</span><a href="https://www.instagram.com/ene.unicamp/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
        <span className="footer-copy">© {new Date().getFullYear()} EnE</span>
      </footer>
    </main>
  );
}
