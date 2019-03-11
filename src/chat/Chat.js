import React from 'react';
import {Button, Grid, List, TextField} from "@material-ui/core/es/index";
import Message from "../message/Message";

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
                <Grid container justify='center' alignItems='center'>
                    <Grid container>
                        <List className='messages'>
                            {
                                this.props.messages.map(message =>
                                    <Message key={message.id}
                                             date={message.created}
                                             text={message.text}
                                             isAuthor={message.fromUserId === this.props.currentUserId}
                                    />
                                )

                            }
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label='Message'
                            margin='normal'
                            fullWidth
                            multiline
                            rows='1'
                            rowsMax='3'
                            value={this.state.message}
                            onChange={this.onInputChange}/>
                    </Grid>
                    <Grid item className='ml-20 mt-20'>
                        <Button variant="contained" color="primary" size='large' onClick={this.sendMessage}>
                            Send
                        </Button>
                    </Grid>
                </Grid> :
                null
        );
    }
}

export default Chat;