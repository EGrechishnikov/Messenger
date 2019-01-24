import React from 'react';
import Menu from "./Menu";
import {logout} from "../common/Http";
import {connect} from "react-redux";
import store from '../common/Store';
import {USER_LOGOUT} from "../reducer/ChatReducer";

class MenuContainer extends React.Component {
    doLogout() {
        logout();
        store.dispatch({
            type: USER_LOGOUT
        });
    }

    render() {
        return(
            <Menu doLogout={this.doLogout}/>
        );
    }
}

const mapStateToProps = store => {
    return {

    }
};

export default connect(mapStateToProps)(MenuContainer);