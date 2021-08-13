import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground } from 'react-native';
import './forecast-7days.css';

import DateTime from '../components/forecast-7days/datetime';
import WeatherScroll from '../components/forecast-7days/weather-scroll';

const img = require('../../assets/photo-1621274403997-37aace184f49.jpg')
const url = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '91bcf63464a1cd3a188c02002486d2fc';

export default function Forecast7Days() {
    const [data, setData] = useState({});
    const [details, setDetails] = useState({ location: '' });
    const [latlon, setLatLon] = useState({ lat: '', lon: '' });
    const located = details.location;
    const latitude = latlon.lat;
    const longtitude = latlon.lon;

    function changeHandler(e) {
        setDetails({ location: e.target.value });

        axios.get(`${url}weather?q=${located}&units=metric&appid=${API_KEY}`).then(res => {
            setLatLon({ lat: res.data.coord.lat, lon: res.data.coord.lon })
        }).catch(err => {
            // console.log("Call Api Unsuccessful");
        });
    }

    const fetchDataFromApi = (latitude, longtitude) => {

        fetch(`${url}onecall?lat=${latitude}&lon=${longtitude}&units=metric&appid=${API_KEY}`)
            .then(res => res.json()).then(data => {

                console.log(data);
                setData(data);
            })
    };

    const submitHandler = (e) => {
        e.preventDefault();

        fetchDataFromApi(latitude, longtitude);

        // console.log(details);
        // console.log(latlon);
        // console.log(located);
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.container__image} source={img}>

                <View style={styles.container__searchBar}>
                    <form className="searchBar__form" onSubmit={submitHandler}>
                        <input
                            className="searchBar__input"
                            type="text"
                            onChange={changeHandler}
                            value={details.location}
                            placeholder="Enter city name">
                        </input>

                        <input className="searchBar__button" type="submit" value="Search"></input>
                    </form>
                </View>

                <DateTime
                    current={data.current}
                    lat={data.lat ? data.lat : "Lattitude"}
                    lon={data.lon ? data.lon : "Longtitude"}
                    timezone={data.timezone ? data.timezone : "Timezone"}
                />

                <WeatherScroll weatherData={data.daily} weatherHourly={data.hourly} />
            </ImageBackground>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    container__image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },

    container__searchBar: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

//removed
// useEffect(() => {

//     navigator.geolocation.getCurrentPosition((success) => {
//         let { latitide, longtitude } = success.coords;

//         console.log(`Hey ${latitide, longtitude}`)
//         fetchDataFromApi(latitide, longtitude);

//     }, (error) => {
//         if (error) {
//             fetchDataFromApi(40.7128, -74.0060);
//         }
//     })

// }, []);





