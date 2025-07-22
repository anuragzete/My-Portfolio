import React, { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext.jsx';
import { Routes, Route } from 'react-router-dom';
import { logEvent, getClientContext } from "./utils/logger";
import useVisitorSession from "./shared/hooks/useVisitorSession.js";
import Navbar from './shared/components/Navbar.jsx';
import About from './features/profile/About.jsx';
import Footer from './shared/components/Footer.jsx';
import Contact from './features/contact/Contact.jsx';
import Projects from './features/project/Projects.jsx';
import Skills from './features/profile/Skills.jsx';
import Blogs from './features/blog/BlogsList.jsx';
import Work from './features/work/Work.jsx';
import Home from './features/home/Home.jsx';
import BackgroundColors from "./shared/components/BackgroundColors.jsx";
import useSupabaseSessionToken from "./shared/hooks/useSupabaseSessionToken.js";

export default function App() {
    const { theme } = useTheme();
    const [activeSection, setActiveSection] = useState('home');
    const sessionId = useVisitorSession();
    const supabaseToken = useSupabaseSessionToken();
    console.log(sessionId+" "+supabaseToken);

    useEffect(() => {
        if (!sessionId || !supabaseToken) return;
        console.log(sessionId+" "+supabaseToken);

        logEvent({
            type: "visit",
            message: "Homepage visited",
            context: getClientContext(),
            sessionId,
        });
    }, [sessionId, supabaseToken]);

    useEffect(() => {
        const sessionId = sessionStorage.getItem("visitor_session_id");

        const handleError = (event) => {
            logEvent({
                type: "visit",
                message: "Homepage visited",
                context: getClientContext(),
                sessionId,
            });
        };

        window.addEventListener("error", handleError);
        return () => window.removeEventListener("error", handleError);
    }, []);

    useEffect(() => {
        document.title = activeSection === "home"
            ? "Anurag Zete | Home"
            : `Anurag Zete | ${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} `;
    }, [activeSection]);

    return (
        <>
                <div
                    className={`relative overflow-hidden ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
                >
                    <BackgroundColors/>
                    <div className="relative min-h-screen flex flex-col transition-all duration-700">
                        <Navbar setActiveSection={setActiveSection} />
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
        </>
    );
}

