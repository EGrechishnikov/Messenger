import React from 'react';
import SearchComponent from './SearchComponent';
import {httpGet, httpPost} from '../common/Http';
import {connect} from "react-redux";
import store from '../common/Store';
import {ADD_CHAT, CURRENT_CHAT} from "../reducer/ChatReducer";

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
                type: CURRENT_CHAT,
                currentChat: response.data.id
            });
        });
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
        currentUser: store.userState.currentUser
    }
};

export default connect(mapStateToProps)(SearchComponentContainer);