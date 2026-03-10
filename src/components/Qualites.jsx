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

const qualites = [
  {
    icon: "🔥",
    title: "Vision entrepreneuriale",
    desc: "Capacité à identifier des opportunités là où d'autres voient des obstacles. Je conçois des solutions numériques pensées pour l'impact réel, pas seulement pour la technique. Chaque idée est évaluée à travers le prisme de la valeur créée sur le terrain africain.",
    level: 92,
    tag: "Leadership",
  },
  {
    icon: "🌍",
    title: "Ancrage terrain africain",
    desc: "Je construis pour le contexte local. Mon travail en agriculture numérique est guidé par une connaissance profonde des réalités sénégalaises et africaines. Comprendre le terrain, c'est la condition sine qua non d'une innovation durable.",
    level: 95,
    tag: "Impact local",
  },
  {
    icon: "⚡",
    title: "Agilité & adaptabilité",
    desc: "Capable de pivoter rapidement, d'apprendre un nouvel outil en 48h et de livrer sous pression. L'environnement hackathon et startup m'a forgé une résilience rare, que je transpose dans chaque projet pour avancer vite sans sacrifier la qualité.",
    level: 88,
    tag: "Résilience",
  },
  {
    icon: "🤝",
    title: "Intelligence relationnelle",
    desc: "Je crée des ponts entre équipes techniques et non-techniques. Ma force : vulgariser la data et l'IA pour convaincre des partenaires, investisseurs ou agriculteurs. La meilleure solution ne vaut rien sans la capacité à la faire adopter.",
    level: 90,
    tag: "Communication",
  },
  {
    icon: "🚀",
    title: "Biais pour l'action",
    desc: "Je lance, je teste, j'améliore. Finaliste du Hackathondays et lauréat du Prix de l'Innovation, j'ai prouvé que l'exécution vaut mieux que la perfection. Chaque prototype livré est une leçon que nul plan sur papier ne peut enseigner.",
    level: 94,
    tag: "Exécution",
  },
  {
    icon: "🧠",
    title: "Pensée systémique",
    desc: "Je ne règle pas juste un bug, je comprends le système entier. De la modélisation de données à l'architecture logicielle en passant par les SIG, j'aborde chaque problème dans sa globalité pour proposer des solutions pérennes et scalables.",
    level: 85,
    tag: "Analyse",
  },
]

