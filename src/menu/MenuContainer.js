import React from 'react';
import Menu from "./Menu";
import {httpGet, logout} from "../common/Http";
import {connect} from "react-redux";
import store from '../common/Store';
import {USER_LOGOUT} from "../reducer/ChatReducer";

class MenuContainer extends React.Component {
    search(name) {
        httpGet('user', [{name: 'name', value: name}]).then(response => {
            console.log(response.data);
        });
    }

    doLogout() {
        logout();
        store.dispatch({
            type: USER_LOGOUT
        });
    }

    render() {
        return(
            <Menu doLogout={this.doLogout} search={this.search}/>
        );
    }
}

export default connect(MenuContainer);