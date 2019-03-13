import React from 'react';
import SearchComponent from './SearchComponent';
import {httpGet, httpPost} from '../common/Http';
import {connect} from "react-redux";
import store from '../common/Store';
import {ADD_CHAT, CHANGE_CURRENT_CHAT} from "../reducer/ChatReducer";

class SearchComponentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchList: []};
        this.doSearch = this.doSearch.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    doSearch(name) {
        if (name) {
            httpGet('user', [{name: 'name', value: name}, {
                name: 'currentUserLogin',
                value: localStorage.getItem('login')
            }]).then(response => {
                this.setState({searchList: response.data.content});
            });
        } else {
            this.setState({searchList: []});
        }
    }

    onClick(userId) {
        let currentChatId = 0;
        this.props.chats.forEach(chat => {
            chat.users.forEach(user => {
                if (user.id === userId) {
                    currentChatId = chat.id;
                }
            })
        });
        if (currentChatId !== 0) {
            store.dispatch({
                type: CHANGE_CURRENT_CHAT,
                currentChat: currentChatId
            });
        } else {
            let currentUserId = this.props.currentUser.id;
            let chat = {
                users: [{id: currentUserId}, {id: userId}]
            };
            httpPost(`chat/${currentUserId}`, chat).then(response => {
                store.dispatch({
                    type: ADD_CHAT,
                    chat: response.data
                });
                store.dispatch({
                    type: CHANGE_CURRENT_CHAT,
                    currentChat: response.data.id
                });
            });
        }
        this.setState({searchList: []});
    }

    render() {
        return (
            <SearchComponent doSearch={this.doSearch}
                             searchList={this.state.searchList}
                             onClick={this.onClick}/>
        );
    }
}

const mapStateToProps = store => {
    return {
        currentUser: store.userState.currentUser,
        chats: store.chatState.chats
    }
};

export default connect(mapStateToProps)(SearchComponentContainer);