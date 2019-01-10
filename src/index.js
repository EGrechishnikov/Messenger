import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from "./common/App";
import store from "./common/store";
import history from "./common/history";

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={App}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);