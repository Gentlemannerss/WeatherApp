import React, {useEffect, useState} from 'react';
import './TodayTab.css';
import axios from "axios";
import WeatherDetail from '../../components/weatherDetail/WeatherDetail';
import createTimeString from '../../helpers/createTimeString';

function TodayTab({ coordinates }) {
	const [forecasts, setForecasts] = useState([]);
	const [error, toggleError] = useState(false);
	const [loading, toggleLoading] = useState(false);

	useEffect(() => {
		async function fetchForecast() {
			toggleLoading(true);
			try {
				const {lat, lon} = coordinates;
				const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);
				if (response.data) {
					toggleError(false);
				}
				console.log(response.data);
				setForecasts(response.data.list.slice(0, 3));
			} catch(e) {
				console.error(e);
				toggleError(true);
			}
			toggleLoading(false);
		}
		if (coordinates) {
			void fetchForecast();
		}
	}, [coordinates]);

	return(
		<div className="tab-wrapper">
			<div className="chart">
				{Object.keys(forecasts).length === 0 && !error &&
					<span className="no-forecast">
      Zoek eerst een locatie om het weer voor vandaag te bekijken
    </span>
				}
				{Object.keys(forecasts).length > 0 &&
					<>
						{forecasts.map((forecast) => {
							return (
								<WeatherDetail
									key={forecast.dt}
									type={forecast.weather[0].main}
									description={forecast.weather[0].description}
									temperature={forecast.main.temp}>

								</WeatherDetail>
							)
						})}
					</>
				}

			</div>
			<div className="legend">

				{Object.keys(forecasts).length > 0 &&
					<>
						{forecasts.map((forecast) => {
							return (
								<span key={`${forecast.dt}-timestamp`}>{createTimeString(forecast.dt)}</span>
							)
						})}
					</>
				}
			</div>
			{
				error && <span>Er is iets misgegaan met het ophalen van de data</span>
			}
			{
				loading && <span>Loading...</span>
			}
		</div>
	);
}

export default TodayTab;
