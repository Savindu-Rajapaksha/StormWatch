import { ArrowRight } from 'lucide-react';

interface CTAProps {
  onGetStarted: () => void;
}

export default function CTA({ onGetStarted }: CTAProps) {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="glass glass-border rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4CC9F0]/10 to-[#4895EF]/10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get instant weather alerts <br className="hidden md:block" />
              <span className="gradient-text">that save lives</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 font-light">
              Join thousands of Sri Lankans staying safe with real-time weather monitoring
            </p>
            <button
              onClick={onGetStarted}
              className="group px-10 py-4 bg-gradient-to-r from-[#4CC9F0] to-[#4895EF] rounded-full font-bold text-lg text-white transition-all duration-300 hover:scale-105 hover:glow-cyan-strong inline-flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
