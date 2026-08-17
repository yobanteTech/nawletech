import { useEffect, useRef, useState, type ReactNode } from "react";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<string, ReactNode> = {
  server: (
    <svg {...iconProps}>
      <rect x="3" y="4" width="18" height="7" rx="1.6" />
      <rect x="3" y="13" width="18" height="7" rx="1.6" />
      <circle cx="7" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="7" cy="16.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  cloud: (
    <svg {...iconProps}>
      <path d="M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 7.1 9.02 4 4 0 0 0 7 18Z" />
    </svg>
  ),
  devices: (
    <svg {...iconProps}>
      <rect x="2.5" y="4" width="13" height="10" rx="1.4" />
      <rect x="16.5" y="7" width="5" height="11" rx="1.2" />
      <line x1="2.5" y1="17" x2="15.5" y2="17" />
    </svg>
  ),
  database: (
    <svg {...iconProps}>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.6" />
      <path d="M4.5 5.5v6.7c0 1.4 3.4 2.6 7.5 2.6s7.5-1.2 7.5-2.6V5.5" />
      <path d="M4.5 12.2V19c0 1.4 3.4 2.6 7.5 2.6s7.5-1.2 7.5-2.6v-6.8" />
    </svg>
  ),
  handshake: (
    <svg {...iconProps}>
      <path d="M2.5 11.5 6.5 8l3 2.3" />
      <path d="M21.5 11.5 17.5 8l-3 2.3" />
      <path d="M9.5 10.3 12 12.5l2.5-2.2" />
      <path d="M6.5 8 4 10.3v4.4l4 3.1 3-2.1" />
      <path d="M17.5 8 20 10.3v4.4l-4 3.1-3-2.1" />
    </svg>
  ),
  chart: (
    <svg {...iconProps}>
      <line x1="4" y1="20" x2="20" y2="20" />
      <rect x="6" y="12" width="3" height="8" />
      <rect x="10.5" y="8" width="3" height="12" />
      <rect x="15" y="4" width="3" height="16" />
    </svg>
  ),
  network: (
    <svg {...iconProps}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v5m0 0-5.3 5m5.3-5 5.3 5" />
    </svg>
  ),
  shield: (
    <svg {...iconProps}>
      <path d="M12 3 4.5 6v6c0 4.5 3.2 7.6 7.5 9 4.3-1.4 7.5-4.5 7.5-9V6L12 3Z" />
      <path d="M9 12.2 11 14l4-4.2" />
    </svg>
  ),
  globe: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" />
      <ellipse cx="12" cy="12" rx="3.6" ry="8.5" />
      <line x1="3.5" y1="12" x2="20.5" y2="12" />
    </svg>
  ),
  puzzle: (
    <svg {...iconProps}>
      <path d="M9 4.5h3.2a1.4 1.4 0 0 1 1.4 1.9 1.4 1.4 0 0 0 1.9 1.9H19v3.2a1.4 1.4 0 0 0-1.9 1.9 1.4 1.4 0 0 0 1.9 1.9V19h-3.5a1.4 1.4 0 0 1-1.9-1.9 1.4 1.4 0 0 0-1.9-1.9H9v-3.5a1.4 1.4 0 0 0 1.9-1.9A1.4 1.4 0 0 0 9 8.2V4.5Z" />
    </svg>
  ),
  tool: (
    <svg {...iconProps}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 18.7l2.3 2.3 7.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.1-.7-.7-2.1 2.4-2.8Z" />
    </svg>
  ),
  trending: (
    <svg {...iconProps}>
      <polyline points="4 17 10 11 14 15 20 7" />
      <polyline points="14 7 20 7 20 13" />
    </svg>
  ),
  pin: (
    <svg {...iconProps}>
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  ),
  phone: (
    <svg {...iconProps}>
      <path d="M5.5 3.5h3l1.6 4-2 1.5a11.5 11.5 0 0 0 5.4 5.4l1.5-2 4 1.6v3a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 4 5.1a1.5 1.5 0 0 1 1.5-1.6Z" />
    </svg>
  ),
  mail: (
    <svg {...iconProps}>
      <rect x="3" y="5.5" width="18" height="13" rx="1.6" />
      <path d="m4 6.5 8 6.5 8-6.5" />
    </svg>
  ),
};

function Icon({ name }: { name: string }) {
  return <>{ICONS[name]}</>;
}

