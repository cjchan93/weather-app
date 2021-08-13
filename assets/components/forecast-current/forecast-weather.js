import React from 'react';
import './forecast-weather.css';

class ForecastWeather extends React.Component {
    render() {

        const forecastItems = this.props.forecast.map((f, i) => {
            //i = index
            const key = `forecast-item_${i}`
            const url = `https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`;

            let ampm = 'AM';
            let hour = new Date (f.dt * 1000).getHours();
            // console.log(moment.hour(hour))

            if (hour > 12){
                hour = hour - 12;
                ampm = 'PM';
            }
    
            return (
                <div className="forecast-item" key={key}>

                    <p className="forecast-item__hour">{hour}:00 {ampm}</p>
                    <img src={url} alt={f.weather[0].description}/>
                
                    <div className="forecast-item__text">
                        <p className="forecast-item__temperature">{f.temp}°C</p>
                        <p className="forecast-item__description">{f.weather[0].main}</p>
                    </div>
                
                </div>
            )
        });

        return (
            <div className="forecast">
                <h3 className="forcast-title">Hourly Forecast</h3>
                <div className="forecast-items">{forecastItems}</div>
            </div>
        );
    }
}

export default ForecastWeather;