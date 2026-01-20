"use client";

import { useEffect, useState } from "react";
import {SunIcon,  CloudIcon, CloudArrowDownIcon,} from "@heroicons/react/24/solid";

export default function WeatherApp() {
  const [info, setInfo] = useState("");
  const [city, setCity] = useState(""); 
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const fetchWeather = async (searchCity = city) => {
    if (!searchCity.trim()) {
      setInfo("Please enter the city name");
      setWeather(null);
      setError("");
      return;
    }

    try {
      setInfo("");
      setLoading(true);
      setError("");
      const res = await fetch(
        //weather api fetch
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("Kathmandu");
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getIcon = (main) => {
    if (main === "Clear") return <SunIcon className="icon sun" />;
    if (main === "Rain") return <CloudArrowDownIcon className="icon rain" />;
    return <CloudIcon className="icon cloud" />;
  };

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>

      <p className="datetime">
        {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
      </p>

      <div className="searchBox">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={() => fetchWeather(city)}>Search</button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {info && <p className="info">{info}</p>}

      {weather && !loading && (
        <div className="card">
          {getIcon(weather.weather[0].main)}
          <h2>{weather.name}</h2>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="description">{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
