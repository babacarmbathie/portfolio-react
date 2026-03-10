import { useState, useEffect, useCallback, useRef } from "react"

import gal1  from "../assets/galerie/gal1.jpg"
import gal2  from "../assets/galerie/gal2.jpg"
import gal3  from "../assets/galerie/gal3.jpg"
import gal4  from "../assets/galerie/gal4.jpg"
import gal5  from "../assets/galerie/gal5.jpg"
import gal6  from "../assets/galerie/gal6.jpg"
import gal7  from "../assets/galerie/gal7.jpg"
import gal8  from "../assets/galerie/gal8.jpg"
import gal9  from "../assets/galerie/gal9.jpg"
import gal10 from "../assets/galerie/gal10.jpg"
import gal11 from "../assets/galerie/gal11.jpg"
import gal13 from "../assets/galerie/gal13.jpg"
import gal14 from "../assets/galerie/gal14.jpg"
import gal15 from "../assets/galerie/gal15.jpg"
import gal16 from "../assets/galerie/gal16.jpg"

const M  = "#00E896"
const M2 = "#A8FFD6"
const BG = "#040810"

function useInView(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

const images = [
  gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8,
  gal9, gal10, gal11, gal13, gal14, gal15, gal16,
]

// 15 images sur 5 lignes — pas de ligne vide
const gridLayout = [
  // ligne 1
  { idx: 0,  style: { gridColumn: "1/2", gridRow: "1/2" } },
  { idx: 1,  style: { gridColumn: "2/4", gridRow: "1/2" } },  // large ×2
  { idx: 2,  style: { gridColumn: "4/5", gridRow: "1/3" } },  // haute ×2

  // ligne 2
  { idx: 3,  style: { gridColumn: "1/2", gridRow: "2/4" } },  // haute ×2
  { idx: 4,  style: { gridColumn: "2/3", gridRow: "2/3" } },
  { idx: 5,  style: { gridColumn: "3/4", gridRow: "2/3" } },

  // ligne 3
  { idx: 6,  style: { gridColumn: "2/4", gridRow: "3/4" } },  // large ×2
  { idx: 7,  style: { gridColumn: "4/5", gridRow: "3/4" } },

  // ligne 4
  { idx: 8,  style: { gridColumn: "1/2", gridRow: "4/5" } },
  { idx: 9,  style: { gridColumn: "2/3", gridRow: "4/6" } },  // haute ×2
  { idx: 10, style: { gridColumn: "3/4", gridRow: "4/5" } },
  { idx: 11, style: { gridColumn: "4/5", gridRow: "4/5" } },

  // ligne 5
  { idx: 12, style: { gridColumn: "1/2", gridRow: "5/6" } },
  // col 2 = idx9 suite
  { idx: 13, style: { gridColumn: "3/4", gridRow: "5/6" } },
  { idx: 14, style: { gridColumn: "4/5", gridRow: "5/6" } },
]

// ── CARTE ────────────────────────────────────────────────────
function GalCard({ src, idx, visible, onClick }) {
  const cardRef   = useRef(null)
  const [tilt,    setTilt]    = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [scanPos, setScanPos] = useState({ x: 50, y: 50 })
  const [loaded,  setLoaded]  = useState(false)

  const handleMouseMove = e => {
    const r  = cardRef.current.getBoundingClientRect()
    const x  = ((e.clientX - r.left) / r.width  - 0.5) * 12
    const y  = ((e.clientY - r.top)  / r.height - 0.5) * -12
    const px = ((e.clientX - r.left) / r.width)  * 100
    const py = ((e.clientY - r.top)  / r.height) * 100
    setTilt({ x, y })
    setScanPos({ x: px, y: py })
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      style={{
        height:       "100%",
        borderRadius: "16px",
        overflow:     "hidden",
        cursor:       "none",
        position:     "relative",
        transform:    hovered
          ? `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.035)`
          : "perspective(800px) rotateY(0) rotateX(0) scale(1)",
        transition:   hovered ? "transform .07s ease" : "transform .5s cubic-bezier(.16,1,.3,1)",
        boxShadow:    hovered
          ? `0 0 0 1.5px rgba(0,232,150,.6), 0 0 30px rgba(0,232,150,.2), 0 24px 60px rgba(0,0,0,.65)`
          : `0 0 0 1px rgba(0,232,150,.1), 0 4px 24px rgba(0,0,0,.45)`,
      }}
    >
      {!loaded && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(255,255,255,.03) 0%, rgba(0,232,150,.05) 50%, rgba(255,255,255,.03) 100%)",
          backgroundSize: "200% 100%",
          animation: "galSkeleton 1.6s ease infinite",
          borderRadius: "16px",
        }}/>
      )}
      <img
        src={src}
        alt={`galerie-${idx + 1}`}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center", display: "block",
          transform:  hovered ? "scale(1.12)" : "scale(1)",
          transition: "transform .65s cubic-bezier(.16,1,.3,1), filter .4s, opacity .4s",
          filter:     hovered ? "brightness(1.08) saturate(1.25) contrast(1.05)" : "brightness(.78) saturate(1.1)",
          opacity:    loaded ? 1 : 0,
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: hovered ? `radial-gradient(circle 140px at ${scanPos.x}% ${scanPos.y}%, rgba(0,232,150,.22) 0%, transparent 70%)` : "transparent",
        pointerEvents: "none", borderRadius: "16px", mixBlendMode: "screen", transition: "background .04s",
      }}/>
      <div style={{
        position: "absolute", inset: 0,
        background: hovered ? "linear-gradient(to top, rgba(2,6,18,.95) 0%, rgba(2,6,18,.25) 50%, transparent 100%)" : "linear-gradient(to top, rgba(2,6,18,.65) 0%, transparent 55%)",
        transition: "background .4s", borderRadius: "16px",
      }}/>
      <div style={{ position: "absolute", inset: 0, borderRadius: "16px", border: hovered ? "1px solid rgba(0,232,150,.4)" : "1px solid rgba(0,232,150,.07)", transition: "border-color .3s", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", top: 0, right: 0, width: "55px", height: "55px", background: "linear-gradient(225deg, rgba(0,232,150,.18) 0%, transparent 65%)", borderRadius: "0 16px 0 0", opacity: hovered ? 1 : 0, transition: "opacity .3s", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "40px", height: "40px", background: "linear-gradient(45deg, rgba(0,232,150,.12) 0%, transparent 65%)", borderRadius: "16px 0 0 0", opacity: hovered ? 1 : 0, transition: "opacity .35s .05s", pointerEvents: "none" }}/>
      <div style={{
        position: "absolute", top: "10px", left: "10px",
        width: "26px", height: "26px", borderRadius: "50%",
        background: hovered ? "rgba(0,232,150,.22)" : "rgba(0,0,0,.55)",
        border: `1px solid ${hovered ? "rgba(0,232,150,.55)" : "rgba(255,255,255,.12)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: ".58rem", fontWeight: 900,
        color: hovered ? M : "rgba(255,255,255,.45)",
        fontFamily: "'Rajdhani', sans-serif", transition: "all .3s", backdropFilter: "blur(8px)",
      }}>
        {String(idx + 1).padStart(2, "0")}
      </div>
      <div style={{
        position: "absolute", top: "10px", right: "10px",
        width: "30px", height: "30px", borderRadius: "50%",
        background: "rgba(0,232,150,.18)", border: "1px solid rgba(0,232,150,.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: M, fontSize: ".78rem",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "scale(1) rotate(0)" : "scale(.5) rotate(-30deg)",
        transition: "all .3s cubic-bezier(.16,1,.3,1)", pointerEvents: "none",
        boxShadow: `0 0 14px rgba(0,232,150,.35)`,
      }}>⤢</div>
      <div style={{
        position: "absolute", bottom: 0, left: 0, height: "2px",
        width: hovered ? "100%" : "0%",
        background: `linear-gradient(90deg, ${M}, ${M2}, transparent)`,
        boxShadow: `0 0 8px ${M}`, transition: "width .45s cubic-bezier(.16,1,.3,1)", borderRadius: "0 0 16px 16px",
      }}/>
      <div style={{
        position: "absolute", bottom: "10px", right: "14px",
        fontSize: ".62rem", fontWeight: 700,
        color: "rgba(255,255,255,.28)", fontFamily: "'Rajdhani', sans-serif",
        letterSpacing: ".08em", opacity: hovered ? 0 : 1, transition: "opacity .2s",
      }}>
        {String(idx + 1).padStart(2, "0")}/{String(images.length).padStart(2, "0")}
      </div>
    </div>
  )
}

// ── LIGHTBOX ─────────────────────────────────────────────────
function Lightbox({ index, onClose, onPrev, onNext }) {
  const src = images[index]
  const [transitioning, setTransitioning] = useState(false)

  const go = useCallback((fn) => {
    setTransitioning(true)
    setTimeout(() => { fn(); setTransitioning(false) }, 220)
  }, [])

  useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape")     onClose()
      if (e.key === "ArrowLeft")  go(onPrev)
      if (e.key === "ArrowRight") go(onNext)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = "" }
  }, [onClose, onPrev, onNext, go])

  const ArrowBtn = ({ dir, onClick: handleClick }) => {
    const [hov, setHov] = useState(false)
    return (
      <button
        onClick={e => { e.stopPropagation(); go(handleClick) }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "absolute",
          [dir === "left" ? "left" : "right"]: "1.8rem",
          top: "50%",
          transform: `translateY(-50%) ${hov ? "scale(1.15)" : "scale(1)"}`,
          width: "52px", height: "52px", borderRadius: "50%",
          background: hov ? "rgba(0,232,150,.2)" : "rgba(0,232,150,.08)",
          border: `1.5px solid ${hov ? "rgba(0,232,150,.65)" : "rgba(0,232,150,.22)"}`,
          color: hov ? "#fff" : M, fontSize: "1.2rem", cursor: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all .22s cubic-bezier(.16,1,.3,1)",
          boxShadow: hov ? `0 0 35px rgba(0,232,150,.4), inset 0 0 18px rgba(0,232,150,.1)` : "none",
          zIndex: 2, backdropFilter: "blur(10px)", fontFamily: "'Rajdhani', sans-serif",
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
        position: "fixed", inset: 0, zIndex: 9900,
        background: "rgba(1,3,10,.98)", backdropFilter: "blur(28px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Rajdhani', sans-serif", animation: "lbFadeIn .28s ease",
      }}
    >
      <style>{`
        @keyframes lbFadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes lbSlideIn  { from{opacity:0;transform:scale(.9) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes lbSlideOut { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(.92)} }
        @keyframes galSkeleton{ 0%{background-position:-200% 0} 100%{background-position:200% 0} }
      `}</style>

      <ArrowBtn dir="left"  onClick={onPrev} />

      <div onClick={e => e.stopPropagation()} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.4rem", maxWidth: "85vw" }}>
        <div style={{
          position: "relative", borderRadius: "20px", overflow: "hidden",
          boxShadow: `0 0 0 1px rgba(0,232,150,.18), 0 0 100px rgba(0,0,0,.95), 0 0 60px rgba(0,232,150,.06)`,
          animation: transitioning ? "lbSlideOut .22s ease forwards" : "lbSlideIn .32s cubic-bezier(.16,1,.3,1)",
        }}>
          <img key={index} src={src} alt={`galerie-${index + 1}`} style={{ maxHeight: "70vh", maxWidth: "80vw", objectFit: "contain", display: "block", borderRadius: "20px" }}/>
          <div style={{ position:"absolute", inset:0, borderRadius:"20px", border:"1px solid rgba(0,232,150,.22)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", top:0, left:0, width:"60px", height:"60px", background:"linear-gradient(135deg,rgba(0,232,150,.22) 0%,transparent 65%)", borderRadius:"20px 0 0 0", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", bottom:0, right:0, width:"60px", height:"60px", background:"linear-gradient(315deg,rgba(0,232,150,.22) 0%,transparent 65%)", borderRadius:"0 0 20px 0", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", inset:0, borderRadius:"20px", background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.03) 2px,rgba(0,0,0,.03) 4px)", pointerEvents:"none" }}/>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".7rem", width: "100%" }}>
          <div style={{ fontSize: ".7rem", color: M, letterSpacing: ".2em", fontWeight: 700, textTransform: "uppercase" }}>
            {String(index + 1).padStart(2, "0")} <span style={{ color: "rgba(255,255,255,.2)" }}>/ {String(images.length).padStart(2, "0")}</span>
          </div>
          <div style={{ width: "200px", height: "2px", background: "rgba(255,255,255,.08)", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${((index + 1) / images.length) * 100}%`, background: `linear-gradient(90deg, ${M}, ${M2})`, borderRadius: "10px", boxShadow: `0 0 8px ${M}`, transition: "width .4s cubic-bezier(.16,1,.3,1)" }}/>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".4rem", flexWrap: "wrap", justifyContent: "center", maxWidth: "320px" }}>
            {images.map((_, i) => (
              <div key={i} style={{ width: i === index ? "22px" : "6px", height: "6px", borderRadius: "10px", background: i === index ? M : "rgba(255,255,255,.12)", boxShadow: i === index ? `0 0 8px ${M}` : "none", transition: "all .3s cubic-bezier(.16,1,.3,1)" }}/>
            ))}
          </div>
        </div>
      </div>

      <ArrowBtn dir="right" onClick={onNext} />

      <button
        onClick={onClose}
        style={{ position:"absolute", top:"1.5rem", right:"1.8rem", width:"36px", height:"36px", borderRadius:"50%", background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.5)", fontSize:"1rem", cursor:"none", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
        onMouseEnter={e => { e.currentTarget.style.background="rgba(255,50,50,.22)"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="rgba(255,50,50,.4)" }}
        onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.05)"; e.currentTarget.style.color="rgba(255,255,255,.5)"; e.currentTarget.style.borderColor="rgba(255,255,255,.1)" }}
      >✕</button>

      <div style={{ position:"absolute", bottom:"1.4rem", left:"50%", transform:"translateX(-50%)", fontSize:".6rem", color:"rgba(255,255,255,.18)", letterSpacing:".15em", textTransform:"uppercase", fontFamily:"'Rajdhani',sans-serif", fontWeight:700, display:"flex", gap:".8rem" }}>
        <span>← → naviguer</span>
        <span style={{ color:"rgba(255,255,255,.08)" }}>|</span>
        <span>ESC fermer</span>
      </div>
    </div>
  )
}

