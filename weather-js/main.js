const api = {
  key: "65eb2dd5dec379b44bc6666297ed2093",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");

const setQuery = (e) => {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
};

const getResults = (city) => {
  fetch(`${api.baseUrl}weather?q=${city}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
};

const displayResults = (weather) => {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>℃</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hiLow = document.querySelector(".hi-low");
  hiLow.innerText = `${Math.round(weather.main.temp_min)} ℃ / ${Math.round(
    weather.main.temp_max
  )} ℃`;
};

const dateBuilder = (d) => {
  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  let days = ["일", "월", "화", "수", "목", "금", "토"];

  let day = days[d.getDay()];
  let date = d.getDay();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${year}년 ${month}월 ${date}일 ${day}요일  `;
};

searchBox.addEventListener("keypress", setQuery);
