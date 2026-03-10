import { useState, useEffect, useRef, useCallback } from "react"

import biblio1 from "../assets/projects/biblio/biblio1.png"
import biblio2 from "../assets/projects/biblio/biblio2.png"
import e1 from "../assets/projects/biblio/e1.jpg"
import e2 from "../assets/projects/biblio/e2.jpg"
import e3 from "../assets/projects/biblio/e3.jpg"
import rob1 from "../assets/projects/biblio/rob1.jpg"
import rob2 from "../assets/projects/biblio/rob2.jpg"
import rob3 from "../assets/projects/biblio/rob3.jpg"
import jut1 from "../assets/projects/biblio/jut1.jpg"
import jut2 from "../assets/projects/biblio/jut2.jpg"
import d1 from "../assets/projects/biblio/d1.jpg"
import d2 from "../assets/projects/biblio/d2.jpg"
import s1 from "../assets/projects/biblio/s1.jpg"
import p1 from "../assets/projects/biblio/p1.png"
import p2 from "../assets/projects/biblio/p2.png"
import v1 from "../assets/projects/biblio/v1.png"
import v2 from "../assets/projects/biblio/v2.png"
import v3 from "../assets/projects/biblio/v3.png"
import v4 from "../assets/projects/biblio/v4.png"
import c1 from "../assets/projects/biblio/c1.jpg"
import c2 from "../assets/projects/biblio/c2.jpg"
import c4 from "../assets/projects/biblio/c4.jpg"
import c5 from "../assets/projects/biblio/c5.jpg"
import c6 from "../assets/projects/biblio/c6.jpg"
import t1 from "../assets/projects/biblio/t1.jpg"

const M  = "#00E896"
const M2 = "#A8FFD6"
const BG = "#040810"

// ── HOOKS ─────────────────────────────────────────────────────
function useInView(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= bp)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= bp)
    window.addEventListener("resize", fn)
    return () => window.removeEventListener("resize", fn)
  }, [bp])
  return isMobile
}

