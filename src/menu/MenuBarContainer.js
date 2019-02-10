import React from 'react';
import {logout} from "../common/Http";
import {connect} from "react-redux";
import store from '../common/Store';
import {USER_LOGOUT} from "../reducer/ChatReducer";
import MenuBar from "./MenuBar";

class MenuBarContainer extends React.Component {
    doLogout() {
        logout();
        store.dispatch({
            type: USER_LOGOUT
        });
    }

    render() {
        return(
            <MenuBar doLogout={this.doLogout}/>
        );
    }
}

const mapStateToProps = () => {
    return {

    }
};

export default connect(mapStateToProps)(MenuBarContainer);