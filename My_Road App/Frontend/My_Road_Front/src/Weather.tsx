import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface WeatherEntry {
  date: string;
  time: string;
  values: Record<string, number>;
}

const Weather: React.FC = () => {
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('tunis');
  const [weatherData, setWeatherData] = useState<WeatherEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/weather_data/${selectedGovernorate}`, {
          withCredentials: true,
        });
        setWeatherData(response.data.weather_data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [selectedGovernorate]); // Run effect when selectedGovernorate changes

  const handleGovernorateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGovernorate(event.target.value);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Weather Data</h1>
      <div className="form-group">
        <label htmlFor="governorateSelect">Select Governorate:</label>
        <br/>
        <select
          id="governorateSelect"
          className="form-control"
          value={selectedGovernorate}
          onChange={handleGovernorateChange}
        > 
        <option value="tunis">Tunis</option>
        <option value="sousse">Sousse</option>
        <option value="ariana">Ariana</option>
        <option value="beja">Béja</option>
        <option value="seliana">Seliana</option>
        <option value="bizerte">Bizerte</option>
        <option value="benarous">Ben Arous</option>
        <option value="gabes">Gabés</option>
        <option value="gafsa">Gafsa</option>
        <option value="jendouba">Jendouba</option>
        <option value="kairouan">Kairouan</option>
        <option value="kasserine">Kasserine</option>
        <option value="tozeur">Tozeur</option>
        <option value="elkef">El Kef</option>
        <option value="mahdia">Mahdia</option>
        <option value="manouba">La Manouba</option>
        <option value="mednine">Médnine</option>
        <option value="monastir">Monastir</option>
        <option value="nabeul">Nabeul</option>
        <option value="sfax">Sfax</option>
        <option value="sidibouzid">Sidi Bouzid</option>
        <option value="tataouine">Tataouin</option>
        <option value="zaghouan">Zaghouan</option>
        <option value="kebili">Kébili</option>
        </select>
      </div>
      <div className="row">
        {weatherData.map((entry, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Date: {entry.date}</h5>
                <p className="card-text">Time: {entry.time}</p>
                <ul className="list-group mt-2">
                  {Object.entries(entry.values).map(([key, value]) => (
                    <li key={key} className="list-group-item">
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
