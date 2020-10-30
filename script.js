document.addEventListener('DOMContentLoaded', init);

// Check Day
(function () {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  Date.prototype.getMonthName = function () {
    return months[this.getMonth()];
  };
  Date.prototype.getDayName = function () {
    return days[this.getDay()];
  };
})();

// DOM Elements
const month = document.querySelector('.month'),
  day = document.querySelector('.day'),
  time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  user_Name = document.querySelector('.name'),
  goal = document.querySelector('.focus'),
  change_Bg = document.querySelector('.change-bg'),
  blockquote = document.querySelector('blockquote'),
  figcaption = document.querySelector('figcaption'),
  change_Quote = document.querySelector('.change-quote'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  humidity = document.querySelector('.humidity'),
  wind = document.querySelector('.wind'),
  city = document.querySelector('.city'),
  error = document.querySelector('.error');

// Options
const HOUR = 1000 * 60 * 60,
  base = './assets/images/',
  day_Time = ['morning/', 'day/', 'evening/', 'night/'],
  IMAGES = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

let images = [];

// Start counts for getImage
let t, i;

// Start Count for getImagePerDayTime
let count_image = 0;

// Run
function init() {
  for (let i = 0; i < IMAGES.length; i++) {
    images.push(IMAGES[Math.floor(Math.random() * IMAGES.length)])
  }

  showMonth();
  showDay();
  showTime();
  setBgGreet();
  getName();
  getFocus();
  getCity();
  check(user_Name);
  getQuote();
  getWeather();

  t = Number(localStorage.getItem('momentum_d_timeId'));
  i = Number(localStorage.getItem('momentum_imageId')) + 1;

  sessionStorage.setItem("is_reloaded", true);
}

// Check input width
function check(el) {
  let size = `${el.value.length + 1}`;
  el.setAttribute('size', size);
}

// Show Month
function showMonth() {
  let today = new Date(),
    monthName = today.getMonthName();

  // Output Month
  month.innerHTML = `&diams; ${monthName} &diams;`;
}

// Show Day
function showDay() {
  let today = new Date(),
    dayName = today.getDayName(),
    date = today.getDate();

  // Output Day
  day.innerHTML = `${dayName}, ${date}`;
}

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // 12hr Format
  // hour = hour % 12 || 12;

  // 24hr Format
  hour = hour % 24 || 24;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  checkHour(min, sec);

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  // 24hr Format
  hour = hour % 24 || 24;

  if (hour < 12 && hour >= 6) {
    // Morning 6:00-12:00
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18 && hour >= 12) {
    // Afternoon 12:00-18:00
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour < 24 && hour >= 18) {
    // Evening 18:00-24:00
    greeting.textContent = 'Good Evening, ';
  } else {
    // Night 24:00-6:00
    greeting.textContent = 'Good Night, ';
  }

  console.log(new Date());
  getImagePerDayTime();
}

// Get user_Name
function getName() {
  if (!localStorage.getItem('momentum_nameId')) {
    user_Name.value = '[Enter Name]';
  } else {
    user_Name.value = localStorage.getItem('momentum_nameId');
  }

  check(user_Name);
}

// Set user_Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (!user_Name.value) {
        user_Name.value = !localStorage.getItem('momentum_nameId') ? '[Enter Name]' : localStorage.getItem('momentum_nameId');
      }
      localStorage.setItem('momentum_nameId', e.target.value);
      user_Name.blur();
    }
  } else {
    if (!user_Name.value) {
      user_Name.value = !localStorage.getItem('momentum_nameId') ? '[Enter Name]' : localStorage.getItem('momentum_nameId');
    }
    localStorage.setItem('momentum_nameId', e.target.value);
  }

  check(user_Name);
}

// Get Focus
function getFocus() {
  if (!localStorage.getItem('momentum_focusId')) {
    goal.textContent = '[Enter Focus]';
  } else {
    goal.textContent = localStorage.getItem('momentum_focusId');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      goal.style.backgroundColor = 'rgba(255,255,255,0)';
      if (!goal.textContent) {
        goal.textContent = !localStorage.getItem('momentum_focusId') ? '[Enter Focus]' : localStorage.getItem('momentum_focusId');
      }
      localStorage.setItem('momentum_focusId', e.target.textContent);
      goal.blur();
    }
  } else {
    goal.style.backgroundColor = 'rgba(255,255,255,0)';
    if (!goal.textContent) {
      goal.textContent = !localStorage.getItem('momentum_focusId') ? '[Enter Focus]' : localStorage.getItem('momentum_focusId');
    }
    localStorage.setItem('momentum_focusId', e.target.textContent);
  }
}

// nameIsInFocus
function nameIsInFocus(e) {
  if (e.target.value !== '') {
    e.target.value = '';
  }
}

