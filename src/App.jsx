import './App.scss';
import axios from "axios";
import { useState, useRef } from 'react';

function App() {

  let api_key = "d1e9a59db3374dd3a00225001230111";
  let api_URL = "http://api.weatherapi.com/v1";
  // console.log(`${api_URL}/current.json?key=${api_key}&q=Vancouver`);
  let formRef = useRef();

  let [condition, setCondition] = useState();
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

    axios.get(`${api_URL}/current.json?key=${api_key}&q=${event.target.city.value}`)
      .then((response) => {
        // console.log(response.data);
        setCondition(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get(`https://api.unsplash.com/search/photos/?client_id=8FZ6HGQVeeTdXK7PzSe-oG5fvseGAqntYJxsQJvvmBk&query=${event.target.city.value}`)
      .then((response) => {
        // console.log(response.data.results);
        // console.log(response.data.results[0].links?.download);
        setCityImage(response.data.results[0].links?.download);
      })

      formRef.current.reset();
  }

  return (

    <div className={`App ${theme}`}>

        <button onClick={toggleDarkMode} className='toggle-btn'>{icon}</button>

        <header className="App-header">
          <h1 className='App-header__title'>Check the current weather now!</h1>
        </header>
        <form className='form' ref={formRef} onSubmit={(event) => getWeather(event)}>
          <input name="city" className='form__input' placeholder="Enter the city"></input>
          <button className='form__button'>Check</button>
        </form>

        {condition ?
          (
            <div className='output'>
              <div className='output__container1'>
                <h3>{condition.location.name}</h3>
              </div>
              <div className='output__container2'></div>
              
              <img src={cityImage} className='city' alt="city" />
              <p>Text: {condition.current?.condition.text}</p>
              <p>Icon: <img src={condition.current?.condition.icon} alt="weather status"/></p>
              <p>Temperature: {condition.current?.temp_c}°C</p>
              <p>Feels Like: {condition.current?.feelslike_c}°C</p>
              <p>Humidity: {condition.current?.humidity}%</p>
              <p>Wind Speed: {condition.current?.wind_kph} km/h</p>
              <p>Precipitation: {condition.current?.precip_in} in</p>
            </div>
          )
          :
          <div></div>
        } 
    </div>

  );
}

export default App;