import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {credentials: {login: '', password: ''}};
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        let credentials = this.state.credentials;
        credentials[name] = value;
        this.setState({credentials: credentials});
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <input placeholder="login"
                       value={this.state.credentials.login}
                       name="login"
                       onChange={this.onInputChange}/>
                <input placeholder="password"
                       value={this.state.credentials.password}
                       name="password"
                       onChange={this.onInputChange}/>
                <button onClick={this.props.doLogin.bind(null, this.state.credentials)}>Login</button>
            </div>
        );
    }
}

export default Login;