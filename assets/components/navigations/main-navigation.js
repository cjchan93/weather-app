import React from 'react';
import { NavLink } from 'react-router-dom';
import './main-navigation.css';

const MainNavigation = props => (
    <header className="main-navigation">
        <div className="main-navigation__logo">
            <a href="/app">
                <h1>WeatherForecast</h1>
            </a>
        </div>

        <div className="main-navigation__items">
            <ul>
                <li>
                    <NavLink to="/forecast-7days">7 Days Forecast</NavLink>
                </li>

                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>

            </ul>
        </div>

    </header>
)

export default MainNavigation;