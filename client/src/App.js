import React, { Component } from 'react';
import './App.css';
import Home from './components/home/home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadUser } from './components/actions/authActions';
import store from './store';
import User from './components/user/user';
import Signup from './components/signup/signup';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/user" exact component={User} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;