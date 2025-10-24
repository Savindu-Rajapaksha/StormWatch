import { Cloud } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative py-10 px-6 bg-[#0A0A0C] border-t border-[#4CC9F0]/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Cloud className="w-5 h-5 text-[#4CC9F0]" strokeWidth={2.5} />
            <span className="text-lg font-bold gradient-text">StormWatch</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#features" className="text-gray-400 hover:text-[#4CC9F0] transition-colors duration-200 text-sm">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-400 hover:text-[#4CC9F0] transition-colors duration-200 text-sm">
              How It Works
            </a>
            <a href="#dashboard" className="text-gray-400 hover:text-[#4CC9F0] transition-colors duration-200 text-sm">
              Dashboard
            </a>
          </div>
          
          <div className="text-gray-500 text-sm font-light">
            © {currentYear} StormWatch. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}