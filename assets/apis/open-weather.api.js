import axios from 'axios';

const dotenv = require('dotenv').config();
axios.defaults.baseURL = `https://api.openweathermap.org/data/2.5/`;
const appIdQueryParam = `appid=91bcf63464a1cd3a188c02002486d2fc`;

function getCurrentWeather(location) {
    return axios.get(
        `weather?q=${location}&units=metric&${appIdQueryParam}`
    );
}

function getForecast(Lat, Lon) {
    return axios.get (
        `onecall?lat=${Lat}&lon=${Lon}&units=metric&${appIdQueryParam}`
    );
}

export {
    getCurrentWeather,
    getForecast
}

