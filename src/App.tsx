import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n/i18n';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="relative min-h-screen w-full max-w-[100vw] bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 font-sans overflow-x-hidden">
      <Navbar />
      <main className="w-full overflow-hidden">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;