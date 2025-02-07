import React from 'react';
import { Github, Linkedin, Code, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function SocialLinks() {
  const { theme } = useTheme();

  return (
    <>
      {/* Left Side Social Links */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col space-y-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-full transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
          }`}
          title="GitHub"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-full transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
          }`}
          title="LinkedIn"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href="https://leetcode.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-full transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
          }`}
          title="LeetCode"
        >
          <Code className="w-6 h-6" />
        </a>
      </div>

      {/* Right Side Email */}
      <div className="fixed right-6 bottom-20 hidden lg:block">
        <a
          href="mailto:john.doe@example.com"
          className={`p-3 rounded-full transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
          }`}
          title="Email"
        >
          <Mail className="w-6 h-6" />
        </a>
      </div>
    </>
  );
}