import axios from "axios";
import {
    GET_ERRORS,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE
} from "./types";

// create post
export const createPost = (userPost, history) => dispatch => {
    axios
        .post("/api/posts/createpost", userPost)
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// fetch the post
export const fetchPost = () => {
    return (dispatch) => {
        dispatch(fetchPostRequest)
        axios
            .get("api/posts/getPost")
            .then(respose => {
                const post = respose.data
                dispatch(fetchPostSuccess(post))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchPostFailure(errMsg))
            })
    }
}

// fetch post request
export const fetchPostRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

// fetch user success
export const fetchPostSuccess = () => {
    return {
        type: FETCH_USERS_SUCCESS
    }
}

// fetch user failure
export const fetchPostFailure = () => {
    return {
        type: FETCH_USERS_FAILURE
    }
}