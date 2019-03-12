import React from 'react';
import UserDetail from './UserDetail';
import {httpGet, httpPost} from '../common/Http';
import {connect} from 'react-redux';
import history from '../common/History';
import store from '../common/Store';
import {UPDATE_CURRENT_USER} from '../reducer/UserReducer';

class UserDetailContainer extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.currentUser) {
            this.loadCurrentUser();
        }
    }

    loadCurrentUser() {
        if (localStorage.getItem('login')) {
            httpGet(`user/${localStorage.getItem('login')}`).then(response => {
                store.dispatch({
                    type: UPDATE_CURRENT_USER,
                    currentUser: response.data
                });
            });
        } else {
            history.push('/login');
        }
    }

    save(user, avatar, event) {
        event.preventDefault();
        let data = new FormData();
        data.append('user', JSON.stringify(user));
        if (avatar) {
            data.append('file', avatar);
        }
        httpPost('user', data, true).then((response) => {
            history.push('/');
            store.dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            this.props.currentUser ?
                <UserDetail save={this.save} currentUser={this.props.currentUser}/> : null
        );
    }
}

const mapStateToProps = store => {
    return {
        currentUser: store.userState.currentUser
    }
};


export default connect(mapStateToProps)(UserDetailContainer);