import React from 'react';
import {connect} from 'react-redux';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import store from '../common/Store';
import {ADD_MESSAGE} from "../reducer/MessageReducer";
import {withSnackbar} from "notistack";
import Button from "@material-ui/core/Button/Button";
import {CHANGE_CURRENT_CHAT} from "../reducer/ChatReducer";

class WebSocketContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleMessageNotify = this.handleMessageNotify.bind(this);
        this.initWebSocket();
    }

    static client = new Client();

    initWebSocket() {
        WebSocketContainer.client.webSocketFactory = () =>
            new SockJS(`http://localhost:8080/chat?access_token=${localStorage.getItem('access_token')}`);
        WebSocketContainer.client.onConnect = () => {
            WebSocketContainer.client.subscribe('/user/chat', response =>
                this.handleMessageNotify(JSON.parse(response.body)));
        }
    }

    handleMessageNotify(message) {
        if (message.chatId === this.props.currentChat) {
            store.dispatch({
                type: ADD_MESSAGE,
                message: message
            });
        } else {
            this.props.enqueueSnackbar(`${message.fromUserId}: ${message.text}`, {
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
                action: <Button size="small" onClick={this.onNotifyClick.bind(null, message.chatId)}>Open</Button>
            });
        }
    }

    onNotifyClick(chatId) {
        store.dispatch({
            type: CHANGE_CURRENT_CHAT,
            currentChat: chatId
        });
    }

    componentDidMount() {
        WebSocketContainer.client.activate();
    }

    componentWillUnmount() {
        WebSocketContainer.client.deactivate();
    }

    render() {
        return null;
    }
}

const mapStateToProps = store => {
    return {
        currentChat: store.chatState.currentChat
    }
};

export const sendWebSocketMessage = message => {
    WebSocketContainer.client.publish({
        destination: '/chat/message',
        body: JSON.stringify(message)
    });
    store.dispatch({
        type: ADD_MESSAGE,
        message: message
    })
};

export default connect(mapStateToProps)(withSnackbar(WebSocketContainer));