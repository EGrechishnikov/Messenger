import React from 'react';
import {httpGet, logout} from "../common/http";
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

class Main extends React.Component {
    test() {
        // httpGet('user/admin/exist').then((response) => {
        //     console.log(response);
        // });
        var socket = new SockJS('http://localhost:8080/chat');
        var stompClient = Stomp.over(socket);

        stompClient.connect({}, ()=> {
            stompClient.subscribe("/user/chat", (response) => {console.log(response.body);});
            stompClient.send("/chat/message", {}, 'test');
        });
    }

    doLogout() {
        logout();
    }

    render() {
        return (
            <div>
                <h1>
                    Main
                </h1>
                <button onClick={this.test}>Test</button>
                <button onClick={this.doLogout}>Logout</button>
            </div>
        );
    }
}

export default Main;