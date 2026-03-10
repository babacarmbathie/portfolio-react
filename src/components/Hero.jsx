import { useState, useEffect, useRef } from "react"

const M  = "#00E896"
const M2 = "#A8FFD6"
const M3 = "#5EFFC0"
const BG = "#040810"

// ── CURSEUR (desktop uniquement) ─────────────────────────────
function Cursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  const mx = useRef(0), my = useRef(0)
  const rx = useRef(0), ry = useRef(0)
  const [big,      setBig]      = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    // Ne pas activer sur mobile/tactile
    if (window.matchMedia("(pointer: coarse)").matches) return

    const mv = e => {
      mx.current = e.clientX; my.current = e.clientY
      const t = e.target
      setBig(["A","BUTTON","INPUT","TEXTAREA"].includes(t.tagName) || !!t.closest("button,a"))
    }
    const md = () => setClicking(true)
    const mu = () => setClicking(false)
    window.addEventListener("mousemove", mv)
    window.addEventListener("mousedown", md)
    window.addEventListener("mouseup",   mu)
    let id
    const tick = () => {
      rx.current += (mx.current - rx.current) * 0.11
      ry.current += (my.current - ry.current) * 0.11
      if (dot.current)
        dot.current.style.transform = `translate(${mx.current - 5}px,${my.current - 5}px)`
      if (ring.current)
        ring.current.style.transform = `translate(${rx.current - 22}px,${ry.current - 22}px) scale(${clicking ? 0.7 : big ? 1.8 : 1})`
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", mv)
      window.removeEventListener("mousedown", md)
      window.removeEventListener("mouseup",   mu)
      cancelAnimationFrame(id)
    }
  }, [big, clicking])

  // Ne rien rendre sur tactile
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null

  return (
    <>
      <div ref={dot} style={{
        position:"fixed",zIndex:9999,top:0,left:0,
        width:10,height:10,borderRadius:"50%",background:M,
        pointerEvents:"none",boxShadow:`0 0 10px ${M},0 0 20px ${M}66`
      }}/>
      <div ref={ring} style={{
        position:"fixed",zIndex:9998,top:0,left:0,
        width:44,height:44,borderRadius:"50%",
        border:`1.5px solid ${M}99`,pointerEvents:"none",
        transition:"transform .15s ease"
      }}/>
    </>
  )
}

