import axios from 'axios';
import React, {useState} from 'react';
import './App.css';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
const apiKey = '5e7043cbf2eea560303714fba10948d7'

function App() {
    const [weatherData, setWeatherData] = useState({});
  async function fetchData(){
    try {
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=utrecht,nl&appid=${apiKey}&lang=nl`);
    console.log(result.data);
    setWeatherData(result.data); //dit doe je zodat de response niet gevangen blijft binnen de scope van fetchData
  } catch (e) {
    console.error(e)
    }
  }

  return (
    <>
      <div className="weather-container">

        {/*HEADER -------------------- */}
        <div className="weather-header">
          <SearchBar/>

          <span className="location-details">
            {Object.keys(weatherData).length > 0 &&
                <>
                  <h2>{weatherData.weather[0].description}</h2>
                  <h3>{weatherData.name}</h3>
                  <h1>{weatherData.main.temp}</h1>
                </>
            }

            <button
                type="button"
                onClick={fetchData} // Dit zorgt dat er een functie aan de button komt te hangen.
            >
              Haal data op!
            </button>
          </span>
        </div>

        {/*CONTENT ------------------ */}
        <div className="weather-content">
          <TabBarMenu/>

          <div className="tab-wrapper">
            Alle inhoud van de tabbladen komt hier!
          </div>
        </div>

        <MetricSlider/>
      </div>
    </>
  );
}

export default App;
