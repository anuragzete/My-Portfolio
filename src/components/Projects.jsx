import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config'; // Import Firebase Firestore
import { collection, getDocs } from 'firebase/firestore';
import ProjectCard from './ProjectCard';

// Function to convert Google Drive URLs to direct image links
const getDirectImageUrl = (url) => {
    const match = url.match(/\/d\/(.*?)\//); // Extracts file ID from Drive link
    return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
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

                    // Process image URLs if they exist
                    if (projectData.image_urls && Array.isArray(projectData.image_urls)) {
                        projectData.image_urls = projectData.image_urls.map(getDirectImageUrl);
                    }

                    return {
                        id: doc.id,
                        ...projectData,
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

    if (loading) return <p className="text-center">Loading projects...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (projects.length === 0) return <p className="text-center text-gray-500">No projects available.</p>;

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
