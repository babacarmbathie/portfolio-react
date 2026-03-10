import { useState, useEffect, useRef } from "react"

const M  = "#00E896"
const M2 = "#A8FFD6"
const BG = "#040810"

function useInView(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

// ── ICÔNES SVG réelles ────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.412A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="#25D366"/>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="white"/>
  </svg>
)

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
    <path d="M0 5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548V16.64L0 7.73V5.457z" fill="#34A853"/>
    <path d="M18.545 4.64l1.528-1.146C21.69 2.28 24 3.434 24 5.457V7.73L12 16.64V9.548l6.545-4.91z" fill="#4285F4"/>
    <path d="M0 7.73l12 8.91 12-8.91v11.636c0 .904-.732 1.636-1.636 1.636H1.636A1.636 1.636 0 010 19.366V7.73z" fill="#FBBC05"/>
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <rect width="24" height="24" rx="6" fill="url(#phoneGrad)"/>
    <defs>
      <linearGradient id="phoneGrad" x1="0" y1="0" x2="24" y2="24">
        <stop offset="0%" stopColor="#00E896"/>
        <stop offset="100%" stopColor="#0088cc"/>
      </linearGradient>
    </defs>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="white"/>
  </svg>
)

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <rect width="24" height="24" rx="6" fill="url(#locGrad)"/>
    <defs>
      <linearGradient id="locGrad" x1="0" y1="0" x2="24" y2="24">
        <stop offset="0%" stopColor="#FF6B35"/>
        <stop offset="100%" stopColor="#FF2D55"/>
      </linearGradient>
    </defs>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="white"/>
  </svg>
)

const contacts = [
  {
    icon:    <WhatsAppIcon />,
    name:    "WhatsApp",
    value:   "+221 76 191 71 82",
    sub:     "Réponse rapide garantie",
    href:    "https://wa.me/221761917182",
    color:   "#25D366",
    glow:    "rgba(37,211,102,.25)",
    bg:      "rgba(37,211,102,.08)",
    border:  "rgba(37,211,102,.2)",
  },
  {
    icon:    <GmailIcon />,
    name:    "Gmail",
    value:   "babacarmbathie856@gmail.com",
    sub:     "Pour toute demande formelle",
    href:    "mailto:babacarmbathie856@gmail.com",
    color:   "#EA4335",
    glow:    "rgba(234,67,53,.22)",
    bg:      "rgba(234,67,53,.07)",
    border:  "rgba(234,67,53,.18)",
  },
  {
    icon:    <PhoneIcon />,
    name:    "Téléphone",
    value:   "+221 76 191 71 82",
    sub:     "Disponible en journée",
    href:    "tel:+221761917182",
    color:   M,
    glow:    "rgba(0,232,150,.22)",
    bg:      "rgba(0,232,150,.07)",
    border:  "rgba(0,232,150,.18)",
  },
  {
    icon:    <LocationIcon />,
    name:    "Localisation",
    value:   "Dakar · Kaolack · Saint-Louis",
    sub:     "Sénégal 🇸🇳",
    href:    null,
    color:   "#FF6B35",
    glow:    "rgba(255,107,53,.22)",
    bg:      "rgba(255,107,53,.07)",
    border:  "rgba(255,107,53,.18)",
  },
]

