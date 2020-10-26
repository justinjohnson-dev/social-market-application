import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './dashboard.css';


class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
        return (
            <div className="container">
                <h4 className="hello-user">
                    Hey there, {user.name}
                </h4>
            </div>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {  }
)(Dashboard);