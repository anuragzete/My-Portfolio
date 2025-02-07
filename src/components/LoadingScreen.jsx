import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center space-y-4">
      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 animate-pulse">
        Loading...
      </div>
      <div className="text-gray-600 dark:text-gray-400">
        some stuff
      </div>
    </div>
  );
}