import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";

const client = new Client();

client.webSocketFactory = () =>
    new SockJS(`http://localhost:8080/chat?access_token=${localStorage.getItem('access_token')}`);
client.onConnect = () => {
    client.subscribe('/user/chat', message => console.log(message));
};
client.onStompError = error => console.log(error);
client.onWebSocketClose = () => console.log('closed');

export const send = message => {
    client.publish({
        destination: '/chat/message',
        body: JSON.stringify(message)
    });
};

export const activate = () => client.activate();