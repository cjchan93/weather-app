import React from 'react';
import './forecast-current.css';

import SearchBar from '.././components/functions/search-bar';
import CurrentWeather from '../components/forecast-current/current-weather';
import ForecastWeather from '../components/forecast-current/forecast-weather';
import { getCurrentWeather, getForecast } from '.././apis/open-weather.api';

//functional component returns a templete
class ForecastCurrent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          location: '',
          temp: '',
          feelsLike: '',
          description: '',
          icon: '',
          hourlyForecast: []
      };
    }

    onInputChange(e) {
        this.setState({
            location: e.target.value,
        });
    }
    
    componentDidMount() {
      this.onFormSubmit();
    }
    
    async onFormSubmit(e) {
    
      const weatherRes = await getCurrentWeather(this.state.location);
      const lat = weatherRes.data.coord.lat;
      const lon = weatherRes.data.coord.lon;
      const forecastRes = await getForecast(lat, lon);
    
      this.setState({
        temp: weatherRes.data.main.temp,
        feelsLike: weatherRes.data.main.feels_like,
        description: weatherRes.data.weather[0].main,
        icon: weatherRes.data.weather[0].icon,
        hourlyForecast: forecastRes.data.hourly,
      });
    
        // getCurrentWeather(this.state.location).then(res => {
        //   const lat = res.data.coord.lat;
        //   const lon = res.data.coord.lon;
    
        //     this.setState({
        //         temp: res.data.main.temp,
        //         feelsLike: res.data.main.feels_like,
        //         description: res.data.weather[0].main,
        //         icon: res.data.weather[0].icon,
        //     });
        // });
    }
    
    render() {
      console.log(this.state.temp);
    
      return (
    
        <div className="current-forecast">
    
        <div className="current-forecast__content">
          
          <header className="current-forecast__header">
            <SearchBar 
              location={this.state.location}
              inputChange={(e) => this.onInputChange(e)}
              formSubmitted={() => this.onFormSubmit()}
            />
    
            <CurrentWeather 
            currentTemperature={this.state.temp}
            feelsLike={this.state.feelsLike}
            description={this.state.description}
            icon={this.state.icon}
            />
    
            <ForecastWeather forecast={this.state.hourlyForecast}/>
    
          </header>
        
         </div>
        </div>
    
      );
    }
}
    
export default ForecastCurrent;