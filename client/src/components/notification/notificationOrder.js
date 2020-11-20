import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getUser } from '../purchaseScreen/purchaseApi';
import { createOrderResponse } from "../actions/orderAction";
import { Button } from "@material-ui/core";
import {
    TextField
} from "@material-ui/core";
import './notification.css';


class notificationOrder extends Component {
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

    componentDidMount() {
        // FETCH data
        this.loadUserName();
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    loadUserName() {
        getUser(this.state.loadOrder.userId).then(data => {
            if (data.error) {
                this.setState({
                    error: data.error
                });
            } else {
                this.setState({
                    userName: data.name
                });
            }
        });
    }

    onSubmit = e => {
        e.preventDefault();
        // create form as we are using the formidable package on backend
        let formData = new FormData();
        // add data from state to form
        formData.append('items', this.state.loadOrder.items);
        formData.append('quantity', this.state.loadOrder.quantity);
        formData.append('userId', this.state.loadOrder.userId);
        formData.append('farmerId', this.state.loadOrder.farmerId);
        formData.append('comment', this.state.comment);
        formData.append('status', this.state.status);
        formData.append('completed', "Yes");

        this.props.createOrderResponse(formData, this.state.loadOrder._id);

        if (this.state.comment !== '' && this.state.status !== '') {
            window.location.reload();
        }
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="col-4 match-height card-direction">
                <div className="card notification-card">
                    <div className="card-header order-name">Order from user: <span className="bold-font">{this.state.userName}</span></div>
                    <div className="card-body">
                        <div className="card-body-styling">
                            <p className="">Customer wants to purchase: <span className="bold-font">{this.state.loadOrder.items}</span></p>
                            <p className="">Quantity requested: <span className="bold-font">{this.state.loadOrder.quantity}</span></p>
                        </div>
                        <div className="comment-div">
                            <TextField
                                onChange={this.onChange}
                                error={errors.comment}
                                value={this.state.comment}
                                type="textbox"
                                id="comment"
                                label="Comments"
                                multiline
                                rows={4}
                                className={classnames("", {
                                    invalid: errors.comment
                                })}
                            />
                            <p className="red-text">{errors.comment}</p>
                        </div>
                        <div className="status-div">
                            <TextField
                                onChange={this.onChange}
                                error={errors.status}
                                value={this.state.status}
                                type="textbox"
                                id="status"
                                label="Approve/Decline"
                                multiline
                                rows={4}
                                className={classnames("", {
                                    invalid: errors.status
                                })}
                            />
                            <p className="red-text">{errors.status}</p>
                        </div>
                        <div className="response-button-div">
                            <Button type="submit" onClick={this.onSubmit} variant="outlined" className="button-color">
                                Send Response
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

notificationOrder.propTypes = {
    createOrderResponse: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createOrderResponse }
)(notificationOrder);