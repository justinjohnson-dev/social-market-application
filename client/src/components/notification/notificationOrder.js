import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './notification.css';


const notificationOrder = ({ order }) => {
    return (
        <div className="col-4 match-height card-direction">
            <div className="card">
                <div className="card-header product-name">{order.items}</div>
                <div className="card-body">
                    <div className="card-body-styling">
                        <p className="product-description">{order.quantity}</p>
                        <p className="product-description">{order.farmerId}</p>
                        <p className="product-description">{order.userId}</p>
                    </div>
                </div>
            </div>        
        </div>
    );
}


notificationOrder.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(notificationOrder);
