import React from 'react';
import {Calendar, Clock, ArrowRight} from 'lucide-react';
import {useTheme} from '../context/ThemeContext';
import { Link } from "react-router-dom";

const blogPosts = [
    {
        id: 1,
        title: 'Understanding React Hooks',
        excerpt: 'A deep dive into React Hooks and how they revolutionize state management in functional components.',
        date: 'March 15, 2024',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
        category: 'React',
    },
    {
        id: 2,
        title: 'Mastering Tailwind CSS',
        excerpt: 'Learn how to build beautiful, responsive interfaces with Tailwind CSS utility classes.',
        date: 'March 10, 2024',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
        category: 'CSS',
    },
    {
        id: 3,
        title: 'The Future of Web Development',
        excerpt: 'Exploring upcoming trends and technologies that will shape the future of web development.',
        date: 'March 5, 2024',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
        category: 'Web Dev',
    },
];

export default function BlogsList() {
    const {theme} = useTheme();

    return (
        <section id="blogsList" className="py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Explore My Blogs</h2>

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            className={`group rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 
                ${theme === 'dark'
                                ? 'bg-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                                : 'bg-white hover:shadow-xl'}`}
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
                  <span className={`px-3 py-1 rounded-full ${
                      theme === 'dark'
                          ? 'bg-blue-900/50 text-blue-400'
                          : 'bg-blue-100 text-blue-600'
                  }`}>
                    {post.category}
                  </span>
                                    <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1"/>
                        {post.date}
                    </span>
                                        <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1"/>
                                            {post.readTime}
                    </span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h3>
                                <Link
                                    to="/blog"
                                    className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400
               group-hover:translate-x-2 transition-transform"
                                >
                                    <span>Read More</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View More Blogs Button (Redirect to Blog Website) */}
                <div className="flex justify-center mt-8">
                    <a
                        href="https://yourblogwebsite.com" // Change this to your blog URL
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