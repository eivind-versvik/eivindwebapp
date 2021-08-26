import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Checkout from './components/Checkout';
import Success from './components/Success';
import Canceled from './components/Canceled';
import MyComponent from './components/MyComponent'
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

import './css/normalize.css';
import './css/global.css';
import "./index.bundle.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/canceled">
          <Canceled />
        </Route>
        <Route path="/">
          <Checkout />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
