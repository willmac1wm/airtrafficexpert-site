import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_BLOG_POSTS } from '../constants';
import { ArrowLeft, User, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const post = MOCK_BLOG_POSTS.find(p => p.id === id);
  
  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <button 
            onClick={() => navigate('/blog')}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              <User size={24} />
            </div>
            <div>
              <p className="font-medium text-gray-900">Will Kelly</p>
              <p className="text-sm text-gray-500">ATC Expert & Consultant</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="h-4 w-4" />
            <span>5 min read</span>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg prose-blue max-w-none">
          {post.content ? (
            <ReactMarkdown>{post.content}</ReactMarkdown>
          ) : (
            <>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {post.excerpt}
              </p>
              <p className="text-gray-500 italic">
                Full article coming soon. Check back for updates.
              </p>
            </>
          )}
        </article>

        {/* Related Posts */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">More Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {MOCK_BLOG_POSTS.filter(p => p.id !== id).slice(0, 2).map(relatedPost => (
              <div 
                key={relatedPost.id}
                onClick={() => navigate(`/blog/${relatedPost.id}`)}
                className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <img 
                  src={relatedPost.imageUrl} 
                  alt={relatedPost.title}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
                <div>
                  <span className="text-xs font-medium text-blue-600">{relatedPost.category}</span>
                  <h4 className="font-semibold text-gray-900 line-clamp-2 mt-1">{relatedPost.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{relatedPost.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
