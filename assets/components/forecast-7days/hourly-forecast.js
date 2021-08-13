import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HourlyForecast = ({ data }) => {

    return (
        <View style={{ flexDirection: 'row' }}>

            {
                data && data.length > 0 ?

                    data.map((data, idx) => (
                        idx !== 0 && <HourlyForecastItems forecastItem={data} />
                    ))

                    :

                    <View style={styles.futureForecast__items}>
                        <Text style={styles.futureForecast__hour}>Hour</Text>
                        <Image
                            style={styles.futureForecast__image}
                            source="https://openweathermap.org/img/wn/01d@2x.png"
                        />
                        <Text style={styles.futureForecast__temp}>Temperature</Text>
                        <Text style={styles.futureForecast__temp}>Description</Text>
                    </View>
            }

        </View>
    )
}

const HourlyForecastItems = ({ forecastItem }) => {

    const img = 'https://openweathermap.org/img/wn/' + forecastItem.weather[0].icon + '@2x.png';
    let ampm = 'AM';
    let getHour = new Date(forecastItem.dt * 1000);
    let hour = getHour.getHours();

    if (hour > 12) {
        hour = hour - 12
        ampm = 'PM';
    }

    return (
        <View>
            {
                hour % 3 == 0 ?

                    <View style={styles.futureForecast__items}>
                        <Text style={styles.futureForecast__hour}>{hour}:00 {ampm}</Text>
                        <Image style={styles.futureForecast__image} source={img} />

                        <Text style={styles.futureForecast__temp}>
                            {forecastItem.temp}&#176;C
                        </Text>
                        <Text style={styles.futureForecast__temp}>
                            {forecastItem.weather[0].main}
                        </Text>
                    </View>

                    :

                    ""
            }
        </View>
    )
}

const styles = StyleSheet.create({
    futureForecast__items: {
        justifyContent: 'center',
        backgroundColor: '00000033',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#eee',
        padding: 20,
        marginLeft: 10,
    },

    futureForecast__hour: {
        fontSize: 20,
        color: 'white',
        padding: 10,
        backgroundColor: '#3c3c44',
        textAlign: 'center',
        borderRadius: 50,
        fontWeight: '200',
        marginBottom: 15,
    },

    futureForecast__image: {
        width: 100,
        height: 100,
    },

    futureForecast__temp: {
        fontSize: 16,
        color: 'white',
        fontWeight: '100',
        textAlign: 'center',
    },

})

export default HourlyForecast;
