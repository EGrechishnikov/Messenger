export const LOAD_CHATS = 'LOAD_CHATS';
export const CURRENT_CHAT = 'CURRENT_CHAT';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';

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
            return Object.assign({}, state, {currentMessages: action.currentMessages});
        default:
            return state;
    }
};

export default chatReducer;