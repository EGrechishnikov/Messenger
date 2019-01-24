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
    }

    onInputChange(event) {
        this.setState({message: event.target.value});
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
                    <Button variant="contained" color="primary" size='large' onClick={this.props.sendMessage.bind(null, this.state.message)}>
                        Send
                    </Button>
                    <button onClick={this.props.loadMessages.bind(null, true, this.state.page)}>Load</button>
                </div> :
                null
        );
    }
}

export default Chat;