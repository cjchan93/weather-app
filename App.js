import React from 'react';
import './App.css';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import MainNavigation from './assets/components/navigations/main-navigation'
import ForecastCurrent from './assets/pages/forecast-current';
import Forecast7Days from './assets/pages/forecast-7days';
import ContactPage from './assets/pages/contact';

//functional component returns a templete
class App extends React.Component {

  render() {

    return (

      <div className="App-main">

        <BrowserRouter>

          <React.Fragment>
            <MainNavigation />
            <main className="App-main__content">
              <Switch>
                <Redirect from="/app" to="/forecast-current" exact />
                <Route path="/forecast-current" component={ForecastCurrent} />
                <Route path="/forecast-7days" component={Forecast7Days} />
                <Route path="/contact" component={ContactPage} />
              </Switch>
            </main>
          </React.Fragment>
        </BrowserRouter>

        <div className="App">

          <footer className="footer">Copyright © 2021 by Chan Jia Jun. All Rights Reserved.</footer>

        </div>
      </div>

    );
  }
}

export default App;