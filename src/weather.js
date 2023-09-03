const condition_text = document.getElementsByClassName("condition-text")[0];
const condition_icon = document.getElementsByClassName("condition-icon")[0];
const city = document.getElementsByClassName("city")[0];
const temprature = document.getElementsByClassName("temprature")[0];
const high_low = document.getElementsByClassName("high-low")[0];

const getWeather = async () => {
  const cityName = "Delhi";
  const url =
    "http://api.weatherapi.com/v1/current.json?key=5746d31ebbe447f8a52150653230208&q=" +
    cityName +
    "&aqi=yes";

  try {
    const res = await fetch(url);
    const weatherData = await res.json();

    // Display the weather data on the page.
    console.log(weatherData);
    city.innerHTML = weatherData.location.name;
    temprature.innerHTML = weatherData.current.temp_c + " c";
    condition_icon.innerHTML = `<img src="${weatherData.current.condition.icon}" alt="condition_icon">`;
    condition_text.innerHTML = weatherData.current.condition.text;
    high_low.innerHTML = `Feels like ${weatherData.current.feelslike_c}`;
  } catch (e) {
    document.getElementById("weather").innerHTML =
      "Error getting weather data.";
  }
};

getWeather();
