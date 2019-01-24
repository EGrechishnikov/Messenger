export const LOAD_CHATS = 'LOAD_CHATS';
export const CURRENT_CHAT = 'CURRENT_CHAT';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const USER_LOGOUT = 'UPDATE_CURRENT_USER';

const initialChatState = {
    chats: [],
    currentChat: undefined,
    currentMessages: []
};

const chatReducer = (state = initialChatState, action) => {
    switch (action.type) {
        case LOAD_CHATS:
            return Object.assign({}, state, {chats: action.chats});
        case CURRENT_CHAT:
            return Object.assign({}, state, {currentChat: action.currentChat});
        case LOAD_MESSAGES:
            return Object.assign({}, state, {currentMessages: action.messages});
        case UPDATE_MESSAGES:
            return Object.assign({}, state, {currentMessages: action.messages.concat(state.currentMessages)});
        case ADD_MESSAGE:
            let updatedMessages = state.currentMessages.slice();
            updatedMessages.push(action.message);
            return Object.assign({}, state, {currentMessages: updatedMessages});
        case USER_LOGOUT:
            return initialChatState;
        default:
            return state;
    }
};

export default chatReducer;