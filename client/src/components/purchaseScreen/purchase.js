import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import classnames from "classnames";
import ShowHighlight from '../createPost/showHighlight';
import { Fab, Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {
    FormControl,
    InputLabel,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField
} from "@material-ui/core";
import './purchase.css';
import { getUser } from './purchaseApi'
import ShowHighlight2 from "../createPost/showHighlight2";
import './purchase.css'

class Purchase extends Component {
    constructor() {
        super();
        this.state = {
            loadUser: [],
            items: '',
            quantity: '',
            error: false,
            errors: {}
        };
    }

    componentDidMount() {
        // FETCH data
        this.loadFarmerInfo();
    }

    loadFarmerInfo() {
        getUser(this.props.location.state.post.farmerId).then(data => {
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

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        const { user } = this.props.auth;
        const { post } = this.props.location.state;
        const { errors } = this.state;
        return (
            <form noValidate onSubmit={this.onSubmit} className="order-form">
                <div>
                    <p>hello, you are looking to purchase a product from <b>{this.state.loadUser.name}</b> </p>
                </div>
                <div className="card-footer product-div">
                    <div className="product1">
                        <ShowHighlight className='highlight-size' item={post} url="posts" />
                    </div>
                    <div className="product2">
                        <ShowHighlight2 className='highlight-size' item={post} url="posts" />
                    </div>
                </div>
                <div className="item-div">
                    <TextField
                        onChange={this.onChange}
                        error={errors.items}
                        value={this.state.items}
                        type="textbox"
                        id="items"
                        label="What Item(s) do you want to order?"
                        multiline
                        rows={1}
                        fullWidth="true"
                        className={classnames("", {
                            invalid: errors.items
                        })}
                    />
                    <p className="red-text">{errors.items}</p>
                </div>
                <div className="quantity-div">
                    <TextField
                        onChange={this.onChange}
                        error={errors.quantity}
                        value={this.state.itquantityems}
                        type="textbox"
                        id="quantity"
                        label="How many would you like to order?"
                        multiline
                        rows={1}
                        fullWidth="true"
                        className={classnames("", {
                            invalid: errors.quantity
                        })}
                    />
                    <p className="red-text">{errors.quantity}</p>
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