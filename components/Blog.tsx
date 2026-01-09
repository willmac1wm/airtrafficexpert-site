import React from 'react';
import { MOCK_BLOG_POSTS } from '../constants';
import { Calendar, User } from 'lucide-react';

const Blog: React.FC = () => {
  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-base font-semibold text-blue-600 uppercase tracking-wide">Insights</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">Latest from the Expert</p>
          </div>
          <button className="hidden md:block text-blue-600 font-medium hover:text-blue-800">
            View all articles &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_BLOG_POSTS.map((post) => (
            <div key={post.id} className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="flex-shrink-0 h-48 overflow-hidden">
                <img className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-500" src={post.imageUrl} alt={post.title} />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-600 mb-2">
                    {post.category}
                  </p>
                  <div className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900 line-clamp-2">{post.title}</p>
                    <p className="mt-3 text-base text-gray-500 line-clamp-3">{post.excerpt}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <span className="sr-only">Will Kelly</span>
                    <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                       <User size={20} />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Will Kelly</p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.date}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
