import "./WeekForecast.scss";

function WeekForecast({forecast}) {
    return (
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
    );
}

export default WeekForecast;