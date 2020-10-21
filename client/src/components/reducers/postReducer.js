import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from "../actions/types";

const initialState = {
    loading: false,
    post: [],
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                laoding: false,
                post: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                laoding: false,
                post: [],
                error: action.payload
            }
        case 'LOAD':
            return action.post;
        default: return state
    }
}

export default reducer;