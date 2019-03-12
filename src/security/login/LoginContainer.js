import React from 'react';
import Login from './Login';
import {login} from '../../common/Http';

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: false};
        this.doLogin = this.doLogin.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    doLogin(credentials, event) {
        event.preventDefault();
        login(credentials).then(error => {
            if (error) {
                this.setState({showWarning: true});
                setTimeout(this.handleClose, 4000)
            }
        });
    }

    handleClose() {
        this.setState({showWarning: false});
    }

    render() {
        return (
            <Login doLogin={this.doLogin} showWarning={this.state.showWarning} handleClose={this.handleClose}/>
        );
    }
}

export default LoginContainer;