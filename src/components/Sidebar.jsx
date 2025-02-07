import React from 'react';
import { Home, Compass, Library, History, PlaySquare, Clock, ThumbsUp, Film, Gamepad, Music2, Newspaper, Trophy, Flame } from 'lucide-react';

const sidebarItems = [
  { icon: Home, text: 'Home' },
  { icon: Compass, text: 'Explore' },
  { icon: Library, text: 'Library' },
  { icon: History, text: 'History' },
  { icon: PlaySquare, text: 'Your Videos' },
  { icon: Clock, text: 'Watch Later' },
  { icon: ThumbsUp, text: 'Liked Videos' },
];

const categories = [
  { icon: Film, text: 'Movies' },
  { icon: Gamepad, text: 'Gaming' },
  { icon: Music2, text: 'Music' },
  { icon: Newspaper, text: 'News' },
  { icon: Trophy, text: 'Sports' },
  { icon: Flame, text: 'Trending' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen fixed left-0 top-16 bg-white p-4 overflow-y-auto hidden md:block">
      <div className="space-y-6">
        <div className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.text}
              className="flex items-center space-x-4 w-full p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.text}</span>
            </button>
          ))}
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.text}
                className="flex items-center space-x-4 w-full p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <category.icon className="w-5 h-5" />
                <span className="text-sm">{category.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}