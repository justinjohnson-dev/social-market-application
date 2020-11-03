import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import classnames from "classnames";
import { Button, AccordionSummary } from "@material-ui/core";
import {
    TextField
} from "@material-ui/core";
import './purchase.css';
import { getUser } from './purchaseApi'

class Purchase extends Component {
    constructor() {
        super();
        this.state = {
            loadUser: [],
            error: false,
            errors: {}
        };
    }

    componentDidMount() {
        // FETCH data
        this.loadFarmerInfo();
    }

    loadFarmerInfo() {
        getUser(this.props.location.state.post).then(data => {
            if (data.error) {
                this.setState({
                    error: data.error
                });
            } else {
                this.setState({
                    loadUser: data
                });

                console.log(this.state.loadUser)
            }
        });
    }

    render() {
        const { user } = this.props.auth;
        const { post } = this.props.location.state;

        return (
            <form noValidate onSubmit={this.onSubmit} className="post-form-style">
                <div>
                    <p>hello, you are looking to purchase a product from <b>{this.state.loadUser.name}</b> </p>
                    <p>{post}</p>
                    <p>{user.id}</p>
                </div>
            </form>
        );
    }
}

Purchase.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Purchase);