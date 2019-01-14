import React from 'react';
import Main from "./Main";
import {httpGet, logout} from "../common/http";

class MainContainer extends React.Component {
    search(name) {
        httpGet('user', [{name: 'name', value: name}]).then((response) => {
            console.log(response);
        });
    }

    doLogout() {
        logout();
    }

    render() {
        return(
            <Main doLogout={this.doLogout} search={this.search}/>
        );
    }
}

export default MainContainer;