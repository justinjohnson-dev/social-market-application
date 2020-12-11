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
import post from './components/createPost/post';
import getPost from './components/createPost/fetchPost';
import Header from './components/header/Header';
import Navbar from './components/header/Navbar';
import Home from './components/home/home';
import purchase from './components/purchaseScreen/purchase';
import notification from './components/notification/notification';
import userNotification from './components/notification/userNotification';
import ChatRedux from './components/chat/ChatRedux';
import Footer from './components/Footer/Footer';



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
    <>
      <div className = "Conent">
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Header />
            <Navigation />
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Login} />
            <Route exact path="/JoinChat" component={JoinChat} />
            <Route exact path="/chat" component={ChatRedux} />
            <Route exact path="/getPost" component={getPost} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/post" component={post} />
              <PrivateRoute exact path="/purchase" component={purchase} />
              <PrivateRoute exact path="/notification" component={notification} />
              <PrivateRoute exact path="/usernotification" component={userNotification} />
            </Switch>
          </div>
        </Router>
      </Provider>
      </div>
      <Footer className = "Footer" />
    </>  
    );
  }
}

export default App;