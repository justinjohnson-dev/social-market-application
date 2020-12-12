import {
    GET_CHAT_ROOM_REQUEST,
    GET_CHAT_ROOM_FAILURE,
    ERROR_ON_CREATE_ROOM,
    SET_ROOM
} from "../actions/chatActions";

const initialState = {
    chatRoom: null,
    loading: false,
    errors: null
};

const ChatReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CHAT_ROOM_REQUEST:
            return {
                ...state,
                chatRoom: action.payload,
                errors: null,
                loading: true
            };
        case SET_ROOM:
            return {
                ...state,
                chatRoom: action.payload,
                errors: null,
                loading: true
            };
        case ERROR_ON_CREATE_ROOM:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case GET_CHAT_ROOM_FAILURE:
            return {
                ...state,
                errors: action.payload,
            };
        default:
            return state;
    }
}

export default ChatReducer;