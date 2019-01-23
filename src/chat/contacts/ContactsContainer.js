import React from 'react';
import Contacts from "./Contacts";
import {connect} from 'react-redux';
import {httpGet} from '../../common/Http';
import store from '../../common/Store';
import {CURRENT_CHAT, LOAD_CHATS} from "../../reducer/ChatReducer";

class ContactsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.loadChats = this.loadChats.bind(this);
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
            type: CURRENT_CHAT,
            currentChat: id
        });
    }

    render() {
        return (
            <Contacts chats={this.props.chats} onChatClick={this.onChatClick}/>
        );
    }
}

const mapStateToProps = store => {
    return {
        currentUser: store.userState.currentUser,
        chats: store.chatState.chats
    }
};

export default connect(mapStateToProps)(ContactsContainer);