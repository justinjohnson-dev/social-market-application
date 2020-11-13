import axios from "axios";
import {
    GET_ERRORS,
} from "./types";

// create order
export const createOrder = (userOrder, history) => dispatch => {
    axios
        .post("/api/orders/createorder", userOrder)
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// create order response
export const createOrderResponse = (farmerResponse, orderId, history) => dispatch => {
    axios
        .post(`/api/orders/farmerresponse/${orderId}`, farmerResponse)
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};