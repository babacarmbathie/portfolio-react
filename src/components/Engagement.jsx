import { useState, useEffect, useCallback, useRef } from "react"

import baba1  from "../assets/engagement/baba1.jpg"
import baba2  from "../assets/engagement/baba2.jpg"
import baba3  from "../assets/engagement/baba3.jpg"
import baba4  from "../assets/engagement/baba4.jpg"
import baba5  from "../assets/engagement/baba5.jpg"
import baba6  from "../assets/engagement/baba6.jpg"
import baba7  from "../assets/engagement/baba7.jpg"
import baba8  from "../assets/engagement/baba8.jpg"
import baba9  from "../assets/engagement/baba9.jpg"
import baba10 from "../assets/engagement/baba10.jpg"
import baba11 from "../assets/engagement/baba11.jpg"
import baba12 from "../assets/engagement/baba12.jpg"
import baba13 from "../assets/engagement/baba13.jpg"
import baba14 from "../assets/engagement/baba14.jpg"

const M  = "#00E896"
const M2 = "#A8FFD6"
const BG = "#040810"

function useInView(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.06 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

const images = [
  { img: baba1,  title: "Prix de l'innovation",      desc: "Participation au concours d'innovation de l'Université du Sine Saloum." },
  { img: baba2,  title: "Cérémonie des lauréats",     desc: "Photo avec les participants lors de la remise des prix d'innovation." },
  { img: baba3,  title: "Équipe Agrinum",              desc: "Présentation de l'équipe engagée dans le numérique agricole." },
  { img: baba4,  title: "Biennale de l'innovation",   desc: "Présentation d'un projet technologique lors de la Biennale." },
  { img: baba5,  title: "Programme d'incubation",     desc: "Participation au programme d'accompagnement entrepreneurial." },
  { img: baba6,  title: "Présentation de solution",   desc: "Présentation d'une solution numérique devant les incubateurs." },
  { img: baba7,  title: "Stand entrepreneurial",      desc: "Présentation d'un projet technologique lors d'un événement." },
  { img: baba8,  title: "Échanges avec les acteurs",  desc: "Discussion avec des participants autour de l'innovation agricole." },
  { img: baba9,  title: "Rencontre scientifique",     desc: "Participation aux activités de recherche et innovation." },
  { img: baba10, title: "Formation des incubés",      desc: "Session de formation pour les entrepreneurs incubés." },
  { img: baba11, title: "Prix de l'innovation",       desc: "Participation au concours d'innovation de l'Université du Sine Saloum." },
  { img: baba12, title: "Prix de l'innovation",       desc: "Participation au concours d'innovation de l'Université du Sine Saloum." },
  { img: baba13, title: "Prix de l'innovation",       desc: "Participation au concours d'innovation de l'Université du Sine Saloum." },
  { img: baba14, title: "Prix de l'innovation",       desc: "Participation au concours d'innovation de l'Université du Sine Saloum." },
]

/*
  Grille finale 4 col × 5 lignes
  ┌──────┬──────┬─────────────┐
  │  0   │  1↕  │      2      │  ligne 1
  ├──────┤      ├──────┬──────┤
  │  3   │      │  4   │  5↕  │  ligne 2
  ├─────────────┼──────┤      │
  │      6      │  7   │      │  ligne 3
  ├──────┬──────┼──────┼──────┤
  │  8   │  9↕  │  10  │  11  │  ligne 4
  ├──────┤      ├──────┴──────┤
  │  12  │      │  13  │  14  │  ligne 5
  └──────┴──────┴──────┴──────┘
*/
const gridFinal = [
  // ── LIGNE 1 ───────────────────────────────────────────────
  { idx: 0,  style: { gridColumn: "1/2", gridRow: "1/2" } },   // 1×1
  { idx: 1,  style: { gridColumn: "2/3", gridRow: "1/3" } },   // 1×2 haute
  { idx: 2,  style: { gridColumn: "3/5", gridRow: "1/2" } },   // 2×1 large

  // ── LIGNE 2 ───────────────────────────────────────────────
  { idx: 3,  style: { gridColumn: "1/2", gridRow: "2/3" } },   // 1×1
  { idx: 4,  style: { gridColumn: "3/4", gridRow: "2/3" } },   // 1×1
  { idx: 5,  style: { gridColumn: "4/5", gridRow: "2/4" } },   // 1×2 haute

  // ── LIGNE 3 ───────────────────────────────────────────────
  { idx: 6,  style: { gridColumn: "1/3", gridRow: "3/4" } },   // 2×1 large
  { idx: 7,  style: { gridColumn: "3/4", gridRow: "3/4" } },   // 1×1

  // ── LIGNE 4 ───────────────────────────────────────────────
  { idx: 8,  style: { gridColumn: "1/2", gridRow: "4/5" } },   // 1×1
  { idx: 9,  style: { gridColumn: "2/3", gridRow: "4/6" } },   // 1×2 haute
  { idx: 10, style: { gridColumn: "3/4", gridRow: "4/5" } },   // 1×1
  { idx: 11, style: { gridColumn: "4/5", gridRow: "4/5" } },   // 1×1

  // ── LIGNE 5 ───────────────────────────────────────────────
  { idx: 12, style: { gridColumn: "1/2", gridRow: "5/6" } },   // 1×1
  // col 2 = idx9 (suite hauteur)
  { idx: 13, style: { gridColumn: "3/5", gridRow: "5/6" } },   // 2×1 large ← baba14
]

// ── CARTE avec tilt 3D + shimmer scan + glow border ─────────
function EngCard({ item, idx, visible, onClick }) {
  const cardRef  = useRef(null)
  const [tilt,    setTilt]    = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [scanPos, setScanPos] = useState({ x: 50, y: 50 })

  const handleMouseMove = e => {
    const r  = cardRef.current.getBoundingClientRect()
    const x  = ((e.clientX - r.left) / r.width  - 0.5) * 14
    const y  = ((e.clientY - r.top)  / r.height - 0.5) * -14
    const px = ((e.clientX - r.left) / r.width)  * 100
    const py = ((e.clientY - r.top)  / r.height) * 100
    setTilt({ x, y })
    setScanPos({ x: px, y: py })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        height:      "100%",
        borderRadius:"18px",
        overflow:    "hidden",
        cursor:      "none",
        position:    "relative",
        transform:   hovered
          ? `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.03)`
          : "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)",
        transition:  hovered ? "transform .08s ease" : "transform .55s cubic-bezier(.16,1,.3,1)",
        boxShadow:   hovered
          ? `0 0 0 1.5px rgba(0,232,150,.55), 0 0 25px rgba(0,232,150,.18), 0 20px 60px rgba(0,0,0,.6)`
          : `0 0 0 1px rgba(0,232,150,.12), 0 4px 20px rgba(0,0,0,.4)`,
      }}
    >
      <img
        src={item.img}
        alt={item.title}
        style={{
          width:"100%", height:"100%",
          objectFit:"cover", objectPosition:"center",
          display:"block",
          transform:  hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform .6s cubic-bezier(.16,1,.3,1), filter .4s",
          filter:     hovered
            ? "brightness(1.05) saturate(1.2) contrast(1.05)"
            : "brightness(.82) saturate(1.05)",
        }}
      />

      {/* Lumière souris */}
      <div style={{
        position:      "absolute", inset: 0,
        background:    hovered
          ? `radial-gradient(circle 120px at ${scanPos.x}% ${scanPos.y}%, rgba(0,232,150,.18) 0%, transparent 70%)`
          : "none",
        pointerEvents: "none",
        transition:    "background .05s",
        borderRadius:  "18px",
        mixBlendMode:  "screen",
      }}/>

      {/* Overlay gradient */}
      <div style={{
        position:    "absolute", inset: 0,
        background:  hovered
          ? "linear-gradient(to top, rgba(2,8,18,.92) 0%, rgba(2,8,18,.3) 45%, transparent 100%)"
          : "linear-gradient(to top, rgba(2,8,18,.75) 0%, transparent 60%)",
        transition:  "background .4s",
        borderRadius:"18px",
      }}/>

      {/* Contour intérieur */}
      <div style={{
        position:      "absolute", inset: 0, borderRadius: "18px",
        border:        hovered ? "1px solid rgba(0,232,150,.35)" : "1px solid rgba(0,232,150,.08)",
        transition:    "border-color .35s", pointerEvents: "none",
      }}/>

      {/* Coin deco */}
      <div style={{
        position:      "absolute", top: 0, right: 0,
        width: "60px", height: "60px",
        background:    "linear-gradient(225deg, rgba(0,232,150,.15) 0%, transparent 60%)",
        borderRadius:  "0 18px 0 0",
        opacity:       hovered ? 1 : 0, transition: "opacity .35s", pointerEvents: "none",
      }}/>

      {/* Numéro badge */}
      <div style={{
        position:       "absolute", top: "12px", left: "12px",
        width: "28px", height: "28px", borderRadius: "50%",
        background:     hovered ? "rgba(0,232,150,.2)" : "rgba(0,0,0,.5)",
        border:         `1px solid ${hovered ? "rgba(0,232,150,.5)" : "rgba(255,255,255,.15)"}`,
        display:        "flex", alignItems: "center", justifyContent: "center",
        fontSize:       ".6rem", fontWeight: 900,
        color:          hovered ? M : "rgba(255,255,255,.5)",
        fontFamily:     "'Rajdhani', sans-serif",
        letterSpacing:  ".05em", transition: "all .3s",
        backdropFilter: "blur(6px)",
      }}>
        {String(idx + 1).padStart(2, "0")}
      </div>

      {/* Icône zoom */}
      <div style={{
        position:      "absolute", top: "12px", right: "12px",
        width: "32px", height: "32px", borderRadius: "50%",
        background:    "rgba(0,232,150,.15)",
        border:        "1px solid rgba(0,232,150,.35)",
        display:       "flex", alignItems: "center", justifyContent: "center",
        color:         M, fontSize: ".8rem",
        opacity:       hovered ? 1 : 0,
        transform:     hovered ? "scale(1) rotate(0deg)" : "scale(.6) rotate(-20deg)",
        transition:    "all .35s cubic-bezier(.16,1,.3,1)",
        pointerEvents: "none",
        boxShadow:     "0 0 12px rgba(0,232,150,.3)",
      }}>⤢</div>

      {/* Caption */}
      <div style={{
        position:  "absolute", bottom: 0, left: 0, right: 0,
        padding:   "1.2rem 1.1rem",
        transform: hovered ? "translateY(0)" : "translateY(6px)",
        opacity:   hovered ? 1 : 0,
        transition:"all .35s cubic-bezier(.16,1,.3,1)",
      }}>
        <div style={{
          fontSize: ".92rem", fontWeight: 900, color: "#fff",
          lineHeight: 1.2, marginBottom: ".25rem",
          fontFamily: "'Rajdhani', sans-serif",
          textShadow: "0 2px 10px rgba(0,0,0,.8)",
        }}>{item.title}</div>
        <div style={{
          fontSize: ".72rem", color: "rgba(255,255,255,.5)",
          lineHeight: 1.5, fontFamily: "'Rajdhani', sans-serif",
        }}>{item.desc}</div>
      </div>

      {/* Barre verte bas */}
      <div style={{
        position:     "absolute", bottom: 0, left: 0, height: "2.5px",
        width:        hovered ? "100%" : "0%",
        background:   `linear-gradient(90deg, ${M}, ${M2})`,
        boxShadow:    `0 0 10px ${M}`,
        transition:   "width .5s cubic-bezier(.16,1,.3,1)",
        borderRadius: "0 0 18px 18px",
      }}/>
    </div>
  )
}

