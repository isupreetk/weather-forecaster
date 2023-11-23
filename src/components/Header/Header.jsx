import "./Header.scss";

function Header({formRef, getWeather}) {

    return (
        <div className='app__inputs-container'>
        <div className='app__header'>
          <form className='form' ref={formRef} onSubmit={(event) => getWeather(event)}>
            <input name="city" className='form__input' placeholder="Enter the city"></input>
            <button className='form__button'>Check</button>
          </form>
        </div>
      </div>
    )
}

export default Header;