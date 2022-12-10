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

let curdate = document.querySelector(".forecast2 .text2");
curdate.innerHTML = fullDate;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);



// city
let sityName = document.querySelector(".sity-name");

// змінює параметри погодні відносно міста

function displayWeather(response) {
	console.log(response.data);
	document.querySelector(".sity-name").innerHTML = response.data.name;
	celsiusTemperature = response.data.main.temp;
	document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
	document.querySelector(".text1").innerHTML =
		response.data.weather[0].description;
	document.querySelector("#humidity").innerHTML = response.data.main.humidity;
	document.querySelector("#wind").innerHTML = Math.round(
		response.data.wind.speed
	);
	document.querySelector("#feels").innerHTML = Math.round(
		response.data.main.feels_like
	);
	document.querySelector("#temp_max").innerHTML = Math.round(
		response.data.main.temp_max
	);
	document.querySelector("#temp_min").innerHTML = Math.round(
		response.data.main.temp_min
	);
	document.querySelector("#visibility").innerHTML =
		response.data.visibility / 1000;
	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute("alt", response.data.weather[0].description);
	
}

// координати 
let apiBase = "https://api.openweathermap.org";
let apiKey = "c37d0dfd5549fa6fcf6341cead866ac4";

function getCooards(response) {
	let lat = response.data[0].lat;
	let lon = response.data[0].lon;
	let apiUrl = `${apiBase}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	axios.get(apiUrl).then(displayWeather);
}

function search(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-text-input");
	let apiUrl = `${apiBase}/geo/1.0/direct?q=${searchInput.value}&limit=1&appid=${apiKey}`;
	axios.get(apiUrl).then(getCooards);
}

function searchCurrentLocation(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiUrl = `${apiBase}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	axios.get(apiUrl).then(displayWeather);
	}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function displayFahrenheitTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	// remove the active class the celsius link
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let currentLocationButton = document.querySelector("#geolocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

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
