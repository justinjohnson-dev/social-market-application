import axios from 'axios';

//constants for creating and setting room
export const REQUEST_TO_CREATE_NEW_ROOM = "REQUEST_TO_CREATE_NEW_ROOM";
export const CREATE_NEW_CHAT_ROOM = "CREATE_NEW_CHAT_ROOM";
export const ERROR_ON_CREATE_ROOM = "ERROR_ON_CREATE_ROOM";
export const GET_CHAT_ROOM_FAILURE = "GET_CHAT_ROOM_FAILURE";
export const GET_CHAT_ROOM_REQUEST = "GET_CHAT_ROOM_REQUEST";
export const SET_ROOM = "SET_ROOM";

//constants for joining chat
export const REQUEST_TO_JOIN_CHAT_ROOM = "REQUEST_TO_JOIN_CHAT_ROOM";
export const ERROR_ON_JOIN_ROOM = "ERROR_ON_JOIN_ROOM";
export const JOIN_CHAT_ROOM_IS_SUCCESSFUL = "JOIN_CHAT_ROOM_IS_SUCCESSFUL";

//makes a new request to create a new chat room
export function createNewChatRoomRequest() {
    return {
        type: REQUEST_TO_CREATE_NEW_ROOM
    }   
}

//success creating chat room
export function createNewChatRoomIsSuccessful(payload) {
    return {
        type: CREATE_NEW_CHAT_ROOM,
        payload
    }
}

//error on creation
export function errorOnCreateNewRoom(error) {
    return {
        type: ERROR_ON_CREATE_ROOM,
        error
    }
}

//getting chat room is successful
export function getChatRoomSuccesful(payload) {
    return {
        type: JOIN_CHAT_ROOM_IS_SUCCESSFUL,
        payload
    }
}

//failure on fetching chat room
export function getChatRoomFailure(payload) {
    return {
        type: GET_CHAT_ROOM_FAILURE,
        payload
    }
}

//request to join chat room
export function getChatRoomRequest(payload) {
    return {
        type: GET_CHAT_ROOM_REQUEST,
        payload
    }
}

//get chat room
export const getChatRoom = (roomName, callback) => {
    return dispatch => {
        axios

            //api
            .get(`api/chatRoom/getChatRoom/${roomName}`)

            //response is room found
            .then(response => {
                const room = response.data;
                dispatch(getChatRoomRequest(room));
                callback();
            })

            //not found
            .catch(error => {
                dispatch(getChatRoomFailure(error.response.data));
              
            })
    }
}

//create chat room
export const createNewChatRoom = (createRoomFormData, callBack) => dispatch => {
    axios

        //api
        .post("/api/chatRoom/createChat", createRoomFormData)

        //room is response
        .then(res => {
            const {room} = res.data;
            callBack();

            //sets current room
            dispatch(setCurrentRoom(room));
        })

        //already exists
        .catch(err =>{ 
            dispatch({
                type: ERROR_ON_CREATE_ROOM,
                payload: err.response.data
            })
        }
        );
};

//sets chat room
export const setCurrentRoom = ( room ) => {
    return {
        type: SET_ROOM,
        payload: room
    }
}

//request to join
export function joinChatRoomRequest() {
    return {
        type: REQUEST_TO_JOIN_CHAT_ROOM
    }
}

//success on join
export function joinChatRoomIsSuccesful(payload) {
    return  {
        type: JOIN_CHAT_ROOM_IS_SUCCESSFUL,
        payload
    }
}

//error on join
export function errorOnJoinChatRoom(error) {
    return {
        type: ERROR_ON_JOIN_ROOM,
        error
    }
}

//join chat room
export const joinChatRoom = ( joinRoomData ) => dispatch => {
    
    axios
        //api
        .post("/api/chatRoom/joinChat", joinRoomData)
        .catch(err => 
            dispatch({
                type: ERROR_ON_JOIN_ROOM,
                payload: err.response.data
            })
        );
}

