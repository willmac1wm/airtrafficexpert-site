import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

const SimulationPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">ATC Simulator</h1>
      <p className="text-gray-500 mt-2">Test your skills in our browser-based approach control simulation.</p>
    </div>
    <GameEmbed />
  </div>
);

const AdminToolsPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
     <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Consultant Tools</h1>
      <p className="text-gray-500 mt-2">AI-powered utilities for content creation.</p>
    </div>
    <ContentGenerator />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/admin-tools" element={<AdminToolsPage />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/youtube" element={<YoutubePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;