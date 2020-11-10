import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFarmerOrder } from './farmerOrderApi';
import { getUserId } from './userOrderApi';
import Order from './notificationOrder';
import './notification.css';


class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadOrder: [],
            error: false,
            errors: {}
        };
    }

    componentDidMount() {
        // FETCH data
        this.loadOrders();
    }

    loadOrders() {
        getFarmerOrder(this.props.auth.user.id,).then(data => {
            if (data.error) {
                this.setState({
                    error: data.error
                });
            } else {
                this.setState({
                    loadOrder: data
                });
                console.log(this.state.loadOrder)
            }
        });
    }

    render() {
        return (
            <div className="main-container">
                <h2 className="mb-4 title home-page-title-styling">Current Orders</h2>
                <div className="row">
                    {this.state.loadOrder.map((order, index) => (<Order key={index} order={order} />))}
                </div>
            </div>
        );
    }
}

Notification.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {}
)(Notification);