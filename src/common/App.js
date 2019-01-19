import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginContainer from '../security/login/LoginContainer';
import RegistrationContainer from '../security/registration/RegistrationContainer';
import MainContainer from '../main/MainContainer';
import './style/Theme.sass';
import CssBaseline from "@material-ui/core/es/CssBaseline/CssBaseline";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Switch>
                    <Route path='/login' component={LoginContainer}/>
                    <Route path='/registration' component={RegistrationContainer}/>
                    <Route path='/' component={MainContainer}/>
                </Switch>
            </React.Fragment>
        );
    }
}

export default App;