// focusIsInFocus
function focusIsInFocus(e) {
  if (e.target.textContent !== '') {
    e.target.textContent = '';
    e.target.style.backgroundColor = 'rgba(255,255,255,.3)';
  }
}

// Change Background Image
function viewBgImage(data) {
  const body = document.body;
  const src = data;
  const img = document.createElement('img');

  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}

// Get Image and Change Background Image for btn.onclick
function getImage() {
  const index_Time = t % day_Time.length;
  const index_Image = i % images.length;
  const imageSrc = base + day_Time[index_Time] + images[index_Image];

  viewBgImage(imageSrc);

  i++;
  if (i === 20) {
    t++;
    i = 0;
  }

  console.log('The getImage worked:');
  console.log(`Background changed to ${imageSrc}`);

  change_Bg.disabled = true;

  setTimeout(function () {
    change_Bg.disabled = false
  }, 1000);
}

// Get Image and Change Background Image per Day-time
function getImagePerDayTime() {
  let now = new Date(),
    hour = now.getHours(),
    d_time;

  // 24hr Format
  hour = hour % 24 || 24;

  if (hour < 12 && hour >= 6) {
    d_time = 0;
  } else if (hour < 18 && hour >= 12) {
    d_time = 1;
  } else if (hour < 24 && hour >= 18) {
    d_time = 2;
  } else {
    d_time = 3;
  }

  const index_Time = d_time;
  const index_Image = count_image % images.length;
  const imageSrc = base + day_Time[index_Time] + images[index_Image];

  localStorage.setItem('momentum_d_timeId', index_Time);
  localStorage.setItem('momentum_imageId', index_Image);
  localStorage.setItem('momentum_imageSrc', imageSrc);
  console.log('The getImagePerDayTime worked:');
  console.log(`Background changed to ${imageSrc}`);

  viewBgImage(imageSrc);

  count_image++;

  // setTimeout(getImagePerDayTime, HOUR);
}

function checkHour(min, sec) {
  if (sec === 59 && min === 59) {
    // setBgGreet();
    setTimeout(setBgGreet, 1000);
  }
}

// Get Quote
async function getQuote() {
  // const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en`;
  const url = `https://freequote.herokuapp.com/`;
  const res = await fetch(url);
  const data = await res.json();
  // blockquote.textContent = data.quoteText;
  // figcaption.textContent = data.quoteAuthor;
  blockquote.textContent = data.quote;
  figcaption.textContent = data.author;
}

// Get Weather
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `Oops! An error has occured: ${response.status}`;

    error.classList.remove('hide');
    weatherIcon.parentElement.classList.add('hide');
    // temperature.classList.add('hide');
    weatherDescription.classList.add('hide');
    humidity.parentElement.classList.add('hide');
    // wind.classList.add('hide');

    throw new Error(message);
  } else {
    const data = await response.json();

    error.classList.add('hide');
    weatherIcon.parentElement.classList.remove('hide');
    // temperature.classList.remove('hide');
    weatherDescription.classList.remove('hide');
    humidity.parentElement.classList.remove('hide');
    // wind.classList.remove('hide');
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `H ${data.main.humidity}%`;
    wind.textContent = `W ${data.wind.speed}km/h`;
  }

}

// Catch Error
getWeather().catch(error => {
  error.message; // 'An error has occurred: 404'
});

// Get City
function getCity() {
  if (!localStorage.getItem('momentum_cityId')) {
    city.textContent = 'Paris';
  } else {
    city.textContent = localStorage.getItem('momentum_cityId');
  }
}

// Set City
function setCity(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (!city.textContent) {
        city.textContent = !localStorage.getItem('momentum_cityId') ? 'Paris' : localStorage.getItem('momentum_cityId');
      }
      localStorage.setItem('momentum_cityId', e.target.textContent);
      city.blur();
      getWeather();
    }
  } else {
    if (!city.textContent) {
      city.textContent = !localStorage.getItem('momentum_cityId') ? 'Paris' : localStorage.getItem('momentum_cityId');
    }
    localStorage.setItem('momentum_cityId', e.target.textContent);
    getWeather();
  }
}

if (sessionStorage.getItem("is_reloaded")) {
  console.log('Window reloaded');
  getWeather();
}

// cityIsInFocus
function cityIsInFocus(e) {
  if (e.target.textContent !== '') {
    e.target.textContent = '';
  }
}

user_Name.addEventListener('keypress', setName);
user_Name.addEventListener('focus', nameIsInFocus);
user_Name.addEventListener('blur', setName);
goal.addEventListener('keypress', setFocus);
goal.addEventListener('focus', focusIsInFocus);
goal.addEventListener('blur', setFocus);
change_Bg.addEventListener('click', getImage);
change_Quote.addEventListener('click', getQuote);
city.addEventListener('keypress', setCity);
city.addEventListener('focus', cityIsInFocus);
city.addEventListener('blur', setCity);