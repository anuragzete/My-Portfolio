import React from 'react';
import { Wrench } from 'lucide-react';

export default function Maintenance() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-zinc-200 px-4 text-center">
            <div className="max-w-md w-full p-6 bg-white dark:bg-zinc-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-zinc-700">
                <div className="flex justify-center mb-4 text-blue-500 dark:text-blue-400">
                    <Wrench className="w-12 h-12 animate-spin-slow" />
                </div>
                <h1 className="text-3xl font-bold mb-2">We'll be back soon!</h1>
                <p className="text-gray-600 dark:text-zinc-300 mb-4">
                    Our blog is currently undergoing scheduled maintenance.
                    We're working hard to bring everything back online as quickly as possible.
                </p>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Thank you for your patience
                </p>
            </div>

            <footer className="mt-8 text-gray-400 dark:text-zinc-500 text-sm">
                &copy; {new Date().getFullYear()} Anurag Zete Blogs. All rights reserved.
            </footer>
        </div>
    );
}
