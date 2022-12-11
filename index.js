// data

let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"Nowember",
	"December",
];



let myDate = new Date();
let minute = myDate.getMinutes();
let second = myDate.getSeconds();
if (minute < 10) {
	minute = "0" + minute;
}
if (second < 10) {
	second = "0" + second;
}

let fullDate =
	"Today: " +
	myDate.getDate() +
	" " +
	months[myDate.getMonth()] +
	" " +
	myDate.getFullYear() +
	", " +
	days[myDate.getDay()] +
	", " +
	myDate.getHours() +
	":" +
	myDate.getMinutes() +
	":" +
	myDate.getSeconds();

let curdate = document.querySelector("#current_time");
curdate.innerHTML = fullDate;

let currentCity = "New York";
let units="metric";

	let apiBase = "https://api.openweathermap.org";
	let apiKey = "2d96d64425dca1d6eda00d942a281c0d";


function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat",];

	return days[day];
}

function formatDate(timestamp) {
	return new Date(timestamp * 1000).getDate();
}

function displayForecast(response) {
	console.log(response.data);
	let forecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
		if (index > 0 && index < 8) {
			console.log(forecastDay);
			forecastHTML =
			forecastHTML +
			`
		<div class="col-2  weather">
		<h4 class="card-title">${formatDay(forecastDay.dt)} ${formatDate(forecastDay.dt)}</h4>
		<h5 class="card-2-title"> 
		<img src="http://openweathermap.org//img/wn/${
			forecastDay.weather[0].icon
		}@2x.png" alt="icon"  class="card-2-title" />  
		</h5>
		<p class="card-text">${Math.round(forecastDay.temp.max)}&deg;<span class="pad"> ${Math.round(
				forecastDay.temp.min)
			} &deg;</span></p>
		<p class="card-2-text">Cloudy</p>
		</div>
		`;
	    }
    });
		
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
	console.log(coordinates);
	let apiUrl = `${apiBase}/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(displayForecast);
}

// змінює параметри погодні відносно міста
function displayWeather(response) {
	currentCity = response.data.name;

	document.querySelector(".sity-name").innerHTML = response.data.name;
	celsiusTemperature = response.data.main.temp;
	document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
	document.querySelector(".text1").innerHTML = response.data.weather[0].description;
	document.querySelector("#humidity").innerHTML = response.data.main.humidity;
	document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
	document.querySelector("#feels").innerHTML = Math.round(response.data.main.feels_like);
	document.querySelector("#temp_max").innerHTML = Math.round(response.data.main.temp_max);
	document.querySelector("#temp_min").innerHTML = Math.round(response.data.main.temp_min);
	document.querySelector("#visibility").innerHTML = response.data.visibility / 1000;
	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute("src",`http://openweathermap.org//img/wn/${response.data.weather[0].icon}@2x.png`);
	iconElement.setAttribute("alt", response.data.weather[0].description);

	getForecast(response.data.coord);
}


function search(city) {
	let apiUrl = `${apiBase}/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(displayWeather);
  }

  function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#city-input");
	search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	//let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	//temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
	units="imperial";
	search(currentCity);
}

function displayCelsiusTemperature(event) {
	event.preventDefault();

	fahrenheitLink.classList.remove("active");
	celsiusLink.classList.add("active");
	//let temperatureElement = document.querySelector("#temperature");
	//temperatureElement.innerHTML = Math.round(celsiusTemperature);
	units="metric";
	search(currentCity);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// // координати

function searchCurrentLocation(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiUrl = `${apiBase}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
	axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocationButton = document.querySelector("#geolocation");
currentLocationButton.addEventListener("click", getCurrentLocation);


search(currentCity);







// function getCooards(response) {
// 	let lat = response.data[0].lat;
// 	let lon = response.data[0].lon;
// 	let apiUrl = `${apiBase}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
// 	axios.get(apiUrl).then(displayWeather);
// }








// // city
// let sityName = document.querySelector(".sity-name");




// temp C F

// let number = document.querySelector(".number");
// let currCTemp = 17;
// number.innerHTML = currCTemp;

// let tempChangeFar = document.querySelector(".button-F");
// let tempChangeCel = document.querySelector(".button-C");

// function changeF(Change) {
// 	number.innerHTML = Math.round((currCTemp * 9) / 5 + 32);
// }

// function changeC(Change) {
// 	number.innerHTML = currCTemp;
// }

// tempChangeFar.addEventListener("click", changeF);
// tempChangeCel.addEventListener("click", changeC);

// <div class="weather">
// 	<h4 class="card-title">Tue 25</h4>
// 	<h5 class="card-2-title">🌤</h5>
// 	<p class="card-text">28 &deg; <span></span>24 &deg;</p>
// 	<p class="card-2-text">Cloudy</p>
// </div>
// <div class="weather">
// 	<h4 class="card-title">Tue 25</h4>
// 	<h5 class="card-2-title">🌤</h5>
// 	<p class="card-text">28 &deg;<span> 24 &deg;</span></p>
// 	<p class="card-2-text">Cloudy</p>
// </div>
// <div class="weather">
// 	<h4 class="card-title">Tue 25</h4>
// 	<h5 class="card-2-title">🌤</h5>
// 	<p class="card-text">28 &deg;<span> 24 &deg;</span></p>
// 	<p class="card-2-text">Cloudy</p>
// </div>
// <div class="weather">
// 	<h4 class="card-title">Tue 25</h4>
// 	<h5 class="card-2-title">🌤</h5>
// 	<p class="card-text">28 &deg; <span>24 &deg;</span></p>
// 	<p class="card-2-text">Cloudy</p>
// </div>
// <div class="weather">
// 	<h4 class="card-title">Tue 25</h4>
// 	<h5 class="card-2-title">🌤</h5>
// 	<p class="card-text">28 &deg; <span>24 &deg;</span></p>
// 	<p class="card-2-text">Cloudy</p>
// </div>
// <div class="weather">
// 	<h4 class="card-title">Tue 25</h4>
// 	<h5 class="card-2-title">🌤</h5>
// 	<p class="card-text">28 &deg; <span>24 &deg;</span></p>
// 	<p class="card-2-text">Cloudy</p>
// </div>