// ── PARTICULES ───────────────────────────────────────────────
function Particles() {
  const cv = useRef(null)
  useEffect(() => {
    const c = cv.current; if (!c) return
    const ctx = c.getContext("2d")
    // Moins de particules sur mobile pour les perfs
    const isMobile = window.innerWidth <= 768
    const count = isMobile ? 40 : 85
    let W = c.width = window.innerWidth
    let H = c.height = window.innerHeight
    const mouse = { x: W / 2, y: H / 2 }
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
      r: Math.random() * 1.3 + .4, a: Math.random() * .45 + .08
    }))
    const mv = e => { mouse.x = e.clientX; mouse.y = e.clientY }
    const rz = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight }
    window.addEventListener("mousemove", mv)
    window.addEventListener("resize", rz, { passive: true })
    let id
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,232,150,${p.a})`; ctx.fill()
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 105) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(0,232,150,${.055 * (1 - d / 105)})`; ctx.lineWidth = .5; ctx.stroke()
          }
        }
        // Connexion souris seulement sur desktop
        if (!isMobile) {
          const dx = pts[i].x - mouse.x, dy = pts[i].y - mouse.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 150) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(94,255,192,${.15 * (1 - d / 150)})`; ctx.lineWidth = .9; ctx.stroke()
          }
        }
      }
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      window.removeEventListener("mousemove", mv)
      window.removeEventListener("resize", rz)
      cancelAnimationFrame(id)
    }
  }, [])
  return <canvas ref={cv} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }}/>
}

// ── TYPEWRITER ───────────────────────────────────────────────
function Typewriter({ words, speed = 85 }) {
  const [idx, setIdx] = useState(0)
  const [txt, setTxt] = useState("")
  const [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[idx]
    const id = setTimeout(() => {
      if (!del) {
        if (txt.length < w.length) setTxt(w.slice(0, txt.length + 1))
        else setTimeout(() => setDel(true), 1800)
      } else {
        if (txt.length > 0) setTxt(txt.slice(0, -1))
        else { setDel(false); setIdx((idx + 1) % words.length) }
      }
    }, del ? 38 : speed)
    return () => clearTimeout(id)
  }, [txt, del, idx, words, speed])
  return <span>{txt}<span style={{ color:M, animation:"blink 1s step-end infinite" }}>|</span></span>
}

// ── HERO ─────────────────────────────────────────────────────
function Hero() {
  const [loaded,   setLoaded]   = useState(false)
  const [mousePos, setMousePos] = useState({ x:0.5, y:0.5 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener("resize", check, { passive: true })
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120)
    // Parallaxe photo seulement sur desktop
    const mv = e => {
      if (window.innerWidth > 768) {
        setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
      }
    }
    window.addEventListener("mousemove", mv)
    return () => { clearTimeout(t); window.removeEventListener("mousemove", mv) }
  }, [])

  const fu = (d = 0) => ({
    opacity:   loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(28px)",
    transition: `opacity .8s ease ${d}s, transform .8s cubic-bezier(.16,1,.3,1) ${d}s`
  })

  const px = (mousePos.x - .5) * 14
  const py = (mousePos.y - .5) * 14

  // Taille anneaux selon écran
  const ringOuter = isMobile ? 260 : 430
  const ringInner = isMobile ? 208 : 345
  const imgSize   = isMobile ? 170 : 285

  return (
    <>
      <Cursor />
      <Particles />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;900&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{background:${BG};color:white;font-family:'Rajdhani',sans-serif;overflow-x:hidden;}
        /* Curseur custom seulement sur desktop */
        @media(pointer:fine){body,a,button{cursor:none}}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:linear-gradient(${M},${M2});border-radius:2px}

        @keyframes blink   {0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse   {0%,100%{box-shadow:0 0 0 0 rgba(0,232,150,.5)}50%{box-shadow:0 0 0 10px rgba(0,232,150,0)}}
        @keyframes rotate  {from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes shimmer {0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes floatUp {0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

        /* ── SECTION ── */
        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 3rem;
          padding: 5rem 5rem 3rem;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        .hero::before {
          content:''; position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(0,232,150,.018) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,232,150,.018) 1px,transparent 1px);
          background-size:65px 65px; pointer-events:none;
          mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%);
        }
        .hero::after {
          content:''; position:absolute; width:700px; height:700px;
          background:radial-gradient(circle,rgba(0,232,150,.06) 0%,transparent 70%);
          top:50%; left:35%; transform:translate(-50%,-50%); pointer-events:none;
        }

        /* ── TEXTE ── */
        .hero-text { position:relative; z-index:2; }

        .hero-intro {
          display:inline-flex; align-items:center; gap:8px;
          font-size:.74rem; font-weight:700; letter-spacing:.2em; color:${M};
          text-transform:uppercase;
          background:rgba(0,232,150,.07); border:1px solid rgba(0,232,150,.2);
          border-radius:100px; padding:.32rem 1rem; margin-bottom:1.4rem;
        }
        .hero-intro::before {
          content:''; width:7px; height:7px; border-radius:50%;
          background:${M}; box-shadow:0 0 8px ${M};
          animation:pulse 2s infinite; flex-shrink:0;
        }

        .hero-text h1 {
          font-size:clamp(2.2rem,6vw,5.2rem);
          font-weight:900; line-height:.92; margin-bottom:1rem;
          background:linear-gradient(90deg,white 0%,${M} 35%,${M2} 55%,white 100%);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          animation:shimmer 4s linear infinite;
        }

        .hero-text h2 {
          font-size:clamp(.88rem,2.2vw,1.05rem); font-weight:600;
          color:rgba(255,255,255,.46);
          letter-spacing:.03em; margin-bottom:.9rem; line-height:1.5;
        }

        .hero-typewriter {
          font-size:clamp(.82rem,2vw,1rem); color:rgba(255,255,255,.35);
          font-style:italic; min-height:1.6rem; margin-bottom:1.3rem;
        }

        .hero-description {
          font-size:clamp(.82rem,1.8vw,.96rem); color:rgba(255,255,255,.5);
          line-height:1.85; max-width:480px; margin-bottom:2rem;
        }
        .hero-description strong { color:${M2}; font-weight:700; }

        /* ── BOUTONS ── */
        .hero-buttons { display:flex; gap:1rem; flex-wrap:wrap; margin-bottom:2.2rem; }

        .btn {
          display:inline-block; font-family:'Rajdhani',sans-serif;
          font-weight:800; font-size:.88rem; letter-spacing:.12em;
          padding:.88rem 2.2rem; border-radius:10px;
          text-decoration:none; transition:all .3s;
        }
        .btn-primary {
          background:linear-gradient(135deg,${M},${M2}); color:${BG};
          box-shadow:0 0 28px rgba(0,232,150,.25);
          position:relative; overflow:hidden;
        }
        .btn-primary::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,${M2},${M3});
          opacity:0; transition:opacity .3s; border-radius:10px;
        }
        .btn-primary span { position:relative; z-index:1; }
        .btn-primary:hover { transform:translateY(-3px); box-shadow:0 10px 45px rgba(0,232,150,.42); }
        .btn-primary:hover::after { opacity:1; }
        .btn-secondary {
          background:transparent; border:1px solid rgba(0,232,150,.3); color:${M2};
        }
        .btn-secondary:hover {
          border-color:${M}; background:rgba(0,232,150,.07);
          transform:translateY(-3px); box-shadow:0 6px 25px rgba(0,232,150,.12);
        }

        /* ── STATS ── */
        .hero-stats {
          display:flex; gap:2.5rem;
          padding-top:1.6rem;
          border-top:1px solid rgba(0,232,150,.1);
        }
        .stat-num {
          font-size:clamp(1.5rem,4vw,2rem); font-weight:900; line-height:1;
          background:linear-gradient(135deg,${M},${M2});
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }
        .stat-lbl { font-size:.62rem; color:rgba(255,255,255,.28); letter-spacing:.1em; margin-top:3px; }

        /* ── IMAGE ── */
        .hero-image {
          position:relative; z-index:2;
          display:flex; justify-content:center; align-items:center;
        }
        .ring-outer,.ring-inner { position:absolute; border-radius:50%; pointer-events:none; }
        .ring-outer::before,.ring-outer::after {
          content:''; position:absolute;
          width:10px; height:10px; background:${M};
          border-radius:50%; box-shadow:0 0 10px ${M};
        }
        .ring-outer::before { top:-5px; left:50%; transform:translateX(-50%); }
        .ring-outer::after  { bottom:-5px; left:50%; transform:translateX(-50%); }
        .hero-image img {
          border-radius:50%;
          object-fit:cover; object-position:center top;
          border:3px solid rgba(0,232,150,.32);
          box-shadow:0 0 0 8px rgba(0,232,150,.06),0 0 60px rgba(0,232,150,.2);
          filter:saturate(1.1) contrast(1.04);
          position:relative; z-index:2;
          transition:transform .1s ease;
        }

        /* ── SCROLL HINT ── */
        .scroll-hint {
          position:absolute; bottom:2rem; left:50%; transform:translateX(-50%);
          display:flex; flex-direction:column; align-items:center; gap:6px;
          opacity:.28; z-index:2; animation:floatUp 2s ease-in-out infinite;
        }
        .scroll-hint span { font-size:.58rem; letter-spacing:.2em; color:${M}; }
        .scroll-line { width:1px; height:38px; background:linear-gradient(to bottom,${M},transparent); }

        /* ═══════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════ */
        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            padding: 7rem 2.5rem 4rem;
            gap: 0;
            min-height: 100svh;
            text-align: center;
          }
          .hero::after { left:50%; width:500px; height:500px; }

          /* Image en premier sur mobile */
          .hero-image { order: -1; margin-bottom: 2.4rem; }

          .hero-intro  { font-size:.65rem; }
          .hero-description { max-width:100%; }
          .hero-buttons { justify-content:center; }
          .hero-stats   { justify-content:center; gap:2rem; }

          .scroll-hint { display:none; }
        }

        @media (max-width: 768px) {
          .hero { padding: 6.5rem 1.4rem 3.5rem; }

          .hero-intro { font-size:.6rem; padding:.28rem .85rem; }

          .hero-text h1 { font-size:clamp(2rem,9vw,3.2rem); line-height:.95; }
          .hero-text h2 { font-size:.85rem; }
          .hero-typewriter { font-size:.8rem; }
          .hero-description { font-size:.82rem; line-height:1.75; }

          .btn { font-size:.8rem; padding:.75rem 1.6rem; }
          .hero-stats { gap:1.5rem; }
          .stat-lbl { font-size:.56rem; }
        }

        @media (max-width: 480px) {
          .hero { padding: 5.8rem 1rem 3rem; }
          .hero-text h1 { font-size:clamp(1.8rem,10vw,2.8rem); }
          .hero-buttons { flex-direction:column; align-items:stretch; }
          .btn { text-align:center; }
          .hero-stats { gap:1.2rem; }
          .stat-num { font-size:1.5rem; }
        }
      `}</style>

      <section className="hero" id="home">

        {/* ── TEXTE ── */}
        <div className="hero-text">

          <div style={fu(0)}>
            <p className="hero-intro">Bonjour, je suis</p>
          </div>

          <div style={fu(.08)}>
            <h1>Babacar Mbathie</h1>
          </div>

          <div style={fu(.14)}>
            <h2>Étudiant entrepreneur en Data, IA et Agriculture Numérique</h2>
          </div>

          <div style={fu(.2)}>
            <p className="hero-typewriter">
              <Typewriter words={[
                "Data Science & IA pour l'Afrique 🌍",
                "Agriculture numérique & innovation 🌱",
                "Génie Logiciel & transformation digitale 💻",
                "Finaliste Hackathondays — Dakar 🚀",
                "Lauréat Prix de l'Innovation 🏆",
              ]}/>
            </p>
          </div>

         <div style={fu(.26)}>
  <p className="hero-description">
    Étudiant en <strong>Master 2 Gestion de Données et Ingénierie Logicielle</strong>,
    titulaire d’une <strong>Licence AgroTIC (informatique appliquée à l’agriculture)</strong>.
    Je m’intéresse à la <strong>data science</strong>, au développement logiciel et aux
    solutions numériques pour l’<strong>agriculture et l’innovation</strong>.
  </p>
