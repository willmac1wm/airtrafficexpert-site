import React from 'react';
import { TowerControl, GraduationCap, Gavel, Cpu, Mic, Youtube, Newspaper } from 'lucide-react';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.FC<any>> = {
  TowerControl,
  GraduationCap,
  Gavel,
  Cpu,
  Mic,
  Youtube,
  Newspaper,
};

// Custom animated radar icon for the simulator
const RadarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ width: '100%', height: '100%' }}>
    <circle cx="50" cy="50" r="45" fill="#0d1a0d" stroke="#22c55e" strokeWidth="2"/>
    <circle cx="50" cy="50" r="30" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.4"/>
    <circle cx="50" cy="50" r="15" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.4"/>
    <line x1="50" y1="5" x2="50" y2="95" stroke="#22c55e" strokeWidth="0.5" opacity="0.3"/>
    <line x1="5" y1="50" x2="95" y2="50" stroke="#22c55e" strokeWidth="0.5" opacity="0.3"/>
    <path 
      d="M50,50 L50,10 A40,40 0 0,1 85,65 Z" 
      fill="url(#radarSweep)" 
      style={{ transformOrigin: '50% 50%', animation: 'radarSpin 4s linear infinite' }}
    />
    <circle cx="50" cy="50" r="3" fill="#22c55e"/>
    <defs>
      <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(34, 197, 94, 0.8)"/>
        <stop offset="100%" stopColor="rgba(34, 197, 94, 0)"/>
      </linearGradient>
    </defs>
    <style>{`
      @keyframes radarSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </svg>
);

const Services: React.FC = () => {
  return (
    <div className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-blue-600 uppercase tracking-wide">Expertise & Content</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Specialized Aviation Solutions
          </p>
          <p className="mt-4 text-xl text-gray-500">
            We deliver precision, safety, and innovation for complex air traffic challenges, alongside industry-leading content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.iconName] || Cpu;
            const isSimulator = service.iconName === 'Radar';
            
            if (isSimulator) {
              // Special card for the simulator
              return (
                <Link 
                  key={service.id} 
                  to={service.link}
                  className="group relative bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-2xl border border-green-500/30 transition-all duration-300 flex flex-col hover:border-green-500/60 hover:shadow-green-500/20"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-t-xl"></div>
                  <div className="h-16 w-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <RadarIcon />
                  </div>
                  <h3 className="text-xl font-bold text-green-400 mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-4 flex-grow">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-green-500 font-medium group-hover:text-green-400 mt-auto">
                    Try it now <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                  </span>
                </Link>
              );
            }
            
            return (
              <div key={service.id} className="group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>
                <Link to={service.link} className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 mt-auto">
                  Learn more <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
