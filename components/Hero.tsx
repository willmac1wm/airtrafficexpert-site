import React from 'react';
import { ArrowRight, CheckCircle, Gamepad2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1080&fit=crop&auto=format&q=80"
          alt="Air Traffic Control Tower"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="lg:w-2/3">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
            FAA Certified Consultant
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Navigating the Complexities of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Airspace Management</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Over 17 years of operational expertise in ATC training, procedure development, and safety systems. We help government and commercial entities optimize their aviation operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/services" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/50">
              Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate('/simulation');
              }}
              type="button"
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-base font-medium rounded-md text-gray-300 hover:text-white hover:bg-slate-800 transition-all backdrop-blur-sm gap-2"
            >
              <Gamepad2 className="h-5 w-5" />
              Try Simulator
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-400 border-t border-slate-800 pt-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <span>SAM.gov Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <span>Veteran Owned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
