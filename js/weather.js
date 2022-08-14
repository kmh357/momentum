const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");

const API_KEY = "a54d92494ed6e41a2f927e6b89709323";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
  console.log(lat, lng);
}

function onGeoError() {
  alert("위치정보에 접근할 수 없습니다.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
