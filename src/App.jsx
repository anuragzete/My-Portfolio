import React, {useState, useEffect, useRef} from 'react';
import {useTheme} from './context/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import SocialLinks from './components/SocialLinks';
import Navbar from './components/Navbar';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Blog from './components/Blog';
import Footer from "./components/Footer.jsx";
import Contact from "./components/Contact.jsx";
import Work from "./components/Work.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";

export default function App() {
    const {theme} = useTheme();
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('default');
    const aboutRef = useRef(null);

    useEffect(() => {
        // Wait for the entire page to load (including images & scripts)
        const handleLoad = () => {
            setTimeout(() => setLoading(false), 500); // Small delay for smooth transition
        };

        if (document.readyState === 'complete') {
            handleLoad(); // If already loaded, run immediately
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    useEffect(() => {
        if (activeSection === 'about' && aboutRef.current) {
            setActiveSection('default'); // Ensure Home loads
            setTimeout(() => {
                aboutRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
            }, 100); // Delay to ensure home page is loaded
        }
    }, [activeSection]);

    return (
        <>
            {loading ? (
                <LoadingScreen/>
            ) : (
                <div className={`min-h-screen flex flex-col transition-all duration-700 ${
                    theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
                }`}>
                    <Navbar setActiveSection={setActiveSection}/>
                    <SocialLinks/>
                    <main className="container flex-grow mx-auto px-4 pt-24">
                        {activeSection === 'default' ? (
                            <>
                                <Hero/>
                                <Hero/>
                                <div ref={aboutRef}>
                                    <About/>
                                </div>
                                <Blog/>
                            </>
                        ) : activeSection === 'work' ? (
                            <Work/>
                        ) : activeSection === 'projects' ? (
                            <Projects/>
                        ) : activeSection === 'skills' ? (
                            <Skills/>
                        ) : activeSection === 'contact' ? (
                            <Contact/>
                        ) : activeSection === 'about' ? (
                            <About/>
                        ) : null}
                    </main>
                    <Footer/>
                </div>
            )}
        </>
    );
}

