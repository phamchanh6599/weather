import React, { useContext } from "react";

import { HomeContext } from "context/HomeContext";
import Sun from "images/sun.png";
import FullMoon from "images/full-moon.png";
import PartlyCloudyDay from "images/partly-cloudy-day.png";
import PartlyCloudyNight from "images/partly-cloudy-night.png";
import ModerateRain from "images/moderate-rain.png";
import Cloud from "images/clouds.png";
import PartlyCloudyRain from "images/partly-cloudy-rain.png";
import RainyNight from "images/rainy-night.png";
import ChanceOfStorm from "images/chance-of-storm.png";
import StormNight from "images/stormy-night.png";

import "./SearchResult.css";

const WeatherIcons = {
  "01d": <img src={Sun} alt="Sun" />,
  "01n": <img src={FullMoon} alt="FullMoon" />,
  "02d": <img src={PartlyCloudyDay} alt="PartlyCloudyDay" />,
  "02n": <img src={PartlyCloudyNight} alt="PartlyCloudyNight" />,
  "03d": <img src={ModerateRain} alt="ModerateRain" />,
  "03n": <img src={ModerateRain} alt="ModerateRain" />,
  "04d": <img src={Cloud} alt="Cloud" />,
  "04n": <img src={PartlyCloudyNight} alt="PartlyCloudyNight" />,
  "09d": <img src={PartlyCloudyRain} alt="PartlyCloudyRain" />,
  "09n": <img src={RainyNight} alt="RainyNight" />,
  "10d": <img src={PartlyCloudyRain} alt="PartlyCloudyRain" />,
  "10n": <img src={RainyNight} alt="RainyNight" />,
  "11d": <img src={ChanceOfStorm} alt="ChanceOfStorm" />,
  "11n": <img src={StormNight} alt="StormNight" />,
};

const SearchResult = () => {
  const { weather } = useContext(HomeContext);

  if (!weather?.time) return <> </>;

  return (
    <div className="search-result-container">
      <div className="search-result">
        <div className="search-result-area">{weather.area}</div>
        <div className="search-result-main">
          <span>{weather.main}</span>
          <div>{WeatherIcons[weather.icon]}</div>
        </div>
        <div className="search-result-info">
          <span className="search-result-info-title">Description: </span>
          <span className="search-result-info-text">{weather.description}</span>
        </div>
        <div className="search-result-info">
          <span className="search-result-info-title">Humidity: </span>
          <span className="search-result-info-text">{weather.humidity}</span>
        </div>
        <div className="search-result-info">
          <span className="search-result-info-title">Temperature: </span>
          <span className="search-result-info-text">
            {weather.tempMin} &deg;C ~ {weather.tempMax} &deg;C
          </span>
        </div>
        <div className="search-result-info">
          <span className="search-result-info-title">Time: </span>
          <span className="search-result-info-text">{weather.time}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SearchResult);
