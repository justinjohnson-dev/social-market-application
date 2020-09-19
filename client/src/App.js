import React from 'react';
import './App.css';
import Home from './components/home/home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import User from './components/user/user';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user" exact component={User} />
        </Switch>
    </Router>
  );
}

export default App;