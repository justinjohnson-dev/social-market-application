import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './notification.css';


class userOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadOrder: this.props.order,
            userName: '',
            comment: '',
            status: '',
            error: false,
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        console.log(this.state.loadOrder)
        return (
            <div className="col-4 match-height card-direction">
                <div className="card notification-card">
                    <div className="card-header order-name">{this.props.auth.user.name}</div>
                    <div className="card-body">
                        <div className="card-body-styling user-notification-div">
                            <p className="">You requested: <span className="bold-font">{this.state.loadOrder.items}</span></p>
                            <p className="">Quantity requested: <span className="bold-font">{this.state.loadOrder.quantity}</span></p>
                            <p className="">Farmer comments: <span className="bold-font">{this.state.loadOrder.comment}</span></p>
                            <p className="">Order status: <span className="bold-font">{this.state.loadOrder.status}</span></p>
                            <p className="">Order completed: <span className="bold-font">{this.state.loadOrder.completed}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

userOrder.propTypes = {
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
)(userOrder);
