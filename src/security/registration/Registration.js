import React from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import Link from "react-router-dom/es/Link";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                login: '',
                password: ''
            },
            isLoginExist: false
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.doRegistration = this.doRegistration.bind(this);
    }

    doRegistration(event) {
        event.preventDefault();
        if (!this.state.isLoginExist) {
            this.props.doRegistration(this.state.credentials)
        }
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
            <form onSubmit={this.doRegistration.bind(this)}>
                <h1>
                    Registration
                </h1>
                {this.state.isLoginExist ?
                    <TextField
                        label='Error'
                        margin='normal'
                        variant="outlined"
                        value={this.state.credentials.login}
                        name='login'
                        error
                        helperText={'Такой пользователь уже существует'}
                        required
                        onChange={this.onInputChange}/> :
                    <TextField
                        label='Login'
                        margin='normal'
                        variant="outlined"
                        value={this.state.credentials.login}
                        name='login'
                        required
                        onChange={this.onInputChange}/>}
                <br/>
                <TextField
                    label='Password'
                    margin="normal"
                    type='password'
                    variant="outlined"
                    value={this.state.credentials.password}
                    name='password'
                    required
                    onChange={this.onInputChange}/>
                <br/><br/>
                <Button variant="contained" color="primary" type='submit' size='large'>
                    submit
                </Button>
                <Button component={Link}
                        to='/login'
                        variant="contained"
                        color="secondary"
                        size='large'>
                    login
                </Button>
            </form>
        );
    }
}

export default Registration;