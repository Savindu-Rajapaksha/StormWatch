import { Bell, User, Workflow } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Bell,
      title: 'Real-Time Alerts',
      description: 'Get instant notifications about severe weather conditions in your area.',
    },
    {
      icon: User,
      title: 'Personalized Notifications',
      description: 'Customize alerts based on your location and weather preferences.',
    },
    {
      icon: Workflow,
      title: 'Automated Workflows',
      description: 'Seamless integration with n8n for advanced automation and actions.',
    },
  ];

  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-gray-400 text-lg font-light">Everything you need to stay ahead of the storm</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass glass-border rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:border-[#4CC9F0] hover:glow-cyan group"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4CC9F0] to-[#4895EF] flex items-center justify-center mb-6 group-hover:glow-cyan-strong transition-all duration-300">
                <feature.icon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
