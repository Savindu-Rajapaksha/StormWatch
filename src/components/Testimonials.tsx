export default function Testimonials() {
  const testimonials = [
    {
      name: 'Ashan Perera',
      role: 'Colombo Resident',
      feedback: 'StormWatch saved my family during the last cyclone. The alerts came just in time!',
      avatar: 'AP',
    },
    {
      name: 'Nisha Fernando',
      role: 'Business Owner',
      feedback: 'Accurate and reliable. I can now plan my operations around weather conditions.',
      avatar: 'NF',
    },
    {
      name: 'Kamal Silva',
      role: 'Fisherman',
      feedback: 'Essential for my daily work. Real-time alerts help me stay safe at sea.',
      avatar: 'KS',
    },
  ];

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-[#0A0A0C] to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="text-gray-400 text-lg font-light">Trusted by thousands across Sri Lanka</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass glass-border rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:border-[#4CC9F0]"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4CC9F0] to-[#4895EF] flex items-center justify-center font-bold text-lg border-2 border-[#4CC9F0] glow-cyan">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400 font-light">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 font-light leading-relaxed">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
