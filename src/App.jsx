import './App.scss';
import axios from "axios";
import { useState, useRef } from 'react';
import Header from './components/Header/Header';
import PresentConditions from './components/PresentConditions/PresentConditions';
import WeekForecast from './components/WeekForecast/WeekForecast';

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

  return (
    <div className='app'>
      <Header formRef={formRef} getWeather={getWeather} />
      {forecast ?
        (
          <>
            <PresentConditions forecast={forecast} cityImage={cityImage} />
            <WeekForecast forecast={forecast} />
          </>
        )
        :
        <></>
      }
    </div>
  );
}

export default App;