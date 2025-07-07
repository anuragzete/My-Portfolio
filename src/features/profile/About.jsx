import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Services from "../../services/Services.jsx";

export default function About() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 200) setIsVisible(true);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="about" className="py-20">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About Me</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div
                        className="aspect-square rounded-2xl overflow-hidden cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <img
                            src="/resources/profilePhoto.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-300">
                            I’m a Full Stack Java Developer and a Computer Science student, specializing in Java, Spring Boot, and React.
                            I enjoy building dynamic, scalable applications and aim to deliver efficient, secure solutions.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            I’m also passionate about cybersecurity, blockchain, open-source contribution, and technical writing.
                            I love solving complex problems and contributing to innovative projects.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            Whether you're a startup, a developer team, or an open-source community, I love collaborating on real-world
                            products, research-driven solutions, and impactful web applications.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            Let's build something amazing together! 🚀
                        </p>
                        <div className="pt-4 flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Get in Touch
                            </button>
                            <a
                                href="/resources/Anurag_Zete_Resume.pdf"
                                download
                                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                            >
                                Download Resume
                            </a>
                        </div>
                    </div>
                </div>

                <Services />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="relative">
                        <button
                            className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✕
                        </button>
                        <img
                            src="/resources/profilePhoto.jpg"
                            alt="Profile Enlarged"
                            className="max-w-[90vw] max-h-[90vh] rounded-lg"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}