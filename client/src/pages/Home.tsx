/**
 * Editorial Data Lab style: warm ivory paper, ink-black type, terracotta signal,
 * asymmetrical research-spread layout, and restrained page-turn interactions.
 */
import { ArrowDownRight, ArrowUpRight, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { LiveClock } from "@/components/LiveClock";
import { ThreeField } from "@/components/ThreeField";

const projects = (t: any) => [
  {
    number: "01",
    status: "ACTIVE RESEARCH",
    title: "MULTIMODAL\nCROSS-DOMAIN",
    body: "Ongoing research into cross-domain multimodal AI architectures and integration strategies.",
    tags: ["Multimodal AI", "Cross-Domain", "AI Research"],
    image: "/manus-storage/eswar-project-colorization_772c2082.jpg",
    tone: "terracotta",
    question: "How can models bridge disparate data domains?",
    method: "Active investigation into multimodal fusion.",
    outcome: "Ongoing research phase.",
  },
  {
    number: "02",
    status: t.projects.statusResearch || "M.TECH RESEARCH",
    title: "Image Colorization\nwith Deep Learning",
    body: "A U-Net convolutional autoencoder that reconstructs color from grayscale inputs in LAB space, balancing pixel accuracy with perceptual loss.",
    tags: ["U-Net", "LAB", "Perceptual Loss", "TensorFlow"],
    image: "/manus-storage/eswar-project-colorization_772c2082.jpg",
    tone: "terracotta",
    question: "Can a model restore what the eye cannot see?",
    method: "U-Net autoencoder in LAB space with perceptual loss.",
    outcome: "A CPU-friendly colorization pipeline for research iteration.",
  },
  {
    number: "03",
    status: t.projects.statusApplied || "APPLIED RESEARCH",
    title: "Smart Energy\nGrid Optimization",
    body: "An IDSGOF framework combining IoT, LSTM–Transformer forecasting, and multi-agent reinforcement learning for renewable-energy integration.",
    tags: ["LSTM–Transformer", "MARL", "IoT", "Time Series"],
    image: "/manus-storage/eswar-project-energy_c56dc124.jpg",
    tone: "sage",
    question: "How can renewable systems respond before demand shifts?",
    method: "LSTM–Transformer forecasting with multi-agent learning.",
    outcome: "A framework for dynamic load prediction and integration.",
  },
  {
    number: "04",
    status: t.projects.statusMedical || "MEDICAL AI",
    title: "Heart Disease\nPrediction with DNN",
    body: "An interpretability-focused neural network with dropout regularization and feature-importance analysis for clinical risk prediction.",
    tags: ["DNN", "SHAP", "Scikit-learn", "Medical AI"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
    tone: "blue",
    question: "Can risk prediction stay interpretable in clinical contexts?",
    method: "DNN with dropout, regularization, and SHAP analysis.",
    outcome: "A transparent design for responsible clinical deployment.",
  },
  {
    number: "05",
    status: "COMPLETED — IEEE / RESEARCHGATE",
    title: "Real-Time\nFace Detection",
    body: "A computer-vision system using OpenCV for cybersecurity and employee-security applications, published as research in December 2024.",
    tags: ["OpenCV", "Computer Vision", "Python", "Research"],
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=85",
    tone: "ink",
    question: "Can live vision become a practical security signal?",
    method: "OpenCV-based real-time facial recognition system.",
    outcome: "An IEEE / ResearchGate publication from December 2024.",
  },
];

const skills = (t: any) => [
  ["Machine Learning & AI", "Python · TensorFlow · Keras · Scikit-learn · OpenCV · NumPy · Pandas · CNNs · U-Net"],
  ["Programming & Data", "Python · SQL · JavaScript · TypeScript · HTML · CSS · MongoDB · Apache Hive"],
  ["Cloud / Infrastructure", "AWS · AWS EC2 · AWS Bedrock · Azure · Elastic Beanstalk"],
  ["Visualization / Tools", "Power BI · Tableau · Google Colab · Jupyter · GitHub"],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, language } = usePortfolio();
  const navItems = [
    [t.nav.projects, "projects"],
    [t.nav.toolkit, "toolkit"],
    [t.nav.journey, "journey"],
    [t.nav.contact, "contact"],
  ] as const;

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Y ESWAR home">
          <img src="/manus-storage/eswar-monogram_ff7fbb50.png" alt="" />
          <span>Y ESWAR</span>
        </a>
        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Primary navigation">
          {navItems.map(([item, id], index) => (
            <button key={id} onClick={() => { scrollToId(id); setMenuOpen(false); }}>
              <span>0{index + 1}</span>{item}
            </button>
          ))}
        </nav>
        <LiveClock />
        <a className="header-link" href="mailto:eswaryadav8543@gmail.com">{t.nav.talk} <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span className="rule" /> {t.hero.eyebrow}</p>
            <h1>{t.hero.h1}</h1>
            <p className="hero-intro">{t.hero.intro}</p>
            <div className="hero-actions">
              <button className="primary-cta" onClick={() => scrollToId("projects")}>{t.hero.cta} <ArrowDownRight size={16} /></button>
              <a className="text-link" href="https://github.com/ishuu9837" target="_blank" rel="noreferrer">{t.hero.github} <ExternalLink size={14} /></a>
            </div>
          </div>
          <div className="hero-art reveal-delay">
            <ThreeField />
            <div className="hero-frame">
              <img 
                src="/manus-storage/eswar-user-portrait_da9f6a80.png" 
                alt="Editorial portrait composition of Y ESWAR" 
                className="theme-transition"
              />
            </div>
            <div className="hero-stamp">{t.hero.stamp}<br /><small>{t.hero.stampSub.split("\n").map(l => <span key={l}>{l}<br /></span>)}</small></div>
            <span className="coordinate">17°23′N / 78°29′E</span>
          </div>
          <div className="hero-footnote">{t.hero.footnote}</div>
        </section>

        <section className="statement section-pad">
          <div className="section-index">00 <span>/</span> {t.statement.index}</div>
          <blockquote className={language === 'te' ? 'telugu-quote' : ''}>{t.statement.quote}</blockquote>
          <div className="statement-meta"><span>{t.statement.author}</span><span>{t.statement.role}</span></div>
        </section>

        <section className="projects section-pad editorial-spread" id="projects">
          <div className="section-heading">
            <div className="section-index">01 <span>/</span> {t.projects.index}</div>
            <h2>{t.projects.h2.split(",").map((l, i) => <span key={i}>{l}{i === 0 ? "," : ""}<br />{i === 0 ? <em>motion.</em> : ""}</span>)}</h2>
            <p>{t.projects.desc}</p>
          </div>
          <div className="project-list">
            {projects(t).map((project) => (
              <article className={`project-card ${project.tone}`} key={project.number}>
                <div className="project-image"><img src={project.image} alt="" loading="lazy" /><span className="project-number">{project.number}</span></div>
                <div className="project-info">
                  <p className="status">{project.status}</p>
                  <h3>{project.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h3>
                  <p className="project-body">{project.body}</p>
                  <div className="research-meta">
                    <div><span>{t.projects.labels.question}</span><p>{project.question}</p></div>
                    <div><span>{t.projects.labels.method}</span><p>{project.method}</p></div>
                    <div><span>{t.projects.labels.outcome}</span><p>{project.outcome}</p></div>
                  </div>
                  <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <a className="project-arrow" href={project.number === "05" ? "https://github.com/ishuu9837" : "#contact"} target={project.number === "05" ? "_blank" : undefined} rel={project.number === "05" ? "noreferrer" : undefined} aria-label={`Open ${project.title.replace("\n", " ")}`}><ArrowUpRight size={21} /></a>
              </article>
            ))}
          </div>
          <div className="project-footer"><span>{t.projects.more}</span><a href="https://portfolio-eight-virid-68.vercel.app/" target="_blank" rel="noreferrer">{t.projects.archive} <ArrowUpRight size={15} /></a></div>
        </section>

        <section className="toolkit section-pad editorial-spread" id="toolkit">
          <div className="section-index">02 <span>/</span> {t.toolkit.index}</div>
          <div className="toolkit-grid"><h2>{t.toolkit.h2.split("behind").map((l, i) => <span key={i}>{l}{i === 0 ? <em>behind</em> : ""}<br /></span>)}</h2><div className="skill-list">{skills(t).map(([title, body], index) => <div className="skill-row" key={title}><span className="skill-no">0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></div>)}</div></div>
        </section>

        <section className="journey section-pad editorial-spread" id="journey">
          <div className="section-index">03 <span>/</span> {t.journey.index}</div>
          <div className="journey-grid">
            <div>
              <h2>{t.journey.h2.split("in").map((l, i) => <span key={i}>{l}{i === 0 ? <em>in</em> : ""}<br /></span>)}</h2>
              <p className="journey-lede">{t.journey.lede}</p>
            </div>
            <div className="timeline">
              <div><span>2025 — 2027</span><h3>M.Tech in Data Science</h3><p>GITAM University, Hyderabad</p></div>
              <div><span>2021 — 2025</span><h3>B.Tech CSE — Artificial Intelligence</h3><p>Parul University · CGPA 7.13/10</p></div>
              <div><span>2025</span><h3>PwC Switzerland Power BI Simulation</h3><p>Forage · Virtual</p></div>
              <div><span>2025</span><h3>AWS APAC Solutions Architecture</h3><p>Forage · Virtual</p></div>
            </div>
          </div>
        </section>

        <section className="contact section-pad editorial-spread" id="contact">
          <div className="section-index">04 <span>/</span> {t.contact.index}</div>
          <div className="contact-grid">
            <div>
              <h2>{t.contact.h2.split("something").map((l, i) => <span key={i}>{l}{i === 0 ? <em>something</em> : ""}<br /></span>)}</h2>
              <p>{t.contact.desc}</p>
            </div>
            <div className="contact-links">
              <a href="mailto:eswaryadav8543@gmail.com"><span><Mail size={18} /> Email</span>eswaryadav8543@gmail.com <ArrowUpRight size={16} /></a>
              <a href="https://www.linkedin.com/in/eswar854/" target="_blank" rel="noreferrer"><span><Linkedin size={18} /> LinkedIn</span>/in/eswar854 <ArrowUpRight size={16} /></a>
              <a href="https://github.com/ishuu9837" target="_blank" rel="noreferrer"><span><Github size={18} /> GitHub</span>/ishuu9837 <ArrowUpRight size={16} /></a>
              <p className="location"><MapPin size={17} /> {t.contact.location}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><span>Y ESWAR / 2026</span><span>{t.footer.identity}</span><a href="#top">{t.footer.top} <ArrowUpRight size={14} /></a></footer>
    </div>
  );
}
