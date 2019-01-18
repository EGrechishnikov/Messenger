import React from 'react';
import Login from './Login';
import {login} from '../../common/Http';

class LoginContainer extends React.Component {
    doLogin(credentials, event) {
        event.preventDefault();
        login(credentials);
    }

    render() {
        return (
            <Login doLogin={this.doLogin}/>
        );
    }
}

export default LoginContainer;