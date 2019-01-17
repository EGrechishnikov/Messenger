import React from 'react';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                login: '', password: ''
            },
            isLoginExist: false
        };
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'login' && value !== '') {
            this.props.checkIsLoginExist(value).then(response => {
                let result = response.data;
                if (this.state.isLoginExist !== result) {
                    this.setState({isLoginExist: result});
                }
            });
        } else if (value === '' && this.state.isLoginExist) {
            this.setState({isLoginExist: false});
        }
        let credentials = this.state.credentials;
        credentials[name] = value;
        this.setState({credentials: credentials});
    }

    render() {
        return (
            <div>
                <h1>
                    Registration
                </h1>
                <input placeholder='login'
                       value={this.state.credentials.login}
                       name='login'
                       onChange={this.onInputChange}/>
                {this.state.isLoginExist ? <p>Такой пользователь уже существует</p> : null}
                <input placeholder='password'
                       value={this.state.credentials.password}
                       name='password'
                       onChange={this.onInputChange}/>
                <button onClick={this.props.doRegistration.bind(null, this.state.credentials)}>Registration</button>
            </div>
        );
    }
}

export default Registration;