function QCard({ item, index, visible }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{
      opacity:    visible ? 1 : 0,
      transform:  visible ? "translateY(0) scale(1)" : "translateY(32px) scale(.97)",
      transition: `opacity .65s ease ${index * 0.1}s, transform .65s cubic-bezier(.16,1,.3,1) ${index * 0.1}s`,
    }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position:      "relative",
          height:        "100%",
          background:    hovered ? "rgba(0,232,150,.03)" : "rgba(255,255,255,.022)",
          border:        `1px solid ${hovered ? "rgba(0,232,150,.32)" : "rgba(0,232,150,.09)"}`,
          borderRadius:  "24px",
          padding:       "2.8rem 2.5rem 2.5rem",
          display:       "flex",
          flexDirection: "column",
          gap:           "1.2rem",
          overflow:      "hidden",
          transform:     hovered ? "translateY(-7px)" : "translateY(0)",
          boxShadow:     hovered ? "0 20px 60px rgba(0,0,0,.5), 0 0 40px rgba(0,232,150,.09)" : "none",
          transition:    "all .3s cubic-bezier(.16,1,.3,1)",
          cursor:        "default",
          fontFamily:    "'Rajdhani', sans-serif",
        }}
      >
        {/* Glow radial haut */}
        <div style={{
          position:      "absolute", inset: 0,
          background:    "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(0,232,150,.08) 0%, transparent 70%)",
          opacity:       hovered ? 1 : 0,
          transition:    "opacity .4s",
          pointerEvents: "none",
          borderRadius:  "24px",
        }}/>

        {/* Barre bas animée */}
        <div style={{
          position:   "absolute", bottom: 0, left: 0,
          height:     "2px",
          width:      hovered ? "100%" : "0%",
          background: `linear-gradient(90deg, ${M}, ${M2}, transparent)`,
          transition: "width .55s cubic-bezier(.16,1,.3,1)",
        }}/>

        {/* Numéro fantôme */}
        <div style={{
          position:      "absolute", top: "1rem", right: "1.5rem",
          fontSize:      "5rem", fontWeight: 900,
          color:         hovered ? "rgba(0,232,150,.09)" : "rgba(0,232,150,.04)",
          lineHeight:    1, pointerEvents: "none",
          transition:    "color .3s",
          fontFamily:    "'Rajdhani', sans-serif",
        }}>
          0{index + 1}
        </div>

        {/* Tag */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: ".65rem", fontWeight: 700, letterSpacing: ".18em",
          textTransform: "uppercase", color: M,
          background: "rgba(0,232,150,.08)", border: "1px solid rgba(0,232,150,.18)",
          borderRadius: "100px", padding: ".28rem .85rem", width: "fit-content",
        }}>
          <div style={{
            width: "5px", height: "5px", borderRadius: "50%",
            background: M, boxShadow: `0 0 6px ${M}`,
          }}/>
          {item.tag}
        </div>

        {/* Titre */}
        <div style={{
          fontSize: "1.35rem", fontWeight: 900, color: "#fff",
          lineHeight: 1.2, letterSpacing: ".01em",
        }}>
          {item.title}
        </div>

        {/* Description */}
        <div style={{
          fontSize: ".9rem", color: "rgba(255,255,255,.44)",
          lineHeight: 1.85, flex: 1,
        }}>
          {item.desc}
        </div>

        {/* Barre de progression */}
        <div style={{ marginTop: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".5rem" }}>
            <span style={{ fontSize: ".62rem", color: "rgba(255,255,255,.25)", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700 }}>
              Niveau
            </span>
            <span style={{ fontSize: ".85rem", fontWeight: 900, color: M }}>
              {item.level}%
            </span>
          </div>
          <div style={{ height: "3px", background: "rgba(255,255,255,.06)", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              background: `linear-gradient(90deg, ${M}, ${M2})`,
              borderRadius: "10px",
              width: visible ? `${item.level}%` : "0%",
              boxShadow: `0 0 10px rgba(0,232,150,.5)`,
              transition: `width 1.1s cubic-bezier(.16,1,.3,1) ${0.3 + index * 0.1}s`,
            }}/>
          </div>
        </div>
      </div>
    </div>
  )
}

