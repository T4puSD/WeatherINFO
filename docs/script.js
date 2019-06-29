let locname = document.querySelector("h1");
let temp = document.getElementById("temp");
let tempUnit = document.getElementById("temp-unit");
const skycons = new Skycons({ color: "white" });

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

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
  // let apival = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1d335577d297a6ceadb5cbc6597ffa0e`;
  // let apival = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1d335577d297a6ceadb5cbc6597ffa0e`;
  let crossor = "https://cors-anywhere.herokuapp.com/";
  let apival = `https://api.darksky.net/forecast/3f7c1724cc6d36ef5573e8fc5053a75d/${lat},${long}?exclude=[minutely,hourly,daily]`;
  apival = crossor + apival;

  fetch(apival)
    .then(event => {
      return event.json();
    })
    .then(data => {
      console.log(data);
      locname.textContent = data.timezone;
      // // cosnt {temp,temp_max,humidity} = data.main;
      temp.textContent = Math.floor(
        ((data.currently.temperature - 32) * 5) / 9
      );
      // skycons.add("icon1", Skycons.RAIN);
      // skycons.play();
      var iconToDisplay = data.currently.icon
        .toUpperCase()
        .replaceAll("-", "_");
      // iconToDisplay = Skycons.iconToDisplay;
      console.log(iconToDisplay);
      if (iconToDisplay == "CLEAR_DAY") {
        iconToDisplay == Skycons.CLEAR_DAY;
      } else if (iconToDisplay == "CLEAR_NIGHT") {
        iconToDisplay == Skycons.CLEAR_NIGHT;
      } else if (iconToDisplay == "PARTLY_CLOUDY_DAY") {
        iconToDisplay = Skycons.PARTLY_CLOUDY_DAY;
      } else if (iconToDisplay == "PARTLY_CLOUDY_NIGHT") {
        iconToDisplay == Skycons.PARTLY_CLOUDY_NIGHT;
      } else if (iconToDisplay == "CLOUDY") {
        iconToDisplay == Skycons.CLOUDY;
      } else if (iconToDisplay == "RAIN") {
        iconToDisplay == Skycons.RAIN;
      } else if (iconToDisplay == "SLEET") {
        iconToDisplay == Skycons.SLEET;
      } else if (iconToDisplay == "SNOW") {
        iconToDisplay == Skycons.SNOW;
      } else if (iconToDisplay == "WIND") {
        iconToDisplay == Skycons.SNOW;
      } else if (iconToDisplay == "FOG") {
        iconToDisplay == Skycons.FOG;
      }

      skycons.add("icon1", iconToDisplay);
      skycons.play();
    });
}