</div>

          <div style={fu(.32)}>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                <span>Voir mes projets ↗</span>
              </a>
              <a href="#contact" className="btn btn-secondary">
                Me contacter →
              </a>
            </div>
          </div>

          <div style={fu(.38)}>
            <div className="hero-stats">
              {[["2+","Ans d'expérience"],["3+","Distinctions"],["5+","Outils Data & SIG"]].map(([n,l]) => (
                <div key={l}>
                  <div className="stat-num">{n}</div>
                  <div className="stat-lbl">{l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── IMAGE ── */}
        <div className="hero-image" style={fu(.1)}>

          <div className="ring-outer" style={{
            width: `${ringOuter}px`, height: `${ringOuter}px`,
            border: "1px dashed rgba(0,232,150,.18)",
            animation: "rotate 22s linear infinite",
          }}/>
          <div className="ring-inner" style={{
            width: `${ringInner}px`, height: `${ringInner}px`,
            border: "1px solid rgba(0,232,150,.08)",
            animation: "rotate 16s linear infinite reverse",
          }}/>

          <img
            src="/baba.jpg"
            alt="Photo de Babacar Mbathie"
            width={imgSize}
            height={imgSize}
            style={{
              width: `${imgSize}px`,
              height: `${imgSize}px`,
              transform: isMobile ? "none" : `translate(${px}px,${py}px)`,
            }}
          />



        </div>

        {/* Scroll hint — desktop uniquement */}
        <div className="scroll-hint">
          <span>SCROLL</span>
          <div className="scroll-line"/>
        </div>

      </section>
    </>
  )
}

export default Hero