import React from 'react';

class Chat extends React.Component {
    render() {
        return (
            <div>
                <h1>Chat</h1>
                <button onClick={this.props.createChart}>Create</button>
            </div>
        );
    }
}

export default Chat;