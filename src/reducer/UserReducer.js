import {USER_LOGOUT} from "./ChatReducer";

export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

const initialUserState = {
    currentUser: undefined
};

const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_USER:
            return Object.assign({}, state, {currentUser: action.currentUser});
        case USER_LOGOUT:
            return initialUserState;
        default:
            return state;
    }
};

export default userReducer;