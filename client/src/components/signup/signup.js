import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './signup.css';


class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            farmer: "No",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onDropChange = e => {
        this.setState({ farmer: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            farmer: this.state.farmer,
        };
        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <form noValidate onSubmit={this.onSubmit} className="signup-form">
                <h5 className='login-alert login-banners'>Sign Up Below <i className="fas fa-user-plus"></i></h5>
                <div className="name-div">
                    <TextField
                        onChange={this.onChange}
                        error={errors.name}
                        value={this.state.name}
                        type="text"
                        id="name"
                        label="Name"
                        InputProps={{ disableUnderline: true }}
                        className={classnames("", {
                            invalid: errors.name
                        })}
                    />
                    <p className="red-text">{errors.name}</p>
                </div>
                <div className="email-div">
                    <TextField
                        onChange={this.onChange}
                        error={errors.email}
                        value={this.state.email}
                        type="email"
                        id="email"
                        label="Email"
                        InputProps={{ disableUnderline: true }}
                        className={classnames("", {
                            invalid: errors.email
                        })}
                    />
                    <p className="red-text">{errors.email}</p>
                </div>
                <div className="password-div">
                    <TextField
                        onChange={this.onChange}
                        error={errors.password}
                        value={this.state.password}
                        style={{ textDecoration: 'none' }}
                        type="password"
                        id="password"
                        label="Password"
                        InputProps={{ disableUnderline: true }}
                        className={classnames("", {
                            invalid: errors.password
                        })}
                    />
                    <p className="red-text">{errors.email}</p>
                </div>
                <div className="dropdown-farmer-div">
                    <FormControl style={{ width: "190px", width: "195px" }}>
                        <InputLabel style={{ fontSize: "20px" }} id="demo-simple-select-label">Farmer</InputLabel>
                        <Select
                            id="status"
                            value={this.state.farmer}
                            onChange={this.onDropChange}
                            fullWidth="true"
                        >
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="button-div">
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to
                        home
                    </Link>
                    <Button type="submit" variant="outlined" style={{ "background-color": "rgb(196, 141, 41)", "color": "white" }}>
                        Sign up
                    </Button>
                    <p className="grey-text text-darken-1">
                        Already have an account? <Link to="/signin">Sign In</Link>
                    </p>
                </div>
            </form>
        );
    }
}


Signup.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Signup));