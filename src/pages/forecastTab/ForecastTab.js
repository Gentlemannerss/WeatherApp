import React, { useEffect, useState, useContext } from 'react';
import { TempContext } from '../../context/TempContextProvider';
import axios from 'axios';
import './ForecastTab.css';
import createDateString from '../../helpers/createDateString';

/* Dit kan dus in een helper functie:
function createDateString(timestamp) {
    const day = new Date(timestamp * 1000);
    return day.toLocaleDateString('nl-NL', { weekday: 'long'});
}*/

function ForecastTab({ coordinates }) {
    const [forecasts, setForecasts] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const { kelvinToMetric } = useContext(TempContext);

    useEffect(() => {
        async function fetchForecasts() {
            toggleLoading(true);
            try {
            toggleError(false);
                if (coordinates) {
                    const {lat, lon} = coordinates;
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely,current,hourly&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);

                    const fiveDayForecast = response.data.list.filter((singleForecast) => {
                        return singleForecast.dt_txt.includes("12:00:00");
                    })
                    /*
                    // Transform the received data into the expected format
                    const transformedForecasts = response.data.list.map(forecastItem => ({
                        day: forecastItem.dt_txt,
                        temperature: forecastItem.main.temp,
                        description: forecastItem.weather[0].description
                    }));
                    */

                    // Update the forecasts state with the transformed data
                    setForecasts(fiveDayForecast);
                }
            } catch (error) {
                console.error(error);
                toggleError(true);
            }
            toggleLoading(false);
        }

        fetchForecasts();
    }, [coordinates]); // Voeg coordinates toe aan de dependency array

    return (
        <div className="tab-wrapper">
            {forecasts && forecasts.map((forecast) => {
                return (
                    <article className="forecast-day" key={forecast.dt}>
                        <p className="day-description">
                            {createDateString(forecast.dt)}
                        </p>
                        <section className="forecast-weather">
              <span>
                {kelvinToMetric(forecast.temp.day)}
              </span>
                            <span className="weather-description">
                {forecast.weather[0].description}
              </span>
                        </section>
                    </article>
                )
            })}

            {!forecasts && !error && (
                <span className="no-forecast">
          Zoek eerst een locatie om het weer voor deze week te bekijken
        </span>
            )}

            {error && <span>Er is iets misgegaan met het ophalen van de data.</span>}

            {loading && (<span>Loading...</span>)}
        </div>
    );
}


export default ForecastTab;