function Qualites() {
  const ref     = useRef(null)
  const visible = useInView(ref)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;900&display=swap');
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(0,232,150,.5)} 50%{box-shadow:0 0 0 8px rgba(0,232,150,0)} }

        .qualites {
          position: relative;
          padding: 7rem 5rem;
          font-family: 'Rajdhani', sans-serif;
          background: ${BG};
          overflow: hidden;
        }
        .qualites::before {
          content:''; position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(0,232,150,.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,232,150,.015) 1px, transparent 1px);
          background-size: 65px 65px; pointer-events:none;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%);
        }
        .qualites::after {
          content:''; position:absolute; width:700px; height:400px;
          background: radial-gradient(ellipse, rgba(0,232,150,.04) 0%, transparent 70%);
          bottom:0; left:50%; transform:translateX(-50%); pointer-events:none;
        }
        .qualites-inner {
          position:relative; z-index:1;
          max-width:1200px; margin:0 auto;
        }

        /* Header */
        .q-header {
          text-align:center; margin-bottom:4rem;
          opacity:0; transform:translateY(22px);
          transition: opacity .7s ease, transform .7s cubic-bezier(.16,1,.3,1);
        }
        .q-header.vis { opacity:1; transform:translateY(0); }

        .q-eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-size:.7rem; font-weight:700; letter-spacing:.22em;
          text-transform:uppercase; color:${M};
          background:rgba(0,232,150,.07); border:1px solid rgba(0,232,150,.18);
          border-radius:100px; padding:.32rem 1rem; margin-bottom:1.2rem;
        }
        .q-eyebrow-dot {
          width:6px; height:6px; border-radius:50%;
          background:${M}; box-shadow:0 0 8px ${M};
          animation:pulse 2s infinite;
        }
        .q-title {
          font-size:clamp(2rem,4vw,3.2rem); font-weight:900; line-height:1;
          background:linear-gradient(90deg, white 0%, ${M} 40%, ${M2} 65%, white 100%);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          animation:shimmer 5s linear infinite; margin-bottom:.7rem;
        }
        .q-subtitle {
          font-size:.95rem; color:rgba(255,255,255,.3);
          letter-spacing:.04em; max-width:520px;
          margin:0 auto; line-height:1.75;
        }

        /* ═══ GRILLE 3 COLONNES ═══ */
        .q-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        /* Banner */
        .q-banner {
          margin-top:3.5rem;
          border:1px solid rgba(0,232,150,.1); border-radius:18px;
          padding:1.8rem 2.5rem;
          background:rgba(0,232,150,.025);
          display:flex; align-items:center; justify-content:space-between;
          gap:2rem; flex-wrap:wrap;
          opacity:0; transform:translateY(18px);
          transition: opacity .7s ease .55s, transform .7s cubic-bezier(.16,1,.3,1) .55s;
        }
        .q-banner.vis { opacity:1; transform:translateY(0); }
        .q-banner-text {
          font-size:.95rem; color:rgba(255,255,255,.42);
          line-height:1.7; max-width:620px;
        }
        .q-banner-text strong { color:${M2}; font-weight:800; }
        .q-banner-btn {
          display:inline-block; font-family:'Rajdhani',sans-serif;
          font-weight:800; font-size:.8rem; letter-spacing:.14em;
          text-transform:uppercase; text-decoration:none;
          padding:.78rem 2.1rem; border-radius:10px; color:${BG};
          background:linear-gradient(135deg,${M},${M2});
          box-shadow:0 0 22px rgba(0,232,150,.22);
          transition:transform .25s, box-shadow .25s;
          white-space:nowrap; flex-shrink:0; cursor:none;
        }
        .q-banner-btn:hover {
          transform:translateY(-3px);
          box-shadow:0 8px 32px rgba(0,232,150,.4);
        }

        @media (max-width: 1050px) {
          .q-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .qualites { padding: 5rem 1.5rem; }
          .q-grid { grid-template-columns: 1fr; }
          .q-banner { flex-direction:column; text-align:center; }
        }
      `}</style>

      <section className="qualites" id="qualites" ref={ref}>
        <div className="qualites-inner">

          <div className={`q-header${visible ? " vis" : ""}`}>
            <div className="q-eyebrow">
              <div className="q-eyebrow-dot"/>
              Ce qui me définit
            </div>
            <h2 className="q-title">Qualités entrepreneuriales</h2>
            <p className="q-subtitle">
              Des compétences forgées sur le terrain, entre hackathons, projets agricoles
              et innovation numérique pour l'Afrique.
            </p>
          </div>

          <div className="q-grid">
            {qualites.map((item, i) => (
              <QCard key={i} item={item} index={i} visible={visible} />
            ))}
          </div>

          <div className={`q-banner${visible ? " vis" : ""}`}>
            <p className="q-banner-text">
              Ces qualités se traduisent concrètement dans mes projets. De la <strong>data science</strong> appliquée
              à l'agriculture jusqu'aux <strong>solutions logicielles</strong> pour l'Afrique —
              chaque réalisation reflète cet état d'esprit.
            </p>
            <a href="#projects" className="q-banner-btn">Voir mes projets ↗</a>
          </div>

        </div>
      </section>
    </>
  )
}

export default Qualites