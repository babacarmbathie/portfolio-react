import { useState, useEffect, useRef } from "react"

const M  = "#00E896"
const M2 = "#A8FFD6"
const BG = "#040810"

function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState("home")
  const [menuOpen,  setMenuOpen]  = useState(false)
  const navRef = useRef(null)

  const links = [
    { id: "home",       label: "Accueil",      labelMobile: "Accueil"         },
    { id: "formation",  label: "Formation",    labelMobile: "Formation"       },
    { id: "projects",   label: "Projets",      labelMobile: "Projets"         },
    { id: "qualites",   label: "Qualités",     labelMobile: "Qualités"        },
    { id: "engagement", label: "Engagement Entrepreunariat", labelMobile: "Entrepreneuriat" },
    { id: "galerie",    label: "Galerie",      labelMobile: "Galerie"         },
    { id: "contact",    label: "Contact",      labelMobile: "Contact"         },
  ]

  // Scroll : fond navbar + fermeture menu
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      if (menuOpen) setMenuOpen(false)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [menuOpen])

  // Section active via IntersectionObserver
  useEffect(() => {
    const ids = links.map(l => l.id)
    const observers = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  // Fermer menu en cliquant en dehors
  useEffect(() => {
    if (!menuOpen) return
    const fn = e => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener("mousedown", fn)
    document.addEventListener("touchstart", fn)
    return () => {
      document.removeEventListener("mousedown", fn)
      document.removeEventListener("touchstart", fn)
    }
  }, [menuOpen])

  // Bloquer le scroll body quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const handleNav = (id) => {
    setActive(id)
    setMenuOpen(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;900&display=swap');

        @keyframes navSlideDown {
          from { opacity:0; transform:translateY(-18px) }
          to   { opacity:1; transform:translateY(0) }
        }
        @keyframes shimmer {
          0%   { background-position:-200% center }
          100% { background-position:200% center }
        }
        @keyframes pulse {
          0%,100% { box-shadow:0 0 0 0 rgba(0,232,150,.5) }
          50%     { box-shadow:0 0 0 8px rgba(0,232,150,0) }
        }
        @keyframes menuSlide {
          from { opacity:0; transform:translateY(-8px) }
          to   { opacity:1; transform:translateY(0) }
        }

        /* ── NAVBAR ── */
        .navbar {
          position:fixed; top:0; left:0; right:0; z-index:1000;
          padding:.9rem 3.5rem;
          display:flex; align-items:center; justify-content:space-between;
          font-family:'Rajdhani',sans-serif;
          transition:all .4s cubic-bezier(.16,1,.3,1);
          animation:navSlideDown .7s cubic-bezier(.16,1,.3,1) both;
        }
        .navbar.scrolled {
          background:rgba(4,8,16,.85);
          backdrop-filter:blur(18px);
          -webkit-backdrop-filter:blur(18px);
          border-bottom:1px solid rgba(0,232,150,.1);
          box-shadow:0 4px 40px rgba(0,0,0,.5),0 0 0 1px rgba(0,232,150,.04);
        }

        /* ── LOGO ── */
        .nav-logo { display:flex;align-items:center;gap:10px;text-decoration:none;cursor:pointer; }
        .nav-logo-dot { width:8px;height:8px;border-radius:50%;background:${M};box-shadow:0 0 10px ${M};animation:pulse 2s infinite;flex-shrink:0; }
        .nav-logo-text { font-size:1.15rem;font-weight:900;letter-spacing:.04em;background:linear-gradient(90deg,white 0%,${M} 40%,${M2} 65%,white 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite; }

        /* ── LINKS DESKTOP ── */
        .nav-links { list-style:none;display:flex;align-items:center;gap:.15rem;margin:0;padding:0; }
        .nav-links li a { display:block;position:relative;padding:.42rem .85rem;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;color:rgba(255,255,255,.42);border-radius:8px;transition:color .25s,background .25s;cursor:pointer; }
        .nav-links li a::after { content:'';position:absolute;bottom:4px;left:50%;width:0;height:1.5px;background:linear-gradient(90deg,${M},${M2});border-radius:2px;transform:translateX(-50%);transition:width .3s cubic-bezier(.16,1,.3,1); }
        .nav-links li a:hover { color:rgba(255,255,255,.85);background:rgba(0,232,150,.06); }
        .nav-links li a:hover::after { width:60%; }
        .nav-links li a.active { color:${M}; }
        .nav-links li a.active::after { width:60%; }

        /* ── CTA ── */
        .nav-cta { display:inline-block;font-family:'Rajdhani',sans-serif;font-weight:800;font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;padding:.52rem 1.4rem;border-radius:8px;color:${BG};background:linear-gradient(135deg,${M},${M2});box-shadow:0 0 20px rgba(0,232,150,.2);transition:transform .25s,box-shadow .25s;cursor:pointer;white-space:nowrap; }
        .nav-cta:hover { transform:translateY(-2px);box-shadow:0 6px 30px rgba(0,232,150,.38); }

        /* ── BURGER ── */
        .nav-burger { display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:6px;border-radius:8px;transition:background .2s; }
        .nav-burger:hover { background:rgba(0,232,150,.08); }
        .nav-burger span { display:block;width:22px;height:2px;background:${M};border-radius:2px;transition:all .3s cubic-bezier(.16,1,.3,1); }
        .nav-burger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .nav-burger.open span:nth-child(2) { opacity:0;transform:scaleX(0); }
        .nav-burger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        /* ── OVERLAY ── */
        .nav-overlay {
          display:none;
          position:fixed; inset:0; z-index:998;
          background:rgba(0,0,0,.6);
          backdrop-filter:blur(4px);
          opacity:0;
          transition:opacity .3s;
        }
        .nav-overlay.open { opacity:1; }

        /* ── MOBILE MENU ── */
        .nav-mobile {
          position:fixed; left:0; right:0; z-index:999;
          background:rgba(4,8,16,.98);
          border-bottom:1px solid rgba(0,232,150,.12);
          backdrop-filter:blur(24px);
          -webkit-backdrop-filter:blur(24px);
          padding:1rem 1.5rem 1.6rem;
          display:flex; flex-direction:column; gap:.1rem;
          transform:translateY(-110%);
          opacity:0;
          transition:transform .38s cubic-bezier(.16,1,.3,1),opacity .28s;
          pointer-events:none;
          box-shadow:0 20px 60px rgba(0,0,0,.6);
        }
        .nav-mobile.open {
          transform:translateY(0);
          opacity:1;
          pointer-events:all;
        }

        .nav-mobile-item {
          display:flex; align-items:center; gap:10px;
          font-family:'Rajdhani',sans-serif;
          font-weight:700; font-size:.92rem;
          letter-spacing:.1em; text-transform:uppercase;
          text-decoration:none;
          color:rgba(255,255,255,.45);
          padding:.75rem .5rem;
          border-bottom:1px solid rgba(0,232,150,.06);
          transition:color .2s,padding-left .2s;
          cursor:pointer;
          position:relative;
        }
        .nav-mobile-item:last-child { border-bottom:none; }
        .nav-mobile-item::before {
          content:'';
          display:block; width:4px; height:4px;
          border-radius:50%; background:${M};
          opacity:0; flex-shrink:0;
          transition:opacity .2s,box-shadow .2s;
        }
        .nav-mobile-item:hover,
        .nav-mobile-item.active {
          color:${M};
          padding-left:.8rem;
        }
        .nav-mobile-item:hover::before,
        .nav-mobile-item.active::before {
          opacity:1;
          box-shadow:0 0 6px ${M};
        }

        .nav-mobile-cta {
          display:inline-flex; align-items:center; justify-content:center;
          margin-top:.8rem;
          font-family:'Rajdhani',sans-serif; font-weight:800;
          font-size:.8rem; letter-spacing:.14em; text-transform:uppercase;
          text-decoration:none; padding:.7rem 1.4rem; border-radius:10px;
          color:${BG}; background:linear-gradient(135deg,${M},${M2});
          box-shadow:0 0 20px rgba(0,232,150,.25);
          transition:transform .2s,box-shadow .2s; cursor:pointer;
        }
        .nav-mobile-cta:hover { transform:translateY(-2px);box-shadow:0 6px 28px rgba(0,232,150,.4); }

        /* ── RESPONSIVE ── */
        @media (max-width:900px) {
          .nav-links, .nav-cta { display:none; }
          .nav-burger { display:flex; }
          .navbar { padding:.8rem 1.2rem; }
          .nav-overlay { display:block; }
        }
        @media (max-width:480px) {
          .navbar { padding:.7rem 1rem; }
          .nav-logo-text { font-size:1rem; }
          .nav-mobile-item { font-size:.82rem; padding:.65rem .5rem; }
        }
      `}</style>

      {/* Overlay */}
      <div
        className={`nav-overlay${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <nav ref={navRef} className={`navbar${scrolled ? " scrolled" : ""}`}>

        {/* Logo */}
        <a href="#home" className="nav-logo" onClick={() => handleNav("home")}>
          <div className="nav-logo-dot" />
          <span className="nav-logo-text">Babacar Mbathie</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? "active" : ""}
                onClick={() => handleNav(id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a href="#contact" className="nav-cta" onClick={() => handleNav("contact")}>
          Me contacter →
        </a>

        {/* Burger */}
        <button
          className={`nav-burger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          <span/><span/><span/>
        </button>
      </nav>

      {/* Mobile menu — positionné sous la navbar dynamiquement via CSS top */}
      <div
        className={`nav-mobile${menuOpen ? " open" : ""}`}
        style={{ top: scrolled ? "61px" : "64px" }}
      >
        {links.map(({ id, labelMobile }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-mobile-item${active === id ? " active" : ""}`}
            onClick={() => handleNav(id)}
          >
            {labelMobile}
          </a>
        ))}
        <a href="#contact" className="nav-mobile-cta" onClick={() => handleNav("contact")}>
          Me contacter →
        </a>
      </div>
    </>
  )
}

export default Navbar