import React from 'react';
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core/es/index";

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.chatsRender = this.chatsRender.bind(this);
    }

    chatsRender() {
        return this.props.chats.map(chat => {
            let avatar;
            if (chat.users[1].attachment) {
                avatar = chat.users[1].attachment.content;
            }
            return <ListItem button key={chat.id} alignItems="flex-start"
                             onClick={this.props.onChatClick.bind(null, chat.id)}>
                <ListItemAvatar>
                    {avatar && <Avatar alt='avatar' src={`data:image;base64,${avatar}`}/>}
                </ListItemAvatar>
                <ListItemText primary={chat.users[1].name} secondary={chat.users[1].login}/>
            </ListItem>;
        });
    }

    render() {
        return (
            <div>
                <List>{this.chatsRender()}</List>
            </div>
        );
    }
}

export default Contacts;