// ── DONNÉES ───────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    tag: "Système distribué",
    title: "Mutualisation des bibliothèques universitaires",
    subtitle: "UGB & UAD — Emprunt inter-universités",
    description:
      "Conception et développement d'un système distribué permettant la mutualisation des bibliothèques universitaires de l'Université Gaston Berger (UGB) et de l'Université Alioune Diop (UAD). La solution améliore l'accès aux ressources documentaires en permettant l'emprunt inter-universités, tout en respectant les règles de gestion propres à chaque établissement. Le système a été conçu de bout en bout : fragmentation de la base de données MySQL, interface utilisateur unifiée en PHP, et validation sur une architecture physique à 3 machines.",
    technologies: ["PHP 7.4+", "MySQL", "HTML5", "CSS3", "Tailwind CSS", "JavaScript", "HTMX", "Système distribué"],
    images: [biblio1, biblio2],
    year: "2026", status: "Terminé", category: "academique",
  },
  {
    id: 2,
    tag: "Développement web",
    title: "Plateforme de recherche d'emploi pour les jeunes sénégalais",
    subtitle: "Plateforme web de recrutement — Master GDIL UGB",
    description:
      "Conception et implémentation d'une plateforme web responsive dédiée à la recherche d'emploi au Sénégal. La plateforme permet aux candidats de rechercher des offres selon plusieurs critères comme le type de contrat, le poste, la localisation et la rémunération. Elle permet également aux recruteurs de publier des offres, tandis que les candidats peuvent postuler directement en ligne et mettre leur CV à disposition. Ce projet a été réalisé dans le cadre du Master GDIL à l'Université Gaston Berger, avec une architecture multi-tiers.",
    technologies: ["Angular", "Spring Boot", "Bootstrap", "Java", "REST API", "Architecture multi-tiers"],
    images: [e1, e2, e3],
    year: "2026", status: "Terminé", category: "academique",
  },
  {
    id: 3,
    tag: "Agriculture intelligente",
    title: "AGROBOT — Robot agricole semi-automatique",
    subtitle: "Automatisation des outils agricoles",
    description:
      "Conception d'un robot agricole semi-automatique nommé AGROBOT visant à automatiser certaines tâches agricoles telles que le semis, le labour et le désherbage. Le système combine un robot embarqué capable d'opérer sur le terrain et une application mobile Android permettant un contrôle en temps réel via Bluetooth, manuellement ou par commande vocale. Cette solution vise à réduire la pénibilité du travail agricole et améliorer la productivité.",
    technologies: ["Arduino", "Android", "Bluetooth", "Système embarqué", "Robotique", "IoT", "Agriculture intelligente"],
    images: [rob1, rob2, rob3],
    year: "2026", status: "Terminé", category: "innovation",
  },
  {
    id: 4,
    tag: "Startup · Fintech",
    title: "JUUTIPAY — Traçabilité des recettes communales",
    subtitle: "Digitalisation des marchés sénégalais",
    description:
      "JUUTIPAY est une solution numérique permettant la gestion informatique et la traçabilité des recettes communales collectées dans les marchés. L'application facilite le suivi des paiements des commerçants, améliore la transparence dans la collecte des recettes et fournit aux collectivités locales un tableau de bord pour analyser les transactions et les performances des agents collecteurs.",
    technologies: ["Application mobile", "Digitalisation des marchés", "Gestion financière", "Tableau de bord", "Suivi des transactions"],
    images: [jut1, jut2],
    year: "2026", status: "En cours", category: "innovation",
    portrait: true, portraitCompact: true,
  },
  {
    id: 5,
    tag: "Intelligence artificielle",
    title: "Système intelligent de sélection de modèles via Meta-Learning",
    subtitle: "Projet académique — Détection d'occupation de salles par capteurs IoT",
    description:
      "Développement d'un système intelligent capable de sélectionner dynamiquement le meilleur modèle de classification pour détecter l'occupation d'une salle à partir de mesures environnementales issues de capteurs IoT. L'architecture repose sur quatre classifieurs de base (Decision Tree, Random Forest, SVM et Naive Bayes) et un méta-modèle KNN chargé de choisir le modèle optimal selon des métafeatures de confiance et de marge. Le projet a été intégré dans une application web Flask permettant la saisie interactive des variables et l'affichage détaillé des prédictions.",
    technologies: ["Python", "Flask", "Scikit-learn", "KNN", "SVM", "Random Forest", "Decision Tree", "Naive Bayes", "IoT", "Meta-Learning", "Data Mining"],
    images: [d1, d2],
    year: "2026", status: "Terminé", category: "academique",
    stackedImages: true,
  },
  {
    id: 6,
    tag: "NLP · Machine Learning",
    title: "Application de Classification de Tweets",
    subtitle: "Projet académique — Analyse de sentiments avec NLP",
    description:
      "Développement d'une application web permettant d'analyser automatiquement le sentiment d'un tweet ou d'un message publié sur les réseaux sociaux. Le système utilise des techniques de traitement du langage naturel (NLP) et de machine learning pour classer les messages en sentiments positifs ou négatifs et afficher un score de confiance.",
    technologies: ["Python", "Machine Learning", "NLP", "Scikit-learn", "Flask", "Sentiment Analysis"],
    images: [s1],
    year: "2026", status: "Terminé", category: "academique",
  },
  {
    id: 7,
    tag: "Data · Visualisation",
    title: "Sécurité Alimentaire et Nutritionnelle en Afrique de l'Ouest",
    subtitle: "Innovation Data — Entrepôt de données et visualisation",
    description:
      "Analyse des indicateurs de sécurité alimentaire en Afrique de l'Ouest à partir des données FAOSTAT. Le projet repose sur la construction d'un mini-entrepôt de données et le développement de tableaux de bord interactifs permettant d'explorer plusieurs indicateurs nutritionnels : prévalence de la sous-alimentation, adéquation énergétique et apport protéique. Les visualisations ont été réalisées avec Streamlit et Power BI afin de faciliter l'analyse comparative entre pays et l'interprétation des tendances nutritionnelles.",
    technologies: ["Python", "Streamlit", "Power BI", "Data Warehouse", "FAOSTAT", "Data Visualization", "Data Analysis"],
    images: [p1, p2],
    year: "2026", status: "Terminé", category: "innovation",
  },
  {
    id: 8,
    tag: "Développement web",
    title: "Plateforme de Vote Électronique Universitaire",
    subtitle: "Projet académique — Application de vote en ligne sécurisé",
    description:
      "Développement d'une plateforme web de vote électronique permettant l'élection des représentants étudiants. Les étudiants peuvent consulter les candidats, voter de manière sécurisée et suivre les résultats en temps réel. L'application remplace les processus traditionnels de vote par une solution numérique garantissant transparence et accessibilité.",
    technologies: ["Laravel", "Bootstrap", "jQuery", "AJAX", "Chart.js", "MySQL"],
    images: [v1, v2, v3, v4],
    year: "2026", status: "Terminé", category: "academique",
  },
  {
    id: 10,
    tag: "Entrepreneuriat",
    title: "Clés USB personnalisées pour universités sénégalaises",
    subtitle: "Projet entrepreneurial — Personnalisation UGB, USSEIN, UADB",
    description:
      "Conception et personnalisation de clés USB aux couleurs de plusieurs universités sénégalaises (UGB, USSEIN, UADB). Le projet vise à proposer des supports de stockage utiles aux étudiants tout en valorisant l'identité visuelle des institutions à travers un design personnalisé.",
    technologies: ["Entrepreneuriat", "Branding", "Design produit", "Personnalisation", "Commercialisation"],
    images: [c1, c2, c4, c5, c6],
    year: "2026", status: "En cours", category: "innovation",
  },
  {
    id: 11,
    tag: "NLP · Agriculture",
    title: "Détection d'alertes agricoles par Text Mining",
    subtitle: "Projet académique — NLP appliqué à l'agriculture",
    description:
      "Développement d'un système de détection automatique d'alertes agricoles à partir de textes courts tels que des SMS ou des publications en ligne. Le projet utilise des techniques de Text Mining et de Machine Learning avec vectorisation TF-IDF et plusieurs algorithmes de classification afin d'identifier des signaux précoces liés aux maladies des cultures, aux ravageurs ou aux événements climatiques.",
    technologies: ["Python", "Text Mining", "NLP", "TF-IDF", "Logistic Regression", "Naive Bayes", "SVM", "Random Forest", "Streamlit"],
    images: [t1],
    year: "2026", status: "Terminé", category: "academique",
  },
  // ← Ajoute tes prochains projets ici (category: "academique" | "innovation" | "personnel")
]

