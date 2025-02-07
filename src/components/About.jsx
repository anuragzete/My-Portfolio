import React from 'react';

export default function About() {
    return (
        <section id="about" className="py-20">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About Me</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="aspect-square rounded-2xl overflow-hidden">
                        <img
                            src="../resources/profilePhoto.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-300">
                            I’m a Full Stack Java Developer and a Computer Science student, specializing in Java and
                            React. I enjoy building dynamic, scalable applications and am currently diving deeper into
                            the Spring Framework to strengthen my backend expertise.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            Beyond development, I’m passionate about cybersecurity, blockchain,
                            open-source contribution, and technical writing. I love solving complex problems, optimizing
                            performance, and staying updated with emerging technologies. Contributing to open-source
                            projects and sharing knowledge with the tech community keeps me motivated.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            Let's build something amazing together! 🚀
                        </p>
                        <div className="pt-4">
                            <a
                                href="#contact"
                                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}