import React from 'react';
import './search-bar.css';
import { getCurrentWeather } from '../../apis/open-weather.api';

//Class component
class SearchBar extends React.Component {

    constructor(props) {
        super(props);
    }
    
    onInputChange(e) {
        this.props.inputChange(e);
    }
    
    onFormSubmit(e) {
        e.preventDefault();
        this.props.formSubmitted();
    }

    /**
     * main information should in App.js (parent) with this.state
     * App.js (parent) could pass information to search-bar.js (child) with this.props (parameters)
     */
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         location: '',
    //         temp: ''
    //     };

    //     // setInterval(() => {
    //     //     this.setState({
    //     //         location: 'my new Address'
    //     //     });
    //     //     // console.log('executing..')
    //     // }, 1000);

    //     getCurrentWeather("New York").then((res) => {
    //         console.log('res', res);
    //     })
    // }

    // //e = event, res = response
    // onInputChange(e) {
    //     this.setState({
    //         location: e.target.value
    //     });
    //     // console.log(e.target.value)
    // }

    // onFormSubmit(e) {
    //     e.preventDefault();

    //     getCurrentWeather(this.state.location)
    //     .then(res => {
    //         this.setState({
    //             temp: res.data.main.temp
    //         });
    //     })
    // }

    /**
     * render function triggered wherever updating
     * the state using the setstate function
     * testing user input by put {location} & {temp} inside <form></form>
     * onSubmit is to prevent render/refresh again
     */
    render() {
        const location = this.props.location;
        const placeholder = "Enter City Name";

        return (
            <div className="search-bar">
            <form className="search-bar__form" onSubmit={(e) => this.onFormSubmit(e)}>
                <input className="search-bar__input"
                       id="search"
                       name="search" 
                       placeholder={placeholder} 
                       value={location} 
                       onChange={(e) => this.onInputChange(e)}>
                </input>

                <button className="search-bar__button" type="submit">
                    Search
                </button>

            </form>
            </div>
        )
    }
}

export default SearchBar;