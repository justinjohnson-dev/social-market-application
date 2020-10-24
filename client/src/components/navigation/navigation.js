import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import './navigation.css';

class Navigation extends Component {

  // log out user
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  // checking if we have a token to display users name
  checkToken() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  // const toggleSlider = (slider, open) => () => {
    //setState({...state, [slider]: open});
//}
  render() {
    const { user } = this.props.auth;
    return (

       <div> 
       {this.checkToken() === true &&
          <div className="login-user right">
            <h4 className="user"><i className="fas fa-user"></i> Hello, {user.name} </h4>
          </div>
        }

        {this.checkToken() === true &&
          <div className="logout-button right">
            <button onClick={this.onLogoutClick} className="btn btn-small waves-effect waves-light hoverable dark-green accent-3 logout-button">
              Logout
            </button>
          </div>
        }
      </div>
    );
  }
}

Navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navigation);