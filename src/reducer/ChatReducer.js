export const LOAD_CHATS = 'LOAD_CHATS';
export const CHANGE_CURRENT_CHAT = 'CHANGE_CURRENT_CHAT';
export const ADD_CHAT = 'ADD_CHAT';
export const USER_LOGOUT = 'USER_LOGOUT';
export const UPDATE_LAST_MESSAGE = 'UPDATE_LAST_MESSAGE';

const initialChatState = {
    chats: [],
    currentChat: undefined
};

const chatReducer = (state = initialChatState, action) => {
    switch (action.type) {
        case LOAD_CHATS:
            return Object.assign({}, state, {chats: action.chats});
        case ADD_CHAT:
            let updatedChats = state.chats.slice();
            updatedChats.push(action.chat);
            return Object.assign({}, state, {chats: updatedChats});
        case CHANGE_CURRENT_CHAT:
            return Object.assign({}, state, {currentChat: action.currentChat});
        case UPDATE_LAST_MESSAGE:
            let chatsWithNewLastMessages = state.chats.map(chat => {
                if(chat.id === action.chat.id) {
                    chat.lastMessage = action.chat.lastMessage;
                }
                return chat;
            });
            return Object.assign({}, state, {chats: chatsWithNewLastMessages});
        case USER_LOGOUT:
            return initialChatState;
        default:
            return state;
    }
};

export default chatReducer;