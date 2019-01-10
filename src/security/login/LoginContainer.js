import React from 'react';
import Login from "./Login";
import {login} from "../../common/http";

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.doLogin = this.doLogin.bind(this);
    }

    doLogin(credentials) {
        login(credentials);
    }

    render() {
        return (
            <Login doLogin={this.doLogin}/>
        );
    }
}

export default LoginContainer;