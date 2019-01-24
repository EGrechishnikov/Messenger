import React from 'react';
import ContactsContainer from './contacts/ContactsContainer';
import Chat from './Chat';
import {connect} from 'react-redux';
import {httpGet} from '../common/Http';
import store from '../common/Store';
import {LOAD_MESSAGES, UPDATE_MESSAGES} from '../reducer/ChatReducer';
import {PAGE_SIZE} from "../common/Config";
import {sendWebSocketMessage} from "../websocket/WebSocketContainer";

class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.loadMessages = this.loadMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    loadMessages(update, page = 0) {
        let chatId = this.props.currentChat;
        if (chatId) {
            httpGet(`chat/${chatId}/messages`, [
                {name: 'page', value: page},
                {name: 'size', value: PAGE_SIZE},
                {name: 'sort', value: 'created,DESC'}
            ]).then(response => {
                let messages = response.data.content;
                if (update && messages.length === 0) {
                    return;
                }
                messages.sort((m1, m2) => m1.created > m2.created ? 1 : -1);
                store.dispatch({
                    type: update ? UPDATE_MESSAGES : LOAD_MESSAGES,
                    messages: messages
                });
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentChat !== prevProps.currentChat) {
            this.loadMessages(false);
        }
    }

    sendMessage(message) {
        sendWebSocketMessage({text: message, fromUserId: this.props.currentUserId, chatId: this.props.currentChat});
    }

    render() {
        return (
            <div>
                <ContactsContainer/>
                <Chat currentChat={this.props.currentChat}
                      messages={this.props.messages}
                      sendMessage={this.sendMessage}
                      loadMessages={this.loadMessages}/>
            </div>
        );
    }
}

const mapStateToProps = store => {
    let currentUser = store.userState.currentUser;
    return {
        currentChat: store.chatState.currentChat,
        messages: store.chatState.currentMessages,
        currentUserId: currentUser ? currentUser.id : undefined
    }
};

export default connect(mapStateToProps)(ChatContainer);