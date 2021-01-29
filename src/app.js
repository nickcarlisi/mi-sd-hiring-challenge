// import { convertDate } from "./utils";

let form = document.querySelector("#searchForm");
form.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  let zip = form.elements.query.value;
  // let zip = 20001;
  let res = await getLatLong(zip);
  let city = res.city;
  let state = res.regionCode;
  let lat = res.latitude;
  let long = res.longitude;
  let weather = await getWeather(lat, long);
  displayWeather(city, state, weather.daily.data);
}

async function getLatLong(zip) {
  let res = await fetch(
    `https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=${zip}`
  );
  return await res.json();
}

async function getWeather(lat, long) {
  const today = new Date();
  const date = `${
    today.getMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;
  let res = await fetch(
    `https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${lat}&longitude=${long}&date=${date}`
  );
  return await res.json();
}

function displayWeather(city, state, weatherArr) {
  const weatherForecastFor = document.querySelector("#weatherForecastFor");
  weatherForecastFor.innerText = `WEATHER FORECAST FOR ${city.toUpperCase()}, ${state}`;

  let listItem = "";
  let dayHeaders = ["Today", "Tommorrow", "Next Day"];
  let images = ["img/cloudy.png", "img/sunny.png", "img/rain.png"];

  for (let i = 0; i < 3; i++) {
    listItem += `
    <li>
      <h3>${dayHeaders[i]}:</h3>
      <img src=${images[i]} alt="" />
      <div>
        <span id="icon">${weatherArr[i].icon}</span>
      <div>
        <span id="highTemp">${Math.round(
          weatherArr[i].temperatureHigh
        )}</span>&#176; / 
        <span id="loTemp">${Math.round(
          weatherArr[i].temperatureLow
        )}</span>&#176; F
        </div>
        </div>
    </li>`;
  }

  const listToAppendTo = document.querySelector("#listToAppendTo");
  listToAppendTo.innerHTML = listItem;
  let input = document.querySelector("input");
  input.value = "";
}

// onSubmit();
