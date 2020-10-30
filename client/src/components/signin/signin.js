import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import './signin.css';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <form noValidate className="" onSubmit={this.onSubmit}>
        <h5 className='login-alert login-banners'>Sign In <i className="fas fa-sign-in-alt"></i></h5>
        <div className="email-div">
          <TextField
            onChange={this.onChange}
            error={errors.email}
            value={this.state.email}
            type="email"
            id="email"
            label="Email"
            className={classnames("", {
              invalid: errors.email || errors.emailnotfound
            })}
          />
          <p className="red-text">
            {errors.email}
            {errors.emailnotfound}
          </p>
        </div>
        <div className="password-div">
          <TextField
            onChange={this.onChange}
            error={errors.password}
            value={this.state.password}
            type="password"
            id="password"
            label="Password"
            className={classnames("", {
              invalid: errors.password || errors.passwordincorrect
            })}
          />
          <span className="red-text">
            {errors.password}
            {errors.passwordincorrect}
          </span>
        </div>
        <div className="button-div">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <Button type="submit" variant="outlined" style={{ "background-color": "rgb(196, 141, 41)", "color": "white"}}>
            Sign In
          </Button>
          <p className="grey-text text-darken-1">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