function ContactCard({ item, index, visible }) {
  const [hovered, setHovered] = useState(false)
  const Tag = item.href ? "a" : "div"

  return (
    <div style={{
      opacity:    visible ? 1 : 0,
      transform:  visible ? "translateY(0) scale(1)" : "translateY(28px) scale(.96)",
      transition: `opacity .65s ease ${index * 0.1}s, transform .65s cubic-bezier(.16,1,.3,1) ${index * 0.1}s`,
    }}>
      <Tag
        href={item.href || undefined}
        target={item.href?.startsWith("http") ? "_blank" : undefined}
        rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "flex-start",
          gap:            "1.1rem",
          padding:        "2rem 2rem 1.8rem",
          borderRadius:   "22px",
          background:     hovered ? item.bg : "rgba(255,255,255,.022)",
          border:         `1px solid ${hovered ? item.border : "rgba(255,255,255,.06)"}`,
          boxShadow:      hovered
            ? `0 0 0 1px ${item.border}, 0 20px 55px rgba(0,0,0,.5), 0 0 40px ${item.glow}`
            : "0 4px 24px rgba(0,0,0,.3)",
          transform:      hovered ? "translateY(-6px)" : "translateY(0)",
          transition:     "all .3s cubic-bezier(.16,1,.3,1)",
          cursor:         item.href ? "none" : "default",
          textDecoration: "none",
          position:       "relative",
          overflow:       "hidden",
          fontFamily:     "'Rajdhani', sans-serif",
        }}
      >
        {/* Lueur radiale fond */}
        <div style={{
          position:      "absolute", inset: 0,
          background:    `radial-gradient(ellipse 80% 60% at 50% 0%, ${item.glow} 0%, transparent 70%)`,
          opacity:       hovered ? 1 : 0,
          transition:    "opacity .4s",
          pointerEvents: "none",
          borderRadius:  "22px",
        }}/>

        {/* Barre colorée bas */}
        <div style={{
          position:   "absolute", bottom: 0, left: 0,
          height:     "2px",
          width:      hovered ? "100%" : "0%",
          background: `linear-gradient(90deg, ${item.color}, transparent)`,
          boxShadow:  `0 0 8px ${item.color}`,
          transition: "width .5s cubic-bezier(.16,1,.3,1)",
        }}/>

        {/* Coin déco */}
        <div style={{
          position:      "absolute", top: 0, right: 0,
          width: "70px", height: "70px",
          background:    `linear-gradient(225deg, ${item.glow} 0%, transparent 65%)`,
          borderRadius:  "0 22px 0 0",
          opacity:       hovered ? 1 : 0,
          transition:    "opacity .35s",
          pointerEvents: "none",
        }}/>

        {/* Icône app réelle */}
        <div style={{
          width:      "52px", height: "52px",
          borderRadius: "14px",
          overflow:   "hidden",
          boxShadow:  hovered ? `0 8px 25px ${item.glow}, 0 0 0 1px ${item.border}` : `0 4px 14px rgba(0,0,0,.4)`,
          transform:  hovered ? "scale(1.08) rotate(-2deg)" : "scale(1) rotate(0)",
          transition: "all .35s cubic-bezier(.16,1,.3,1)",
          flexShrink: 0,
        }}>
          {item.icon}
        </div>

        {/* Textes */}
        <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
          <div style={{
            fontSize:      ".65rem", fontWeight: 700,
            letterSpacing: ".18em", textTransform: "uppercase",
            color:         item.color, marginBottom: ".35rem",
            opacity:       hovered ? 1 : .7, transition: "opacity .3s",
          }}>
            {item.name}
          </div>
          <div style={{
            fontSize:     "1rem", fontWeight: 900,
            color:        "#fff", lineHeight: 1.25,
            marginBottom: ".3rem", letterSpacing: ".01em",
            wordBreak:    "break-all",
          }}>
            {item.value}
          </div>
          <div style={{
            fontSize:   ".76rem", color: "rgba(255,255,255,.32)",
            lineHeight: 1.5,
          }}>
            {item.sub}
          </div>
        </div>

        {/* Flèche si lien */}
        {item.href && (
          <div style={{
            position:   "absolute", bottom: "1.4rem", right: "1.4rem",
            width: "28px", height: "28px", borderRadius: "50%",
            background: hovered ? item.bg : "rgba(255,255,255,.05)",
            border:     `1px solid ${hovered ? item.border : "rgba(255,255,255,.08)"}`,
            display:    "flex", alignItems: "center", justifyContent: "center",
            fontSize:   ".75rem", color: hovered ? item.color : "rgba(255,255,255,.3)",
            transition: "all .3s",
          }}>↗</div>
        )}
      </Tag>
    </div>
  )
}

