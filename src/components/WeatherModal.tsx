import { useState, useEffect } from 'react';
import { X, MapPin, Thermometer, Cloud, Loader, Search } from 'lucide-react';

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WeatherData {
  location: string;
  temp: number;
  condition: string;
  icon: string;
}

export default function WeatherModal({ isOpen, onClose }: WeatherModalProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualLocation, setManualLocation] = useState('');
  const [viewMode, setViewMode] = useState<'auto' | 'manual'>('auto');

  useEffect(() => {
    if (isOpen && viewMode === 'auto') {
      fetchWeatherByGeolocation();
    }
  }, [isOpen, viewMode]);

  const fetchWeatherByGeolocation = async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
      },
      () => {
        setError('Unable to detect location. Please enable location access or use manual search.');
        setLoading(false);
      }
    );
  };

  const fetchWeatherByCoordinates = async (latitude: number, longitude: number) => {
    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
      if (!API_KEY) {
        throw new Error('Missing OpenWeather API key (VITE_OPENWEATHER_API_KEY)');
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const msg = body?.message ? `OpenWeather error ${response.status}: ${body.message}` : `OpenWeather error ${response.status}`;
        throw new Error(msg);
      }

      const data = await response.json();

      setWeatherData({
        location: data.name,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        icon: data.weather[0].icon,
      });
    } catch (err) {
      console.error('Weather fetch failed:', err);
      setError(err instanceof Error ? err.message : 'Weather data unavailable at the moment.');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    if (!city.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
      if (!API_KEY) {
        throw new Error('Missing OpenWeather API key (VITE_OPENWEATHER_API_KEY)');
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Location not found. Please check the spelling and try again.');
        }
        const body = await response.json().catch(() => null);
        const msg = body?.message ? `OpenWeather error ${response.status}: ${body.message}` : `OpenWeather error ${response.status}`;
        throw new Error(msg);
      }

      const data = await response.json();

      setWeatherData({
        location: data.name,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        icon: data.weather[0].icon,
      });
    } catch (err) {
      console.error('Weather fetch failed:', err);
      setError(err instanceof Error ? err.message : 'Weather data unavailable at the moment.');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeatherByCity(manualLocation);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 scale-in"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <div
        className="relative glass glass-border rounded-2xl p-8 max-w-sm w-full scale-in"
        style={{ border: '1px solid #4CC9F0', boxShadow: '0 0 30px rgba(76, 201, 240, 0.3)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#4CC9F0] transition-colors duration-200"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 gradient-text text-center">Weather Check</h2>
          
          <div className="flex justify-center space-x-4 mb-6">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${viewMode === 'auto' 
                ? 'bg-gradient-to-r from-[#4CC9F0] to-[#4895EF] text-white' 
                : 'bg-transparent border border-[#4CC9F0]/40 text-gray-300 hover:border-[#4CC9F0]'}`}
              onClick={() => setViewMode('auto')}
            >
              Current Location
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${viewMode === 'manual' 
                ? 'bg-gradient-to-r from-[#4CC9F0] to-[#4895EF] text-white' 
                : 'bg-transparent border border-[#4CC9F0]/40 text-gray-300 hover:border-[#4CC9F0]'}`}
              onClick={() => setViewMode('manual')}
            >
              Search Location
            </button>
          </div>

          {viewMode === 'manual' && (
            <form onSubmit={handleManualSubmit} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                  placeholder="Enter city name..."
                  className="w-full bg-transparent border-b-2 border-[#4CC9F0]/30 py-3 px-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#4CC9F0] transition-all duration-300 focus:glow-cyan pr-10"
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-[#4CC9F0] hover:text-[#4895EF] transition-colors"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          )}
        </div>

        {loading && (
          <div className="text-center py-12">
            <Loader className="w-12 h-12 text-[#4CC9F0] mx-auto mb-4 animate-spin" />
            <p className="text-gray-400 font-light">Fetching weather data...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4 border border-red-500/50">
              <span className="text-3xl">⚠️</span>
            </div>
            <p className="text-gray-300 font-light">{error}</p>
          </div>
        )}

        {weatherData && !loading && !error && (
          <div className="text-center py-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MapPin className="w-5 h-5 text-[#4CC9F0]" />
              <h3 className="text-2xl font-bold">{weatherData.location}</h3>
            </div>

            <div className="w-24 h-24 mx-auto mb-6">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
                alt={weatherData.condition}
                className="w-full h-full"
              />
            </div>

            <div className="flex items-baseline justify-center space-x-2 mb-4">
              <Thermometer className="w-6 h-6 text-[#4CC9F0]" />
              <span className="text-6xl font-bold text-[#4CC9F0]">{weatherData.temp}</span>
              <span className="text-3xl text-gray-400">°C</span>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <Cloud className="w-5 h-5 text-gray-400" />
              <p className="text-xl text-gray-300 font-light">{weatherData.condition}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
