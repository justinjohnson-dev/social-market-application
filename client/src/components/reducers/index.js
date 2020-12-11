import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import chatReducer  from "./chatReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    post: postReducer,
    chat: chatReducer
});