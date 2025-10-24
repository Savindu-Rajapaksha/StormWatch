import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onViewDemo: () => void;
}

export default function Hero({ onGetStarted, onViewDemo }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight fade-in">
          Stay Safe with
          <br />
          <span className="gradient-text text-glow">Real-Time Alerts</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 fade-in font-light" style={{ animationDelay: '0.2s' }}>
          Advanced weather monitoring for Sri Lanka. Get instant alerts, personalized notifications, and stay ahead of the storm.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 fade-in" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={onGetStarted}
            className="group px-8 py-4 bg-gradient-to-r from-[#4CC9F0] to-[#4895EF] rounded-full font-bold text-lg text-white transition-all duration-300 hover:scale-105 hover:glow-cyan-strong flex items-center space-x-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onViewDemo}
            className="px-8 py-4 glass glass-border rounded-full font-bold text-lg text-white transition-all duration-300 hover:scale-105 hover:border-[#4CC9F0] flex items-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>View Demo</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4CC9F0] mb-1">24/7</div>
            <div className="text-sm text-gray-400 font-light">Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4CC9F0] mb-1">10k+</div>
            <div className="text-sm text-gray-400 font-light">Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4CC9F0] mb-1">99.9%</div>
            <div className="text-sm text-gray-400 font-light">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
}
