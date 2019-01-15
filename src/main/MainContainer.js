import React from 'react';
import Main from "./Main";
import {httpGet, logout} from "../common/Http";
import store from "../common/Store";
import {UPDATE_CURRENT_USER} from "../reducer/UserReducer";

class MainContainer extends React.Component {
    componentDidMount() {
        httpGet(`user/${localStorage.getItem("login")}`).then((response) => {
            console.log(response.data);
            store.dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: response.data
            });
        });
    }

    search(name) {
        httpGet('user', [{name: 'name', value: name}]).then((response) => {
            console.log(response.data);
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