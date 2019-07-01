//apikeyval
let darkskyAPIKey = config.darkskyAPIKey;
let iplocationAPIKey = config.iplocationAPIKey;

//user's geolocation will be stored here
var lat;
var long;

let locname = document.querySelector("h1");
let temp = document.getElementById("temp");
let tempUnit = document.getElementById("temp-unit");
let tempSummary = document.getElementById("summary");
let canvas = document.getElementById("icon1");
const skycons = new Skycons({ color: "white" });

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  }
};

if (isMobile.any()) {
  tempSummary.style.fontSize = "2em";
  locname.style.fontSize = "3em";
  temp.style.fontSize = "3em";
  canvas.style.cssText = "height:300px; width:300px";
  // var corssanywhere = "https://cors-anywhere.herokuapp.com/";
  // var api_url = corssanywhere + "http://ip-api.com/json";
  var api_url = `https://api.ipgeolocation.io/ipgeo?apiKey=${iplocationAPIKey}`;

  fetch(api_url)
    .then(result => {
      console.log(result);
      return result.json();
    })
    .then(data => {
      console.log(data);
      lat = data.latitude;
      long = data.longitude;
      fetchData(lat, long);
    });
} else {
  // var city = "dhaka";
  if ("geolocation" in navigator) {
    console.log("supported");
    window.navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(position.weather);
      console.log(lat, long);
      fetchData(lat, long);
    });
  } else {
    alert("Browser donsn't support geolocation!");
  }
}

function fetchData(lat, long) {
  // let apival = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1d335577d297a6ceadb5cbc6597ffa0e`;
  // let apival = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1d335577d297a6ceadb5cbc6597ffa0e`;
  let crossor = "https://cors-anywhere.herokuapp.com/";
  let apival = `https://api.darksky.net/forecast/${darkskyAPIKey}/${lat},${long}?exclude=[minutely,hourly,daily]`;
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
      tempSummary.textContent = data.currently.summary;
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
