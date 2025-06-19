import React, { useState, useEffect } from 'react';
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('day');
  const [cityTheme, setCityTheme] = useState('');
  const [weatherClass, setWeatherClass] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true); 
  const suggestedCities = ['Colombo', 'NuwaraEliya', 'Gampaha', 'Negombo', 'Kandy', 'Matara', 'Jaffna', 'Batticaloa', 'Trincomalee', 'Anuradhapura']; 

  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);


  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    const hour = new Date().getHours();
    setTheme(hour >= 10 && hour < 22 ? 'day' : 'night');
  }, []);

  const fetchWeather = async (selectedCity) => {
    const searchCity = selectedCity || city;
    if (!searchCity) return;

    setLoading(true);
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchCity}&days=5`
      );
      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
        setWeather(null);
        setCityTheme('');
        setWeatherClass('');
        setForecast(null);
      } else {
        setWeather(data);
        setError('');
        setCityTheme(data.current.is_day ? 'day' : 'night');
        const condition = data.current.condition.text.toLowerCase();
        if (condition.includes('clear')) setWeatherClass('clear');
        else if (condition.includes('cloud')) setWeatherClass('cloudy');
        else if (condition.includes('rain')) setWeatherClass('rainy');
        else if (condition.includes('snow')) setWeatherClass('snowy');
        else if (condition.includes('sunny')) setWeatherClass('sunny');
        else setWeatherClass('default');

        setForecast(data.forecast?.forecastday);
      }
    } catch (err) {
      setError('Failed to fetch weather');
      setWeather(null);
      setCityTheme('');
      setWeatherClass('');
      setForecast(null);
    } finally {
      setLoading(true);
    }
  };


  const handleSuggestionClick = (selectedCity) => {
    setCity(selectedCity);
    setShowSuggestions(false);
    fetchWeather(selectedCity);
  }; 

  const renderRainEffect = () => {
    if (weatherClass !== 'rainy') return null;
    return (
      <div className="rain-effect">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="raindrop"
            style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }}
          />
        ))}
      </div>
    );
  };

  const renderSnowEffect = () => {
    if (weatherClass !== 'snowy') return null;
    return (
      <div className="snow-effect">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme}`}>
      <div className={`weather-background ${cityTheme}-${weatherClass} absolute inset-0`} />
      {renderRainEffect()}
      {renderSnowEffect()}
      <div className="relative z-10 bg-white bg-opacity-90 p-10 rounded-xl shadow-2xl w-auto max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Weather Reporter
        </h2>
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fetchWeather();
              }
            }}
            className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />

          <button
            onClick={() => fetchWeather()}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
            Get Weather
          </button>
        </div>

        {showSuggestions && (
          <div className="flex flex-wrap gap-4 mb-6 justify-center">
            {suggestedCities.map((c) => (
              <span
                key={c}
                onClick={() => handleSuggestionClick(c)}
                className="px-4 py-2 bg-gray-200 rounded-full text-gray-800 font-semibold cursor-pointer hover:bg-gray-300 transition flex items-center justify-center min-w-[100px]">
                {c}
              </span>
            ))}
          </div>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}
        {weather && (
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              {weather.location.name}, {weather.location.country}
            </h3>
            <p className="text-gray-600">
              Temperature: {weather.current.temp_c}°C
            </p>
            <p className="text-gray-600">
              Humidity: {weather.current.humidity}%
            </p>
            <p className="text-gray-600">
              Wind Speed: {weather.current.wind_kph} kph
            </p>
            <p className="text-gray-600">
              UV Index: {weather.current.uv}
            </p>
            <img src={weather.current.condition.icon} alt="weather icon" className="mx-auto my-2" />
            <p className="text-gray-600 font-medium">
              {weather.current.condition.text}
            </p>
          </div>
        )}

        {forecast && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              5-Day Forecast:
            </h4>
            <div className="flex gap-4 overflow-x-auto">
              {forecast.map((day) => (
                <div
                  key={day.date}
                  className="flex-shrink-0 p-4 bg-gray-100 rounded-lg shadow-md text-center w-32 text-gray-700">
                  <p className="font-semibold">{day.date}</p>
                  <img src={day.day.condition.icon} alt="Weather icon" className="mx-auto" />
                  <p>{day.day.condition.text}</p>
                  <p>Max: {day.day.maxtemp_c}°C</p>
                  <p>Min: {day.day.mintemp_c}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center my-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-gray-500"></div>
          </div>
        )}



      </div>
    </div>
  );

};

export default Weather;
