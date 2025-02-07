import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Home, User, Code, Mail, Briefcase, BookOpen, Clock } from 'lucide-react';

const NEON_COLORS = [
  'from-pink-500 to-purple-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-yellow-500 to-orange-500'
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [neonIndex, setNeonIndex] = useState(0);

  const navItems = [
    { name: 'Home', icon: Home, href: '#home' },
    { name: 'About', icon: User, href: '#about' },
    { name: 'Skills', icon: Code, href: '#skills' },
    { name: 'Work', icon: Clock, href: '#work' },
    { name: 'Projects', icon: Briefcase, href: '#projects' },
    { name: 'Blog', icon: BookOpen, href: '#blog' },
    { name: 'Contact', icon: Mail, href: '#contact' },
  ];

  useEffect(() => {
    if (theme === 'dark') {
      const interval = setInterval(() => {
        setNeonIndex((prev) => (prev + 1) % NEON_COLORS.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [theme]);

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl 
      ${theme === 'dark' 
        ? 'bg-gray-900/80 shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
        : 'bg-white/80 shadow-lg'} 
      backdrop-blur-md rounded-2xl transition-all duration-300`}>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <a href="#" className={`text-2xl font-bold transition-all duration-300
            ${theme === 'dark' ? `bg-gradient-to-r ${NEON_COLORS[neonIndex]} bg-clip-text text-transparent 
            hover:scale-105 transform` : 'text-gray-900'}`}>
            Portfolio
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-300
                  ${theme === 'dark'
                    ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} hover:text-white
                       hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:scale-105`
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                theme === 'dark'
                  ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} text-yellow-400
                     hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:scale-105`
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
              theme === 'dark'
                ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} hover:text-white
                   hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]`
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} hover:text-white
                       hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]`
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className={`flex items-center space-x-2 w-full p-2 rounded-lg transition-all duration-300 ${
                theme === 'dark'
                  ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} hover:text-white
                     hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]`
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}