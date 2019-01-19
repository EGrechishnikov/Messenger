import React from 'react';
import Menu from "./Menu";
import {httpGet, logout} from "../common/Http";

class MenuContainer extends React.Component {
    search(name) {
        httpGet('user', [{name: 'name', value: name}]).then(response => {
            console.log(response.data);
        });
    }

    doLogout() {
        logout();
    }

    render() {
        return(
            <Menu doLogout={this.doLogout} search={this.search}/>
        );
    }
}

export default MenuContainer;