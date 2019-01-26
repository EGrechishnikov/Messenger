import React from 'react';
import {Button, TextField} from "@material-ui/core/es/index";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            message: ''
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    onInputChange(event) {
        this.setState({message: event.target.value});
    }

    sendMessage() {
        this.props.sendMessage(this.state.message);
        this.setState({message: ''});
    }

    onScroll() {
        //TODO add infinity scroll
        if (true) {
            this.props.loadMessages(true, this.state.page);
        }
    }

    render() {
        return (
            this.props.currentChat ?
                <div>
                    {this.props.messages.map(message => <p key={message.id}>{message.text}</p>)}
                    <TextField
                        label='Message'
                        margin='normal'
                        value={this.state.message}
                        variant="outlined"
                        onChange={this.onInputChange}/>
                    <Button variant="contained" color="primary" size='large' onClick={this.sendMessage}>
                        Send
                    </Button>
                </div> :
                null
        );
    }
}

export default Chat;