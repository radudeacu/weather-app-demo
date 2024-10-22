import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '1b46557d02204001879112844242210';

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      setWeather(response.data);
      setError(''); // clear error if req is success
    } catch (error) {
      setWeather(null);
      setError('City not found or API error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather();
    }
  };

  return (
    <div className="card">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Enter City'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.location.name}</h2>
          <p>Temperature: {weather.current.temp_c} °C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="Weather icon" />
        </div>
      )}
    </div>
  );
};

export default App;
