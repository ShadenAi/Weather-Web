const iconImgElem = document.querySelector('.icon-img');
const tempratureElm = document.querySelector('.temprature p');
const descreptionElem = document.querySelector('.descreption p');
const locationElem = document.querySelector('.location p');
const notificationElem = document.querySelector('.notification');
const btn = document.querySelector('#btn');


// APP DATA
const weather = {};

weather.temperature = {};

// APP CONSTS AND VARS
const KELVIN = 273;
const api = 'http://api.openweathermap.org/data/2.5/weather?q=';
const KEY = '8eab5efc5956b5de46b9f3cfbefecbd7';


//CHECK IF THE BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElem.getElementsByClassName.display = "block";
    notificationElem.innerHTML = "<p>Browser doesn't support geolocation</p>"
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElem.style.display = "block";
    notificationElem.innerHTML = `<p> ${error.message} </p>`;
}
btn.addEventListener('click', ()=>{
    const city = document.querySelector('#city');
    let  cityInput = city.value;
    // GET WEATHER FROM API
            let fullApi = `${api}${cityInput}&appid=${KEY}`
            
            fetch(fullApi)
            .then(function(response){
                let data = response.json();
                return data;
            })
            .then(function(data){
                weather.temperature.value = Math.floor(data.main.temp - KELVIN);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
            })
            .then(function(){
                displayWeather();
            }); 
    });
    

   // GET WEATHER FROM API
function getWeather(latitude,longitude){
    let fullApi = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`
    
    fetch(fullApi)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
    

} 





// DISPLAY WEATHER TO UI
function displayWeather(){
    iconImgElem.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempratureElm.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descreptionElem.innerHTML = weather.description;
    locationElem.innerHTML = `${weather.city}, ${weather.country}`;
}

