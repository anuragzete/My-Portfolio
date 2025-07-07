import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
    FaReact,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaDocker,
    FaGitAlt,
    FaPython,
    FaJava,
    FaCuttlefish,
    FaGithub,
    FaNodeJs,
    FaMicrosoft,
    FaAws,
} from "react-icons/fa";
import { SiTailwindcss, SiJetbrains, SiCplusplus, SiSpring, SiOpencv, SiSelenium } from "react-icons/si";
import { motion } from "framer-motion";

const skillCategories = {
    "Languages": [
        { name: "Java", icon: <FaJava />, level: 80, color: "#f89820" },
        { name: "C", icon: <FaCuttlefish />, level: 60, color: "#283593" },
        { name: "C++", icon: <SiCplusplus />, level: 65, color: "#0074B6" },
        { name: "Python", icon: <FaPython />, level: 55, color: "#6A98F0" },
        { name: "JavaScript", icon: <FaJs />, level: 85, color: "#F7DF1E" },
    ],
    "Frameworks & Libraries": [
        { name: "React", icon: <FaReact />, level: 90, color: "#61DAFB" },
        { name: "Node.js", icon: <FaNodeJs />, level: 80, color: "#68A063" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 85, color: "#38B2AC" },
        { name: "Spring", icon: <SiSpring />, level: 70, color: "#6DB33F" },
        { name: "OpenCV", icon: <SiOpencv />, level: 60, color: "#5C3EE8" },
        { name: "Selenium", icon: <SiSelenium />, level: 65, color: "#43B02A" },
    ],
    "Tools & IDEs": [
        { name: "VS Code", icon: <FaMicrosoft />, level: 85, color: "#007ACC" },
        { name: "JetBrains IDE", icon: <SiJetbrains />, level: 90, color: "#FF0066" },
        { name: "Git", icon: <FaGitAlt />, level: 90, color: "#F1502F" },
        { name: "GitHub", icon: <FaGithub />, level: 90, color: "#6e5494" },
        { name: "Docker", icon: <FaDocker />, level: 60, color: "#2496ED" },
    ],
    "Web & Cloud Platforms": [
        { name: "HTML", icon: <FaHtml5 />, level: 90, color: "#E34F26" },
        { name: "CSS", icon: <FaCss3Alt />, level: 80, color: "#1572B6" },
        { name: "AWS", icon: <FaAws />, level: 70, color: "#FF9900" },
    ],
};

export default function Skills() {
    const [animatedLevels, setAnimatedLevels] = useState({});

    useEffect(() => {
        const timeout = setTimeout(() => {
            const newLevels = {};
            Object.keys(skillCategories).forEach((category) => {
                skillCategories[category].forEach((skill) => {
                    newLevels[skill.name] = skill.level;
                });
            });
            setAnimatedLevels(newLevels);
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section id="skills" className="py-20 text-gray-800 dark:text-gray-100">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
                {Object.entries(skillCategories).map(([category, skills]) => (
                    <div key={category} className="mb-14">
                        <h3 className="text-2xl font-semibold mb-8 text-center">{category}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    className="rounded-2xl p-6 shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="w-24 h-24 relative mb-4">
                                        <CircularProgressbar
                                            value={animatedLevels[skill.name] || 0}
                                            text={``}
                                            styles={buildStyles({
                                                pathColor: skill.color,
                                                trailColor: "#d1d5db",
                                                strokeLinecap: "round",
                                            })}
                                        />
                                        <div
                                            className="absolute inset-0 flex items-center justify-center text-4xl"
                                            style={{ color: skill.color }}
                                        >
                                            {skill.icon}
                                        </div>
                                    </div>
                                    <p className="text-lg font-medium" style={{ color: skill.color }}>
                                        {skill.name}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
