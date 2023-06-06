import React, { useContext }from 'react';
import './WeatherDetail.css';
import { TempContext } from '../../context/TempContextProvider';
import iconMapper from "../../helpers/iconMapper";

function WeatherDetail({ description, temp, type }) {
    const { kelvinToMetric } = useContext(TempContext);
  return (
    <section className="day-part">
      <span className="icon-wrapper">
         <span className="icon-wrapper">
            {iconMapper(type)}
         </span>
      </span>
        <p className="description">{description}</p>
        <p> {kelvinToMetric(temp)}</p>
    </section>
  );
}

export default WeatherDetail;
