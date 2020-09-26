import axios from 'axios';
import { returnErrors } from './errorActions'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";

// check token & load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

// setup config/headers/token
export const tokenConfig = getState => {
    // get token from local storage
    const token = getState().auth.token;

    // header
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // check token - add to header
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}