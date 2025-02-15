import React, {useEffect, useState} from 'react';
import {useTheme} from '../context/ThemeContext';
import {Calendar, MapPin, ExternalLink} from 'lucide-react';

export default function Work() {
    const {theme} = useTheme();
    const [experiences, setExperiences] = useState([]);
    const [visibleSections, setVisibleSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/work')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch work experiences');
                }
                return response.json();
            })
            .then((data) => {
                setExperiences(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching work experiences:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight * 0.6;
            const newVisibleSections = experiences.map((_, index) => {
                const element = document.getElementById(`experience-${index}`);
                if (element) {
                    return scrollPosition > element.offsetTop;
                }
                return false;
            });
            setVisibleSections(newVisibleSections);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [experiences]);

    if (loading) return <p className="text-center">Loading work experiences...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <section id="work" className="py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Work Experience</h2>
                <div className="relative">
                    <div
                        className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"/>
                    <div className="space-y-12">
                        {experiences.map((experience, index) => (
                            <div
                                key={experience.id}
                                id={`experience-${index}`}
                                className={`relative flex items-start transition-opacity duration-700 ${
                                    visibleSections[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                } ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                <div
                                    className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 z-10">
                                    <div
                                        className="absolute w-8 h-8 rounded-full border-2 border-blue-500 dark:border-blue-400 -left-2 -top-2 animate-ping opacity-20"/>
                                </div>
                                <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <div className={`p-6 rounded-xl transition-all duration-300 ${
                                        theme === 'dark' ? 'bg-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-white hover:shadow-xl'
                                    }`}>
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                            <h3 className="text-xl font-semibold">{experience.title}</h3>
                                            <a
                                                href={experience.companyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center space-x-1 text-sm ${
                                                    theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                                                }`}
                                            >
                                                <span>{experience.company}</span>
                                                <ExternalLink className="w-4 h-4"/>
                                            </a>
                                        </div>
                                        <div
                                            className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1"/>
                                                {experience.duration}
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-1"/>
                                                {experience.location}
                                            </div>
                                        </div>
                                        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600 dark:text-gray-300">
                                            {experience.description.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                        <div className="flex flex-wrap gap-2">
                                            {experience.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className={`px-3 py-1 text-sm rounded-full ${
                                                        theme === 'dark' ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'
                                                    }`}
                                                >
                          {tech}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
