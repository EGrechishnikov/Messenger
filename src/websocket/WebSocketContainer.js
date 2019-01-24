import React from 'react';
import {connect} from 'react-redux';
import WebSocket from './WebSocket';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import store from '../common/Store';
import {ADD_MESSAGE} from "../reducer/ChatReducer";

class WebSocketContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: {
            text: 'WebSocket',
            fromUserId: 0,
            chatId: 0
        }};
        this.initWebSocket();
    }

    static client = new Client();

    initWebSocket() {
        WebSocketContainer.client.webSocketFactory = () =>
            new SockJS(`http://localhost:8080/chat?access_token=${localStorage.getItem('access_token')}`);
        WebSocketContainer.client.onConnect = () => {
            WebSocketContainer.client.subscribe('/user/chat', message => {
                console.log(message);
                this.setState({message: message});
                if (message.chatId === this.props.currentChat) {
                    store.dispatch({
                        type: ADD_MESSAGE,
                        message: message
                    });
                }
            });
        };
    }

    componentDidMount() {
        WebSocketContainer.client.activate();
    }

    componentWillUnmount() {
        WebSocketContainer.client.deactivate();
    }

    render() {
        return(
            <WebSocket message={this.state.message}/>
        )
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

export default connect(mapStateToProps)(WebSocketContainer);