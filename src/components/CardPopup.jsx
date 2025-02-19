import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { Github, ExternalLink } from "lucide-react";

export default function CardPopup({ project, isOpen, onClose }) {
    if (!project) return null;

    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return "Invalid date";
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-3xl text-gray-900 dark:text-gray-200 overflow-hidden"
            >
                <Dialog.Title className="text-2xl font-bold">{project.name}</Dialog.Title>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{project.description}</p>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Category</h3>
                    <p className="text-gray-700 dark:text-gray-300">{project.category}</p>
                </div>

                {Array.isArray(project.features) && project.features.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Key Features</h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                            {project.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {Array.isArray(project.challenges) && project.challenges.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Challenges</h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                            {project.challenges.map((challenge, index) => (
                                <li key={index}>{challenge}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {Array.isArray(project.learnings) && project.learnings.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Learnings</h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                            {project.learnings.map((learning, index) => (
                                <li key={index}>{learning}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Technologies</h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                            {project.technologies.map((tech, index) => (
                                <li key={index}>{tech}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Project Duration</h3>
                    <p className="text-gray-700 dark:text-gray-300">{formatDate(project.project_duration?.start)} - {formatDate(project.project_duration?.end)}</p>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">GitHub</h3>
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                        <Github className="w-5 h-5 mr-2" /> View Repository
                    </a>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Live Demo</h3>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                        <ExternalLink className="w-5 h-5 mr-2" /> Visit Project
                    </a>
                </div>

                {Array.isArray(project.image_urls) && project.image_urls.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Project Images</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {project.image_urls.map((url, index) => (
                                <img key={index} src={url} alt={project.image_metadata?.[`image${index + 1}`]?.alt_text || `Project Image ${index + 1}`} className="rounded-lg shadow-md" />
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Close</button>
                </div>
            </motion.div>
        </Dialog>
    );
}