// ── MINI COMPOSANTS ───────────────────────────────────────────
function ZoomIcon({ show, size = 26 }) {
  return (
    <div style={{ position:"absolute",top:"8px",right:"8px",width:`${size}px`,height:`${size}px`,borderRadius:"50%",background:"rgba(0,232,150,.2)",border:"1px solid rgba(0,232,150,.45)",display:"flex",alignItems:"center",justifyContent:"center",color:M,fontSize:".65rem",opacity:show?1:0,transform:show?"scale(1)":"scale(.5)",transition:"all .3s cubic-bezier(.16,1,.3,1)",pointerEvents:"none" }}>⤢</div>
  )
}
function ImgBadge({ i, total, size = ".55rem" }) {
  return (
    <div style={{ position:"absolute",bottom:"7px",left:"9px",fontSize:size,fontWeight:900,color:"rgba(255,255,255,.3)",fontFamily:"'Rajdhani',sans-serif",letterSpacing:".1em" }}>{String(i).padStart(2,"0")}/{String(total).padStart(2,"0")}</div>
  )
}
function BarAnim({ show }) {
  return (
    <div style={{ position:"absolute",bottom:0,left:0,height:"2px",width:show?"100%":"0%",background:`linear-gradient(90deg,${M},transparent)`,transition:"width .4s cubic-bezier(.16,1,.3,1)",borderRadius:"0 0 12px 12px" }}/>
  )
}
function HintLabel({ pos }) {
  return (
    <div style={{ position:pos,bottom:"6px",right:"12px",fontSize:".5rem",color:"rgba(255,255,255,.14)",letterSpacing:".12em",textTransform:"uppercase",fontFamily:"'Rajdhani',sans-serif",fontWeight:700,marginTop:pos==="static"?"4px":0,pointerEvents:"none" }}>
      Cliquer pour agrandir
    </div>
  )
}

// ── LIGHTBOX ──────────────────────────────────────────────────
function ImgLightbox({ images, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx)
  const isMobile = useIsMobile()
  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const fn = e => {
      if (e.key === "Escape")     onClose()
      if (e.key === "ArrowLeft")  prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", fn)
    document.body.style.overflow = "hidden"
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = "" }
  }, [onClose, prev, next])

  const touchStart = useRef(null)
  const handleTouchStart = e => { touchStart.current = e.touches[0].clientX }
  const handleTouchEnd   = e => {
    if (touchStart.current === null) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
    touchStart.current = null
  }

  const ArrowBtn = ({ dir, onClick: fn }) => {
    const [hov, setHov] = useState(false)
    return (
      <button
        onClick={e => { e.stopPropagation(); fn() }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position:"absolute",
          [dir==="left"?"left":"right"]: isMobile ? ".5rem" : "1.8rem",
          top:"50%", transform:`translateY(-50%) ${hov?"scale(1.12)":"scale(1)"}`,
          width: isMobile?"38px":"52px", height: isMobile?"38px":"52px",
          borderRadius:"50%",
          background: hov?"rgba(0,232,150,.2)":"rgba(0,232,150,.08)",
          border:`1.5px solid ${hov?"rgba(0,232,150,.65)":"rgba(0,232,150,.22)"}`,
          color: hov?"#fff":M, fontSize: isMobile?"1rem":"1.2rem", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          transition:"all .22s cubic-bezier(.16,1,.3,1)",
          boxShadow: hov?`0 0 30px rgba(0,232,150,.4)`:"none",
          zIndex:2, backdropFilter:"blur(10px)",
        }}
      >{dir==="left"?"←":"→"}</button>
    )
  }

  return (
    <div
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ position:"fixed",inset:0,zIndex:9900,background:"rgba(1,3,10,.98)",backdropFilter:"blur(28px)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Rajdhani',sans-serif",animation:"lbFadeIn .28s ease" }}
    >
      <style>{`@keyframes lbFadeIn{from{opacity:0}to{opacity:1}} @keyframes lbIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}`}</style>
      {images.length > 1 && <ArrowBtn dir="left"  onClick={prev} />}
      <div onClick={e => e.stopPropagation()} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"1.2rem",padding:isMobile?"0 3.2rem":"0" }}>
        <div style={{ position:"relative",borderRadius:"16px",overflow:"hidden",boxShadow:"0 0 0 1px rgba(0,232,150,.2),0 0 80px rgba(0,0,0,.95)",animation:"lbIn .32s cubic-bezier(.16,1,.3,1)" }}>
          <img key={idx} src={images[idx]} alt={`capture ${idx+1}`} style={{ maxHeight:isMobile?"68vh":"75vh",maxWidth:isMobile?"88vw":"82vw",objectFit:"contain",display:"block",borderRadius:"16px" }}/>
          <div style={{ position:"absolute",inset:0,borderRadius:"16px",border:"1px solid rgba(0,232,150,.2)",pointerEvents:"none" }}/>
        </div>
        {images.length > 1 && (
          <div style={{ display:"flex",gap:".5rem" }}>
            {images.map((_, i) => (
              <div key={i} onClick={e => { e.stopPropagation(); setIdx(i) }} style={{ width:i===idx?"22px":"7px",height:"7px",borderRadius:"10px",background:i===idx?M:"rgba(255,255,255,.15)",boxShadow:i===idx?`0 0 8px ${M}`:"none",transition:"all .3s cubic-bezier(.16,1,.3,1)",cursor:"pointer" }}/>
            ))}
          </div>
        )}
        {isMobile && (
          <div style={{ fontSize:".56rem",color:"rgba(255,255,255,.22)",letterSpacing:".12em",textTransform:"uppercase",fontFamily:"'Rajdhani',sans-serif",fontWeight:700 }}>← Glisser pour naviguer →</div>
        )}
      </div>
      {images.length > 1 && <ArrowBtn dir="right" onClick={next} />}
      <button onClick={onClose} style={{ position:"absolute",top:"1rem",right:"1rem",width:"36px",height:"36px",borderRadius:"50%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.5)",fontSize:"1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s" }}
        onMouseEnter={e => { e.currentTarget.style.background="rgba(255,50,50,.22)"; e.currentTarget.style.color="#fff" }}
        onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.05)"; e.currentTarget.style.color="rgba(255,255,255,.5)" }}
      >✕</button>
      {!isMobile && (
        <div style={{ position:"absolute",bottom:"1.2rem",left:"50%",transform:"translateX(-50%)",fontSize:".6rem",color:"rgba(255,255,255,.18)",letterSpacing:".15em",textTransform:"uppercase",fontFamily:"'Rajdhani',sans-serif",fontWeight:700,display:"flex",gap:".8rem" }}>
          <span>← → naviguer</span><span style={{ color:"rgba(255,255,255,.08)" }}>|</span><span>ESC fermer</span>
        </div>
      )}
    </div>
  )
}

