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

function PrincipleIcon({ index }: { index: number }) {
  const paths = [
    <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 5" /></>,
    <><path d="M12 21s-8-4.9-8-10.5a4.5 4.5 0 0 1 8-2.8 4.5 4.5 0 0 1 8 2.8C20 16.1 12 21 12 21Z" /></>,
    <><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
    <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
    <><circle cx="8" cy="8" r="3" /><path d="M2 20v-2a6 6 0 0 1 12 0v2M18 7v8m-4-4h8" /></>,
    <><path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Zm7 14 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
  ];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[index]}</svg>;
}

function ContactIcon({ kind }: { kind: "email" | "instagram" | "location" }) {
  return <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{kind === "email" ? <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></> : kind === "instagram" ? <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></> : <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>}</svg></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

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
    window.location.href = `mailto:economianasescolas@unicamp.br?subject=${encodeURIComponent(`[Site EnE] ${subject}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main>
      <header className="nav-shell">
        <a className="brand brand--official" href="#inicio" aria-label="EnE - início"><ProjectLogo compact /></a>
        <button className="menu-button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Navegação principal">
          <a href="#inicio" onClick={() => setMenuOpen(false)}>Início</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
          <a href="#projeto" onClick={() => setMenuOpen(false)}>Atuação</a>
          <a href="#equipes" onClick={() => setMenuOpen(false)}>Equipes</a>
          <a href="#escolas" onClick={() => setMenuOpen(false)}>Para escolas</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
          <a href="#apoio" onClick={() => setMenuOpen(false)}>Apoio</a>
          <a className="nav-cta" href="#escolas" onClick={() => setMenuOpen(false)}>Leve o EnE à sua escola <span>↗</span></a>
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

      <section className="about" id="sobre">
        <div className="about-heading" data-reveal>
          <p className="section-index">[ 01 | SOBRE O ENE ]</p>
          <h2>Nossa missão é democratizar a <span>educação econômica.</span></h2>
        </div>
        <div className="about-copy" data-reveal>
          <p>O <strong>Economia nas Escolas (EnE)</strong> é um projeto de extensão vinculado ao Instituto de Economia da Universidade Estadual de Campinas (UNICAMP), criado com o propósito de aproximar o conhecimento econômico da sociedade de forma acessível, prática e inclusiva.</p>
          <p>Acreditamos que compreender conceitos econômicos é fundamental para a formação de cidadãos mais conscientes e preparados para interpretar os desafios do mundo contemporâneo. Por isso, desenvolvemos atividades voltadas à educação econômica por meio de ações em escolas públicas, palestras, cursos, produção de materiais didáticos e conteúdos informativos para diferentes públicos.</p>
          <p>Nossa atuação é guiada pela convicção de que o conhecimento deve ultrapassar os limites da universidade e contribuir para a transformação social. Buscamos construir pontes entre o ambiente acadêmico e a comunidade, promovendo espaços de aprendizado, diálogo e reflexão sobre temas econômicos presentes no cotidiano.</p>
          <p>Mais do que ensinar economia, buscamos despertar o interesse pelo pensamento crítico e incentivar uma compreensão mais ampla das questões econômicas que influenciam a vida das pessoas.</p>
        </div>
        <div className="principles" data-reveal>
          <div className="principles-heading"><h3>Nossos princípios</h3><p>O EnE é formado por estudantes comprometidos com a extensão universitária e com a democratização do conhecimento. Em nossas atividades, valorizamos princípios que orientam tanto nossas decisões internas quanto nossa relação com a sociedade:</p></div>
          <ul>{["Horizontalidade", "Respeito", "Transparência", "Autorresponsabilidade", "Inclusividade", "Empatia"].map((principle, index) => <li key={principle}><span className="principle-icon"><PrincipleIcon index={index} /></span><span className="principle-name">{principle}</span></li>)}</ul>
        </div>
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

      <section className="school" id="escolas">
        <div className="school-heading" data-reveal><p className="section-index section-index--light">[ 04 | PARA ESCOLAS ]</p><h2>Como levar o EnE<br />pra sua escola?</h2></div>
        <div className="school-steps">
          <article data-reveal><span className="school-step-number">01</span><p>Geralmente, somos nós que entramos em contato com escolas públicas da região. No entanto, <strong>sempre estamos abertos para novas oportunidades!</strong></p><p>Se você é <strong>gestor, professor e/ou funcionário</strong> de alguma <strong>escola pública</strong> de Campinas e região, basta entrar em contato por aqui e agendar um bate-papo!</p></article>
          <article data-reveal><span className="school-step-number">02</span><p>No bate-papo, poderemos entender a <strong>realidade da sua escola.</strong> Isto é:</p><ul><li>Quais disciplinas são mais necessárias?</li><li>Quantas e quais turmas participarão?</li><li>É uma ação pontual? Ou aulas recorrentes?</li></ul></article>
          <article data-reveal><span className="school-step-number">03</span><p>Depois de definirmos que sua escola será atendida, <strong>cuidaremos de toda a logística.</strong></p><p>Isso aí, <strong>não custa nada</strong> levar o EnE pra sua escola! Informaremos os planos de aula, datas e demais combinados!</p></article>
        </div>
        <a className="button button--primary school-cta" href="#contato">Fale com a equipe <span>↗</span></a>
      </section>

      <section className="contact" id="contato">
        <div className="contact-card" data-reveal>
          <div className="contact-info">
            <p className="section-index section-index--light">[ 05 | CONTATO ]</p>
            <h2>Fale conosco</h2>
            <p className="contact-intro">Tem dúvidas, sugestões ou quer ser uma escola parceira? Entre em contato conosco.</p>
            <div className="contact-details">
              <div><ContactIcon kind="email" /><div><span>E-mail</span><a href="mailto:economianasescolas@unicamp.br">economianasescolas@unicamp.br</a></div></div>
              <div><ContactIcon kind="instagram" /><div><span>Instagram</span><a href="https://www.instagram.com/ene.unicamp/" target="_blank" rel="noreferrer">@ene.unicamp</a></div></div>
              <div><ContactIcon kind="location" /><div><span>Localização</span><p>Instituto de Economia, UNICAMP<br />Rua Pitágoras, 353, Cidade Universitária<br />Campinas, SP</p></div></div>
            </div>
          </div>
          <form className="contact-form" onSubmit={sendContact}>
            <h3>Envie uma mensagem</h3>
            <div className="contact-form-row">
              <div className="contact-field"><label htmlFor="contact-name">Nome completo</label><input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Seu nome" required /></div>
              <div className="contact-field"><label htmlFor="contact-email">E-mail</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" required /></div>
            </div>
            <div className="contact-field"><label htmlFor="contact-subject">Assunto</label><select id="contact-subject" name="subject" defaultValue="" required><option value="" disabled>Selecione um assunto</option><option>Dúvida geral</option><option>Quero ser uma escola parceira</option><option>Processo seletivo</option><option>Imprensa</option></select></div>
            <div className="contact-field"><label htmlFor="contact-message">Mensagem</label><textarea id="contact-message" name="message" rows={5} placeholder="Escreva sua mensagem aqui..." required /></div>
            <button className="button button--primary" type="submit">Enviar mensagem <span>↗</span></button>
          </form>
        </div>
      </section>

      <section className="institutional-support" id="apoio" aria-labelledby="institutional-support-title">
        <div className="institutional-support-heading" data-reveal>
          <p className="section-index">[ APOIO INSTITUCIONAL ]</p>
          <h2 id="institutional-support-title">Apoio institucional.</h2>
        </div>
        <div className="institutional-support-logos" data-reveal>
          <div className="support-logo support-logo--unicamp"><img src="/unicamp-color.png" alt="Unicamp" loading="lazy" /></div>
          <div className="support-logo support-logo--ie"><img src="/ie-color.svg" alt="Instituto de Economia da Unicamp" loading="lazy" /></div>
          <div className="support-logo support-logo--proec"><img src="/proec.png" alt="Pró-Reitoria de Extensão e Cultura da Unicamp, PROEC" loading="lazy" /></div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand"><a className="brand brand--footer brand--official" href="#inicio"><ProjectLogo /></a><p>Projeto de extensão universitária do Instituto de Economia da Unicamp.</p></div>
          <nav className="footer-links" aria-label="Links rápidos"><h2>Links rápidos</h2><a href="#sobre">Sobre</a><a href="#projeto">Atuação</a><a href="#equipes">Equipes</a><a href="#escolas">Para escolas</a><a href="#contato">Contato</a></nav>
          <div className="footer-institutions"><span>UNICAMP · INSTITUTO DE ECONOMIA</span></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Economia nas Escolas. Todos os direitos reservados.</span></div>
      </footer>
    </main>
  );
}
