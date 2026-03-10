import { useState, useEffect, useRef } from "react"

const M  = "#00E896"
const M2 = "#A8FFD6"
const M3 = "#5EFFC0"
const BG = "#040810"

function useInView(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

const formations = [
  {
    degree:  "Baccalauréat — Série S2",
    period:  "2019 – 2020",
    school:  "Lycée Mame Yelli Badiane de Pikine",
    location:"Dakar, Sénégal",
    detail:  null,
    icon:    "🎓",
    tag:     "Bac",
  },
  {
    degree:  "Licence AGROTIC",
    period:  "2020 – 2023",
    school:  "Université du Sine Saloum El Hadj Ibrahima NIASS",
    location:"Kaolack, Sénégal",
    detail:  "Numérique appliqué à l'agriculture · Dép. Mathématiques-Informatique",
    icon:    "🌱",
    tag:     "Licence",
  },
  {
    degree:  "Master Informatique GDIL",
    period:  "2023 – 2025",
    school:  "Université Gaston Berger de Saint-Louis",
    location:"Saint-Louis, Sénégal · UFR SAT",
    detail:  "Gestion de Données et Ingénierie Logicielle",
    icon:    "💻",
    tag:     "Master",
  },
]

function Card({ item, index, visible }) {
  const delay = index * 0.13

  return (
    <>
      <style>{`
        .fcard-wrap {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity .7s ease, transform .7s cubic-bezier(.16,1,.3,1);
        }
        .fcard-wrap.vis {
          opacity: 1;
          transform: translateY(0);
        }
        .fcard {
          position: relative;
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(0,232,150,.1);
          border-radius: 18px;
          padding: 2rem 2rem 1.8rem;
          transition: border-color .3s, box-shadow .3s, transform .3s;
          overflow: hidden;
          cursor: default;
        }
        .fcard::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,232,150,.06) 0%, transparent 70%);
          opacity: 0;
          transition: opacity .4s;
          pointer-events: none;
          border-radius: 18px;
        }
        .fcard:hover {
          border-color: rgba(0,232,150,.32);
          box-shadow: 0 12px 50px rgba(0,0,0,.4), 0 0 0 1px rgba(0,232,150,.08), 0 0 40px rgba(0,232,150,.07);
          transform: translateY(-5px);
        }
        .fcard:hover::before { opacity: 1; }

        /* coin décoratif */
        .fcard-corner {
          position: absolute;
          top: 0; right: 0;
          width: 60px; height: 60px;
          background: linear-gradient(225deg, rgba(0,232,150,.12) 0%, transparent 60%);
          border-radius: 0 18px 0 0;
        }

        /* tag */
        .fcard-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: .62rem;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: ${M};
          background: rgba(0,232,150,.08);
          border: 1px solid rgba(0,232,150,.18);
          border-radius: 100px;
          padding: .28rem .8rem;
          margin-bottom: 1.1rem;
        }
        .fcard-tag-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: ${M};
          box-shadow: 0 0 6px ${M};
        }

        /* icon + degree */
        .fcard-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: .9rem;
        }
        .fcard-icon {
          font-size: 1.9rem;
          line-height: 1;
          flex-shrink: 0;
          filter: drop-shadow(0 0 8px rgba(0,232,150,.3));
        }
        .fcard-degree {
          font-size: 1.18rem;
          font-weight: 900;
          line-height: 1.2;
          color: #fff;
          letter-spacing: .01em;
        }

        /* period badge */
        .fcard-period {
          display: inline-block;
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .1em;
          color: ${M2};
          background: rgba(0,232,150,.07);
          border: 1px solid rgba(0,232,150,.14);
          border-radius: 6px;
          padding: .22rem .7rem;
          margin-bottom: .95rem;
        }

        /* school */
        .fcard-school {
          font-size: .9rem;
          font-weight: 700;
          color: rgba(255,255,255,.75);
          margin-bottom: .3rem;
        }
        .fcard-location {
          font-size: .76rem;
          color: rgba(255,255,255,.3);
          letter-spacing: .05em;
          margin-bottom: .7rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .fcard-location::before {
          content: '📍';
          font-size: .7rem;
          opacity: .6;
        }

        /* detail */
        .fcard-detail {
          font-size: .78rem;
          color: rgba(255,255,255,.38);
          line-height: 1.65;
          padding-top: .7rem;
          border-top: 1px solid rgba(0,232,150,.07);
        }

        /* ligne de progression en bas */
        .fcard-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, ${M}, ${M2}, transparent);
          border-radius: 0 0 0 18px;
          width: 0;
          transition: width .6s cubic-bezier(.16,1,.3,1);
        }
        .fcard:hover .fcard-bar { width: 100%; }
      `}</style>

      <div
        className={`fcard-wrap${visible ? " vis" : ""}`}
        style={{ transitionDelay: `${delay}s` }}
      >
        <div className="fcard">
          <div className="fcard-corner" />
          <div className="fcard-bar" />

          <div className="fcard-tag">
            <div className="fcard-tag-dot" />
            {item.tag}
          </div>

          <div className="fcard-header">
            <div className="fcard-icon">{item.icon}</div>
            <div className="fcard-degree">{item.degree}</div>
          </div>

          <div className="fcard-period">{item.period}</div>

          <div className="fcard-school">{item.school}</div>
          <div className="fcard-location">{item.location}</div>

          {item.detail && (
            <div className="fcard-detail">{item.detail}</div>
          )}
        </div>
      </div>
    </>
  )
}

function Formation() {
  const ref     = useRef(null)
  const visible = useInView(ref)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;900&display=swap');

        @keyframes shimmer {
          0%   { background-position: -200% center }
          100% { background-position:  200% center }
        }
        @keyframes floatUp {
          0%,100% { transform: translateY(0) }
          50%     { transform: translateY(-6px) }
        }

        .formation {
          position: relative;
          padding: 7rem 5rem;
          font-family: 'Rajdhani', sans-serif;
          overflow: hidden;
          background: ${BG};
        }

        /* grille de fond subtile */
        .formation::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,232,150,.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,232,150,.015) 1px, transparent 1px);
          background-size: 65px 65px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
        }

        /* lueur centrale */
        .formation::after {
          content: '';
          position: absolute;
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(0,232,150,.045) 0%, transparent 70%);
          top: 0; left: 50%; transform: translateX(-50%);
          pointer-events: none;
        }

        .formation-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── EN-TÊTE ── */
        .formation-header {
          text-align: center;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s ease, transform .7s cubic-bezier(.16,1,.3,1);
        }
        .formation-header.vis {
          opacity: 1;
          transform: translateY(0);
        }

        .formation-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: ${M};
          background: rgba(0,232,150,.07);
          border: 1px solid rgba(0,232,150,.18);
          border-radius: 100px;
          padding: .32rem 1rem;
          margin-bottom: 1.2rem;
        }
        .formation-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: ${M};
          box-shadow: 0 0 8px ${M};
        }

        .formation-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(90deg, white 0%, ${M} 40%, ${M2} 65%, white 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 5s linear infinite;
          margin-bottom: .7rem;
        }

        .formation-subtitle {
          font-size: .92rem;
          color: rgba(255,255,255,.32);
          letter-spacing: .04em;
        }

        /* ── TIMELINE CONNECTOR ── */
        .formation-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.6rem;
          position: relative;
        }

        /* ligne horizontale entre les cartes */
        .formation-grid::before {
          content: '';
          position: absolute;
          top: 50%;
          left: calc(33.33% + .8rem);
          right: calc(33.33% + .8rem);
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,232,150,.2), transparent);
          pointer-events: none;
          z-index: 0;
        }

        /* numéros de timeline */
        .formation-step {
          position: absolute;
          top: -1.1rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: .62rem;
          font-weight: 900;
          letter-spacing: .1em;
          color: ${M};
          background: ${BG};
          border: 1px solid rgba(0,232,150,.2);
          border-radius: 100px;
          padding: .15rem .55rem;
          z-index: 2;
          white-space: nowrap;
        }

        @media (max-width: 860px) {
          .formation { padding: 5rem 1.5rem; }
          .formation-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
          .formation-grid::before { display: none; }
        }
      `}</style>

      <section className="formation" id="formation" ref={ref}>
        <div className="formation-inner">

          {/* En-tête */}
          <div className={`formation-header${visible ? " vis" : ""}`}>
            <div className="formation-eyebrow">
              <div className="formation-eyebrow-dot" />
              Parcours académique
            </div>
            <h2 className="formation-title">Formation</h2>
            <p className="formation-subtitle">
              De la science fondamentale au numérique appliqué
            </p>
          </div>

          {/* Cartes */}
          <div className="formation-grid">
            {formations.map((item, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div className="formation-step">0{i + 1}</div>
                <Card item={item} index={i} visible={visible} />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}

export default Formation