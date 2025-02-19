import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import CardPopup from "./CardPopup";

const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

const ProjectCard = ({ project }) => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    return (
        <>
            <div
                className="group rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2 dark:bg-gray-800 bg-white cursor-pointer"
                onClick={() => setPopupOpen(true)}
            >
                <div className="aspect-video overflow-hidden">
                    <img
                        src={project.image_urls?.[0]}
                        alt={project.name || 'Project Image'}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                </div>
                <div className="p-6 space-y-4">
                    {project.name && <h3 className="text-xl font-semibold">{project.name}</h3>}
                    {project.description && <p className="text-gray-600 dark:text-gray-300">{project.description}</p>}

                    {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {project.status && <p className="text-sm text-gray-500 dark:text-gray-400">Status: {project.status}</p>}

                    <div className="flex space-x-4 pt-4">
                        {isValidUrl(project.githubLink) && (
                            <a
                                href={project.githubLink}
                                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                target="_blank" rel="noopener noreferrer"
                            >
                                <Github className="w-5 h-5" />
                                <span>Code</span>
                            </a>
                        )}
                        {isValidUrl(project.link) && (
                            <a
                                href={project.link}
                                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                target="_blank" rel="noopener noreferrer"
                            >
                                <ExternalLink className="w-5 h-5" />
                                <span>Live Demo</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
            {isPopupOpen && <CardPopup project={project} isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />}
        </>
    );
};

export default ProjectCard;
