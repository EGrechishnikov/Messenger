import React from 'react';
import Chat from "./Chat";
import {connect} from 'react-redux';
import {httpGet} from '../common/Http';
import {sendWebSocketMessage, activateWebSocket, closeWebSocket} from '../common/WebSocket';
import store from '../common/Store';
import {LOAD_CHATS} from "../reducer/ChatReducer";

class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.loadChats = this.loadChats.bind(this);
    }

    componentDidMount() {
        activateWebSocket();
    }

    loadChats() {
        httpGet(`chat/${this.props.currentUser.id}`).then(response => {
            store.dispatch({
                    type: LOAD_CHATS,
                    chats: response.data
                }
            );
        });
    }

    componentWillUnmount() {
        closeWebSocket();
    }

    sendMessage() {
        sendWebSocketMessage({text: 'test', fromUserId: 2, chatId: 1});
    }

    render() {
        return (
            <Chat sendMessage={this.sendMessage} chats={this.props.chats} loadChats={this.loadChats}/>
        );
    }
}

const mapStateToProps = store => {
    return {
        currentUser: store.userState.currentUser,
        chats: store.chatState.chats
    }
};

export default connect(mapStateToProps)(ChatContainer);