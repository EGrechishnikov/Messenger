import React from 'react';
import UserDetail from './UserDetail';
import {httpPost} from '../common/Http';
import {connect} from 'react-redux';
import history from '../common/History';

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
        httpPost('user', data, true).then(() => {
            history.push('/');
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
    return {
        currentUser: store.userState.currentUser
    }
};


export default connect(mapStateToProps)(UserDetailContainer);