function Contact() {
  const ref     = useRef(null)
  const visible = useInView(ref)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;900&display=swap');
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(0,232,150,.5)} 50%{box-shadow:0 0 0 8px rgba(0,232,150,0)} }
        @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

        .contact {
          position: relative;
          padding: 7rem 5rem 6rem;
          font-family: 'Rajdhani', sans-serif;
          background: ${BG};
          overflow: hidden;
        }
        .contact::before {
          content:''; position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(0,232,150,.015) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,232,150,.015) 1px,transparent 1px);
          background-size:65px 65px; pointer-events:none;
          mask-image:radial-gradient(ellipse 90% 80% at 50% 50%,black 20%,transparent 100%);
        }
        .contact::after {
          content:''; position:absolute; width:800px; height:500px;
          background:radial-gradient(ellipse,rgba(0,232,150,.04) 0%,transparent 70%);
          bottom:-100px; left:50%; transform:translateX(-50%); pointer-events:none;
        }
        .contact-inner { position:relative; z-index:1; max-width:1100px; margin:0 auto; }

        /* HEADER */
        .ct-header {
          text-align:center; margin-bottom:1.5rem;
          opacity:0; transform:translateY(20px);
          transition:opacity .7s ease,transform .7s cubic-bezier(.16,1,.3,1);
        }
        .ct-header.vis { opacity:1; transform:translateY(0); }
        .ct-eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-size:.7rem; font-weight:700; letter-spacing:.22em;
          text-transform:uppercase; color:${M};
          background:rgba(0,232,150,.07); border:1px solid rgba(0,232,150,.18);
          border-radius:100px; padding:.32rem 1rem; margin-bottom:1.2rem;
        }
        .ct-eyebrow-dot {
          width:6px; height:6px; border-radius:50%;
          background:${M}; box-shadow:0 0 8px ${M}; animation:pulse 2s infinite;
        }
        .ct-title {
          font-size:clamp(2rem,4vw,3.2rem); font-weight:900; line-height:1;
          background:linear-gradient(90deg,white 0%,${M} 40%,${M2} 65%,white 100%);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          animation:shimmer 5s linear infinite; margin-bottom:.7rem;
        }
        .ct-intro {
          font-size:.95rem; color:rgba(255,255,255,.35);
          max-width:580px; margin:0 auto 3.5rem; line-height:1.8;
          letter-spacing:.02em;
          opacity:0; transform:translateY(14px);
          transition:opacity .7s ease .15s,transform .7s cubic-bezier(.16,1,.3,1) .15s;
        }
        .ct-intro.vis { opacity:1; transform:translateY(0); }
        .ct-intro strong { color:${M2}; font-weight:800; }

        /* GRILLE 4 cartes */
        .ct-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.4rem;
          margin-bottom: 3.5rem;
        }

        /* FOOTER CTA */
        .ct-footer {
          text-align:center;
          opacity:0; transform:translateY(16px);
          transition:opacity .7s ease .5s,transform .7s cubic-bezier(.16,1,.3,1) .5s;
        }
        .ct-footer.vis { opacity:1; transform:translateY(0); }
        .ct-footer-text {
          font-size:.82rem; color:rgba(255,255,255,.22);
          letter-spacing:.08em; margin-bottom:1.5rem;
        }

        /* Séparateur */
        .ct-sep {
          display:flex; align-items:center; gap:1rem;
          margin-bottom:1.8rem;
        }
        .ct-sep-line {
          flex:1; height:1px;
          background:linear-gradient(90deg,transparent,rgba(0,232,150,.15),transparent);
        }
        .ct-sep-text {
          font-size:.62rem; color:rgba(255,255,255,.2);
          letter-spacing:.2em; text-transform:uppercase; font-weight:700;
          white-space:nowrap;
        }

        @media (max-width:900px) {
          .contact { padding:5rem 1.5rem; }
          .ct-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:520px) {
          .ct-grid { grid-template-columns:1fr; }
        }
      `}</style>

      <section className="contact" id="contact" ref={ref}>
        <div className="contact-inner">

          {/* Header */}
          <div className={`ct-header${visible ? " vis" : ""}`}>
            <div className="ct-eyebrow">
              <div className="ct-eyebrow-dot"/>
              Travaillons ensemble
            </div>
            <h2 className="ct-title">Contact</h2>
          </div>

          {/* Intro */}
          <p className={`ct-intro${visible ? " vis" : ""}`}>
            Vous souhaitez collaborer, discuter d'un projet ou en savoir plus sur mes
            activités en <strong>data science</strong>, <strong>intelligence artificielle</strong> et{" "}
            <strong>agriculture numérique</strong> ? N'hésitez pas à me contacter.
          </p>

          {/* Séparateur */}
          <div className="ct-sep">
            <div className="ct-sep-line"/>
            <div className="ct-sep-text">Choisissez votre canal</div>
            <div className="ct-sep-line"/>
          </div>

          {/* Cartes */}
          <div className="ct-grid">
            {contacts.map((item, i) => (
              <ContactCard key={i} item={item} index={i} visible={visible} />
            ))}
          </div>

          {/* Footer */}
          <div className={`ct-footer${visible ? " vis" : ""}`}>
            <p className="ct-footer-text">© 2025 Babacar Mbathie · Dakar, Sénégal</p>
          </div>

        </div>
      </section>
    </>
  )
}

export default Contact