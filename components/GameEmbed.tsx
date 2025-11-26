import React from 'react';
import { Play, Maximize2, Settings, Volume2 } from 'lucide-react';

const GameEmbed: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
      <div className="bg-slate-800 px-4 py-3 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="ml-3 text-slate-300 font-mono text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            ATC_SIMULATOR_V1.0
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <button className="hover:text-white transition-colors"><Volume2 size={18} /></button>
          <button className="hover:text-white transition-colors"><Settings size={18} /></button>
          <button className="hover:text-white transition-colors"><Maximize2 size={18} /></button>
        </div>
      </div>
      
      {/* Game Container - This is where the user would paste their iframe or canvas code */}
      <div className="relative w-full aspect-video bg-black flex flex-col items-center justify-center overflow-hidden">
        
        {/* Placeholder Content for the Game */}
        <div className="text-center p-8 z-10">
            <div className="mb-6 inline-block p-4 rounded-full bg-green-900/20 border border-green-500/30">
                <Play className="h-12 w-12 text-green-500 ml-1" />
            </div>
            <h3 className="text-green-500 font-mono text-2xl mb-4 tracking-widest">SIMULATION READY</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto font-mono text-sm">
                Initialize the Air Traffic Control radar simulation. Please ensure your browser supports WebGL.
            </p>
            
            <button className="group relative px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-mono uppercase tracking-wider text-sm font-bold transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] overflow-hidden">
                <span className="relative z-10">Start Simulation</span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:bg-green-400/30"></div>
            </button>
        </div>

        {/* Radar Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-green-500/10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-green-500/10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-green-500/10 rounded-full"></div>
            
            {/* Rotating Scan Line */}
            <div className="absolute top-1/2 left-1/2 w-[50%] h-[50%] origin-top-left bg-gradient-to-r from-green-500/20 to-transparent animate-[spin_4s_linear_infinite] rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}></div>
        </div>
      </div>

      <div className="bg-slate-800 px-6 py-3 border-t border-slate-700 flex justify-between items-center text-xs text-slate-500 font-mono">
        <div>SERVER: US-EAST-1</div>
        <div className="flex gap-4">
           <span>FPS: 60</span>
           <span>PING: 24ms</span>
        </div>
      </div>
    </div>
  );
};

export default GameEmbed;