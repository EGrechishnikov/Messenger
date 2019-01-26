import React from 'react';
import MenuContainer from "../menu/MenuContainer";
import {Route, Switch} from 'react-router-dom';
import ChatContainer from "../chat/ChatContainer";
import UserDetailContainer from "../userDetail/UserDetailContainer";
import WebSocketContainer from "../websocket/WebSocketContainer";
import {SnackbarProvider} from "notistack";
import {MAX_MESSAGE_NOTIFY} from "../common/Config";

class Main extends React.Component {

    render() {
        return (
            <div>
                <MenuContainer/>
                <Switch>
                    <Route exact path='/' component={ChatContainer}/>
                    <Route path='/me' component={UserDetailContainer}/>
                </Switch>
                <SnackbarProvider maxSnack={MAX_MESSAGE_NOTIFY}>
                    <WebSocketContainer/>
                </SnackbarProvider>
            </div>
        );
    }
}

export default Main;