function useRevealOnScroll() {
  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useMeshCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const NODE_COUNT = 26;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const inkColor = "15,61,92";
    const goldColor = "15,61,92";
    const tealColor = "47,175,118";

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      W = canvas!.width = rect.width * devicePixelRatio;
      H = canvas!.height = rect.height * devicePixelRatio;
      canvas!.style.width = rect.width + "px";
      canvas!.style.height = rect.height + "px";
    }

    function initNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
        r: (Math.random() * 1.6 + 1.4) * devicePixelRatio,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > W) n.vx *= -1;
          if (n.y < 0 || n.y > H) n.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150 * devicePixelRatio;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx!.strokeStyle = `rgba(${inkColor},${alpha})`;
            ctx!.lineWidth = 1 * devicePixelRatio * 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
      nodes.forEach((n, i) => {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = i % 5 === 0 ? `rgb(${goldColor})` : `rgba(${tealColor},0.85)`;
        ctx!.fill();
      });
      if (!reduceMotion && !document.hidden) raf = requestAnimationFrame(draw);
    }

    function start() {
      resize();
      initNodes();
      draw();
    }

    function onResize() {
      resize();
      initNodes();
      if (reduceMotion) draw();
    }

    function onVisibility() {
      if (!document.hidden) draw();
    }

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
    };
  }, [canvasRef]);
}

function useBackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };
  return { show, scrollToTop };
}

function useCleanAnchorScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!link) return;
      const hash = link.getAttribute("href") || "";
      e.preventDefault();
      if (hash.length <= 1) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.getElementById(hash.slice(1));
      if (target) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

const NAV_LINKS = [
  { href: "#home", label: "Accueil" },
  { href: "#services", label: "Nos services" },
  { href: "#about", label: "Qui sommes-nous" },
  { href: "#clients", label: "Nos clients" },
  { href: "#testimonial", label: "Témoignages" },
];

