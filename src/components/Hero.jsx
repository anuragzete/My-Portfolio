import React, { useState, useEffect } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Hero() {
    const { theme } = useTheme();
    const fullText = "Anurag Zete";
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [showEmoji, setShowEmoji] = useState(false);

    useEffect(() => {
        if (index < fullText.length) {
            const typingInterval = setTimeout(() => {
                setText((prev) => prev + fullText[index]);
                setIndex(index + 1);
            }, 250);

            return () => clearTimeout(typingInterval);
        } else {
            setTimeout(() => setShowCursor(false), 500);
            setTimeout(() => setShowEmoji(true), 700);
            setTimeout(() => {
                setText("");
                setIndex(0);
                setShowCursor(true);
                setShowEmoji(false);
            }, 10000);
        }
    }, [index]);

    const copyEmailToClipboard = () => {
        navigator.clipboard.writeText('anuragzete27@outlook.com').then(() => {
            alert('Email copied to clipboard!');
        }).catch(err => console.error('Failed to copy:', err));
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-16">
            <div className="text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold">
                        Hi, I'm{" "}
                        <span className="text-blue-600 dark:text-blue-400">
                            {text}
                            {showCursor && <span className="animate-blink">|</span>}
                        </span>{" "}
                        {showEmoji && <span className="inline-block animate-waving-hand">👋</span>}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                        Java Full Stack Developer
                    </p>
                </div>

                <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                    I specialize in backend development, creating robust and scalable solutions that power
                    beautiful and functional websites. Let's work together to bring your ideas to life!
                </p>

                {/* Social Links - Visible only on mobile (md:hidden) */}
                <div className="flex justify-center space-x-4 sm:flex md:flex lg:hidden">
                    <a
                        href="https://github.com/anuragzete/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full ${
                            theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                        } transition-colors`}
                        title="GitHub"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                    <a
                        href="https://linkedin.com/in/anurag-zete-java-developer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full ${
                            theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                        } transition-colors`}
                        title="LinkedIn"
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <button
                        onClick={copyEmailToClipboard}
                        className={`p-2 rounded-full ${
                            theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                        } transition-colors`}
                        title="Copy Email"
                    >
                        <Mail className="w-6 h-6" />
                    </button>
                </div>

                <a href="#about" className="inline-block animate-bounce">
                    <ArrowDown className="w-6 h-6" />
                </a>
            </div>
        </section>
    );
}
