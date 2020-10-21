import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './components/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './components/actions/authActions';
import store from './store';
import Login from './components/signin/signin';
import Signup from './components/signup/signup';
import Navigation from './components/navigation/navigation';
import PrivateRoute from './components/private-route/privateroute';
import Dashboard from './components/dashboard/dashboard';
import JoinChat from './components/chat/JoinChat/JoinChat';
import Chat from './components/chat/Chat';
import post from './components/create-post/post';
import getPost from './components/create-post/fetch-posts';
import Header from './components/header/Header';
import Navbar from './components/header/Navbar';


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./signin";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Header />

          <Navigation />
          <Route exact path="/" />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Login} />
          <Route exact path="/JoinChat" component={JoinChat} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/getPost" component={getPost} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/post" component={post} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;