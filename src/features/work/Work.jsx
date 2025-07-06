import React, {useEffect, useState, useCallback} from 'react';
import {db} from '../../firebase-config.js';
import WorkExperienceCard from './WorkExperienceCard.jsx';
import LoadingSpinner from "../../shared/components/LoadingSpinner.jsx";
import {collection, getDocs, query, orderBy} from 'firebase/firestore';


export default function Work() {
    const [experiences, setExperiences] = useState([]);
    const [visibleSections, setVisibleSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(5);

    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return "Invalid date";
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString();
    };

    const fetchWorkExperiences = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const q = query(collection(db, 'workExperience'), orderBy('index', 'asc')); // Order by index
            const querySnapshot = await getDocs(q);

            const experiencesList = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    job_title: data.job_title || '',
                    company_name: data.company_name || '',
                    company_url: data.company_url || '',
                    description: Array.isArray(data.description) ? data.description : (data.description ? [data.description] : []),
                    technologies: Array.isArray(data.technologies) ? data.technologies : [],
                    duration: {
                        start: formatDate(data.duration?.start),
                        end: formatDate(data.duration?.end),
                    },
                    location: data.location || '',
                    company_logo_url: data.company_logo_url || '',
                    github_url: data.github_url || ''
                };
            });

            setExperiences(experiencesList);
        } catch (error) {
            console.error('Error fetching work experiences:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWorkExperiences();
    }, [fetchWorkExperiences]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight * 0.6;
            setVisibleSections(
                experiences.map((_, index) => {
                    const element = document.getElementById(`experience-${index}`);
                    return element ? scrollPosition > element.offsetTop : false;
                })
            );
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [experiences]);

    const loadMore = () => {
        setLimit((prevLimit) => prevLimit + 5);
    };

    if (loading) return <LoadingSpinner label="Fetching work experience..." />;

    if (error)
        return <p
            className="text-center text-2xl font-semibold text-red-500 absolute inset-0 flex items-center justify-center">Error: {error}</p>;

    if (experiences.length === 0)
        return <p
            className="text-center text-2xl font-semibold text-gray-500 absolute inset-0 flex items-center justify-center">Sorry, No
            work experience available.</p>;

    return (
        <section id="work" className="py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Work Experience</h2>
                <div className="relative">
                    <div
                        className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"/>
                    <div className="space-y-12">
                        {experiences.slice(0, limit).map((experience, index) => (
                            <WorkExperienceCard
                                key={experience.id}
                                experience={experience}
                                index={index}
                                visible={visibleSections[index]}
                            />
                        ))}
                    </div>
                    {limit < experiences.length && (
                        <div className="text-center mt-8">
                            <button onClick={loadMore}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

