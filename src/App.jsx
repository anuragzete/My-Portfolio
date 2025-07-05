import React, { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext.jsx';
import { Routes, Route } from 'react-router-dom';
import LoadingScreen from './shared/components/LoadingScreen.jsx';
import Navbar from './shared/components/Navbar.jsx';
import About from './features/home/About.jsx';
import Footer from './shared/components/Footer.jsx';
import Contact from './features/contact/Contact.jsx';
import Projects from './features/project/Projects.jsx';
import Skills from './shared/components/Skills.jsx';
import Blogs from './features/blog/Blogs.jsx';
import Work from './features/work/Work.jsx';
import Home from './features/home/Home.jsx';
import SocialLinks from "./shared/components/SocialLinks.jsx";
import BackgroundColors from "./shared/components/BackgroundColors.jsx";

export default function App() {
    const { theme } = useTheme();
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    useEffect(() => {
        document.title = activeSection === "home"
            ? "Anurag Zete | Home"
            : `Anurag Zete | ${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} `;
    }, [activeSection]);

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <div
                    className={`relative overflow-hidden ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
                >
                    <BackgroundColors/>
                    <div className="relative min-h-screen flex flex-col transition-all duration-700">
                        <Navbar setActiveSection={setActiveSection} />
                        <SocialLinks />
                        <main className="container flex-grow mx-auto px-4 pt-20">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/work" element={<Work />} />
                                <Route path="/projects" element={<Projects />} />
                                <Route path="/skills" element={<Skills />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/blog" element={<Blogs />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
}
