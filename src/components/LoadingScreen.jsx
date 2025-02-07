import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center space-y-4">
      <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
        Loading<span className="loading-dots">...</span>
      </div>
      <div className="text-gray-600 dark:text-gray-400 animate-cool-stuff">
        some cool stuff!
      </div>
    </div>
  );
}