import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginContainer from '../security/login/LoginContainer';
import RegistrationContainer from '../security/registration/RegistrationContainer';
import MainContainer from '../main/MainContainer';
import CssBaseline from "@material-ui/core/es/CssBaseline/CssBaseline";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    // palette: {
    //     type: 'dark'
    // }
});

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <Switch>
                    <Route path='/login' component={LoginContainer}/>
                    <Route path='/registration' component={RegistrationContainer}/>
                    <Route path='/' component={MainContainer}/>
                </Switch>
            </MuiThemeProvider>
        );
    }
}

export default App;