import React, {useEffect, useState} from 'react';
import {Github, ExternalLink} from 'lucide-react';

const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/projects") // Update the URL if deployed
            .then((response) => response.json())
            .then((data) => setProjects(data))
            .catch((error) => console.error("Error fetching projects:", error));
    }, []);

    return (
        <section id="projects" className="py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id} // Changed from project.title to project.id for uniqueness
                            className={`group rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2 
              dark:bg-gray-800 bg-white`}
                        >
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 space-y-4">
                                <h3 className="text-xl font-semibold">{project.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700"
                                        >
                      {tag}
                    </span>
                                    ))}
                                </div>
                                <div className="flex space-x-4 pt-4">
                                    {isValidUrl(project.github) && (
                                        <a
                                            href={project.github}
                                            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                        >
                                            <Github className="w-5 h-5"/>
                                            <span>Code</span>
                                        </a>
                                    )}
                                    {isValidUrl(project.live) && (
                                        <a
                                            href={project.live}
                                            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                        >
                                            <ExternalLink className="w-5 h-5"/>
                                            <span>Live Demo</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
