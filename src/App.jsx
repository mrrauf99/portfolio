import { motion } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import FeaturedProjects from './components/sections/FeaturedProjects';
import AdditionalProjects from './components/sections/AdditionalProjects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a14] text-white overflow-x-hidden">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <AdditionalProjects />
        <Experience />
        <Contact />
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
