import React from 'react';
import {Button, Grid, List, TextField} from "@material-ui/core/es/index";
import Message from "../message/Message";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            message: '',
            scrolled: false
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.scrollToEnd = this.scrollToEnd.bind(this);
    }

    onInputChange(event) {
        this.setState({message: event.target.value});
    }

    sendMessage() {
        this.props.sendMessage(this.state.message);
        this.setState({message: '', scrolled: false});
    }

    onScroll(event) {
        if (!this.props.loading && !this.props.lastMessageLoaded && event.target.scrollTop < 150) {
            this.props.loadMessages(true, this.state.page);
        }
    }

    scrollToEnd(list) {
        let listHeight = list.scrollHeight;
        if (!this.state.scrolled && listHeight > 550) {
            list.scrollTop = listHeight;
            this.setState({scrolled: true});
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentChat !== prevProps.currentChat) {
            this.setState({scrolled: false});
        }
        let list = document.getElementsByClassName('messages')[0];
        if (list) {
            this.scrollToEnd(list);
            if (!list.onscroll) {
                list.onscroll = this.onScroll;
            }
        }
    }

    render() {
        return (
            this.props.currentChat ?
                <Grid container justify='center' alignItems='center'>
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
                    <Grid item xs={6}>
                        <TextField
                            label='Message'
                            margin='normal'
                            fullWidth
                            multiline
                            rows='2'
                            rowsMax='2'
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