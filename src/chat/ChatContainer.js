import React from 'react';
import ContactsContainer from './contacts/ContactsContainer';
import Chat from './Chat';
import {connect} from 'react-redux';
import {httpGet} from '../common/Http';
import store from '../common/Store';
import {LOAD_MESSAGES} from '../reducer/ChatReducer';
import {activateWebSocket, closeWebSocket, sendWebSocketMessage} from '../common/WebSocket';

class ChatContainer extends React.Component {
    loadMessages() {
        let chatId = this.props.currentChat;
        if (chatId) {
            httpGet(`message/${chatId}`).then(response => {
                store.dispatch({
                    type: LOAD_MESSAGES,
                    currentMessages: response.data.content
                });
            });
        }
    }

    componentDidMount() {
        activateWebSocket();
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentChat !== prevProps.currentChat) {
            this.loadMessages();
        }
    }

    componentWillUnmount() {
        closeWebSocket();
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
                      sendMessage={this.sendMessage}/>
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