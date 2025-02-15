import React, {useState, useEffect, useRef} from 'react';
import {useTheme} from './context/ThemeContext';
import {Routes, Route} from 'react-router-dom'; // Import Routes and Route
import LoadingScreen from './components/LoadingScreen';
import SocialLinks from './components/SocialLinks';
import Navbar from './components/Navbar';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import Contact from './components/Contact.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Blog from './components/Blog.jsx';
import Work from './components/Work.jsx';
import Home from "./components/Home.jsx";

export default function App() {
    const {theme} = useTheme();
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('default');
    const aboutRef = useRef(null);

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => setLoading(false), 500);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    useEffect(() => {
        document.title = activeSection === 'default'
            ? 'Anurag Zete | Home'
            : `Anurag Zete | ${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} `;
    }, [activeSection]);

    useEffect(() => {
        if (activeSection === 'about' && aboutRef.current) {
            setActiveSection('default');
            setTimeout(() => {
                aboutRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
            }, 100);
        }
    }, [activeSection]);

    return (
        <>
            {loading ? (
                <LoadingScreen/>
            ) : (
                <div className={`relative`}>
                    <div className={`min-h-screen flex flex-col transition-all duration-700 ${
                        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
                    }`}>
                        <Navbar setActiveSection={setActiveSection}/>
                        <SocialLinks/>
                        <main className="container flex-grow mx-auto px-4 pt-24">
                            <Routes> {/* Use Routes to define your routes */}
                                <Route path="/" element={
                                    <Home/>
                                }/>
                                <Route path="/work" element={<Work/>}/>
                                <Route path="/projects" element={<Projects/>}/>
                                <Route path="/skills" element={<Skills/>}/>
                                <Route path="/contact" element={<Contact/>}/>
                                <Route path="/about" element={<About/>}/>
                                <Route path="/blog" element={<Blog/>}/>
                            </Routes>
                        </main>
                        <Footer/>
                    </div>
                </div>
            )}
        </>
    );
}