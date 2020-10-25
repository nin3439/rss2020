// DOM Elements
const time = document.querySelector(".time");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const focus = document.querySelector(".focus");
const day = document.querySelector(".day");
const blockquote = document.querySelector("blockquote");
const figcaption = document.querySelector("figcaption");
const btn = document.querySelector(".btn");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".windSpeed");
const city = document.querySelector(".city");
const body = document.querySelector("body");
const btnBG = document.querySelector(".btnBG");
const error = document.querySelector(".error");

// Show Time
function showTime() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;
  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}
//Show Day
function showDay() {
  let today = new Date();
  let getWeekDay = function () {
    const DAYS = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return DAYS[today.getDay()];
  };
  let numberDay = today.getDate();
  let getMonthName = function () {
    const MONTHS = [
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
      "November",
      "December",
    ];
    return MONTHS[today.getMonth()];
  };

  day.innerHTML = `${getWeekDay()}, ${numberDay} ${getMonthName()}`;
  setTimeout(showDay, 60000);
}

//Background
const images = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];

//Get Random 6 images
let imgArr = [];
for (let i = 0; i < 6; i++) {
  let item = Math.floor(Math.random() * images.length);
  while (imgArr.includes(images[item])) {
    item = Math.floor(Math.random() * images.length);
  }
  imgArr[i] = images[item];
}
//Get Random 24 images
const base = [
  "assets/images/night/",
  "assets/images/morning/",
  "assets/images/day/",
  "assets/images/evening/",
];
let randomImageArr = [];

function addBase(base) {
  for (let i = 0; i < base.length; i++) {
    for (let j = 0; j < imgArr.length; j++) {
      randomImageArr.push(base[i] + imgArr[j]);
    }
  }
  return randomImageArr;
}

addBase(base);

// Set Background and Greeting
function setBgGreet() {
  let today = new Date();
  let hour = today.getHours();

  if (hour < 6) {
    // Night
    greeting.textContent = "Good Night, ";
  } else if (hour < 12) {
    // Morning
    greeting.textContent = "Good Morning, ";
  } else if (hour < 18) {
    // Afternoon
    greeting.textContent = "Good Afternoon, ";
  } else {
    // Evening
    greeting.textContent = "Good Evening, ";
  }
  document.body.style.backgroundImage = `url(${randomImageArr[hour]})`;
}

function setIntervalBgGreet() {
  let today = new Date();
  let minutes = today.getMinutes();
  let sec = today.getSeconds();

  if (minutes === 0 && sec === 0) {
    setBgGreet();
  }
}

//slider
function viewBgImage(data) {
  const src = data;
  const img = document.createElement("img");
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}

let today = new Date();
let i = today.getHours();

function getImage() {
  if (i === randomImageArr.length - 1) {
    i = 0;
  }
  i++;
  viewBgImage(randomImageArr[i]);
  btnBG.disabled = true;
  setTimeout(() => {
    btnBG.disabled = false;
  }, 1000);
}

btnBG.addEventListener("click", getImage);

// Get Name
name.onclick = function () {
  name.textContent = "";
};

name.textContent =
  localStorage.getItem("name") === null
    ? "[Enter Name]"
    : localStorage.getItem("name");

// Set Name
function setName(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (name.textContent === "") {
        name.textContent = localStorage.getItem("name");
      } else {
        name.textContent = e.target.textContent;
        localStorage.setItem("name", e.target.textContent);
      }
      name.blur();
    }
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

// Get Focus
focus.onclick = function () {
  focus.textContent = "";
};

focus.textContent =
  localStorage.getItem("focus") === null
    ? "[Enter Focus]"
    : localStorage.getItem("focus");

// Set Focus
function setFocus(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (focus.textContent === "") {
        focus.textContent = localStorage.getItem("focus");
      } else {
        focus.textContent = e.target.textContent;
        localStorage.setItem("focus", e.target.textContent);
      }

      focus.blur();
    }
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);

//Show Quote
async function getQuote() {
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quote.quoteText;
  figcaption.textContent = data.quote.quoteAuthor;
}

document.addEventListener("DOMContentLoaded", getQuote);
btn.addEventListener("click", getQuote);

//Show Weather
function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=811e4ee6996e6079253ada8ff16c4991&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      weatherIcon.className = "weather-icon owf";
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeed.textContent = `Wind speed:  ${data.wind.speed} m/sec`;
      error.textContent = "";
    })
    .catch(() => {
      error.textContent = "Incorrect city";
    });
}

//GetCity
city.onclick = function () {
  city.textContent = "";
};

city.textContent =
  localStorage.getItem("city") === null
    ? "[Enter City]"
    : localStorage.getItem("city");

//SetCity
function setCity(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (city.textContent === "") {
        city.textContent = localStorage.getItem("city");
      } else {
        city.textContent = e.target.textContent;
        localStorage.setItem("city", e.target.textContent);
      }
      getWeather();
      city.blur();
    }
  } else {
    city.textContent = localStorage.getItem("city");
  }
}

document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);
city.addEventListener("blur", setCity);

// Run
showTime();
showDay();
setBgGreet();
setInterval(setIntervalBgGreet, 1000);

