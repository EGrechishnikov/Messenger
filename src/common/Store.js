import {createStore, combineReducers} from 'redux';
import userReducer from "../reducer/UserReducer";

const reducers = combineReducers({
    userState: userReducer
});

let store = createStore(reducers);

export default store;