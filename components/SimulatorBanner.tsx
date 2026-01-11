import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Play, Radar, Headphones } from 'lucide-react';

const SimulatorBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-green-950 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)`,
        }}></div>
        {/* Radar sweep animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-green-500/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-green-500/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-green-500/30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-green-500/40 bg-green-500/10 text-green-400 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
              Free Browser-Based Training
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Try the <span className="text-green-500">OPEN</span>STARS
              <br />ATC Simulator
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Experience realistic air traffic control training right in your browser. 
              Guide aircraft through your sector using authentic FAA phraseology and procedures. 
              No download required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => navigate('/simulation')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-all shadow-lg shadow-green-900/50 hover:shadow-green-500/30 hover:scale-105"
              >
                <Play className="h-5 w-5" />
                Launch Simulator
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Radar className="h-4 w-4 text-green-500" />
                <span>STARS Display</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Headphones className="h-4 w-4 text-green-500" />
                <span>AI Pilots</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Gamepad2 className="h-4 w-4 text-green-500" />
                <span>Leaderboards</span>
              </div>
            </div>
          </div>

          {/* Right - Simulator Preview */}
          <div 
            onClick={() => navigate('/simulation')}
            className="relative cursor-pointer group"
          >
            <div className="relative bg-slate-800/80 border-2 border-green-500/30 rounded-2xl p-2 shadow-2xl shadow-green-900/20 group-hover:border-green-500/60 transition-all group-hover:scale-[1.02]">
              {/* Fake Radar Screen */}
              <div className="bg-slate-950 rounded-xl aspect-video flex items-center justify-center relative overflow-hidden">
                {/* Radar circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border border-green-500/20"></div>
                  <div className="absolute w-1/2 h-1/2 rounded-full border border-green-500/30"></div>
                  <div className="absolute w-1/4 h-1/4 rounded-full border border-green-500/40"></div>
                </div>
                
                {/* Simulated aircraft targets */}
                <div className="absolute top-1/4 left-1/3 text-green-400 text-xs font-mono">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>AAL1234</span>
                  </div>
                  <span className="text-green-500/70">350 280</span>
                </div>
                <div className="absolute top-1/2 right-1/4 text-green-400 text-xs font-mono">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>UAL567</span>
                  </div>
                  <span className="text-green-500/70">320 250</span>
                </div>
                <div className="absolute bottom-1/3 left-1/2 text-green-400 text-xs font-mono">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>SWA890</span>
                  </div>
                  <span className="text-green-500/70">280 220</span>
                </div>

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                  <div className="w-20 h-20 rounded-full bg-green-600/90 flex items-center justify-center shadow-lg shadow-green-900/50 group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                </div>
              </div>
              
              {/* Label */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-600 text-white text-sm font-medium rounded-full shadow-lg">
                Click to Play Free
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorBanner;
