import React from 'react';
import Main from './Main';
import {httpGet} from '../common/Http';
import store from '../common/Store';
import {UPDATE_CURRENT_USER} from '../reducer/UserReducer';

class MainContainer extends React.Component {
    componentDidMount() {
        httpGet(`user/${localStorage.getItem('login')}`).then(response => {
            store.dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: response.data
            });
        });
    }

    render() {
        return(
            <Main isChatPage={this.props.location.pathname === '/'}/>
        );
    }
}

export default MainContainer;