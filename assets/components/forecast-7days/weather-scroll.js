import React, { useState } from 'react';
import {
    View, ScrollView, Text, Image, TouchableOpacity, Animated, StyleSheet
} from 'react-native';
import moment from 'moment-timezone';
import FutureForecast from './future-forecast';
import HourlyForecast from './hourly-forecast';

const WeatherScroll = ({ weatherData, weatherHourly }) => {
    const [animation, setAnimation] = useState(new Animated.Value(0));

    const color = animation.interpolate({
        inputRange: [0, 0.2, 1.8, 2],
        outputRange: [
            "rgba(255, 255, 255, 0.0)",
            "rgba(45, 57, 82, 0.5)",
            "rgba(45, 57, 82, 0.8)",
            "rgba(255, 255, 255, 0.0)",
        ]
    })

    const openModal = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });

    const modalTrigger = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const close = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const open = {
        transform: [
            { scale: openModal },
        ]
    };

    const background = {
        backgroundColor: color
    }

    return (
        <View>
            <ScrollView style={styles.scrollView} horizontal={true}>
                <View style={styles.currentForecast__shadowButton, styles.center}>
                    <TouchableOpacity
                        style={styles.currentForecast__mainButton, styles.center}
                        onPress={modalTrigger}>

                        <CurrentForecast data={weatherData && weatherData.length > 0 ? weatherData[0] : {}} />
                    </TouchableOpacity>
                </View>

                <FutureForecast data={weatherData} />
            </ScrollView>

            <ScrollView style={styles.scrollView__hidden} horizontal={true}>
                <Animated.View style={styles.modal__background, background} pointerEvents="box-none">
                    <Animated.View style={styles.modal__background, open}>
                        <View style={styles.modal__wrap}>
                            <Text style={styles.modal__heading}>3 Hours Forecast</Text>
                            <HourlyForecast data={weatherHourly} />

                            <View>
                                <TouchableOpacity style={styles.modal__button} onPress={close}>
                                    <Text style={styles.modal__text}>x</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                </Animated.View>
            </ScrollView>

        </View>
    )
}

const CurrentForecast = ({ data }) => {

    if (data && data.weather) {
        const img = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';

        return (
            <View style={styles.currentForecast__innerContainer}>
                <Image style={styles.currentForecast__image} source={img} />
                <View style={styles.currentForecast__items}>
                    <Text style={styles.currentForecast__day}>
                        {data.dt ? moment(data.dt * 1000).format("dddd") : "Current Day"}
                    </Text>
                    <Text style={styles.currentForecast__temp}>
                        Night - {data.temp.night ? data.temp.night : ""}&#176;C
                    </Text>
                    <Text style={styles.currentForecast__temp}>
                        Day - {(data.temp.day) ? (data.temp.day) : ""}&#176;C
                    </Text>
                    <Text style={styles.currentForecast__clickMessage}>
                        - Click Me for Hourly Forecast -
                    </Text>
                </View>
            </View>
        )
    }
    else {
        return (
            <View style={styles.currentForecast__innerContainer}>
                <Image
                    style={styles.currentForecast__image}
                    source="https://openweathermap.org/img/wn/01d@2x.png"
                />
                <View style={styles.currentForecast__items}>
                    <Text style={styles.currentForecast__day}>
                        Current Day
                    </Text>
                    <Text style={styles.currentForecast__temp}>
                        Night - &#176;C
                    </Text>
                    <Text style={styles.currentForecast__temp}>
                        Day - &#176;C
                    </Text>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    scrollView: {
        flex: 0.4,
        backgroundColor: '#18181bcc',
        padding: 30,
    },

    scrollView__hidden: {
        backgroundColor: '#293242cc',
        flex: 0.4,
        padding: 30,
    },

    currentforecast__container: {
        flex: 1,
        backgroundColor: '00000033',
    },

    currentForecast__shadowButton: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
        width: 210,
        height: 80,
        shadowColor: '#4048BF',
        shadowOffset: {
            width: 8.4,
            height: 8.4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },

    currentForecast__mainButton: {
        zIndex: 10,
        width: 200,
        height: 70,
        borderRadius: 100,
        shadowColor: '#4048BF',
        shadowOffset: {
            width: 6.4,
            height: 6.4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        backgroundColor: '#203953',
    },

    currentForecast__innerContainer: {
        flexDirection: 'row',
        backgroundColor: '00000033',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        padding: 15,
    },

    currentForecast__image: {
        width: 150,
        height: 150,
    },

    currentForecast__items: {
        paddingRight: 40,
    },

    currentForecast__day: {
        fontSize: 20,
        color: 'white',
        padding: 10,
        backgroundColor: '#3c3c44',
        textAlign: 'center',
        borderRadius: 50,
        fontWeight: '200',
        marginTop: 15,
        marginBottom: 10,
    },

    currentForecast__temp: {
        fontSize: 16,
        color: 'white',
        fontWeight: '100',
        textAlign: 'center',
    },

    currentForecast__clickMessage: {
        fontSize: 10,
        color: 'white',
        fontWeight: '100',
        textAlign: 'center',
        marginTop: 30,
    },

    modal__background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    modal__wrap: {
        padding: 20,
        margin: 20,
        borderRadius: 8,
        backgroundColor: '#293242',
        shadowColor: 'black',
        shadowOffset: {
            width: 8.4,
            height: 8.4,
        },
        shadowOpacity: 0.74,
        shadowRadius: 30,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    modal__heading: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 20,
        color: 'white',
        marginRight: 45,
    },

    modal__text: {
        fontSize: 20,
        fontWeight: '750',
        color: 'white',
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    modal__button: {
        backgroundColor: 'tranparent',
        borderRadius: 100,
        borderColor: 'ffffff',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginLeft: 45,
    }

});

export default WeatherScroll;
