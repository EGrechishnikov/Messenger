import React from 'react';
import Registration from './Registration';
import {registration} from '../../common/Http';

class RegistrationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.doRegistration = this.doRegistration.bind(this);
    }

    doRegistration(credentials) {
        registration(credentials);
    }

    render() {
        return (
            <Registration doRegistration={this.doRegistration}/>
        );
    }
}

export default RegistrationContainer;