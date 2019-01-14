import React from 'react';
import {httpGet, logout} from "../common/http";
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

class Main extends React.Component {
    test() {
        // httpGet('user/admin/exist').then((response) => {
        //     console.log(response);
        // });
        var socket = new SockJS('http://localhost:8080/secured/room');
        var stompClient = Stomp.over(socket);
        var sessionId;

        stompClient.connect({}, function (frame) {
            var url = stompClient.ws._transport.url;
            url = url.replace(
                "ws://localhost:8080/secured/room/",  "");
            url = url.replace("/websocket", "");
            url = url.replace(/^[0-9]+\//, "");
            console.log("Your current session is: " + url);
            sessionId = url;

            stompClient.subscribe("/secured/history", (response) => {console.log(response.body);});
            stompClient.subscribe("/secured/user/login/secured/user/queue/specific-user", () => {console.log(1);});
            stompClient.send("/spring-security-mvc-socket/secured/chat", {}, 'it works!');
            stompClient.send("/spring-security-mvc-socket/secured/room", {}, 'personal!');
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
                {/*<SockJsClient url='http://localhost:8080/secured/room' topics={['']}*/}
                              {/*onMessage={(msg) => { console.log(msg); }}*/}
                              {/*ref={ (client) => { this.clientRef = client }} />*/}
                <button onClick={this.test}>Test</button>
                <button onClick={this.doLogout}>Logout</button>
            </div>
        );
    }
}

export default Main;