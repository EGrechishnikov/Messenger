import React from 'react';
import ContactsContainer from './contacts/ContactsContainer';
import Chat from './Chat';
import {connect} from 'react-redux';
import {httpGet} from '../common/Http';
import store from '../common/Store';
import {PAGE_SIZE} from "../common/Config";
import {sendWebSocketMessage} from "../websocket/WebSocketContainer";
import {LOAD_MESSAGES, UPDATE_MESSAGES} from "../reducer/MessageReducer";
import {Grid} from "@material-ui/core/es/index";
import {encryptMessage} from "../security/cipher/MessageCipher";
import {UPDATE_LAST_MESSAGE} from "../reducer/ChatReducer";

class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lastMessageLoaded: false, loading: false};
        this.loadMessages = this.loadMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    loadMessages(update, page = 0) {
        let chatId = this.props.currentChat;
        if (chatId && !this.state.loading) {
            this.setState({loading: true});
            httpGet(`chat/${chatId}/messages`, [
                {name: 'page', value: page},
                {name: 'size', value: PAGE_SIZE},
                {name: 'sort', value: 'created,DESC'}
            ]).then(response => {
                let messages = response.data.content;
                setTimeout(() => this.setState({
                    lastMessageLoaded: response.data.last,
                    loading: false
                }), 500);
                if (update && messages.length === 0) {
                    console.log(1);
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
        let encryptedMessage = {
            text: encryptMessage(message),
            fromUserId: this.props.currentUserId,
            chatId: this.props.currentChat
        };
        sendWebSocketMessage(encryptedMessage);
        store.dispatch({
            type: UPDATE_LAST_MESSAGE,
            chat: {id: this.props.currentChat, lastMessage: encryptedMessage}
        });
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={4} className='contacts-list mt-6'>
                    <ContactsContainer/>
                </Grid>
                <Grid item xs={8} className='mt-6'>
                    <Chat currentChat={this.props.currentChat}
                          currentUserId={this.props.currentUserId}
                          messages={this.props.messages}
                          sendMessage={this.sendMessage}
                          lastMessageLoaded={this.state.lastMessageLoaded}
                          loading={this.state.loading}
                          loadMessages={this.loadMessages}/>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = store => {
    let currentUser = store.userState.currentUser;
    return {
        currentChat: store.chatState.currentChat,
        messages: store.messageState.currentMessages,
        currentUserId: currentUser ? currentUser.id : undefined
    }
};

export default connect(mapStateToProps)(ChatContainer);