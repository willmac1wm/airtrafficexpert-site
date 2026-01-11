import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Services from './components/Services';
import ContentGenerator from './components/ContentGenerator';
import Blog from './components/Blog';
import GameEmbed from './components/GameEmbed';
import { PodcastPage, YoutubePage, NewsPage } from './components/MediaPages';

const HomePage: React.FC = () => (
  <>
    <Hero />
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
      <p className="text-gray-500 mt-2">AI-powered utilities for content creation.</p>
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
  // Handle non-hash routes from external links on mount
  useEffect(() => {
    console.log('App mounted, current location:', window.location.href);
    if (window.location.pathname !== '/' && !window.location.hash) {
      const path = window.location.pathname;
      console.log('Redirecting to hash route:', `/#${path}`);
      window.location.replace(`/#${path}`);
      return;
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/simulator" element={<SimulationPage />} />
          <Route path="/admin-tools" element={<AdminToolsPage />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/youtube" element={<YoutubePage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
