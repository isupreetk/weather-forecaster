import './App.scss';
import axios from "axios";
import { useState } from 'react';

function App() {

  let api_key = "d1e9a59db3374dd3a00225001230111";
  let api_URL = "http://api.weatherapi.com/v1";
  // console.log(`${api_URL}/current.json?key=${api_key}&q=Vancouver`);

  let [condition, setCondition] = useState();
  let [darkMode, setDarkMode] = useState(false);
  let [theme, setTheme] = useState("light");
  let [icon, setIcon] = useState("🌙");

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
  }

  return (

    <div className={`App ${theme}`}>

      <button onClick={toggleDarkMode} className='toggle-btn'>{icon}</button>

      <header className="App-header">
        <h1 className='App-header__title'>Check the current weather now!</h1>
      </header>
      <form className='form' onSubmit={(event) => getWeather(event)}>
        <label htmlFor='city'>City</label>
        <input name="city" className='form__input'></input>
        <label htmlFor='country'>Country</label>
        <input name="country" className='form__input'></input>
        <button className='form__button'>Check</button>
      </form>

    { condition ? 
      (
      <div className='output'>
        <p>Text: {condition.current?.condition.text}</p>
        <p>Icon: <img src={condition.current?.condition.icon} /></p>
        <p>Temperature: {condition.current?.temp_c} Celsius</p>
        <p>Feels Like: {condition.current?.feelslike_c} Celsius</p>
        <p>Humidity: {condition.current?.humidity}</p>
        <p>Wind Speed: {condition.current?.wind_kph} kph</p>
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