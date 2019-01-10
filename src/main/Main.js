import React from 'react';
import {httpGet, logout} from "../common/http";

class Main extends React.Component {
    test() {
        httpGet('user/admin/exist').then((response) => {
            console.log(response);
        });
    }

    doLogout() {
        logout();
    }

    render() {
        return (
            <div>
                <h1>
                    Main
                </h1>
                <button onClick={this.test}>Test</button>
                <button onClick={this.doLogout}>Logout</button>
            </div>
        );
    }
}

export default Main;