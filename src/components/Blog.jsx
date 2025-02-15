import React, {useEffect, useState} from 'react';
import {Calendar, Clock, ArrowRight} from 'lucide-react';
import {useTheme} from '../context/ThemeContext';

export default function Blog() {
    const {theme} = useTheme();
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/blogs') // Update this URL if deployed
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setBlogPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-center py-10">Loading blogs...</p>;
    }

    if (error) {
        return <p className="text-center py-10 text-red-500">Error: {error}</p>;
    }

    return (
        <section id="blog" className="py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Latest Blog Posts</h2>

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            className={`group rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 
                ${theme === 'dark' ? 'bg-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-white hover:shadow-xl'}`}
                        >
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span
                                        className={`px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>{post.category}</span>
                                    <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1"/> {post.date}
                                        </span>
                                        <span className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1"/> {post.readTime}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                                <a
                                    href={`#blog/${post.id}`}
                                    className={`inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform`}
                                >
                                    <span>Read More</span>
                                    <ArrowRight className="w-4 h-4"/>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View More Blogs Button */}
                <div className="flex justify-center mt-8">
                    <a
                        href="https://yourblogwebsite.com" // Change this to your actual blog site
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        View More Blogs
                    </a>
                </div>
            </div>
        </section>
    );
}
