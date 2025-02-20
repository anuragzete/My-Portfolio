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
                className="group relative rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 transition-transform hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800 bg-white cursor-pointer"
                onClick={() => setPopupOpen(true)}
            >
                {/* Image Section */}
                <div className="p-4">
                    <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-video flex items-center justify-center">
                        <img
                            src={project.image_urls?.[0]}
                            alt={project.name || 'Project Image'}
                            className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                    {project.name && <h3 className="text-2xl font-semibold tracking-tight">{project.name}</h3>}
                    {project.description && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 overflow-hidden">
                            {project.description}
                        </p>
                    )}

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {project.technologies.map((tech, index) => (
                                <span key={index}
                                      className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Status & Duration */}
                    {project.status && project.durationText && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                            <p><span className="font-semibold">Status:</span> {project.status}</p>
                            <p><span className="font-semibold">Duration:</span> {project.durationText}</p>
                        </div>
                    )}

                    {/* Buttons Section */}
                    <div className="flex space-x-4 pt-4">
                        {isValidUrl(project.githubLink) && (
                            <a
                                href={project.githubLink}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                target="_blank" rel="noopener noreferrer"
                            >
                                <Github className="w-5 h-5" />
                                <span>Code</span>
                            </a>
                        )}
                        {isValidUrl(project.link) && (
                            <a
                                href={project.link}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                                target="_blank" rel="noopener noreferrer"
                            >
                                <ExternalLink className="w-5 h-5" />
                                <span>Live Demo</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            {isPopupOpen && <CardPopup project={project} isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />}
        </>
    );
};

export default ProjectCard;
