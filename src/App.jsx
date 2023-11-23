import './App.scss';
import axios from "axios";
import { useState, useRef } from 'react';

function App() {

  let weather_api_key = "d1e9a59db3374dd3a00225001230111";
  let weather_api_URL = "https://api.weatherapi.com/v1";
  let unsplash_api_url = "https://api.unsplash.com";
  let unsplash_client_id = "8FZ6HGQVeeTdXK7PzSe-oG5fvseGAqntYJxsQJvvmBk";
  // console.log(`${api_URL}/current.json?key=${api_key}&q=Vancouver`);
  let formRef = useRef();

  let [forecast, setForecast] = useState();
  let [cityImage, setCityImage] = useState();

  function getWeather(event) {
    event.preventDefault();

    axios.get(`${weather_api_URL}/forecast.json?key=${weather_api_key}&q=${event.target.city.value}&days=5`)
      .then((response) => {
        setForecast(response.data);
      })

    axios.get(`${unsplash_api_url}/search/photos/?client_id=${unsplash_client_id}&query=${event.target.city.value}`)
      .then((response) => {
        setCityImage(response.data.results[0].links?.download);
      })

    formRef.current.reset();
  }

  let date = new Date();
  const options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return (

    <div className='app'>
      <div className='app__inputs-container'>
        <div className='app__header'>
          <form className='form' ref={formRef} onSubmit={(event) => getWeather(event)}>
            <input name="city" className='form__input' placeholder="Enter the city"></input>
            <button className='form__button'>Check</button>
          </form>
        </div>
      </div>

      {forecast ?
        (
          <div className='output-wrapper'>
            <div className='output'>
              <div className='output__container1'>
                <h2 className='output__city-title'>{forecast.location.name}</h2>
                <p className='output__date'>{date.toLocaleDateString(undefined, options)}</p>
                <p className='output__time'>{date.toLocaleTimeString()}</p>
                <div className='output__city-details'>
                  <p className='output__city-temp'>{forecast.current?.temp_c}°C</p>
                  <div className='output__city-condition-details'>
                    <img className='output__city-temp-icon' src={forecast.current?.condition.icon} alt="weather status" />
                    <p className='output__condition-text'>{forecast.current?.condition.text}</p>
                  </div>
                </div>
              </div>

              <div className='output__container2'>
                <img src={cityImage} className='output__city-image' alt="city" />
              </div>

              <div className='output__container3'>
                <p className='output__feels-like'>Feels Like: {forecast.current?.feelslike_c}°C</p>
                <p className='output__humidity'>Humidity: {forecast.current?.humidity}%</p>
                <p className='output__wind'>Wind: {forecast.current?.wind_kph} km/h</p>
                <p className='output__precipitation'>Precipitation: {forecast.current?.precip_in}%</p>
              </div>
            </div>

            <div className='forecast'>
              <div className='forecast__wrapper'>
                {forecast.forecast.forecastday.map((day, index) => {
                  return (
                    <div className='forecast__container' key={index}>
                      <p className='forecast__date'>{day.date}</p>
                      <img src={day.day.condition.icon} alt="prediction" className='forecast__condition-icon'/>

                      <div className='forecast__max-min'>
                        <p className='forecast__maxtemp'>{day.day.maxtemp_c}°C</p>
                        <p className='forecast__mintemp'>{day.day.mintemp_c}°C</p>
                      </div>

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