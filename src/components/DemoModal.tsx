import { X, Play } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 scale-in"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <div
        className="relative glass glass-border rounded-2xl p-8 md:p-12 max-w-4xl w-full scale-in"
        style={{ border: '1px solid #4CC9F0' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#4CC9F0] transition-colors duration-200 z-10"
        >
          <X size={24} />
        </button>

        <div className="aspect-video bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl flex items-center justify-center border border-[#4CC9F0]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4CC9F0]/10 to-[#4895EF]/10" />

          <div className="relative z-10 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4CC9F0] to-[#4895EF] flex items-center justify-center mx-auto mb-6 glow-cyan-strong cursor-pointer hover:scale-110 transition-transform">
              <Play className="w-10 h-10 text-white" fill="white" />
            </div>
            <h3 className="text-2xl font-bold mb-2 gradient-text">Demo Video</h3>
            <p className="text-gray-400 font-light">See StormWatch in action</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm font-light">
            Experience how StormWatch keeps Sri Lanka safe with real-time weather monitoring
          </p>
        </div>
      </div>
    </div>
  );
}
