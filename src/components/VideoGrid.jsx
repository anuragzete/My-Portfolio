import React from 'react';
import VideoCard from './VideoCard';

const videos = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    title: 'Build a Modern Web Application with React and TypeScript',
    channel: 'Tech Academy',
    views: '125K',
    timestamp: '3 days ago',
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    title: 'Advanced JavaScript Concepts Every Developer Should Know',
    channel: 'Code Masters',
    views: '89K',
    timestamp: '1 week ago',
  },
  {
    id: 3,
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
    title: 'The Future of Artificial Intelligence',
    channel: 'Tech Insights',
    views: '250K',
    timestamp: '2 weeks ago',
  },
  {
    id: 4,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    title: 'Gaming Setup Tour 2024 - Ultimate Edition',
    channel: 'Tech Reviews',
    views: '1.2M',
    timestamp: '5 days ago',
  },
  {
    id: 5,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    title: 'Learn Web Development in 2024',
    channel: 'Code Academy',
    views: '75K',
    timestamp: '1 day ago',
  },
  {
    id: 6,
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    title: 'The Complete Guide to Remote Work',
    channel: 'Future Work',
    views: '180K',
    timestamp: '4 days ago',
  },
];

export default function VideoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          thumbnail={video.thumbnail}
          title={video.title}
          channel={video.channel}
          views={video.views}
          timestamp={video.timestamp}
        />
      ))}
    </div>
  );
}