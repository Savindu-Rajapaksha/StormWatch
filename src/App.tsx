import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Dashboard from './components/Dashboard';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer'; // Import the Footer component
import GetStartedModal from './components/GetStartedModal';
import WeatherModal from './components/WeatherModal';
import DemoModal from './components/DemoModal';
import FloatingBlobs from './components/FloatingBlobs';

function App() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0E0E10] text-white overflow-x-hidden">
      <FloatingBlobs />

      <Navbar
        scrolled={scrolled}
        onGetStarted={() => setIsGetStartedOpen(true)}
        onCheckWeather={() => setIsWeatherModalOpen(true)}
      />

      <Hero
        onGetStarted={() => setIsGetStartedOpen(true)}
        onViewDemo={() => setIsDemoModalOpen(true)}
      />

      <Features />
      <HowItWorks />
      <Dashboard />
      <Testimonials />
      <CTA onGetStarted={() => setIsGetStartedOpen(true)} />
      <Footer /> {/* Add the Footer component here */}

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />

      <WeatherModal
        isOpen={isWeatherModalOpen}
        onClose={() => setIsWeatherModalOpen(false)}
      />

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}

export default App;
