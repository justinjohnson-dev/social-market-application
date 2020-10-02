import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import './dashboard.css';


class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
        return (
            <div className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4 className="hello-user">
                            Hey there, {user.name}
                        </h4>
                        <button onClick={this.onLogoutClick} className="btn btn-small waves-effect waves-light hoverable dark-green accent-3 logout-button">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);