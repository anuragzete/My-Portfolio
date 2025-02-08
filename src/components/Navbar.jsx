import React, {useState, useEffect, useRef} from 'react';
import {useTheme} from '../context/ThemeContext';
import {Sun, Moon, Home, User, Code, Mail, Briefcase, BookOpen, Clock, Award, FileText} from 'lucide-react';

const NEON_COLORS = [
    'from-pink-500 to-purple-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500'
];

export default function Navbar({setActiveSection}) {
    const {theme, toggleTheme} = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [neonIndex, setNeonIndex] = useState(0);
    const hoverTimeout = useRef(null);

    const visibleNavItems = [
        {name: 'Home', icon: Home, href: '#home'},
        {name: 'Blog', icon: BookOpen, href: '#blog'},
        {name: 'Contact', icon: Mail, href: '#contact'},
    ];

    const hiddenNavItems = [
        {name: 'About', icon: User, href: "about"},
        {name: 'Skills', icon: Code, section: "skills"},
        {name: 'Work', icon: Clock, section: "work"},
        {name: 'Projects', icon: Briefcase, section: "projects"},
        {name: 'Certificates', icon: Award, href: 'https://github.com/anuragzete/Certificates'},
        {name: 'Resume', icon: FileText}
    ];

    useEffect(() => {
        if (theme === 'dark') {
            const interval = setInterval(() => {
                setNeonIndex((prev) => (prev + 1) % NEON_COLORS.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [theme]);

    const handleMouseEnter = () => {
        clearTimeout(hoverTimeout.current); // Clear any existing timeout
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setIsHovered(false);
        }, 500); // 1-second delay before hiding
    };

    const handleResumeDownload = () => {
        const resumePath = '../resources/AnuragZete-70.pdf';
        const link = document.createElement('a');
        link.href = resumePath;
        link.download = 'Anurag_Zete_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert("Resume Downloaded");
    };

    return (
        <nav
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl 
                ${theme === 'dark'
                ? 'bg-gray-900/80 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                : 'bg-white/80 shadow-lg'}
                backdrop-blur-md rounded-2xl transition-all duration-300`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="px-4 py-3 flex items-center justify-between">
                <a
                    href="#"
                    className={`text-2xl font-bold transition-all duration-300
                        ${theme === 'dark' ? `bg-gradient-to-r ${NEON_COLORS[neonIndex]} bg-clip-text text-transparent` : 'text-gray-900'}`}
                >
                    Portfolio
                </a>

                {/* Visible Navigation Items */}
                <div className="flex items-center space-x-4">
                    {visibleNavItems.map((item) => (
                        <button
                            key={item.name}
                            href={item.href}
                            onClick={item.name === "Contact" ? () => setActiveSection("contact") : undefined}
                            className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-300
                                ${theme === 'dark'
                                ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} hover:text-white`
                                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
                        >
                            <item.icon className="w-4 h-4"/>
                            <span>{item.name}</span>
                        </button>

                    ))}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-all duration-300 
                            ${theme === 'dark'
                            ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} text-yellow-400`
                            : 'hover:bg-gray-100 text-gray-600'}`}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
                    </button>
                </div>
            </div>

            {/* Hidden Navigation Items */}
            <div
                className={`absolute left-0 mt-2 w-full rounded-xl p-4 backdrop-blur-md transition-all duration-500
                    ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                    ${theme === 'dark'
                    ? 'bg-gray-900/80 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'bg-white/80 shadow-lg'}`}
            >
                <div className="grid grid-cols-2 gap-4">
                    {hiddenNavItems.map((item) => (
                        item.name === 'Resume' ? (
                            <button
                                key={item.name}
                                onClick={handleResumeDownload}
                                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300
                ${theme === 'dark'
                                    ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} hover:text-white`
                                    : 'hover:bg-gray-100 text-gray-600'}`}
                            >
                                <item.icon className="w-5 h-5"/>
                                <span>{item.name}</span>
                            </button>
                        ) : item.name === 'Certificates' ? (
                            <a
                                key={item.name}
                                onClick={() => window.open(item.href, '_blank')}
                                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300
                ${theme === 'dark'
                                    ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} hover:text-white`
                                    : 'hover:bg-gray-100 text-gray-600'}`}
                            >
                                <item.icon className="w-5 h-5"/>
                                <span>{item.name}</span>
                            </a>
                        ) : (
                            <button
                                key={item.name}
                                onClick={() => item.section && setActiveSection(item.section)}
                                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300
                ${theme === 'dark'
                                    ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} hover:text-white`
                                    : 'hover:bg-gray-100 text-gray-600'}`}
                            >
                                <item.icon className="w-5 h-5"/>
                                <span>{item.name}</span>
                            </button>
                        )
                    ))}

                </div>
            </div>
        </nav>
    );
}