// ── SECTION PRINCIPALE ───────────────────────────────────────
function Galerie() {
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
        @keyframes shimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse      { 0%,100%{box-shadow:0 0 0 0 rgba(0,232,150,.5)} 50%{box-shadow:0 0 0 8px rgba(0,232,150,0)} }
        @keyframes galSkeleton{ 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        .galerie {
          position: relative;
          padding: 7rem 4rem 4rem;   /* ← padding-bottom réduit */
          font-family: 'Rajdhani', sans-serif;
          background: ${BG};
          overflow: hidden;
        }
        .galerie::before {
          content:''; position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(0,232,150,.013) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,232,150,.013) 1px,transparent 1px);
          background-size:65px 65px; pointer-events:none;
          mask-image:radial-gradient(ellipse 100% 80% at 50% 50%,black 20%,transparent 100%);
        }
        .galerie::after {
          content:''; position:absolute; width:1000px; height:400px;
          background:radial-gradient(ellipse,rgba(0,232,150,.035) 0%,transparent 70%);
          top:0; left:50%; transform:translateX(-50%); pointer-events:none;
        }
        .galerie-inner { position:relative; z-index:1; max-width:1300px; margin:0 auto; }

        .gal-header {
          text-align:center; margin-bottom:4rem;
          opacity:0; transform:translateY(22px);
          transition:opacity .7s ease,transform .7s cubic-bezier(.16,1,.3,1);
        }
        .gal-header.vis { opacity:1; transform:translateY(0); }
        .gal-eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-size:.7rem; font-weight:700; letter-spacing:.22em;
          text-transform:uppercase; color:${M};
          background:rgba(0,232,150,.07); border:1px solid rgba(0,232,150,.18);
          border-radius:100px; padding:.32rem 1rem; margin-bottom:1.2rem;
        }
        .gal-eyebrow-dot {
          width:6px; height:6px; border-radius:50%;
          background:${M}; box-shadow:0 0 8px ${M}; animation:pulse 2s infinite;
        }
        .gal-title {
          font-size:clamp(2rem,4vw,3.2rem); font-weight:900; line-height:1;
          background:linear-gradient(90deg,white 0%,${M} 40%,${M2} 65%,white 100%);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          animation:shimmer 5s linear infinite; margin-bottom:.7rem;
        }
        .gal-subtitle {
          font-size:.95rem; color:rgba(255,255,255,.3);
          letter-spacing:.04em; max-width:520px; margin:0 auto; line-height:1.75;
        }
        .gal-count {
          display:inline-flex; align-items:center; gap:6px; margin-top:1rem;
          font-size:.7rem; font-weight:700; letter-spacing:.15em;
          color:rgba(255,255,255,.22); text-transform:uppercase;
        }
        .gal-count-num { color:${M}; font-size:.9rem; font-weight:900; }

        /* Grille 5 lignes exactes, pas de ligne 6 vide */
        .gal-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(5, 210px);
          gap: 12px;
        }

        .gal-item {
          opacity:0; transform:scale(.93) translateY(18px);
          transition:opacity .6s ease,transform .65s cubic-bezier(.16,1,.3,1);
        }
        .gal-item.vis { opacity:1; transform:scale(1) translateY(0); }

        @media (max-width:960px) {
          .galerie { padding:5rem 1.5rem 3rem; }
          .gal-grid {
            grid-template-columns:repeat(2,1fr);
            grid-template-rows:none;
            grid-auto-rows:180px;
          }
          .gal-item { grid-column:auto!important; grid-row:auto!important; }
        }
        @media (max-width:520px) {
          .gal-grid { grid-template-columns:1fr; grid-auto-rows:190px; }
        }
      `}</style>

      <section className="galerie" id="galerie" ref={ref}>
        <div className="galerie-inner">

          <div className={`gal-header${visible ? " vis" : ""}`}>
            <div className="gal-eyebrow">
              <div className="gal-eyebrow-dot"/>
              Portfolio visuel
            </div>
            <h2 className="gal-title">Galerie</h2>
            <p className="gal-subtitle">
              Une sélection de moments, projets et rencontres qui reflètent
              mon parcours entre innovation, terrain et entrepreneuriat.
            </p>
            <div className="gal-count">
              <span className="gal-count-num">{images.length}</span>
              photos · cliquez pour explorer en plein écran
            </div>
          </div>

          <div className="gal-grid">
            {gridLayout.map(({ idx, style }, i) => (
              <div
                key={i}
                className={`gal-item${visible ? " vis" : ""}`}
                style={{ ...style, transitionDelay: `${i * 0.06}s` }}
              >
                <GalCard
                  src={images[idx]}
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

export default Galerie