export const LOAD_CHATS = 'LOAD_CHATS';
export const CURRENT_CHAT = 'CURRENT_CHAT';

const initialChatState = {
    chats: [],
    currentChat: undefined
};

const chatReducer = (state = initialChatState, action) => {
    switch (action.type) {
        case LOAD_CHATS:
            return Object.assign({}, state, {chats: action.chats});
        case CURRENT_CHAT:
            return Object.assign({}, state, {currentChat: action.currentChat})
        default:
            return state;
    }
};

export default chatReducer;