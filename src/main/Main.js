import React from 'react';
import {httpGet} from "../common/Http";
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import {Link} from 'react-router-dom';
import SearchComponentContainer from '../search/SearchComponentContainer';

class Main extends React.Component {
    test() {
        // httpGet('user/admin/exist').then((response) => {
        //     console.log(response);
        // });

        const client = new Client();
        client.webSocketFactory = () => new SockJS('http://localhost:8080/chat');
        client.connectHeaders = {
            'Sec-WebSocket-Key': 'Bearer 123*'
        };
        client.onConnect = () => {
            client.subscribe('/user/chat', message => console.log(message));
            client.publish({
                destination: '/chat/message',
                body: "Hello, STOMP"
            });
        };
        client.onStompError = error => console.log(error);
        client.onWebSocketClose = () => console.log('closed');
        client.activate();

    }

    render() {
        return (
            <div>
                <h1>
                    Main
                </h1>
                <SearchComponentContainer/>
                <Link to='/me'>Me</Link>
                <button onClick={this.test}>Test</button>
                <button onClick={this.props.doLogout}>Logout</button>
            </div>
        );
    }
}

export default Main;