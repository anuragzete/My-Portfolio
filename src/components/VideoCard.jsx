import React from 'react';

export default function VideoCard({ thumbnail, title, channel, views, timestamp }) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-gray-200"></div>
        </div>
        <div>
          <h3 className="font-medium line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600">{channel}</p>
          <p className="text-sm text-gray-600">
            {views} views • {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}