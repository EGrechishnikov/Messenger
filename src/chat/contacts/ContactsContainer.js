import React from 'react';
import Contacts from "./Contacts";
import {connect} from 'react-redux';
import {httpGet} from '../../common/Http';
import store from '../../common/Store';
import {CHANGE_CURRENT_CHAT, LOAD_CHATS} from "../../reducer/ChatReducer";

class ContactsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.loadChats = this.loadChats.bind(this);
    }

    componentWillMount() {
        if(this.props.currentUser) {
            this.loadChats();
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.currentUser && this.props.currentUser) {
            this.loadChats();
        }
    }

    loadChats() {
        httpGet(`chat/${this.props.currentUser.id}`).then(response => {
            store.dispatch({
                    type: LOAD_CHATS,
                    chats: response.data
                }
            );
        });
    }

    onChatClick(id) {
        store.dispatch({
            type: CHANGE_CURRENT_CHAT,
            currentChat: id
        });
    }

    render() {
        return (
            <Contacts chats={this.props.chats} onChatClick={this.onChatClick} currentChat={this.props.currentChat}/>
        );
    }
}

const mapStateToProps = store => {
    return {
        currentUser: store.userState.currentUser,
        chats: store.chatState.chats,
        currentChat: store.chatState.currentChat
    }
};

export default connect(mapStateToProps)(ContactsContainer);