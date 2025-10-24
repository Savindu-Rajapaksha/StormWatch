import { UserPlus, Bell, Shield, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Register',
      description: 'Create your account in seconds',
    },
    {
      icon: Bell,
      title: 'Subscribe',
      description: 'Choose your location and preferences',
    },
    {
      icon: Shield,
      title: 'Get Alerts',
      description: 'Receive real-time weather notifications',
    },
    {
      icon: CheckCircle,
      title: 'Stay Safe',
      description: 'Be prepared for any weather condition',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-32 px-6 bg-gradient-to-b from-transparent via-[#0A0A0C] to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-400 text-lg font-light">Simple steps to stay protected</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#4CC9F0] to-transparent transform -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full glass glass-border flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 hover:border-[#4CC9F0] hover:glow-cyan relative z-10 bg-[#0E0E10]">
                    <step.icon className="w-10 h-10 text-[#4CC9F0]" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
