const condition_text = document.getElementsByClassName("condition-text")[0];
const condition_icon = document.getElementsByClassName("condition-icon")[0];
const city = document.getElementsByClassName("city")[0];
const temprature = document.getElementsByClassName("temprature")[0];
const high_low = document.getElementsByClassName("high-low")[0];

function getWeather() {
  let apiKey = "YOUR_API_KEY";
  let cityName = "Delhi";
  let url =
    "http://api.weatherapi.com/v1/current.json?key=5746d31ebbe447f8a52150653230208&q=" +
    cityName +
    "&aqi=yes";
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let weatherData = JSON.parse(xhr.responseText);

      // Display the weather data on the page.
      console.log(weatherData);
      city.innerHTML = weatherData.location.name;
      temprature.innerHTML = weatherData.current.temp_c + " c";
      condition_icon.innerHTML = `<img src="${weatherData.current.condition.icon}" alt="condition_icon">`;
      condition_text.innerHTML = weatherData.current.condition.text;
      high_low.innerHTML = `Feels like ${weatherData.current.feelslike_c}`;
    } else {
      document.getElementById("weather").innerHTML =
        "Error getting weather data.";
    }
  };
  xhr.send();
}
getWeather();
