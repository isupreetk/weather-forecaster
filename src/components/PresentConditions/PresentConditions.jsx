import "./PresentConditions.scss";

function PresentConditions({ forecast, cityImage }) {

    // console.log(forecast);

    let date = new Date();
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    return (
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
            </div>
    )
}

export default PresentConditions;