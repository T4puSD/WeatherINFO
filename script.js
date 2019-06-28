let locname = document.querySelector("h1");
let temp = document.getElementById("temp");
let tempUnit = document.getElementById("temp-unit");

var city = "dhaka";
if ("geolocation" in navigator) {
  console.log("supported");
  window.navigator.geolocation.getCurrentPosition(position => {
    console.log(position);
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(position.weather);
    console.log(lat, long);
    fetchData(lat, long);
  });
} else {
  alert("Browser donsn't support geolocation!");
}

function fetchData(lat, long) {
  let apival = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1d335577d297a6ceadb5cbc6597ffa0e`;
  // let apival = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1d335577d297a6ceadb5cbc6597ffa0e`;

  fetch(apival)
    .then(event => {
      return event.json();
    })
    .then(data => {
      console.log(data);
      locname.textContent = data.name;
      // cosnt {temp,temp_max,humidity} = data.main;
      temp.textContent = Math.floor(data.main.temp - 273.15);
    });
}
