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