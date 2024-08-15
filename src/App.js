import React, { useEffect, useState } from "react";
import MainMenu from "./MainMenu";

const api = {
  key: "a22dcdbfdef32930501e074be2df070c",
  base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [OtherCountriesWeather, setOtherCountriesWeather] = useState([]);

  useEffect(() => {
    const cities = ["Jakarta", "New York", "Tokyo", "Sydney", "Paris"];
    Promise.all(
      cities.map((city) =>
        fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
          .then((res) => res.json())
          .then((result) => result)
      )
    ).then((data) => {
      setOtherCountriesWeather(data);
    });
  }, []);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          alert("Fetch error: " + error.message);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app cold"
          : "app"
      }
    >
      {showMainMenu ? (
        <MainMenu onStart={() => setShowMainMenu(false)} />
      ) : (
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyDown={search}
            />
          </div>
          <div>
            {typeof weather.main !== "undefined" ? (
              <div>
                <div className="location-box">
                  <div className="location">
                    {weather.name}, {weather.sys.country}
                  </div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                  <div className="temp">{Math.round(weather.main.temp)}°C</div>
                  <div className="weather">{weather.weather[0].main}</div>
                </div>
              </div>
            ) : (
              <div className="weather-box">
                <div className="menu">
                  <div className="title">AXIS WEATHER</div>
                  <div className="made">by Nolan</div>
                  <div className="other-countries-weather">
                    {OtherCountriesWeather.map((countryWeather, index) => (
                      <div key={index} className="country-weather">
                        <h3>
                          {countryWeather.name}, {countryWeather.sys.country}
                        </h3>
                        <p>{Math.round(countryWeather.main.temp)}°C</p>
                        <p>{countryWeather.weather[0].main}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
