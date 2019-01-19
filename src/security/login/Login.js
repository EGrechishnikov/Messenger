import React from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import history from '../../common/History';
import Link from "react-router-dom/es/Link";

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
            <form onSubmit={this.props.doLogin.bind(null, this.state.credentials)}>
                <h1>Login</h1>
                <TextField
                    label='Login'
                    margin='normal'
                    value={this.state.credentials.login}
                    name='login'
                    variant="outlined"
                    required
                    onChange={this.onInputChange}/>
                <br/>
                <TextField
                    label='Password'
                    margin="normal"
                    type='password'
                    value={this.state.credentials.password}
                    name='password'
                    variant="outlined"
                    required
                    onChange={this.onInputChange}/>
                <br/>
                <br/>
                <Button variant="contained" color="primary" type='submit' size='large'>
                    submit
                </Button>
                <Link to='/registration' className='ml-20'>
                    <Button variant="contained" color="secondary" size='large'>
                        registration
                    </Button>
                </Link>
            </form>
        );
    }
}

export default Login;