const SERVICES = [
  {
    icon: "devices",
    title: "Site web & application mobile",
    text: "Votre site internet ou votre appli, conçu sur mesure pour vos clients.",
    benefit: "Sur mesure, pensé pour vos clients",
  },
  {
    icon: "cloud",
    title: "Cloud & infrastructure réseau",
    text: "Hébergement, mises à jour automatiques et réseau stable, du bureau au cloud.",
    benefit: "Disponibilité 24/7",
  },
  {
    icon: "shield",
    title: "Sécurité informatique",
    text: "On protège votre entreprise contre les menaces actuelles, avec un suivi continu.",
    benefit: "Audit de sécurité inclus",
  },
  {
    icon: "database",
    title: "Données & tableaux de bord",
    text: "Vos données bien rangées et des chiffres clairs pour prendre les bonnes décisions.",
    benefit: "Tableaux de bord sur mesure",
  },
  {
    icon: "server",
    title: "Assistance informatique",
    text: "On installe et on entretient vos outils informatiques pour qu'ils tournent sans souci.",
    benefit: "Suivi personnalisé",
  },
  {
    icon: "handshake",
    title: "Conseil & accompagnement digital",
    text: "Un interlocuteur unique pour cadrer votre projet et faire les bons choix technologiques.",
    benefit: "Premier échange gratuit",
  },
];

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useRevealOnScroll();
  useMeshCanvas(canvasRef);
  useCleanAnchorScroll();
  const { show: showBackToTop, scrollToTop } = useBackToTop();

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const year = new Date().getFullYear();

  const MIN_MESSAGE_WORDS = 50;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  type ContactField = "Nom" | "Email" | "Message";
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const validateContactForm = (form: HTMLFormElement) => {
    const name = (form.elements.namedItem("Nom") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("Email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("Message") as HTMLTextAreaElement).value.trim();
    const wordCount = message ? message.split(/\s+/).filter(Boolean).length : 0;

    const errors: Partial<Record<ContactField, string>> = {};
    if (name.length < 2) errors.Nom = "Merci d'indiquer votre nom complet.";
    if (!EMAIL_RE.test(email)) errors.Email = "Merci d'indiquer une adresse email valide.";
    if (wordCount < MIN_MESSAGE_WORDS) {
      errors.Message = `Votre message doit contenir au moins ${MIN_MESSAGE_WORDS} mots (actuellement ${wordCount}).`;
    }
    return errors;
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contactStatus === "sending") return;

    const form = e.currentTarget;

    if ((form.elements.namedItem("_honey") as HTMLInputElement)?.value) {
      return;
    }

    const errors = validateContactForm(form);
    setFieldErrors(errors);
    const firstErrorField = (Object.keys(errors) as ContactField[])[0];
    if (firstErrorField) {
      form.elements.namedItem(firstErrorField)?.dispatchEvent(new Event("focus"));
      (form.querySelector(`[name="${firstErrorField}"]`) as HTMLElement | null)?.focus();
      return;
    }

    setContactStatus("sending");
    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error("submit failed");
      setContactStatus("sent");
      form.reset();
    } catch {
      setContactStatus("error");
    }
  };

  const clearFieldError = (field: ContactField) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    if (contactStatus === "sent" || contactStatus === "error") setContactStatus("idle");
  };

  return (
    <>
      <header>
        <nav className="wrap">
          <a href="#home" className="logo">
            <img src="/nawletech-icon.png" alt="" className="logo-mark" aria-hidden="true" />
            <span className="logo-name">Nawle<span className="logo-accent">tech</span></span>
          </a>
          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="nav-cta">
            <a href="#contact" className="btn">
              Nous contacter
            </a>
            <button
              className={`burger${menuOpen ? " open" : ""}`}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              aria-controls="mobileMenu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
        <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobileMenu">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn" style={{ textAlign: "center" }} onClick={() => setMenuOpen(false)}>
            Nous contacter
          </a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Services et conseil en informatique à Dakar</span>
            <h1>
              Transformez vos ambitions en <em>solutions numériques</em>
            </h1>
            <p className="lead">
              Nawle Tech accompagne les entreprises, administrations, institutions et
              organisations dans leur transformation digitale avec des solutions innovantes,
              sécurisées et évolutives. De l'idée au déploiement, nous transformons vos besoins en
              outils numériques performants.
            </p>
            <div className="brand-bar" aria-hidden="true"></div>
            <div className="hero-actions">
              <a href="#services" className="btn">
                Nos services
              </a>
              <a href="#contact" className="btn btn-ghost">
                Discuter de votre projet
              </a>
            </div>
            <ul className="hero-activities">
              <li>Sites web</li>
              <li>Applications web et mobiles</li>
              <li>Hébergement cloud</li>
              <li>Sécurité informatique</li>
              <li>Conseil IT</li>
            </ul>
          </div>
          <div className="hero-visual reveal">
            <canvas id="mesh" ref={canvasRef} />
          </div>
        </div>
      </section>

      <section className="pitch" id="pitch">
        <div className="wrap">
          <div className="pitch-card reveal">
            <div className="pitch-copy">
              <span className="eyebrow">Une idée à faire grandir ?</span>
              <h2>La digitalisation, ça change tout</h2>
              <p>
                Entrepreneur, commerçant, association ou entreprise : peu importe votre secteur,
                être visible en ligne fait la différence. Chez Nawle Tech, vous avez un seul
                interlocuteur du début à la fin, des délais tenus, et un résultat à votre image.
              </p>
              <div className="pitch-tags">
                <span>Entrepreneur</span>
                <span>Entreprise</span>
                <span>Commerce</span>
                <span>Association</span>
                <span>École</span>
                <span>Organisation</span>
              </div>
              <a href="#contact" className="btn" style={{ marginTop: 28 }}>
                Parlons de votre projet
              </a>
            </div>
            <ul className="pitch-list">
              <li className="reveal">
                <span className="pitch-ico" aria-hidden="true"><Icon name="globe" /></span>
                Création de sites web professionnels
              </li>
              <li className="reveal">
                <span className="pitch-ico" aria-hidden="true"><Icon name="devices" /></span>
                Développement d'applications web & mobiles
              </li>
              <li className="reveal">
                <span className="pitch-ico" aria-hidden="true"><Icon name="puzzle" /></span>
                Logiciels de gestion sur mesure
              </li>
              <li className="reveal">
                <span className="pitch-ico" aria-hidden="true"><Icon name="tool" /></span>
                Hébergement, maintenance & assistance
              </li>
              <li className="reveal">
                <span className="pitch-ico" aria-hidden="true"><Icon name="trending" /></span>
                Conseil en transformation digitale
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Nos services</span>
            <h2>Tout ce qu'il faut, sous un seul toit</h2>
            <p>
              Développement, cloud, data, sécurité : on couvre tous les besoins techniques
              de votre projet, avec un seul interlocuteur du premier contact à la mise en ligne.
            </p>
          </div>
          <div className="service-grid">
            {SERVICES.map((s) => (
              <div className="service-card reveal" key={s.title}>
                <div className="service-head">
                  <span className="service-icon" aria-hidden="true">
                    <Icon name={s.icon} />
                  </span>
                  <h3>{s.title}</h3>
                </div>
                <p>{s.text}</p>
                <span className="service-benefit">{s.benefit}</span>
                <a href="#contact" className="service-cta">
                  Demander un devis <span aria-hidden="true">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="wrap">
          <div className="about-visual reveal">
            <svg viewBox="0 0 400 300">
              <defs>
                <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.6" fill="rgba(28,43,41,0.12)" />
                </pattern>
              </defs>
              <rect width="400" height="300" fill="url(#dots)" />
              <circle cx="90" cy="90" r="5" fill="#0F3D5C" />
              <circle cx="230" cy="60" r="5" fill="#2FAF76" />
              <circle cx="320" cy="150" r="5" fill="#0F3D5C" />
              <circle cx="150" cy="200" r="5" fill="#2FAF76" />
              <circle cx="270" cy="230" r="5" fill="#0F3D5C" />
              <line x1="90" y1="90" x2="230" y2="60" stroke="rgba(15,61,92,0.28)" strokeWidth="1.4" />
              <line x1="230" y1="60" x2="320" y2="150" stroke="rgba(15,61,92,0.28)" strokeWidth="1.4" />
              <line x1="90" y1="90" x2="150" y2="200" stroke="rgba(15,61,92,0.28)" strokeWidth="1.4" />
              <line x1="150" y1="200" x2="270" y2="230" stroke="rgba(15,61,92,0.28)" strokeWidth="1.4" />
              <line x1="320" y1="150" x2="270" y2="230" stroke="rgba(15,61,92,0.28)" strokeWidth="1.4" />
            </svg>
          </div>
          <div className="reveal">
            <span className="eyebrow">Qui sommes-nous</span>
            <p>
              Nawle Tech est votre partenaire de confiance en digitalisation. Nous accompagnons
              entreprises et organisations dans leurs projets informatiques, du développement à
              l'infrastructure, avec la même exigence de qualité pour chaque client.
            </p>
            <div className="about-points">
              <div>Une équipe à taille humaine, mobilisée pour votre projet</div>
              <div>Des points d'étape chaque semaine, en toute transparence</div>
              <div>Basés à Dakar, avec des standards internationaux</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sectors" id="clients">
        <div className="wrap">
          <span className="eyebrow" style={{ justifyContent: "center", width: "100%" }}>
            Nos clients
          </span>
          <div className="sector-row reveal">
            <div className="sector-pill">Fintech</div>
            <div className="sector-pill">Logistique</div>
            <div className="sector-pill">Retail & e-commerce</div>
            <div className="sector-pill">Secteur public</div>
            <div className="sector-pill">Télécoms</div>
          </div>
        </div>
      </section>

      <section className="testimonial" id="testimonial">
        <div className="wrap">
          <div className="testi-card reveal">
            <div className="testi-mark" aria-hidden="true">”</div>
            <div>
              <p className="quote">
                [Emplacement réservé] Ajoutez ici l'avis d'un de vos clients : ce qu'il a
                apprécié dans votre accompagnement, et le résultat obtenu.
              </p>
              <p className="who">À REMPLACER PAR UN VRAI TÉMOIGNAGE AVANT PUBLICATION</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="wrap">
          <div className="contact-panel reveal">
            <div>
              <span className="eyebrow">Nous contacter</span>
              <div className="contact-info">
                <div className="reveal">
                  <span className="ico" aria-hidden="true"><Icon name="pin" /></span>
                  <div>
                    <span>Rue FA-11, Fass, Dakar, Sénégal</span>
                  </div>
                </div>
                <div className="reveal">
                  <span className="ico" aria-hidden="true"><Icon name="phone" /></span>
                  <div>
                    <span>+221 181 81 37</span>
                  </div>
                </div>
                <div className="reveal">
                  <span className="ico" aria-hidden="true"><Icon name="mail" /></span>
                  <div>
                    <span>nawletech@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
            <form
              action="https://formsubmit.co/ajax/nawletech@gmail.com"
              method="POST"
              onSubmit={handleContactSubmit}
              noValidate
            >
              <input type="hidden" name="_subject" value="Nouveau message depuis le site Nawle Tech" />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                className="sr-only"
                aria-hidden="true"
              />

              <label className="sr-only" htmlFor="cf-name">
                Votre Nom Complet
              </label>
              <input
                id="cf-name"
                type="text"
                name="Nom"
                placeholder="Votre Nom Complet"
                aria-invalid={!!fieldErrors.Nom}
                aria-describedby={fieldErrors.Nom ? "cf-name-error" : undefined}
                onChange={() => clearFieldError("Nom")}
              />
              {fieldErrors.Nom && (
                <p className="form-error" id="cf-name-error">{fieldErrors.Nom}</p>
              )}

              <label className="sr-only" htmlFor="cf-email">
                Votre email
              </label>
              <input
                id="cf-email"
                type="email"
                name="Email"
                placeholder="Votre email"
                aria-invalid={!!fieldErrors.Email}
                aria-describedby={fieldErrors.Email ? "cf-email-error" : undefined}
                onChange={() => clearFieldError("Email")}
              />
              {fieldErrors.Email && (
                <p className="form-error" id="cf-email-error">{fieldErrors.Email}</p>
              )}

              <label className="sr-only" htmlFor="cf-message">
                Votre message
              </label>
              <textarea
                id="cf-message"
                name="Message"
                placeholder="Votre message (minimum 50 mots)"
                aria-invalid={!!fieldErrors.Message}
                aria-describedby={fieldErrors.Message ? "cf-message-error" : undefined}
                onChange={() => clearFieldError("Message")}
              />
              {fieldErrors.Message && (
                <p className="form-error" id="cf-message-error">{fieldErrors.Message}</p>
              )}

              <div aria-live="polite">
                {contactStatus === "sent" && (
                  <p className="form-success">Votre message a été bien transmis.</p>
                )}
                {contactStatus === "error" && (
                  <p className="form-error">
                    Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous écrire directement à nawletech@gmail.com.
                  </p>
                )}
              </div>

              <button type="submit" disabled={contactStatus === "sending"}>
                {contactStatus === "sending" ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#home" className="logo">
                <img src="/nawletech-icon.png" alt="" className="logo-mark" aria-hidden="true" />
                <span className="logo-name">Nawle<span className="logo-accent">tech</span></span>
              </a>
              <p>
                Des solutions digitales qui font grandir vos ambitions. Sites web, applications,
                logiciels sur mesure et accompagnement IT, pour des entreprises exigeantes.
              </p>
              <div className="brand-bar" aria-hidden="true"></div>
              <div className="footer-social" style={{ marginTop: 22 }}>
                <a href="#" aria-label="LinkedIn">in</a>
                <a href="#" aria-label="X">𝕏</a>
                <a href="#" aria-label="Instagram">ig</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#home">Accueil</a></li>
                <li><a href="#services">Nos services</a></li>
                <li><a href="#about">Qui sommes-nous</a></li>
                <li><a href="#clients">Nos clients</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Site web & application mobile</a></li>
                <li><a href="#services">Cloud & infrastructure réseau</a></li>
                <li><a href="#services">Données & tableaux de bord</a></li>
                <li><a href="#services">Sécurité informatique</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li className="contact-line"><span className="ico-sm"><Icon name="pin" /></span><span>Rue FA-11, Fass, Dakar, Sénégal</span></li>
                <li className="contact-line"><span className="ico-sm"><Icon name="phone" /></span><span>+221 181 81 37</span></li>
                <li className="contact-line"><span className="ico-sm"><Icon name="mail" /></span><span>nawletech@gmail.com</span></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {year} Nawle Tech. Tous droits réservés.</span>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/2211818137"
        target="_blank"
        rel="noopener"
        className="whatsapp-float"
        aria-label="Discuter sur WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.85 9.85 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.1c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.3-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.66.78 1.94.93.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
        </svg>
      </a>

      <button
        className={`back-to-top${showBackToTop ? " show" : ""}`}
        aria-label="Retour en haut de la page"
        onClick={scrollToTop}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}

export default App;
