import {createStore, combineReducers} from 'redux';
import userReducer from '../reducer/UserReducer';
import chatReducer from "../reducer/ChatReducer";

const reducers = combineReducers({
    userState: userReducer,
    chatState: chatReducer
});

let store = createStore(reducers);

export default store;