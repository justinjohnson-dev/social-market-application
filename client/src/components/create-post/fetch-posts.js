import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './dashboard.css';


class getPost extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
        return (
            <div className="container valign-wrapper">
                <div className="row">
                    
                </div>
            </div>
        );
    }
}

getPost.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {  }
)(getPost);