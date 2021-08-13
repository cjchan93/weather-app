import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment-timezone';

const WeatherItem = ({title, value, unit}) => {
    return (
        <View style={styles.weatherItems}>
            <Text style={styles.weatherItems__title}>{title}</Text>
            <Text style={styles.weatherItems__value}>{value}{unit}</Text>
        </View>
    )
}

const DateTime = ({ current, lat, lon, timezone }) => {

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {

        setInterval(() => {
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const hourIn12HrFormant = hour >= 13 ? hour %12: hour
            const minutes = time.getMinutes();
            const ampm = hour >= 12 ? 'PM' : 'AM';

            setTime((hourIn12HrFormant < 10 ? '0' + hourIn12HrFormant : hourIn12HrFormant)
            + ':' + (minutes < 10 ? '0' + minutes : minutes)
            + ' ' + ampm);

            setDate(days[day] + ', ' + date + ' ' + months[month]);

        }, 1000);

    }, [])

    return (

        <View style={styles.container}>
            
            <View style={styles.container__heading}>
                <View>
                    <Text style={styles.container__time}>{time}</Text>
                </View>
                <View>
                    <Text style={styles.container__date}>{date}</Text>
                </View>
                <View style={styles.container__weatherItem}>
                    <WeatherItem title="Humididty" value={current ? current.humidity : ""} unit="%"/>
                    <WeatherItem title="Pressure" value={current ? current.pressure : ""} unit="hPA"/>
                    <WeatherItem 
                        title="Sunrise" 
                        value={current ? moment.tz(current.sunrise * 1000, timezone).format("HH:mm") : ""} 
                        unit=" AM"
                    />
                    <WeatherItem 
                        title="Sunset" 
                        value={current ? moment.tz(current.sunset * 1000, timezone).format("HH:mm") : ""} 
                        unit=" PM"
                    />
                </View>
            </View>

            <View style={styles.container__rightAlign}>
                <Text style={styles.container__timezone}>{timezone}</Text>
                <Text style={styles.container__latlon}>{lat}N {lon}E</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginBottom: 50,
    },

    container__heading: {
        fontSize: 45,
        color: 'white',
        fontWeight: '100',
    },

    container__time: {
        fontSize: 35,
        color: 'white',
        fontWeight: '300',
    },

    container__date: {
        fontSize: 25,
        color: 'white',
        fontWeight: '300',
    },

    container__rightAlign: {
        textAlign: 'right',
        marginTop: 20,
    },

    container__timezone: {
        fontSize: 20,
        color: 'white',
    },

    container__latlon: {
        fontSize: 16,
        color: 'white',
        fontWeight: '700',
    },

    container__weatherItem: {
        backgroundColor: '#18181b99',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },

    weatherItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    weatherItems__title: {
        color: 'white',
        fontSize: 14,
        fontWeight: '100',
    },

    weatherItems__value: {
        color: 'white',
        fontSize: 14,
        fontWeight: '100',
    },

});

export default DateTime;
