import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from "./pages/forecastTab/ForecastTab";
import TodayTab from "./pages/todayTab/TodayTab";
const apiKey = '5e7043cbf2eea560303714fba10948d7'

function App() {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('');
    const [error, toggleError] = useState(false);

    useEffect(() => {
  async function fetchData(){
    toggleError(false);

    try {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${apiKey}&lang=nl`);
      console.log(result.data);
      setWeatherData(result.data); //dit doe je zodat de response niet gevangen blijft binnen de scope van fetchData
  } catch (e) {
      console.error(e);
      toggleError(true);
    }
  }
  if (location) {
    fetchData();
  }
    }, [location]);

  return (
    <>
      <div className="weather-container">

        {/*HEADER -------------------- */}
        <div className="weather-header">
          <SearchBar setLocationHandler={setLocation}/>
          {error &&
            <span className="wrong-location-error">
              <p>Oeps! Deze locatie bestaat niet.</p>
            </span>
          }

          <span className="location-details">
            {Object.keys(weatherData).length > 0 &&
                <>
                  <h2>{weatherData.weather[0].description}</h2>
                  <h3>{weatherData.name}</h3>
                  <h1>{weatherData.main.temp}</h1>
                </>
            }

            {/*<button
                type="button"
                onClick={fetchData} // Dit zorgt dat er een functie aan de button komt te hangen.
            >
              Haal data op!
            </button>*/}
          </span>
        </div>

        {/*CONTENT ------------------ */}
        <div className="weather-content">
          <TabBarMenu/>

          <div className="tab-wrapper">
              <Routes>
                  <Route path="/" element={<TodayTab />} />
                  <Route path="/komende-week" element={<ForecastTab coordinates={weatherData.coord}/>} />
              </Routes>
          </div>
        </div>

        <MetricSlider/>
      </div>
    </>
  );
}

export default App;
