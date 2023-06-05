import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ForecastTab.css';

const apiKey = '5e7043cbf2eea560303714fba10948d7'
function createDateString(timestamp) {
    const day = new Date(timestamp * 1000);
    return day.toLocaleDateString('nl-NL', { weekday: 'long'});
}

function ForecastTab({ coordinates }) {
    const [forecasts, setForecasts] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetchForecasts() {
            toggleLoading(true);
            try {
            toggleError(false);
                if (coordinates) {
                    const {lat, lon} = coordinates;
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely,current,hourly&appid=${apiKey}&lang=nl`);

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
            {error && <span>Er is iets misgegaan met het ophalen van de data</span>}
            {loading && <span>De data wordt opgehaald.</span>}
            {forecasts.length === 0 && !error &&
                <span className="no-forecast">
             Zoek eerst een locatie om het weer voor deze week te bekijken
            </span>
            }
            {/* Render de forecasts-gegevens */}
            {forecasts.map((forecast) => {
                return <article className="forecast-day" key={forecast.dt}>
                    <p className="day-description">
                        {createDateString(forecast.dt)}
                    </p>

                    <section className="forecast-weather">
                <span>
                  {forecast.main.temp}° C
                </span>
                        <span className="weather-description">
                  {forecast.weather[0].description}
                </span>
                    </section>
                </article>
            })}
        </div>
    );
}

export default ForecastTab;