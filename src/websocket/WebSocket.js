import React from 'react';

class WebSocket extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.message.text}</h2>
                <p>{this.props.message.fromUserId}</p>
            </div>
        );
    }
}

export default WebSocket;