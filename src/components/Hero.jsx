import React from 'react';
<<<<<<< HEAD
import { GitHub, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400">Anurag Zete</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            Java Full Stack Developer
          </p>
        </div>

        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          I specialize in backend development, creating robust and scalable solutions that power beautiful and
          functional websites. Let's work together to bring your ideas to life!
        </p>

        <div className="flex justify-center space-x-4">
          <a
            href="#"
            className={`p-2 rounded-full ${
              theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}
          >
            <GitHub className="w-6 h-6" />
          </a>
          <a
            href="#"
            className={`p-2 rounded-full ${
              theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="#contact"
            className={`p-2 rounded-full ${
              theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

        <a
          href="#about"
          className="inline-block animate-bounce"
        >
          <ArrowDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
=======
import {Github, Linkedin, Mail, ArrowDown} from 'lucide-react';
import {useTheme} from '../context/ThemeContext';

export default function Hero() {
    const {theme} = useTheme();

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-16">
            <div className="text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold">
                        Hi, I'm <span className="text-blue-600 dark:text-blue-400">Anurag Zete</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                        Java Full Stack Developer
                    </p>
                </div>

                <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                    I specialize in backend development, creating robust and scalable solutions that power beautiful and
                    functional websites. Let's work together to bring your ideas to life!
                </p>

                <div className="flex justify-center space-x-4">
                    <a
                        href="#"
                        className={`p-2 rounded-full ${
                            theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                        } transition-colors`}
                    >
                        <Github className="w-6 h-6"/>
                    </a>
                    <a
                        href="#"
                        className={`p-2 rounded-full ${
                            theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                        } transition-colors`}
                    >
                        <Linkedin className="w-6 h-6"/>
                    </a>
                    <a
                        href="#contact"
                        className={`p-2 rounded-full ${
                            theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                        } transition-colors`}
                    >
                        <Mail className="w-6 h-6"/>
                    </a>
                </div>

                <a
                    href="#about"
                    className="inline-block animate-bounce"
                >
                    <ArrowDown className="w-6 h-6"/>
                </a>
            </div>
        </section>
    );
>>>>>>> 14f565a (added personal information)
}