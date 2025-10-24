import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Loader, CloudLightning, CloudFog } from 'lucide-react';

interface WeatherData {
  name: string;
  temp: number;
  condition: string;
  icon: React.ElementType;
  color: string;
}

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cities in Sri Lanka to fetch weather for
  const cities = ['Colombo', 'Kandy', 'Galle'];

  // Get icon and color based on weather condition
  const getWeatherVisuals = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return { icon: Sun, color: 'from-yellow-400 to-orange-400' };
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return { icon: CloudRain, color: 'from-blue-400 to-cyan-400' };
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return { icon: Cloud, color: 'from-gray-400 to-slate-400' };
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      return { icon: CloudLightning, color: 'from-indigo-500 to-purple-500' };
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist') || conditionLower.includes('haze')) {
      return { icon: CloudFog, color: 'from-gray-300 to-gray-500' };
    }
    return { icon: Cloud, color: 'from-gray-400 to-slate-400' };
  };

  // Fetch weather data for a city
  const fetchCityWeather = async (city: string) => {
    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},LK&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Error fetching weather for ${city}`);
      }

      const data = await response.json();
      const visuals = getWeatherVisuals(data.weather[0].main);
      
      return {
        name: data.name,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        icon: visuals.icon,
        color: visuals.color
      };
    } catch (err) {
      console.error(`Failed to fetch weather for ${city}:`, err);
      return null;
    }
  };

  // Fetch all city weather data
  const fetchAllCitiesWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherPromises = cities.map(city => fetchCityWeather(city));
      const results = await Promise.all(weatherPromises);
      const validResults = results.filter(result => result !== null) as WeatherData[];
      
      if (validResults.length === 0) {
        throw new Error("Could not fetch weather data for any cities");
      }
      
      setWeatherData(validResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data");
      // Fallback to static data if API fails
      setWeatherData([
        { name: 'Colombo', temp: 28, condition: 'Sunny', icon: Sun, color: 'from-yellow-400 to-orange-400' },
        { name: 'Kandy', temp: 24, condition: 'Rainy', icon: CloudRain, color: 'from-blue-400 to-cyan-400' },
        { name: 'Galle', temp: 26, condition: 'Cloudy', icon: Cloud, color: 'from-gray-400 to-slate-400' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather data on component mount and refresh every 5 minutes
  useEffect(() => {
    fetchAllCitiesWeather();
    
    // Set up interval for real-time updates (every 5 minutes)
    const interval = setInterval(() => {
      fetchAllCitiesWeather();
    }, 5 * 60 * 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Live <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-gray-400 text-lg font-light">Real-time weather across Sri Lanka</p>
          {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
          {loading && weatherData.length === 0 && (
            <div className="flex justify-center mt-4">
              <Loader className="w-6 h-6 text-[#4CC9F0] animate-spin" />
            </div>
          )}
          {!loading && weatherData.length > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          )}
        </div>

        {(weatherData.length > 0 || loading) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {weatherData.map((city, index) => (
              <div
                key={index}
                className="glass glass-border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:glow-cyan group"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">{city.name}</h3>
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${city.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <city.icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-5xl font-bold text-[#4CC9F0]">{city.temp}</span>
                  <span className="text-2xl text-gray-400">°C</span>
                </div>
                <p className="text-gray-400 font-light">{city.condition}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
