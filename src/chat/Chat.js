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
        this.handleScrollToEnd = this.handleScrollToEnd.bind(this);
        this.scrollToEnd = this.scrollToEnd.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onInputChange(event) {
        this.setState({message: event.target.value});
    }

    onKeyPress(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    sendMessage() {
        this.props.sendMessage(this.state.message);
        this.setState({message: '', scrolled: false});

    }

    onScroll(event) {
        if (!this.props.loading && !this.props.lastMessageLoaded && event.target.scrollTop < 100) {
            this.props.loadMessages(true, this.state.page);
            this.setState({page: this.state.page + 1});
        }
    }

    handleScrollToEnd(list) {
        let listHeight = list.scrollHeight;
        if (!this.state.scrolled && listHeight > 550) {
            this.scrollToEnd(list);
        }
    }

    scrollToEnd(list) {
        list.scrollTop = list.scrollHeight;
        this.setState({scrolled: true});
    }

    componentDidMount() {
        this.setState({scrolled: false});
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentChat !== prevProps.currentChat) {
            this.setState({scrolled: false, page: 1});
        }
        let list = document.getElementsByClassName('messages')[0];
        if (list) {
            this.handleScrollToEnd(list);
            if (!list.onscroll) {
                list.onscroll = this.onScroll;
            }
        }
        if (prevProps.messages.length !== this.props.messages.length) {
            this.scrollToEnd(list);
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
                            onKeyPress={this.onKeyPress}
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