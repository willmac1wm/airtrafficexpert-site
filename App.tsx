import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Services from './components/Services';
import ContentGenerator from './components/ContentGenerator';
import Blog from './components/Blog';
import GameEmbed from './components/GameEmbed';
import SimulatorBanner from './components/SimulatorBanner';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import BlogPostDetail from './components/BlogPostDetail';
import { AuthProvider } from './contexts/AuthContext';
import { PodcastPage, YoutubePage, NewsPage } from './components/MediaPages';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <SimulatorBanner />
    <Services />
    <Blog />
  </>
);

const ServicesPage: React.FC = () => (
  <div className="pt-10">
    <Services />
  </div>
);

const BlogPage: React.FC = () => (
  <div className="pt-10">
    <Blog />
  </div>
);

const SimulationPage: React.FC = () => {
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-4">
            <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
            Browser-Based Training
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-green-500">OPEN</span>STARS Simulator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Experience realistic air traffic control with our browser-based radar simulator. 
            Guide aircraft through your sector using authentic FAA phraseology and procedures.
          </p>
        </div>
        
        {/* Game Component */}
        <GameEmbed />
      
      {/* About Section */}
      <div className="mt-16 bg-slate-800/50 border border-slate-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">About OpenSTARS</h2>
        <div className="grid md:grid-cols-2 gap-8 text-gray-300">
          <div>
            <p className="mb-4">
              OpenSTARS (Standard Terminal Automation Replacement System) is a training simulator 
              designed to introduce users to the fundamentals of approach control operations.
            </p>
            <p>
              Whether you're an aspiring air traffic controller, aviation enthusiast, or flight 
              simulation fan, this tool provides an accessible way to practice radar vectoring 
              and sequencing skills.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Key Features:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Realistic STARS-style radar display
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                AI pilots with realistic readbacks
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Multiple difficulty levels
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Global leaderboards
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Works on desktop, tablet & mobile
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const AdminToolsPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Consultant Tools</h1>
      <p className="text-gray-500 mt-2">Internal utilities and portals.</p>
    </div>
    
    {/* Quick Links */}
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <a 
        href="https://dtis-secure-portal.app" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-6 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors group"
      >
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">DTIS ETC-ATC Portal</h3>
          <p className="text-slate-400 text-sm">Secure client portal access</p>
        </div>
        <svg className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
      
      <a 
        href="https://console.firebase.google.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-6 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-colors group"
      >
        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">Firebase Console</h3>
          <p className="text-gray-500 text-sm">Database & auth management</p>
        </div>
        <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>

    <ContentGenerator />
  </div>
);

// ScrollToTop component to handle scroll restoration
const ScrollToTop: React.FC = () => {
  const location = useLocation();
  const prevPathRef = React.useRef<string>('');

  useEffect(() => {
    // Only scroll if pathname actually changed (not just hash)
    const currentPath = location.pathname;
    if (prevPathRef.current && prevPathRef.current !== currentPath) {
      // Only scroll when navigating to a different route
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    prevPathRef.current = currentPath;
  }, [location.pathname]);

  // Prevent anchor links with href="#" from scrolling
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href="#"]') || target.closest('a[href="#top"]');
      if (anchor) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('click', handleAnchorClick, true);
    return () => {
      document.removeEventListener('click', handleAnchorClick, true);
    };
  }, []);

  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    console.log('App mounted, current location:', window.location.href);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
            <Route path="/simulation" element={<SimulationPage />} />
            <Route path="/simulator" element={<SimulationPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-tools" element={
              <ProtectedRoute>
                <AdminToolsPage />
              </ProtectedRoute>
            } />
            <Route path="/podcast" element={<PodcastPage />} />
            <Route path="/youtube" element={<YoutubePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
