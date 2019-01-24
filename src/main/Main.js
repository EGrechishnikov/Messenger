import React from 'react';
import MenuContainer from "../menu/MenuContainer";
import {Route, Switch} from 'react-router-dom';
import ChatContainer from "../chat/ChatContainer";
import UserDetailContainer from "../userDetail/UserDetailContainer";
import WebSocketContainer from "../websocket/WebSocketContainer";

class Main extends React.Component {

    render() {
        return (
            <div>
                <MenuContainer/>
                <Switch>
                    <Route exact path='/' component={ChatContainer}/>
                    <Route path='/me' component={UserDetailContainer}/>
                </Switch>
                <WebSocketContainer/>
            </div>
        );
    }
}

export default Main;