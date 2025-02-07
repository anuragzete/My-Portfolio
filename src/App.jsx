import React, { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import SocialLinks from './components/SocialLinks';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About.jsx';
import Work from './components/Work';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Skills from './components/Skills.jsx';
import Blog from './components/Blog';

function App() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className={`min-h-screen transition-all duration-700 ${
          theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
        }`}>
          <Navbar />
          <SocialLinks />
          <main className="container mx-auto px-4 pt-24">
            <Hero />
            <About />
            <Skills />
            <Work />
            <Projects />
            <Blog />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}

export default App;