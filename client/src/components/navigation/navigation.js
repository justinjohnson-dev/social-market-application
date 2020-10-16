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

  render() {
    const { user } = this.props.auth;
    return (
      <div className="navbar-fixed main">
        <div className="left">
          <h4 className="app-name"><i className="fas fa-seedling"></i> Home Grown Social App</h4>
        </div>
        <div className="center"></div>
        <>
      
        <Box component="nav">
            <AppBar position="static" style={{background: "#679459"}}>
            <Toolbar>
                <IconButton onClick={toggleSlider("right", true)}>
                <ArrowBack style={{color: "#222"}} />
                </IconButton>
                <Typography variant="h5" style={{color: "#F3E2C0"}}>Welcome To HomeGrown</Typography>
                <MobileRightMenuSlider
                anchor="right"
                open={state.right}
                >
                    {sideList("right")}

                </MobileRightMenuSlider>
            </Toolbar>
        </AppBar>
    </Box> 
    </>

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