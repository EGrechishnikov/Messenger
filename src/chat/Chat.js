import React from 'react';

class Chat extends React.Component {
    render() {
        return (
            this.props.currentChat ?
            <div>
                {this.props.messages.map(message => <h2 key={message.id}>{message.text}</h2>)}
                <button onClick={this.props.sendMessage.bind(null, 'test')}>Send</button>
            </div>  :
                null
        );
    }
}

export default Chat;