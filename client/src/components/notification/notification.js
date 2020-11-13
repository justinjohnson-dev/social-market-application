import React, { Component } from "react";
import PropTypes, { array } from "prop-types";
import { connect } from "react-redux";
import { getFarmerOrder } from './farmerOrderApi';
import { getUserId } from './userOrderApi';
import { Button } from "@material-ui/core";
import Order from './notificationOrder';
import './notification.css';


class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadOrder: [],
            sendToNotification: [],
            orderCount: 0,
            showOrder: '',
            error: false,
            errors: {}
        };
    }

    componentDidMount() {
        // FETCH data
        this.loadOrders();
    }

    loadOrders() {
        getFarmerOrder(this.props.auth.user.id).then(data => {
            if (data.error) {
                this.setState({
                    error: data.error
                });
            } else {
                this.setState({
                    loadOrder: data,
                });
                this.setState({
                    orderCount: this.state.loadOrder.length,
                });
                this.setState({
                    sendToNotification: this.state.loadOrder[0],
                });
            }
        });
    }

    onSubmit = () => {
        if (this.state.orderCount > 0) {
            this.setState({
                showOrder: "yes",
            })
        }
    }

    render() {
        const singleItem = [];
        singleItem.push(this.state.sendToNotification)

        console.log('completed or no')
        console.log(this.state.sendToNotification.completed)

        return (
            <div className="main-container">
                <h2 className="mb-4 title home-page-title-styling"><i class="far fa-envelope"></i> <span className="orderCount">{this.state.orderCount}</span> Current Orders</h2>
                {this.state.orderCount !== 0 &&
                    <Button type="submit" onClick={this.onSubmit} variant="outlined" className="button-color">
                        <i class="far fa-envelope"> View Order</i>
                    </Button>
                }
                {this.state.showOrder === 'yes' && this.state.sendToNotification.completed === "No" &&
                    <div className="row">
                        {singleItem.map((order, index) => (<Order key={index} order={order} />))}
                    </div>
                }
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