// ── LIGHTBOX ─────────────────────────────────────────────────
function Lightbox({ index, onClose, onPrev, onNext }) {
  const item = images[index]

  useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape")     onClose()
      if (e.key === "ArrowLeft")  onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose, onPrev, onNext])

  const ArrowBtn = ({ dir, onClick }) => {
    const [hov, setHov] = useState(false)
    return (
      <button
        onClick={e => { e.stopPropagation(); onClick() }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position:    "absolute",
          [dir === "left" ? "left" : "right"]: "2rem",
          top:         "50%",
          transform:   `translateY(-50%) ${hov ? "scale(1.12)" : "scale(1)"}`,
          width: "56px", height: "56px", borderRadius: "50%",
          background:  hov ? "rgba(0,232,150,.18)" : "rgba(0,232,150,.07)",
          border:      `1.5px solid ${hov ? "rgba(0,232,150,.6)" : "rgba(0,232,150,.25)"}`,
          color:       hov ? "#fff" : M,
          fontSize:    "1.3rem", cursor: "none",
          display:     "flex", alignItems: "center", justifyContent: "center",
          transition:  "all .25s cubic-bezier(.16,1,.3,1)",
          boxShadow:   hov ? "0 0 30px rgba(0,232,150,.35), inset 0 0 20px rgba(0,232,150,.1)" : "none",
          zIndex:      2, backdropFilter: "blur(8px)",
        }}
      >
        {dir === "left" ? "←" : "→"}
      </button>
    )
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(1,4,10,.97)", backdropFilter: "blur(22px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Rajdhani', sans-serif", animation: "lbIn .3s ease",
      }}
    >
      <style>{`
        @keyframes lbIn  { from{opacity:0} to{opacity:1} }
        @keyframes lbImg { from{opacity:0;transform:scale(.93) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>

      <ArrowBtn dir="left"  onClick={onPrev} />

      <div onClick={e => e.stopPropagation()} style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: "1.6rem", maxWidth: "82vw",
      }}>
        <div style={{
          position: "relative", borderRadius: "18px", overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(0,232,150,.2), 0 0 80px rgba(0,0,0,.9), 0 0 50px rgba(0,232,150,.07)",
        }}>
          <img
            key={index}
            src={item.img}
            alt={item.title}
            style={{
              maxHeight: "68vh", maxWidth: "78vw",
              objectFit: "contain", display: "block",
              animation: "lbImg .38s cubic-bezier(.16,1,.3,1)", borderRadius: "18px",
            }}
          />
          <div style={{ position:"absolute", inset:0, borderRadius:"18px", border:"1px solid rgba(0,232,150,.22)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", top:0, left:0, width:"50px", height:"50px", background:"linear-gradient(135deg,rgba(0,232,150,.2) 0%,transparent 60%)", borderRadius:"18px 0 0 0", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", bottom:0, right:0, width:"50px", height:"50px", background:"linear-gradient(315deg,rgba(0,232,150,.2) 0%,transparent 60%)", borderRadius:"0 0 18px 0", pointerEvents:"none" }}/>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize:"1.3rem", fontWeight:900, color:"#fff", marginBottom:".35rem", letterSpacing:".02em" }}>
            {item.title}
          </div>
          <div style={{ fontSize:".88rem", color:"rgba(255,255,255,.38)", lineHeight:1.6 }}>
            {item.desc}
          </div>
          <div style={{ marginTop:".5rem", fontSize:".65rem", color:M, letterSpacing:".18em", textTransform:"uppercase", fontWeight:700 }}>
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
          {images.map((_, i) => (
            <div key={i} style={{
              width:        i === index ? "26px" : "7px",
              height:       "7px", borderRadius: "10px",
              background:   i === index ? M : "rgba(255,255,255,.14)",
              boxShadow:    i === index ? `0 0 10px ${M}` : "none",
              transition:   "all .35s cubic-bezier(.16,1,.3,1)",
            }}/>
          ))}
        </div>
      </div>

      <ArrowBtn dir="right" onClick={onNext} />

      <button
        onClick={onClose}
        style={{
          position:"absolute", top:"1.6rem", right:"1.8rem",
          width:"38px", height:"38px", borderRadius:"50%",
          background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)",
          color:"rgba(255,255,255,.55)", fontSize:"1rem",
          cursor:"none", display:"flex", alignItems:"center", justifyContent:"center",
          transition:"all .2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background="rgba(255,60,60,.2)"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="rgba(255,60,60,.4)" }}
        onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.05)"; e.currentTarget.style.color="rgba(255,255,255,.55)"; e.currentTarget.style.borderColor="rgba(255,255,255,.1)" }}
      >✕</button>
    </div>
  )
}

// ── SECTION PRINCIPALE ───────────────────────────────────────
function Engagement() {
  const ref     = useRef(null)
  const visible = useInView(ref)
  const [lightbox, setLightbox] = useState(null)

  const openLightbox  = i  => setLightbox(i)
  const closeLightbox = () => setLightbox(null)
  const prevImg = useCallback(() => setLightbox(i => (i - 1 + images.length) % images.length), [])
  const nextImg = useCallback(() => setLightbox(i => (i + 1) % images.length), [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;900&display=swap');
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(0,232,150,.5)} 50%{box-shadow:0 0 0 8px rgba(0,232,150,0)} }

        .engagement {
          position:relative; padding:7rem 4rem;
          font-family:'Rajdhani',sans-serif;
          background:${BG}; overflow:hidden;
        }
        .engagement::before {
          content:''; position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(0,232,150,.015) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,232,150,.015) 1px,transparent 1px);
          background-size:65px 65px; pointer-events:none;
          mask-image:radial-gradient(ellipse 100% 80% at 50% 50%,black 20%,transparent 100%);
        }
        .engagement::after {
          content:''; position:absolute; width:900px; height:350px;
          background:radial-gradient(ellipse,rgba(0,232,150,.04) 0%,transparent 70%);
          bottom:-80px; left:50%; transform:translateX(-50%); pointer-events:none;
        }
        .engagement-inner { position:relative; z-index:1; max-width:1300px; margin:0 auto; }

        .eng-header {
          text-align:center; margin-bottom:4.5rem;
          opacity:0; transform:translateY(22px);
          transition:opacity .7s ease,transform .7s cubic-bezier(.16,1,.3,1);
        }
        .eng-header.vis { opacity:1; transform:translateY(0); }
        .eng-eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-size:.7rem; font-weight:700; letter-spacing:.22em;
          text-transform:uppercase; color:${M};
          background:rgba(0,232,150,.07); border:1px solid rgba(0,232,150,.18);
          border-radius:100px; padding:.32rem 1rem; margin-bottom:1.2rem;
        }
        .eng-eyebrow-dot {
          width:6px; height:6px; border-radius:50%;
          background:${M}; box-shadow:0 0 8px ${M}; animation:pulse 2s infinite;
        }
        .eng-title {
          font-size:clamp(2rem,4vw,3.2rem); font-weight:900; line-height:1;
          background:linear-gradient(90deg,white 0%,${M} 40%,${M2} 65%,white 100%);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          animation:shimmer 5s linear infinite; margin-bottom:.7rem;
        }
        .eng-subtitle {
          font-size:.95rem; color:rgba(255,255,255,.3);
          letter-spacing:.04em; max-width:520px; margin:0 auto; line-height:1.75;
        }
        .eng-count {
          display:inline-flex; align-items:center; gap:6px; margin-top:1rem;
          font-size:.7rem; font-weight:700; letter-spacing:.15em;
          color:rgba(255,255,255,.25); text-transform:uppercase;
        }
        .eng-count-num { color:${M}; font-size:.9rem; font-weight:900; }

        .eng-grid {
          display:grid;
          grid-template-columns:repeat(4,1fr);
          grid-template-rows:repeat(5,230px);
          gap:12px;
        }

        .eng-item {
          opacity:0; transform:scale(.94) translateY(16px);
          transition:opacity .6s ease,transform .6s cubic-bezier(.16,1,.3,1);
        }
        .eng-item.vis { opacity:1; transform:scale(1) translateY(0); }

        @media (max-width:960px) {
          .engagement { padding:5rem 1.5rem; }
          .eng-grid {
            grid-template-columns:repeat(2,1fr);
            grid-template-rows:none;
            grid-auto-rows:190px;
          }
          .eng-item { grid-column:auto!important; grid-row:auto!important; }
        }
        @media (max-width:520px) {
          .eng-grid { grid-template-columns:1fr; grid-auto-rows:200px; }
        }
      `}</style>

      <section className="engagement" id="engagement" ref={ref}>
        <div className="engagement-inner">

          <div className={`eng-header${visible ? " vis" : ""}`}>
            <div className="eng-eyebrow">
              <div className="eng-eyebrow-dot"/>
              Sur le terrain
            </div>
            <h2 className="eng-title">Engagement & Entrepreneuriat</h2>
            <p className="eng-subtitle">
              Des moments capturés entre hackathons, biennales, programmes d'incubation
              et rencontres autour de l'innovation africaine.
            </p>
            <div className="eng-count">
              <span className="eng-count-num">{images.length}</span>
              moments capturés · cliquez pour explorer
            </div>
          </div>

          <div className="eng-grid">
            {gridFinal.map(({ idx, style }, i) => (
              <div
                key={i}
                className={`eng-item${visible ? " vis" : ""}`}
                style={{ ...style, transitionDelay: `${i * 0.07}s` }}
              >
                <EngCard
                  item={images[idx]}
                  idx={idx}
                  visible={visible}
                  onClick={() => openLightbox(idx)}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {lightbox !== null && (
        <Lightbox
          index={lightbox}
          onClose={closeLightbox}
          onPrev={prevImg}
          onNext={nextImg}
        />
      )}
    </>
  )
}

export default Engagement