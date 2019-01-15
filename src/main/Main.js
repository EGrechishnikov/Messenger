import React from 'react';
import {httpGet} from "../common/Http";
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {Link} from "react-router-dom";

class Main extends React.Component {
    test() {
        // httpGet('user/admin/exist').then((response) => {
        //     console.log(response);
        // });
        var socket = new SockJS('http://localhost:8080/chat');
        var stompClient = Stomp.over(socket);

        stompClient.connect({}, ()=> {
            stompClient.subscribe("/user/chat", (response) => {console.log(response.body);});
            stompClient.send("/chat/message", {}, {message: 'text', author: 'me'});
        });
    }

    render() {
        return (
            <div>
                <h1>
                    Main
                </h1>
                <Link to="/me">Me</Link>
                <button onClick={this.test}>Test</button>
                <button onClick={this.props.doLogout}>Logout</button>
            </div>
        );
    }
}

export default Main;