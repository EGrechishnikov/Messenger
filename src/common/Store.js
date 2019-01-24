import {createStore, combineReducers} from 'redux';
import userReducer from '../reducer/UserReducer';
import chatReducer from "../reducer/ChatReducer";
import messageReducer from "../reducer/MessageReducer";

const reducers = combineReducers({
    userState: userReducer,
    chatState: chatReducer,
    messageState: messageReducer
});

let store = createStore(reducers);

export default store;