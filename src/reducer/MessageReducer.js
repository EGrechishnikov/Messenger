export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';

const initialMessageState = {
    currentMessages: []
};

const messageReducer = (state = initialMessageState, action) => {
    switch (action.type) {
        case LOAD_MESSAGES:
            return Object.assign({}, state, {currentMessages: action.messages});
        case UPDATE_MESSAGES:
            return Object.assign({}, state, {currentMessages: action.messages.concat(state.currentMessages)});
        case ADD_MESSAGE:
            let updatedMessages = state.currentMessages.slice();
            updatedMessages.push(action.message);
            return Object.assign({}, state, {currentMessages: updatedMessages});
        default:
            return state;
    }
};

export default messageReducer;