// ── CARTE PROJET ──────────────────────────────────────────────
function ProjectCard({ project, index, visible }) {
  const [lightbox, setLightbox] = useState(null)
  const [hovImg,   setHovImg]   = useState(null)
  const isMobile   = useIsMobile()
  const isEven     = index % 2 === 0
  const manyImages = project.images.length >= 3
  const isPortrait = project.portrait === true
  const isStacked  = project.stackedImages === true

  // Sur mobile tout devient stacked (texte haut / images bas)
  const forcedStack = isMobile || manyImages || isStacked

  const cardCols = forcedStack ? "1fr"
    : isPortrait ? (isEven ? "1fr 440px" : "440px 1fr")
    : (isEven ? "1fr 420px" : "420px 1fr")

  const textPad = isMobile
    ? "1.5rem 1.2rem 1.1rem"
    : forcedStack ? "2.8rem 3rem 1.5rem" : "2.8rem 3rem"

  const imgHeight = manyImages  ? (isMobile ? "210px" : "300px")
                  : isStacked   ? (isMobile ? "200px" : "280px")
                  : isMobile    ? "230px"
                  : "100%"

  // ── Rendu zone images ──
  const renderImages = () => {

    // Portrait desktop uniquement
    if (isPortrait && !isMobile) {
      return (
        <>
          {project.images.map((img, i) => (
            <div key={i} onClick={() => setLightbox(i)} onMouseEnter={() => setHovImg(i)} onMouseLeave={() => setHovImg(null)}
              style={{ flex:"1",maxWidth:"48%",height:"calc(100% - 16px)",alignSelf:i===0?"flex-end":"flex-start",marginTop:i===0?"16px":"0",borderRadius:"14px",overflow:"hidden",cursor:"pointer",position:"relative",border:hovImg===i?"1px solid rgba(0,232,150,.5)":"1px solid rgba(0,232,150,.15)",boxShadow:hovImg===i?`0 0 0 1px rgba(0,232,150,.2),0 8px 30px rgba(0,0,0,.7),0 0 20px rgba(0,232,150,.15)`:`0 4px 20px rgba(0,0,0,.6)`,transform:hovImg===i?"translateY(-6px) scale(1.02)":"translateY(0) scale(1)",transition:"all .35s cubic-bezier(.16,1,.3,1)",zIndex:hovImg===i?2:1 }}>
              <img src={img} alt={`capture ${i+1}`} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",display:"block",transform:hovImg===i?"scale(1.05)":"scale(1)",transition:"transform .5s cubic-bezier(.16,1,.3,1)",filter:hovImg===i?"brightness(1.08) saturate(1.1)":"brightness(.88)" }}/>
              <div style={{ position:"absolute",inset:0,background:hovImg===i?"rgba(0,232,150,.04)":"linear-gradient(to top,rgba(0,0,0,.4) 0%,transparent 40%)",transition:"background .3s",borderRadius:"14px" }}/>
              <ZoomIcon show={hovImg===i}/><ImgBadge i={i+1} total={project.images.length}/><BarAnim show={hovImg===i}/>
            </div>
          ))}
          <HintLabel pos="absolute"/>
        </>
      )
    }

    // 3+ images → scroll horizontal sur mobile, rangée sur desktop
    if (manyImages) {
      const totalItems = project.images.length + (project.video ? 1 : 0)
      return (
        <div style={{ display:"flex",gap:"10px",width:"100%",height:"100%",overflowX:isMobile?"auto":"hidden",scrollSnapType:isMobile?"x mandatory":"none",paddingBottom:isMobile?"4px":"0" }}>
          {project.images.map((img, i) => (
            <div key={i} onClick={() => setLightbox(i)} onMouseEnter={() => setHovImg(i)} onMouseLeave={() => setHovImg(null)}
              style={{ flex:isMobile?"0 0 82%":i===0?"1.6":"1",scrollSnapAlign:"start",borderRadius:"12px",overflow:"hidden",cursor:"pointer",position:"relative",border:hovImg===i?"1px solid rgba(0,232,150,.45)":"1px solid rgba(0,232,150,.12)",boxShadow:hovImg===i?`0 0 0 1px rgba(0,232,150,.2),0 8px 28px rgba(0,0,0,.5),0 0 18px rgba(0,232,150,.1)`:"0 4px 16px rgba(0,0,0,.4)",transform:hovImg===i?"scale(1.02) translateY(-3px)":"scale(1)",transition:"all .3s cubic-bezier(.16,1,.3,1)" }}>
              <img src={img} alt={`capture ${i+1}`} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",transform:hovImg===i?"scale(1.08)":"scale(1)",transition:"transform .5s cubic-bezier(.16,1,.3,1)",filter:hovImg===i?"brightness(1.1) saturate(1.15)":"brightness(.82)" }}/>
              <div style={{ position:"absolute",inset:0,background:hovImg===i?"rgba(0,232,150,.06)":"linear-gradient(to top,rgba(0,0,0,.4) 0%,transparent 50%)",transition:"background .3s",borderRadius:"12px" }}/>
              <ZoomIcon show={hovImg===i}/><ImgBadge i={i+1} total={totalItems}/><BarAnim show={hovImg===i}/>
            </div>
          ))}
          {project.video && (
            <div
              key="video"
              style={{ flex:isMobile?"0 0 82%":"1",scrollSnapAlign:"start",borderRadius:"12px",overflow:"hidden",position:"relative",border:`1px solid rgba(0,232,150,.22)`,boxShadow:"0 4px 16px rgba(0,0,0,.4)",flexShrink:0 }}
            >
              <video
                src={project.video}
                controls
                playsInline
                style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",borderRadius:"12px",background:"#000" }}
              />
              {/* Badge vidéo */}
              <div style={{ position:"absolute",top:"8px",left:"9px",fontSize:".58rem",fontWeight:900,color:M,fontFamily:"'Rajdhani',sans-serif",letterSpacing:".1em",background:"rgba(0,0,0,.55)",padding:"2px 7px",borderRadius:"6px",border:`1px solid rgba(0,232,150,.3)`,pointerEvents:"none" }}>▶ VIDÉO</div>
              <ImgBadge i={project.images.length + 1} total={totalItems}/>
            </div>
          )}
        </div>
      )
    }

    // 2 images côte à côte (stacked, portrait mobile, ou mobile 2 images)
    if (isStacked || isMobile) {
      return (
        <>
          {project.images.map((img, i) => (
            <div key={i} onClick={() => setLightbox(i)} onMouseEnter={() => setHovImg(i)} onMouseLeave={() => setHovImg(null)}
              style={{ flex:"1",borderRadius:"12px",overflow:"hidden",cursor:"pointer",position:"relative",border:hovImg===i?"1px solid rgba(0,232,150,.45)":"1px solid rgba(0,232,150,.12)",boxShadow:hovImg===i?`0 0 0 1px rgba(0,232,150,.2),0 8px 28px rgba(0,0,0,.5),0 0 18px rgba(0,232,150,.1)`:"0 4px 16px rgba(0,0,0,.4)",transform:hovImg===i?"scale(1.015) translateY(-3px)":"scale(1)",transition:"all .3s cubic-bezier(.16,1,.3,1)" }}>
              <img src={img} alt={`capture ${i+1}`} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",display:"block",transform:hovImg===i?"scale(1.06)":"scale(1)",transition:"transform .5s cubic-bezier(.16,1,.3,1)",filter:hovImg===i?"brightness(1.1) saturate(1.1)":"brightness(.85)" }}/>
              <div style={{ position:"absolute",inset:0,background:hovImg===i?"rgba(0,232,150,.05)":"linear-gradient(to top,rgba(0,0,0,.35) 0%,transparent 50%)",transition:"background .3s",borderRadius:"12px" }}/>
              <ZoomIcon show={hovImg===i}/><ImgBadge i={i+1} total={project.images.length}/><BarAnim show={hovImg===i}/>
            </div>
          ))}
          <HintLabel pos="absolute"/>
        </>
      )
    }

    // Desktop : 1 image seule → pleine zone
    if (project.images.length === 1) {
      return (
        <div onClick={() => setLightbox(0)} onMouseEnter={() => setHovImg(0)} onMouseLeave={() => setHovImg(null)}
          style={{ position:"absolute",inset:0,borderRadius:"0",overflow:"hidden",cursor:"pointer",border:"none",boxShadow:"none",transition:"all .3s cubic-bezier(.16,1,.3,1)" }}>
          <img src={project.images[0]} alt="capture 1" style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block",transform:hovImg===0?"scale(1.04)":"scale(1)",transition:"transform .5s cubic-bezier(.16,1,.3,1)",filter:hovImg===0?"brightness(1.08)":"brightness(.88)" }}/>
          <div style={{ position:"absolute",inset:0,background:hovImg===0?"rgba(0,232,150,.05)":"linear-gradient(to bottom,rgba(0,0,0,.15) 0%,transparent 40%)",transition:"background .3s" }}/>
          <ZoomIcon show={hovImg===0} size={28}/>
          <HintLabel pos="absolute"/>
        </div>
      )
    }

    // Desktop : hero + grille secondaire
    const hero = project.images[0]
    const rest = project.images.slice(1)
    return (
      <>
        <div onClick={() => setLightbox(0)} onMouseEnter={() => setHovImg(0)} onMouseLeave={() => setHovImg(null)}
          style={{ flex:rest.length>0?"1 1 55%":1,minHeight:0,borderRadius:"12px",overflow:"hidden",cursor:"pointer",position:"relative",border:hovImg===0?"1px solid rgba(0,232,150,.4)":"1px solid rgba(0,232,150,.12)",boxShadow:hovImg===0?`0 8px 30px rgba(0,0,0,.5),0 0 20px rgba(0,232,150,.15)`:"0 4px 16px rgba(0,0,0,.4)",transform:hovImg===0?"scale(1.015)":"scale(1)",transition:"all .3s cubic-bezier(.16,1,.3,1)" }}>
          <img src={hero} alt="capture 1" style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",transform:hovImg===0?"scale(1.06)":"scale(1)",transition:"transform .5s cubic-bezier(.16,1,.3,1)",filter:hovImg===0?"brightness(1.08)":"brightness(.85)" }}/>
          <div style={{ position:"absolute",inset:0,background:hovImg===0?"rgba(0,232,150,.05)":"transparent",transition:"background .3s",borderRadius:"12px" }}/>
          <ZoomIcon show={hovImg===0} size={28}/><ImgBadge i={1} total={project.images.length} size=".58rem"/>
        </div>
        {rest.length > 0 && (
          <div style={{ flex:"1 1 45%",minHeight:0,display:"grid",gridTemplateColumns:rest.length===1?"1fr":"repeat(2,1fr)",gap:"8px" }}>
            {rest.map((img, i) => {
              const ri = i + 1
              return (
                <div key={ri} onClick={() => setLightbox(ri)} onMouseEnter={() => setHovImg(ri)} onMouseLeave={() => setHovImg(null)}
                  style={{ borderRadius:"12px",overflow:"hidden",cursor:"pointer",position:"relative",minHeight:0,border:hovImg===ri?"1px solid rgba(0,232,150,.4)":"1px solid rgba(0,232,150,.1)",boxShadow:hovImg===ri?`0 8px 30px rgba(0,0,0,.5),0 0 16px rgba(0,232,150,.12)`:"0 4px 16px rgba(0,0,0,.4)",transform:hovImg===ri?"scale(1.025)":"scale(1)",transition:"all .3s cubic-bezier(.16,1,.3,1)" }}>
                  <img src={img} alt={`capture ${ri+1}`} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",transform:hovImg===ri?"scale(1.08)":"scale(1)",transition:"transform .5s cubic-bezier(.16,1,.3,1)",filter:hovImg===ri?"brightness(1.08)":"brightness(.82)" }}/>
                  <div style={{ position:"absolute",inset:0,background:hovImg===ri?"rgba(0,232,150,.05)":"transparent",transition:"background .3s",borderRadius:"12px" }}/>
                  <ZoomIcon show={hovImg===ri}/><ImgBadge i={ri+1} total={project.images.length}/>
                </div>
              )
            })}
          </div>
        )}
        <HintLabel pos="static"/>
      </>
    )
  }

  return (
    <>
      <div style={{ opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(36px)",transition:`opacity .7s ease ${index*.15}s,transform .7s cubic-bezier(.16,1,.3,1) ${index*.15}s` }}>
        <div
          style={{
            position:"relative",
            background:"linear-gradient(135deg,rgba(0,232,150,.03) 0%,rgba(4,8,16,.95) 40%)",
            border:"1px solid rgba(0,232,150,.18)",
            borderRadius: isMobile?"18px":"24px",
            overflow:"hidden",
            display:"grid",
            gridTemplateColumns: cardCols,
            gridTemplateRows: forcedStack ? "auto auto" : "1fr",
            minHeight: isMobile ? "auto" : "420px",
            transition:"border-color .35s,box-shadow .35s",
            boxShadow:"0 0 0 1px rgba(0,232,150,.06),0 8px 40px rgba(0,0,0,.5)",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(0,232,150,.55)"; e.currentTarget.style.boxShadow=`0 0 0 1px rgba(0,232,150,.2),0 0 60px rgba(0,232,150,.12),0 24px 70px rgba(0,0,0,.6),inset 0 1px 0 rgba(0,232,150,.15)` }}
          onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(0,232,150,.18)"; e.currentTarget.style.boxShadow="0 0 0 1px rgba(0,232,150,.06),0 8px 40px rgba(0,0,0,.5)" }}
        >
          {/* Déco */}
          <div style={{ position:"absolute",top:0,left:0,width:"120px",height:"120px",background:"linear-gradient(135deg,rgba(0,232,150,.12) 0%,transparent 60%)",borderRadius:"24px 0 0 0",pointerEvents:"none" }}/>
          <div style={{ position:"absolute",bottom:0,right:0,width:"100px",height:"100px",background:"linear-gradient(315deg,rgba(0,232,150,.08) 0%,transparent 60%)",borderRadius:"0 0 24px 0",pointerEvents:"none" }}/>
          <div style={{ position:"absolute",top:0,left:"10%",right:"10%",height:"1px",background:`linear-gradient(90deg,transparent,${M},transparent)`,opacity:.6,pointerEvents:"none" }}/>
          <div style={{ position:"absolute",bottom:0,left:"20%",right:"20%",height:"1px",background:`linear-gradient(90deg,transparent,rgba(0,232,150,.4),transparent)`,pointerEvents:"none" }}/>
          {!isMobile && <div style={{ position:"absolute",top:"50%",[isEven?"right":"left"]:"24px",transform:"translateY(-50%)",fontSize:"8rem",fontWeight:900,color:"rgba(0,232,150,.03)",fontFamily:"'Rajdhani',sans-serif",lineHeight:1,pointerEvents:"none",userSelect:"none" }}>0{project.id}</div>}
          <div style={{ position:"absolute",inset:0,background:forcedStack?`radial-gradient(ellipse 60% 40% at 50% 30%,rgba(0,232,150,.06) 0%,transparent 65%)`:`radial-gradient(ellipse 55% 60% at ${isEven?"75%":"25%"} 50%,rgba(0,232,150,.06) 0%,transparent 65%)`,pointerEvents:"none" }}/>

          {/* ── TEXTE ── */}
          <div style={{ padding:textPad,display:"flex",flexDirection:"column",gap:isMobile?".85rem":"1.2rem",order:forcedStack?0:(isEven?0:1),position:"relative",zIndex:1 }}>

            {/* Badges */}
            <div style={{ display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap" }}>
              <div style={{ display:"inline-flex",alignItems:"center",gap:"6px",fontSize:isMobile?".58rem":".62rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:M,background:"rgba(0,232,150,.08)",border:"1px solid rgba(0,232,150,.18)",borderRadius:"100px",padding:".26rem .8rem" }}>
                <div style={{ width:"5px",height:"5px",borderRadius:"50%",background:M,boxShadow:`0 0 6px ${M}` }}/>
                {project.tag}
              </div>
              <div style={{ fontSize:".62rem",fontWeight:700,color:"rgba(255,255,255,.22)",letterSpacing:".1em" }}>{project.year}</div>
              <div style={{ fontSize:".6rem",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:project.status==="Terminé"?"#4ade80":M,background:project.status==="Terminé"?"rgba(74,222,128,.08)":"rgba(0,232,150,.08)",border:`1px solid ${project.status==="Terminé"?"rgba(74,222,128,.2)":"rgba(0,232,150,.2)"}`,borderRadius:"100px",padding:".22rem .7rem" }}>
                ● {project.status}
              </div>
            </div>

            {/* Titre */}
            <div>
              <div style={{ fontSize:".65rem",fontWeight:700,color:"rgba(255,255,255,.2)",letterSpacing:".15em",marginBottom:".4rem" }}>PROJET 0{project.id}</div>
              <h3 style={{ fontSize:isMobile?"clamp(1rem,4.5vw,1.25rem)":"clamp(1.15rem,2vw,1.5rem)",fontWeight:900,color:"#fff",lineHeight:1.25,margin:0,letterSpacing:".01em" }}>{project.title}</h3>
              <div style={{ fontSize:isMobile?".76rem":".82rem",color:M2,fontWeight:700,marginTop:".4rem",opacity:.75 }}>{project.subtitle}</div>
            </div>

            {/* Séparateur */}
            <div style={{ position:"relative",height:"1px" }}>
              <div style={{ height:"1px",background:`linear-gradient(90deg,${M},rgba(0,232,150,.3),transparent)` }}/>
              <div style={{ position:"absolute",left:0,top:"-2px",width:"6px",height:"6px",borderRadius:"50%",background:M,boxShadow:`0 0 10px ${M},0 0 20px rgba(0,232,150,.4)` }}/>
            </div>

            {/* Description */}
            <p style={{ fontSize:isMobile?".8rem":".85rem",color:"rgba(255,255,255,.42)",lineHeight:1.85,margin:0,flex:1 }}>{project.description}</p>

            {/* Technologies */}
            <div style={{ display:"flex",flexWrap:"wrap",gap:".4rem" }}>
              {project.technologies.map((tech, i) => (
                <span key={i} style={{ fontSize:isMobile?".58rem":".65rem",fontWeight:700,letterSpacing:".08em",color:"rgba(255,255,255,.5)",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"8px",padding:".26rem .65rem",transition:"all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color=M; e.currentTarget.style.borderColor="rgba(0,232,150,.25)"; e.currentTarget.style.background="rgba(0,232,150,.07)" }}
                  onMouseLeave={e => { e.currentTarget.style.color="rgba(255,255,255,.5)"; e.currentTarget.style.borderColor="rgba(255,255,255,.08)"; e.currentTarget.style.background="rgba(255,255,255,.04)" }}
                >{tech}</span>
              ))}
            </div>
          </div>

          {/* ── IMAGES ── */}
          <div style={{
            order: forcedStack?1:(isEven?1:0),
            position:"relative",
            background: isPortrait?"rgba(0,0,0,.35)":"rgba(0,0,0,.22)",
            borderLeft:  !forcedStack&&isEven  ? "1px solid rgba(0,232,150,.2)" : "none",
            borderRight: !forcedStack&&!isEven ? "1px solid rgba(0,232,150,.2)" : "none",
            borderTop:   forcedStack ? "1px solid rgba(0,232,150,.15)" : "none",
            boxShadow:   forcedStack ? "inset 0 4px 20px rgba(0,0,0,.3)" : (isEven?"inset 3px 0 20px rgba(0,232,150,.03)":"inset -3px 0 20px rgba(0,232,150,.03)"),
            display:"flex", flexDirection:"row", alignItems:"stretch", justifyContent:"stretch",
            gap:"10px",
            padding: forcedStack ? (isMobile?"12px 12px 14px":"16px 24px 20px") : "16px",
            overflow:"hidden",
            height: imgHeight,
            minHeight: forcedStack ? "auto" : "420px",
          }}>
            <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,232,150,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,232,150,.02) 1px,transparent 1px)",backgroundSize:"30px 30px",pointerEvents:"none" }}/>
            {isPortrait && !isMobile && <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 50% 80%,rgba(0,232,150,.07) 0%,transparent 70%)",pointerEvents:"none" }}/>}
            {renderImages()}
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <ImgLightbox images={project.images} startIdx={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}

// ── SECTION PRINCIPALE ────────────────────────────────────────
function Projects() {
  const ref      = useRef(null)
  const visible  = useInView(ref)
  const isMobile = useIsMobile()
  const [activeFilter, setActiveFilter] = useState("tous")
  const [animKey,      setAnimKey]      = useState(0)

  const filters = [
    { id:"tous",       label:"Tous",       emoji:"⚡", count:projects.length },
    { id:"academique", label:"Académique", emoji:"🎓", count:projects.filter(p=>p.category==="academique").length },
    { id:"innovation", label:"Innovation & Entrepreneuriat", emoji:"🚀", count:projects.filter(p=>p.category==="innovation").length },
  ]
  const filtered = activeFilter==="tous" ? projects : projects.filter(p=>p.category===activeFilter)
  const handleFilter = id => { if(id===activeFilter) return; setActiveFilter(id); setAnimKey(k=>k+1) }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;900&display=swap');
        @keyframes shimmer    { 0%{background-position:-200% center}100%{background-position:200% center} }
        @keyframes pulse      { 0%,100%{box-shadow:0 0 0 0 rgba(0,232,150,.5)}50%{box-shadow:0 0 0 8px rgba(0,232,150,0)} }
        @keyframes projFadeIn { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }

        .projects { position:relative;padding:7rem 4rem;font-family:'Rajdhani',sans-serif;background:${BG};overflow:hidden; }
        .projects::before { content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(0,232,150,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(0,232,150,.015) 1px,transparent 1px);background-size:65px 65px;pointer-events:none;mask-image:radial-gradient(ellipse 90% 80% at 50% 50%,black 20%,transparent 100%); }
        .projects-inner { position:relative;z-index:1;max-width:1200px;margin:0 auto; }

        .proj-header { text-align:center;margin-bottom:3rem;opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s cubic-bezier(.16,1,.3,1); }
        .proj-header.vis { opacity:1;transform:translateY(0); }
        .proj-eyebrow { display:inline-flex;align-items:center;gap:8px;font-size:.7rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:${M};background:rgba(0,232,150,.07);border:1px solid rgba(0,232,150,.18);border-radius:100px;padding:.32rem 1rem;margin-bottom:1.2rem; }
        .proj-eyebrow-dot { width:6px;height:6px;border-radius:50%;background:${M};box-shadow:0 0 8px ${M};animation:pulse 2s infinite; }
        .proj-title { font-size:clamp(2rem,4vw,3.2rem);font-weight:900;line-height:1;background:linear-gradient(90deg,white 0%,${M} 40%,${M2} 65%,white 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 5s linear infinite;margin-bottom:.7rem; }
        .proj-subtitle { font-size:.95rem;color:rgba(255,255,255,.3);letter-spacing:.04em;max-width:580px;margin:0 auto;line-height:1.75; }

        .proj-filters { display:flex;justify-content:center;gap:.7rem;flex-wrap:wrap;margin-bottom:3.5rem;opacity:0;transform:translateY(14px);transition:opacity .7s ease .2s,transform .7s cubic-bezier(.16,1,.3,1) .2s; }
        .proj-filters.vis { opacity:1;transform:translateY(0); }
        .proj-filter-btn { display:inline-flex;align-items:center;gap:7px;padding:.45rem 1.2rem;border-radius:100px;cursor:pointer;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;transition:all .28s cubic-bezier(.16,1,.3,1);border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:rgba(255,255,255,.4); }
        .proj-filter-btn:hover { border-color:rgba(0,232,150,.3);color:rgba(255,255,255,.75);background:rgba(0,232,150,.06); }
        .proj-filter-btn.active { background:rgba(0,232,150,.14);border-color:rgba(0,232,150,.5);color:#fff;box-shadow:0 0 20px rgba(0,232,150,.15),inset 0 1px 0 rgba(0,232,150,.2); }
        .proj-filter-count { display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;font-size:.58rem;font-weight:900;background:rgba(0,232,150,.15);color:${M};transition:all .28s; }
        .proj-filter-btn.active .proj-filter-count { background:${M};color:#040810; }

        .proj-cat-sep { display:flex;align-items:center;gap:12px;margin-bottom:1.8rem;opacity:0;animation:projFadeIn .5s ease forwards; }
        .proj-cat-sep-line { flex:1;height:1px;background:linear-gradient(90deg,rgba(0,232,150,.2),transparent); }
        .proj-cat-sep-line.right { background:linear-gradient(270deg,rgba(0,232,150,.2),transparent); }
        .proj-cat-sep-label { display:inline-flex;align-items:center;gap:6px;font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:${M};white-space:nowrap; }

        .proj-list { display:flex;flex-direction:column;gap:2rem; }
        .proj-list-animated { animation:projFadeIn .45s ease; }

        @media (max-width:768px) {
          .projects { padding:4rem 1rem; }
          .proj-header { margin-bottom:1.8rem; }
          .proj-title { font-size:clamp(1.7rem,7vw,2.4rem); }
          .proj-subtitle { font-size:.83rem; }
          .proj-filters { gap:.45rem; margin-bottom:1.8rem; }
          .proj-filter-btn { font-size:.63rem; padding:.35rem .75rem; gap:5px; }
          .proj-list { gap:1.2rem; }
        }
        @media (max-width:480px) {
          .projects { padding:3rem .7rem; }
          .proj-filter-btn { font-size:.58rem; padding:.3rem .6rem; }
          .proj-list { gap:1rem; }
        }
      `}</style>

      <section className="projects" id="projects" ref={ref}>
        <div className="projects-inner">

          <div className={`proj-header${visible?" vis":""}`}>
            <div className="proj-eyebrow"><div className="proj-eyebrow-dot"/>Réalisations</div>
            <h2 className="proj-title">Projets</h2>
            <p className="proj-subtitle">
              Une sélection de projets académiques, innovations et réalisations personnelles
              illustrant mes compétences en développement, IoT, data et entrepreneuriat.
            </p>
          </div>

          <div className={`proj-filters${visible?" vis":""}`}>
            {filters.map(f => (
              <button key={f.id} className={`proj-filter-btn${activeFilter===f.id?" active":""}`} onClick={() => handleFilter(f.id)}>
                <span>{f.emoji}</span>
                <span>{f.label}</span>
                <span className="proj-filter-count">{f.count}</span>
              </button>
            ))}
          </div>

          {activeFilter !== "tous" && (
            <div className="proj-cat-sep" key={activeFilter}>
              <div className="proj-cat-sep-line"/>
              <div className="proj-cat-sep-label">
                {filters.find(f=>f.id===activeFilter)?.emoji}&nbsp;
                {filters.find(f=>f.id===activeFilter)?.label}
                &nbsp;·&nbsp;{filtered.length} projet{filtered.length>1?"s":""}
              </div>
              <div className="proj-cat-sep-line right"/>
            </div>
          )}

          <div key={animKey} className="proj-list proj-list-animated">
            {filtered.length===0 ? (
              <div style={{ textAlign:"center",padding:"4rem 0",color:"rgba(255,255,255,.2)",fontSize:".9rem",fontStyle:"italic" }}>
                Aucun projet dans cette catégorie pour l'instant.
              </div>
            ) : (
              filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} visible={visible} />
              ))
            )}
          </div>

        </div>
      </section>
    </>
  )
}

export default Projects