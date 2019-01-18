import React from 'react';
import Registration from './Registration';
import {checkIsLoginExist, registration} from '../../common/Http';

class RegistrationContainer extends React.Component {
    doRegistration(credentials) {
        registration(credentials);
    }

    checkIsLoginExist(login) {
        return checkIsLoginExist(login);
    }

    render() {
        return (
            <Registration doRegistration={this.doRegistration} checkIsLoginExist={this.checkIsLoginExist}/>
        );
    }
}

export default RegistrationContainer;