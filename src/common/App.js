import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Main from "../main/Main";
import LoginContainer from '../security/login/LoginContainer';
import RegistrationContainer from "../security/registration/RegistrationContainer";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/login" component={LoginContainer}/>
                <Route path="/registration" component={RegistrationContainer}/>
            </Switch>
        );
    }
}

export default App;