const api = {
    key: "567cfb1862e6f5f6c9148ef91e1f824f",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(event){
    //keyCode 13 is the enter key
    if (event.keyCode === 13){
        getResults(searchBox.value);
    }
}

function getResults(query){
    if(isNaN(query)){
        fetch(`${api.baseurl}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
    }else{
        fetch(`${api.baseurl}weather?zip=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
    }
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let current = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = buildDate(current);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;

    let high_low = document.querySelector('.current .high-low');
    high_low.innerHTML = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;

    document.getElementById('search').value = "";

}

function buildDate(d){
    let months = ["January", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday", "Saturday"];

    let date = d.getDate();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year}`
}