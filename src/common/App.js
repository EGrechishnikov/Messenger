import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginContainer from '../security/login/LoginContainer';
import RegistrationContainer from '../security/registration/RegistrationContainer';
import MainContainer from '../main/MainContainer';
import UserDetailContainer from '../userDetail/UserDetailContainer';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={MainContainer}/>
                <Route path='/login' component={LoginContainer}/>
                <Route path='/registration' component={RegistrationContainer}/>
                <Route path='/me' component={UserDetailContainer}/>
            </Switch>
        );
    }
}

export default App;