import React from 'react';
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core/es/index";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.chatsRender = this.chatsRender.bind(this);
    }

    chatsRender() {
        // return this.props.chats.map(chat => <div key={chat.id}>{chat.users[0].login}</div>);
        return this.props.chats.map(chat => {
            let avatar;
            if (chat.users[0].attachment) {
                avatar = chat.users[0].attachment.content;
            }
            return <ListItem key={chat.users[0].id} alignItems="flex-start">
                <ListItemAvatar>
                    {
                        avatar ? <Avatar alt='avatar' src={`data:image;base64,${avatar}`}/> : null
                    }
                </ListItemAvatar>
                <ListItemText primary={chat.users[0].name} secondary={chat.users[0].login}/>
            </ListItem>;
        });
    }

    render() {
        return (
            <div>
                <h1>Chat</h1>
                <List>
                    {
                        this.chatsRender()
                    }
                </List>
                <button onClick={this.props.sendMessage}>Send</button>
                <button onClick={this.props.loadChats}>Load</button>
            </div>
        );
    }
}

export default Chat;