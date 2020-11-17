import React, { Component } from "react";
import PropTypes, { array } from "prop-types";
import { connect } from "react-redux";
import { getUserOrder } from "./userOrderApi";
import { Button } from "@material-ui/core";
import Order from './userOrders';
import './notification.css';


class userNotifiction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadOrder: [],
            orderCount: '',
            errors: {}
        };
    }

    componentDidMount() {
        // FETCH data
        this.loadOrders();
    }

    loadOrders() {
        getUserOrder(this.props.auth.user.id).then(data => {
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
        return (
            <div className="main-container">
                <h2 className="mb-4 title home-page-title-styling"><i class="far fa-envelope"></i> <span className="orderCount">{this.state.orderCount}</span> Orders Requested</h2>
                {this.state.orderCount !== 0 &&
                    <Button type="submit" onClick={this.onSubmit} variant="outlined" className="button-color">
                        <i class="far fa-envelope"> View Orders</i>
                    </Button>
                }
                {this.state.showOrder === 'yes' &&
                    <div className="row">
                        {this.state.loadOrder.map((order, index) => (<Order key={index} order={order} />))}
                    </div>
                }
            </div>
        );
    }
}

userNotifiction.propTypes = {
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
)(userNotifiction);