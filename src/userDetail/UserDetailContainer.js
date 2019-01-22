import React from 'react';
import UserDetail from './UserDetail';
import {httpPost} from '../common/Http';
import {connect} from 'react-redux';
import history from '../common/History';
import store from '../common/Store';
import {UPDATE_CURRENT_USER} from "../reducer/UserReducer";

class UserDetailContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentUser: undefined};
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
        return(
            <UserDetail save={this.save} currentUser={this.props.currentUser}/>
        );
    }
}

const mapStateToProps = store => {
    console.log(store.userState.currentUser);
    return {
        currentUser: store.userState.currentUser
    }
};


export default connect(mapStateToProps)(UserDetailContainer);