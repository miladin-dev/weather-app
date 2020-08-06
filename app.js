

const iconEl = document.querySelector(".icon");
const temperatureEl = document.querySelector(".temp-value p");
const descriptionEl = document.querySelector(".temp-description p");
const locationEl = document.querySelector(".location p");
const notificationEl = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

const key = process.env.API_KEY;
const KELVIN = 273;



// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationEl.style.display = "block";
    notificationEl.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}


function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationEl.style.display = "block";
    notificationEl.innerHTML = `<p> Please enable your location :) </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            console.log(data);
            weather.temperature.value = Math.round(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            iconEl.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
            temperatureEl.innerHTML = `${weather.temperature.value}<span>C</span>`;
            descriptionEl.innerHTML = weather.description;
            locationEl.innerHTML = `${weather.city}, ${weather.country}`;
        });

}

function displayWeather(){
    iconEl.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    temperatureEl.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descriptionEl.innerHTML = weather.description;
    locationEl.innerHTML = `${weather.city}, ${weather.country}`;
}


