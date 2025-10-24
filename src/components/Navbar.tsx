import { useState } from 'react';
import { Menu, X, Cloud } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
  onGetStarted: () => void;
  onCheckWeather: () => void;
}

export default function Navbar({ scrolled, onGetStarted, onCheckWeather }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Dashboard', href: '#dashboard' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass glass-border shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <Cloud className="w-8 h-8 text-[#4CC9F0]" strokeWidth={2.5} />
            <span className="text-2xl font-bold gradient-text">StormWatch</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#4CC9F0] transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onCheckWeather}
              className="relative px-6 py-2.5 bg-gradient-to-r from-[#4CC9F0] to-[#4895EF] rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:glow-cyan-strong"
            >
              Check Weather
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass glass-border scale-in">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-gray-300 hover:text-[#4CC9F0] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                onCheckWeather();
                setMobileMenuOpen(false);
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#4CC9F0] to-[#4895EF] rounded-full font-semibold text-white transition-all duration-300 hover:glow-cyan"
            >
              Check Weather
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
