import React from 'react';
import Chat from "./Chat";
import {connect} from "react-redux";
import {httpGet, httpPost} from "../common/Http";
import {send, activate} from "../common/WebSocket";

class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.createChart = this.createChart.bind(this);
    }

    createChart() {
        // httpPost('chat', {users: [{id: this.props.currentUser.id}]}, false);
        // httpGet(`chat/${this.props.currentUser.id}`).then(response => {
        //     console.log(response);
        // });
        activate();
        setTimeout(send.bind(null, {text: 'test', fromUserId: 2, chatId: 1}), 1000);
    }

    render() {
        return(
            <Chat createChart={this.createChart}/>
        );
    }
}

const mapStateToProps = store => {
    return {
        currentUser: store.userState.currentUser
    }
};

export default connect(mapStateToProps)(ChatContainer);