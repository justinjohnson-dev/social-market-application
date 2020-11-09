import axios from "axios";
import {
    GET_ERRORS,
} from "./types";

// create post
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