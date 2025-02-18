import React, { useState } from "react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const WorkExperienceCard = ({ experience, index, visible }) => {
    const { theme } = useTheme();
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => setImageLoaded(true);

    return (
        <div
            id={`experience-${index}`}
            className={`relative flex items-start transition-opacity duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
        >
            {/* Timeline Indicator */}
            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 z-10">
                <div className="absolute w-8 h-8 rounded-full border-2 border-blue-500 dark:border-blue-400 -left-2 -top-2 animate-ping opacity-20" />
            </div>

            {/* Card Content */}
            <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div
                    className={`p-6 rounded-xl transition-all duration-300 ${
                        theme === "dark"
                            ? "bg-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            : "bg-white hover:shadow-xl"
                    }`}
                >
                    {/* Job Title & Company */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        {experience.job_title && <h3 className="text-xl font-semibold">{experience.job_title}</h3>}
                        {experience.company_name && experience.company_url && (
                            <a
                                href={experience.company_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center space-x-1 text-sm ${
                                    theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                                }`}
                            >
                                <span>{experience.company_name}</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>

                    {/* Company Logo */}
                    {experience.company_logo_url && (
                        <div className="mb-4">
                            <img
                                src={experience.company_logo_url}
                                alt={experience.company_name || "Company Logo"}
                                className={`w-24 h-24 object-contain ${imageLoaded ? "" : "opacity-0"}`}
                                onLoad={handleImageLoad}
                                loading="lazy"
                            />
                        </div>
                    )}

                    {/* Duration & Location */}
                    {(experience.duration || experience.location) && (
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {experience.duration && (
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {experience.duration}
                                </div>
                            )}
                            {experience.location && (
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {experience.location}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Description */}
                    {experience.description?.length > 0 && (
                        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600 dark:text-gray-300">
                            {experience.description.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    )}

                    {/* Technologies */}
                    {experience.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className={`px-3 py-1 text-sm rounded-full ${
                                        theme === "dark" ? "bg-blue-900/50 text-blue-400" : "bg-blue-100 text-blue-600"
                                    }`}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Achievements */}
                    {experience.achievements?.length > 0 && (
                        <div className="mt-4">
                            <h4 className="font-semibold">Achievements</h4>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                                {experience.achievements.map((achievement, i) => (
                                    <li key={i}>{achievement}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Key Responsibilities */}
                    {experience.key_responsibilities?.length > 0 && (
                        <div className="mt-4">
                            <h4 className="font-semibold">Key Responsibilities</h4>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                                {experience.key_responsibilities.map((responsibility, i) => (
                                    <li key={i}>{responsibility}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkExperienceCard;
