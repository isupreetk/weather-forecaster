import './App.scss';
import axios from "axios";
import { useState, useRef } from 'react';

function App() {

  let api_key = "d1e9a59db3374dd3a00225001230111";
  let api_URL = "http://api.weatherapi.com/v1";
  // console.log(`${api_URL}/current.json?key=${api_key}&q=Vancouver`);
  let formRef = useRef();

  let [condition, setCondition] = useState();
  let [forecast, setForecast] = useState();
  let [darkMode, setDarkMode] = useState(false);
  let [theme, setTheme] = useState("light");
  let [icon, setIcon] = useState("🌙");
  let [cityImage, setCityImage] = useState();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      setTheme("dark");
      setIcon("🔆");
    }
    else {
      setTheme("light");
      setIcon("🌙");
    }

  };

  function getWeather(event) {
    event.preventDefault();
    // console.log(event.target);
    // console.log(`${api_URL}/current.json?key=${api_key}&q=${event.target.city.value}`);

    // axios.get(`${api_URL}/current.json?key=${api_key}&q=${event.target.city.value}`)
    //   .then((response) => {
    //     // console.log(response.data);
    //     setCondition(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

    axios.get(`${api_URL}/forecast.json?key=${api_key}&q=${event.target.city.value}&days=5`)
      .then((response) => {
        setForecast(response.data);
      })

    axios.get(`https://api.unsplash.com/search/photos/?client_id=8FZ6HGQVeeTdXK7PzSe-oG5fvseGAqntYJxsQJvvmBk&query=${event.target.city.value}`)
      .then((response) => {
        // console.log(response.data.results);
        // console.log(response.data.results[0].links?.download);
        setCityImage(response.data.results[0].links?.download);
      })

    formRef.current.reset();
  }

  let date = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  // console.log(condition);
  // console.log("forecast", forecast);

  return (

    <div className={`app ${theme}`}>


      {/* <header className="App-header">
        <h1 className='App-header__title'>Check the current weather now!</h1>
      </header> */}
      <div className='app__inputs-container'>
        <div>
          <form className='form' ref={formRef} onSubmit={(event) => getWeather(event)}>
            <input name="city" className='form__input' placeholder="Enter the city"></input>
            <button className='form__button'>Check</button>
          </form>
        </div>
        <div>
          <button onClick={toggleDarkMode} className='toggle-btn'>{icon}</button>
        </div>
      </div>

      {forecast ?
        (
          <div>
            <div className='output'>
              <div className='output__container1'>
                <h2 className='output__city-title'>{forecast.location.name}</h2>
                <p>{date.toLocaleDateString(undefined, options)} {date.toLocaleTimeString()}</p>
                <div className='output__city-details'>
                  <p className='output__city-temp'>{forecast.current?.temp_c}°C</p>
                  <p>{forecast.current?.condition.text}</p>
                  <img className='output__city-temp-icon' src={forecast.current?.condition.icon} alt="weather status" />
                </div>
              </div>

              <div className='output__container2'>
                <img src={cityImage} className='city' alt="city" />
              </div>

              <div className='output__container3'>
                <p>Feels Like: {forecast.current?.feelslike_c}°C</p>
                <p>Humidity: {forecast.current?.humidity}%</p>
                <p>Wind Speed: {forecast.current?.wind_kph} km/h</p>
                <p>Precipitation: {forecast.current?.precip_in}%</p>
              </div>
            </div>

            <div className='forecast-container'>
              <div className='forecast'>
                {forecast.forecast.forecastday.map((day) => {
                  return (
                    <div className='forecast__container1'>
                      <p>{day.date}</p>
                      {/* <p>{day.day.condition.text}</p> */}
                      <img src={day.day.condition.icon} alt="prediction" />

                      <p>Max: {day.day.maxtemp_c}</p>
                      <p>Min: {day.day.mintemp_c}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
        :
        <div></div>
      }

    </div>

  );
}

export default App;