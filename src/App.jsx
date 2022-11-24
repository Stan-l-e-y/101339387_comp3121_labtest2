import { useState, useEffect } from 'react';
import DayWeather from '../components/DayWeather';
import moment from 'moment';

function App() {
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [dayImage, setDayImage] = useState(null);
  const [city, setCity] = useState('Toronto');
  const [inputCity, setInputCity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=aa5d5a844146ca7232449123b31e7e59&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod != '200') {
          setCity('Toronto');
          throw new Error('City not found');
        }

        setWeatherForecast(data);
        setDayImage(
          `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`
        );
      })
      .catch((err) => {
        setError(err);
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }, [city]);

  const onSubmit = (e) => {
    e.preventDefault();
    setCity(inputCity);
  };

  return (
    <div className="App flex justify-center items-center h-screen  ">
      <div className="cloud bg-[url('/pexels-magda-ehlers-2114014.jpg')] p-20  bg-cover	rounded-[1.5rem] flex justify-center items-center ">
        <div className="weatherCard flex  p-1 relative items-center  ">
          <div className="weatherToday flex px-3 pr-10 bg-black rounded-[1.5rem] h-[20rem]  relative left-6 z-10 justify-center  shadow-[15px_35px_30px_-12px_rgba(0,0,0,0.7)]  ">
            <div className="flex-col  mt-4 mb-4 pr-8">
              <div className="font-bold text-lg ">
                {moment().format('dddd')}
              </div>
              <div className="text-xs mt-7">
                {moment().format('MMM Do YYYY')}
              </div>
              <div className="text-xs mt-1">
                {weatherForecast
                  ? `${weatherForecast.city.name}, ${weatherForecast.city.country}`
                  : 'Toronto, CA'}
              </div>
              {dayImage ? (
                <img src={dayImage} />
              ) : (
                <div className="mt-6">Image</div>
              )}
              <div className="mt-5 font-bold text-3xl">
                {weatherForecast
                  ? `${Math.round(weatherForecast.list[0].main.temp)}°C`
                  : '29°C'}
              </div>
              <div className="mt-8 text-xs font-bold ">
                {weatherForecast
                  ? weatherForecast.list[0].weather[0].description
                  : 'Clear'}
              </div>
            </div>
          </div>
          <div className="weather5day flex-1 px-4 flex-col  rounded-[1.5rem] border h-[19.5rem] relative border-l-0 right-8 border-white rounded-tl-none rounded-bl-none items-center ">
            <div className="rightSideWrapper ml-3 mt-3">
              <form
                onSubmit={onSubmit}
                className="searchBar ml-10 bg-white  text-black rounded-[1.5rem] px-3 py-0.5 flex justify-between items-center"
              >
                <input
                  type="text"
                  className="bg-inherit p-0 m-0 outline-none"
                  placeholder="Enter City"
                  values={inputCity}
                  onChange={(e) => setInputCity(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.9}
                  stroke="currentColor"
                  className="w-5 h-5 hover:cursor-pointer"
                  onClick={() => setCity(inputCity)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </form>
              {error && (
                <div className="text-red-500 text-xs mt-2 ml-10 bg-[#19191990] rounded-[1rem] p-0.5">
                  {error.message}
                </div>
              )}
              <div className="five-day ml-10 flex   mt-5 rounded-[1rem] bg-[#aa9e9ed1] ">
                <DayWeather
                  day={
                    weatherForecast
                      ? moment(weatherForecast.list[0].dt_text).format('ddd')
                      : '29°C'
                  }
                  temp={
                    weatherForecast
                      ? `${Math.round(weatherForecast.list[0].main.temp)}°C`
                      : '29°C'
                  }
                  icon={
                    weatherForecast
                      ? weatherForecast.list[0].weather[0].icon
                      : 'image'
                  }
                  selected={
                    weatherForecast &&
                    moment().format('ddd') ==
                      moment.unix(weatherForecast.list[0].dt).format('ddd')
                      ? true
                      : false
                  }
                />
                <DayWeather
                  day={
                    weatherForecast
                      ? moment.unix(weatherForecast.list[2].dt).format('ddd')
                      : '29°C'
                  }
                  temp={
                    weatherForecast
                      ? `${Math.round(weatherForecast.list[2].main.temp)}°C`
                      : '29°C'
                  }
                  icon={
                    weatherForecast
                      ? weatherForecast.list[2].weather[0].icon
                      : 'image'
                  }
                  selected={
                    weatherForecast &&
                    moment().format('ddd') ==
                      moment.unix(weatherForecast.list[2].dt).format('ddd')
                      ? true
                      : false
                  }
                />
                <DayWeather
                  day={
                    weatherForecast
                      ? moment.unix(weatherForecast.list[10].dt).format('ddd')
                      : '29°C'
                  }
                  temp={
                    weatherForecast
                      ? `${Math.round(weatherForecast.list[10].main.temp)}°C`
                      : '29°C'
                  }
                  icon={
                    weatherForecast
                      ? weatherForecast.list[10].weather[0].icon
                      : 'image'
                  }
                  selected={
                    weatherForecast &&
                    moment().format('ddd') ==
                      moment.unix(weatherForecast.list[10].dt).format('ddd')
                      ? true
                      : false
                  }
                />
                <DayWeather
                  day={
                    weatherForecast
                      ? moment.unix(weatherForecast.list[18].dt).format('ddd')
                      : '29°C'
                  }
                  temp={
                    weatherForecast
                      ? `${Math.round(weatherForecast.list[18].main.temp)}°C`
                      : '29°C'
                  }
                  icon={
                    weatherForecast
                      ? weatherForecast.list[18].weather[0].icon
                      : 'image'
                  }
                  selected={
                    weatherForecast &&
                    moment().format('ddd') ==
                      moment.unix(weatherForecast.list[18].dt).format('ddd')
                      ? true
                      : false
                  }
                />
                <DayWeather
                  day={
                    weatherForecast
                      ? moment.unix(weatherForecast.list[30].dt).format('ddd')
                      : '29°C'
                  }
                  temp={
                    weatherForecast
                      ? `${Math.round(weatherForecast.list[30].main.temp)}°C`
                      : '29°C'
                  }
                  icon={
                    weatherForecast
                      ? weatherForecast.list[30].weather[0].icon
                      : 'image'
                  }
                  selected={
                    weatherForecast &&
                    moment().format('ddd') ==
                      moment.unix(weatherForecast.list[30].dt).format('ddd')
                      ? true
                      : false
                  }
                />
              </div>
              <div className="randomFacts mt-5 ml-10 bg-[#19191990] flex-col rounded-[1rem] p-2">
                <div className="flex justify-between">
                  <div className="font-bold ">Humidity</div>
                  <div>
                    {weatherForecast
                      ? weatherForecast.list[0].main.humidity
                      : '23'}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="font-bold">Population</div>
                  <div>
                    {weatherForecast
                      ? weatherForecast.city.population
                      : '5000000'}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="font-bold">Sunset</div>
                  <div>
                    {weatherForecast
                      ? moment
                          .unix(weatherForecast.city.sunset)
                          .format('h:mm a')
                      : '5:00pm'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
