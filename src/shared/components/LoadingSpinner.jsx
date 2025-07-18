import React from "react";

export default function LoadingSpinner({ label = "Loading..." }) {
    return (
        <div className="flex items-center justify-center h-[50vh]">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-center text-lg text-gray-700 dark:text-gray-300 font-medium">{label}</p>
            </div>
        </div>
    );
}
