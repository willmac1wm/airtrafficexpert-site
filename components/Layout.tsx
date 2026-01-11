import React from 'react';
import { Plane, Menu, X, Gamepad2, Home, Briefcase, Cpu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/services', label: 'Services', icon: Briefcase },
    { path: '/blog', label: 'Blog', icon: Briefcase },
    { path: '/simulation', label: 'Simulator', icon: Gamepad2 },
    { path: '/admin-tools', label: 'Internal Tools', icon: Cpu },
  ];

  return (
    <div className="min-h-[600px] flex flex-col bg-slate-50 relative">
      {/* Navigation */}
      <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                  <Plane className="h-6 w-6 text-white transform -rotate-45" />
                </div>
                <span className="font-bold text-xl tracking-tight">Air Traffic<span className="text-blue-400">Expert</span></span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                    isActive(item.path)
                      ? 'bg-slate-800 text-blue-400'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                    isActive(item.path)
                      ? 'bg-slate-900 text-white'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-6 w-6 text-blue-500 transform -rotate-45" />
              <span className="font-bold text-xl text-white">Air Traffic Expert</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Providing world-class Air Traffic Control consulting, training development, and expert witness services.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-blue-400">ATC Consulting</Link></li>
              <li><Link to="/services" className="hover:text-blue-400">Training Development</Link></li>
              <li><Link to="/services" className="hover:text-blue-400">Expert Witness</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Content</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/podcast" className="hover:text-blue-400">Podcast</Link></li>
              <li><Link to="/youtube" className="hover:text-blue-400">YouTube</Link></li>
              <li><Link to="/news" className="hover:text-blue-400">Industry News</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} Air Traffic Expert. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;