import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config'; // Import Firebase Firestore
import { collection, getDocs } from 'firebase/firestore';
import ProjectCard from './ProjectCard';

// Function to format Firestore timestamps
const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "Invalid date";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
};

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'projects'));
                const projectList = querySnapshot.docs.map((doc) => {
                    const projectData = doc.data();

                    // Process duration
                    const start = formatDate(projectData.project_duration?.start);
                    const end = formatDate(projectData.project_duration?.end);

                    // Determine status and duration text
                    let durationText = "";
                    if (projectData.status === "completed") {
                        durationText = `${start} - ${end}`;
                    } else if (projectData.status === "in progress") {
                        durationText = `${start} - Present`;
                    }

                    return {
                        id: doc.id,
                        ...projectData,
                        durationText, // Add processed duration text
                    };
                });

                setProjects(projectList);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading)
        return <p className="text-center text-2xl font-semibold text-green-500 absolute inset-0 flex items-center justify-center">
            Loading projects...
        </p>;

    if (error)
        return <p className="text-center text-2xl font-semibold text-red-500 absolute inset-0 flex items-center justify-center">
            Error: {error}
        </p>;

    if (projects.length === 0)
        return <p className="text-center text-2xl font-semibold text-gray-500 absolute inset-0 flex items-center justify-center">
            Sorry, No projects available.
        </p>;

    return (
        <section id="projects" className="py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
