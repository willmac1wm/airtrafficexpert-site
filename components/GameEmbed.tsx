import React, { useState } from 'react';
import { Play, Maximize2, ExternalLink, Zap, Target, Trophy, Radio } from 'lucide-react';

const GameEmbed: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="space-y-8">
      {/* Game Window */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-green-500/30">
        <div className="bg-slate-800 px-4 py-3 flex justify-between items-center border-b border-green-500/20">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="ml-3 text-green-400 font-mono text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              OPENSTARS RADAR TERMINAL
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a 
              href="https://stars-gate.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors flex items-center gap-1 text-sm"
            >
              <ExternalLink size={16} />
              Full Screen
            </a>
          </div>
        </div>
        
        {/* Game Container */}
        <div className="relative w-full" style={{ height: '700px' }}>
          {!gameStarted ? (
            <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden">
              {/* Radar Effect Background */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-green-500/10 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-green-500/10 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-green-500/10 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-[250px] h-[1px] origin-left bg-gradient-to-r from-green-500/40 to-transparent animate-[spin_4s_linear_infinite]"></div>
              </div>

              {/* Start Content */}
              <div className="text-center p-8 z-10">
                <h2 className="text-4xl font-bold mb-2">
                  <span className="text-green-500">OPEN</span>
                  <span className="text-white">STARS</span>
                </h2>
                <p className="text-green-400/60 font-mono text-sm mb-8">Standard Terminal Automation Replacement System</p>
                
                <div className="mb-8 inline-block p-5 rounded-full bg-green-900/20 border border-green-500/30 hover:bg-green-900/30 transition-colors cursor-pointer" onClick={() => setGameStarted(true)}>
                  <Play className="h-14 w-14 text-green-500 ml-1" />
                </div>
                
                <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm">
                  Guide aircraft through your sector using authentic FAA phraseology. 
                  Issue headings, altitudes, and speed commands to safely route traffic.
                </p>
                
                <button 
                  onClick={() => setGameStarted(true)}
                  className="group relative px-10 py-4 bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-wider transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] rounded-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Radio size={20} />
                    Begin Session
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <iframe 
              src="https://stars-gate.vercel.app"
              className="w-full h-full border-0"
              allow="microphone"
              title="OpenSTARS ATC Simulator"
            />
          )}
        </div>

        <div className="bg-slate-800 px-6 py-3 border-t border-green-500/20 flex justify-between items-center text-xs text-green-400/60 font-mono">
          <div>SECTOR: APPROACH CONTROL</div>
          <div className="flex gap-4">
            <span>MODE: TRAINING</span>
            <span className="text-green-400">● ONLINE</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
          <Target className="h-8 w-8 text-green-500 mb-3" />
          <h3 className="text-white font-semibold mb-2">Realistic Radar</h3>
          <p className="text-gray-400 text-sm">STARS-style display with data blocks, range rings, and sector boundaries.</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
          <Radio className="h-8 w-8 text-blue-500 mb-3" />
          <h3 className="text-white font-semibold mb-2">Real Commands</h3>
          <p className="text-gray-400 text-sm">Issue headings, altitudes, speeds with authentic ATC phraseology.</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
          <Zap className="h-8 w-8 text-yellow-500 mb-3" />
          <h3 className="text-white font-semibold mb-2">AI Pilots</h3>
          <p className="text-gray-400 text-sm">Intelligent pilots respond realistically with proper readbacks.</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
          <Trophy className="h-8 w-8 text-amber-500 mb-3" />
          <h3 className="text-white font-semibold mb-2">Leaderboards</h3>
          <p className="text-gray-400 text-sm">Compete globally and track your performance across sessions.</p>
        </div>
      </div>
    </div>
  );
};

export default GameEmbed;
