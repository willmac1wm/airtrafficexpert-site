import React from 'react';
import { Mic, Youtube, Newspaper, Play, ExternalLink } from 'lucide-react';

export const PodcastPage: React.FC = () => {
  const episodes = [
    { id: 1, title: 'Ep 42: The Future of Remote Towers', duration: '45 min', date: 'Oct 15, 2023' },
    { id: 2, title: 'Ep 41: Interview with FAA Administrator', duration: '52 min', date: 'Oct 08, 2023' },
    { id: 3, title: 'Ep 40: Managing Stress in the Control Tower', duration: '38 min', date: 'Oct 01, 2023' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4">
            <Mic className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Air Traffic Expert Podcast</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Deep conversations with aviation leaders, technical deep dives, and stories from the radar room.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="h-48 w-48 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Mic className="h-20 w-20 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="uppercase tracking-wide text-sm font-semibold text-purple-300 mb-2">Latest Episode</div>
              <h2 className="text-3xl font-bold mb-4">Ep 43: NextGen Implementation Challenges</h2>
              <p className="text-gray-300 mb-6 max-w-2xl">
                We sit down with the lead engineer of the latest ADS-B rollout to discuss the technical hurdles and operational benefits of the new system.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition-colors inline-flex items-center gap-2">
                <Play className="h-5 w-5 fill-current" /> Listen Now
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {episodes.map((ep) => (
            <div key={ep.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-sm text-gray-500 mb-2">{ep.date}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{ep.title}</h3>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-medium text-gray-500">{ep.duration}</span>
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
                  Play <Play size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const YoutubePage: React.FC = () => {
  const videos = [
    { id: 1, title: 'How ILS Approaches Work', views: '125K', thumb: 'bg-red-100' },
    { id: 2, title: 'Visual Approach vs Instrument Approach', views: '89K', thumb: 'bg-blue-100' },
    { id: 3, title: 'A Day in the Life of a Controller', views: '250K', thumb: 'bg-green-100' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4">
            <Youtube className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Video Library</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visual breakdowns, simulator sessions, and educational content for aviation professionals and enthusiasts.
          </p>
          <button className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition-colors inline-flex items-center gap-2">
            Subscribe on YouTube <ExternalLink size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
              <div className={`aspect-video ${video.thumb} relative group cursor-pointer flex items-center justify-center`}>
                <Youtube className="h-16 w-16 text-gray-400 group-hover:text-red-600 transition-colors" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all"></div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{video.title}</h3>
                <p className="text-sm text-gray-500">{video.views} views • 2 weeks ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const NewsPage: React.FC = () => {
  const newsItems = [
    { id: 1, category: 'Regulation', title: 'FAA Announces New Drone ID Rules', date: 'Today', excerpt: 'The Federal Aviation Administration has finalized the rules for remote identification of unmanned aircraft...' },
    { id: 2, category: 'Industry', title: 'Major Airline Mergers Approved', date: 'Yesterday', excerpt: 'The Department of Transportation has given the green light for the proposed merger between...' },
    { id: 3, category: 'Technology', title: 'AI in Control Towers: A Pilot Program', date: '2 days ago', excerpt: 'Three major airports have been selected to test artificial intelligence assistance tools for ground control...' },
    { id: 4, category: 'Safety', title: 'NTSB Releases Annual Safety Report', date: '3 days ago', excerpt: 'The National Transportation Safety Board highlights runway incursions as a key area for improvement...' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Newspaper className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Industry News & Updates</h1>
            <p className="text-gray-500">Curated updates from the world of Air Traffic Control.</p>
          </div>
        </div>

        <div className="space-y-6">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wide">
                  {item.category}
                </span>
                <span className="text-sm text-gray-400">{item.date}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">{item.title}</h2>
              <p className="text-gray-600">{item.excerpt}</p>
              <button className="mt-4 text-blue-600 font-medium text-sm hover:text-blue-800 flex items-center gap-1">
                Read full story <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
