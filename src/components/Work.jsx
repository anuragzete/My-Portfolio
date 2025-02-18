import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { db } from '../firebase-config'; // Import Firebase Firestore
import { collection, getDocs } from 'firebase/firestore';
import WorkCard from './WorkExperienceCard';

const Work = () => {
    const { theme } = useTheme();
    const [experiences, setExperiences] = useState([]);
    const [visibleSections, setVisibleSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkExperiences = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'workExperience'));
                const experiencesList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setExperiences(experiencesList);
            } catch (error) {
                console.error('Error fetching work experiences:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkExperiences();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight * 0.6;
            const newVisibleSections = experiences.map((_, index) => {
                const element = document.getElementById(`experience-${index}`);
                return element ? scrollPosition > element.offsetTop : false;
            });
            setVisibleSections(newVisibleSections);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [experiences]);

    if (loading) return <p className="text-center">Loading work experiences...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (experiences.length === 0) return <p className="text-center text-gray-500">No work experience available.</p>;

    return (
        <section id="work" className="py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Work Experience</h2>
                <div className="relative">
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"/>
                    <div className="space-y-12">
                        {experiences.map((experience, index) => (
                            <WorkCard
                                key={experience.id}
                                experience={experience}
                                index={index}
                                visible={visibleSections[index]}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Work;
