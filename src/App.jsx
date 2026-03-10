import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Formation from "./components/Formation"
import Qualites from "./components/Qualites"
import Engagement from "./components/Engagement"
import Galerie from "./components/Galerie"
import Contact from "./components/Contact"
import Projects from "./components/Projects"
function App() {
  return (
    <>
      <Navbar />
      <Hero />

      <Formation />
      <Projects />

      <Qualites />
      <Engagement />
      <Galerie />
      <Contact />

    </>
  )
}

export default App