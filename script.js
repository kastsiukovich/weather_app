//https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=4f82ea256c9b3cdbfa9b7d9d5ae06516

const WEATHER_DATA = 'https://api.openweathermap.org/data/2.5/weather';
const APP_ID = 'bd380091f569cba7f6b43408dfde969f';

const getResource = async (url) => {
    try {
        const res = await fetch(url);
        return res.json();
    } catch (err) {
        throw new Error(`Error code ${err.status}`)
    }
}

const getWeatherInfo = async (place) => {
    const result = await getResource(`${WEATHER_DATA}?q=${place}&appid=${APP_ID}`);
    return result;
}

const currentWeatherPicture = (temp) => {
    let currentPicture = document.querySelector('#weather-current');
    if (temp > 20) {
        currentPicture.setAttribute('src', 'images/tropical.jpg');
    } else if (temp > 0 && temp < 20) {
        currentPicture.setAttribute('src', 'images/fall.jpg');
    } else {
        currentPicture.setAttribute('src', 'images/winter.jpg');
    }
}


const renderWeatherApp = async () => {
    const currentPlace = document.querySelector('#place').value.trim();
    const data = await getWeatherInfo(currentPlace);
    const currentTemp = document.querySelector('#current-temp');
    const currentWind = document.querySelector('#current-wind');

    currentTemp.innerHTML = Math.round(data.main.temp - 273);
    currentWind.innerHTML = Math.ceil(data.wind.speed);

    currentWeatherPicture(Math.round(data.main.temp - 273));
}

document.querySelector('#get-info').addEventListener('click', renderWeatherApp);



const WEATHER_DATA_FIVE_DAY = 'https://api.openweathermap.org/data/2.5/forecast';

const getWeatherInfoFiveDays = async (place) => {
    const result = await getResource(`${WEATHER_DATA_FIVE_DAY}?q=${place}&appid=${APP_ID}`);
    return result;
}

const renderWeatherApp1 = async () => {
    const currentPlace = document.querySelector('#place').value.trim();
    const data = await getWeatherInfoFiveDays(currentPlace);
    const listElements = document.querySelector('.collection');
    listElements.innerHTML = ` <li class="collection-header">
    <h4>5 Day / 3 Hour Forecast</h4>
</li>`;
    for (let i in data.list) {

        listElements.innerHTML += `<li class="collection-item">
            <div>${data.list[i].dt_txt} AM<a href="#!" class="secondary-content"><i class="material-icons">${Math.round(data.list[i].main.temp - 273.15)} degrees</i></a></div>
        </li>`
    }
}

document.querySelector('#get-info').addEventListener('click', renderWeatherApp1);