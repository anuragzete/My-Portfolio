import React, { useEffect, useState } from "react";
import { FaLaptopCode, FaTools, FaLock, FaDatabase, FaDesktop } from "react-icons/fa";

const services = [
    {
        title: "Full Stack Development",
        icon: <FaLaptopCode className="w-10 h-10 text-blue-600" />,
        description: "Building responsive and scalable web applications using Java, Spring Boot, React, and Node.js."
    },
    {
        title: "API Development",
        icon: <FaTools className="w-10 h-10 text-green-600" />,
        description: "Designing and integrating robust RESTful APIs with secure and optimized backend systems."
    },
    {
        title: "Cybersecurity & Blockchain",
        icon: <FaLock className="w-10 h-10 text-purple-600" />,
        description: "Exploring security practices and decentralized applications using modern cryptography and blockchain."
    },
    {
        title: "Database & DevOps",
        icon: <FaDatabase className="w-10 h-10 text-yellow-600" />,
        description: "Experienced with SQL, MongoDB, Docker, and version control tools for streamlined development workflows."
    },
    {
        title: "Desktop App Development",
        icon: <FaDesktop className="w-10 h-10 text-pink-600" />,
        description: "Creating cross-platform desktop applications using Java Swing, JavaFX, and Electron-based frameworks."
    }
];

export default function Services() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) setIsVisible(true);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="mt-32">
            <h3 className="text-3xl font-bold text-center mb-12">What I Offer</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div
                        key={service.title}
                        className={`relative p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-md hover:scale-[1.03] transition-all duration-500 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <div className="relative z-10 flex items-center gap-4 mb-4">
                            {service.icon}
                            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                {service.title}
                            </h4>
                        </div>
                        <p className="relative z-10 text-gray-700 dark:text-gray-300">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
