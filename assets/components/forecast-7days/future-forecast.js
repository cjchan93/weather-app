import moment from 'moment-timezone';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const FutureForecast = ({ data }) => {
    return (
        <View style={{ flexDirection: 'row' }}>

            {
                data && data.length > 0 ?

                    data.map((data, idx) => (
                        idx !== 0 && <FutureForecastItems forecastItem={data} />
                    ))

                    :

                    <View style={styles.futureForecast__items}>
                        <Text style={styles.futureForecast__day}>Day</Text>
                        <Image
                            style={styles.futureForecast__image}
                            source="https://openweathermap.org/img/wn/01d@2x.png"
                        />
                        <Text style={styles.futureForecast__temp}>Night - &#176;C</Text>
                        <Text style={styles.futureForecast__temp}>Day - &#176;C</Text>
                    </View>
            }

        </View>
    )
}

const FutureForecastItems = ({ forecastItem }) => {

    const img = 'https://openweathermap.org/img/wn/' + forecastItem.weather[0].icon + '@2x.png';

    return (
        <View style={styles.futureForecast__items}>
            <Text style={styles.futureForecast__day}>
                {forecastItem.dt ? moment(forecastItem.dt * 1000).format("ddd") : "Day"}
            </Text>
            <Image style={styles.futureForecast__image} source={img} />
            <Text style={styles.futureForecast__temp}>
                Night - {forecastItem.temp.night ? forecastItem.temp.night : ""}&#176;C
            </Text>
            <Text style={styles.futureForecast__temp}>
                Day - {forecastItem.temp.day ? forecastItem.temp.day : ""}&#176;C
            </Text>
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

    futureForecast__day: {
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

export default FutureForecast;
