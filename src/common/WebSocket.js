import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";

const client = new Client();

client.webSocketFactory = () => new SockJS(`http://localhost:8080/chat?access_token=${localStorage.getItem('access_token')}`);

client.onConnect = () => {
    client.subscribe('/user/chat', message => console.log(message));
};

export const activateWebSocket = () => {
    client.activate();
};

export const sendWebSocketMessage = message => {
    client.publish({
        destination: '/chat/message',
        body: JSON.stringify(message)
    });
};

export const closeWebSocket = () => {
    client.deactivate();
};