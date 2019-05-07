import React from 'react';
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from '@material-ui/core/es/index';
import {decryptMessage} from '../../security/cipher/MessageCipher';

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.chatsRender = this.chatsRender.bind(this);
    }

    chatsRender() {
        return this.props.chats.map(chat => {
            let avatar;
            let lastMessage = chat.lastMessage ? decryptMessage(chat.lastMessage.text) : '';
            let contact = chat.users[0].id === this.props.currentUser.id ? chat.users[1] : chat.users[0];
            if (contact.attachment) {
                avatar = contact.attachment.content;
            }
            return (
                <ListItem button key={chat.id}
                          alignItems="flex-start"
                          onClick={this.props.onChatClick.bind(null, chat.id)}
                          className={this.props.currentChat === chat.id ? 'active-contact' : ''}>
                    {
                        avatar &&
                        <ListItemAvatar>
                            <Avatar alt='avatar' src={`data:image;base64,${avatar}`}/>
                        </ListItemAvatar>
                    }
                    <ListItemText primary={contact.name} secondary={lastMessage}/>
                </ListItem>
            );
        });
    }

    render() {
        return (
            <List>
                {
                    this.chatsRender()
                }
            </List>
        );
    }
}

export default Contacts;