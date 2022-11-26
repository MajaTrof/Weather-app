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
let apiKey = "c37d0dfd5549fa6fcf6341cead866ac4";
let sityName = document.querySelector(".sity-name");

// змінює параметри погодні відносно міста

function displayWeather(response) {
	console.log(response.data);
	document.querySelector(".sity-name").innerHTML = response.data.name;
	let celsiusTemperature = response.data.main.temp;
	document.querySelector("#weather").innerHTML = Math.round(celsiusTemperature);
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
}

// координати 

function getCooards(response) {
	let lat = response.data[0].lat;
	let lon = response.data[0].lon;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	axios.get(apiUrl).then(displayWeather);
}


function search(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-text-input");
	let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=1&appid=c37d0dfd5549fa6fcf6341cead866ac4`;
	axios.get(apiUrl).then(getCooards);
}

//change temperature - Geo Location

// function getForecast(coordinates) {
// 	console.log(coordinates);
// 	let apiKey = "40bd5a14c8867bc38ccf817c35e7d916";
// 	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
// 	console.log(apiUrl);
// 	axios.get(apiUrl).then(displayForecast);
// }

 function searchCurrentLocation(position) {
 	let lat = position.coords.latitude;
 	let lon = position.coords.longitude;
 	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
 	axios.get(apiUrl).then(displayWeather);
 }

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocationButton = document.querySelector("#geolocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

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
