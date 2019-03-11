import React from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import Link from "react-router-dom/es/Link";
import {Grid, Typography} from "@material-ui/core/es/index";

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
            <Grid container
                  direction='column'
                  justify="center"
                  alignItems="center"
                  className='full-height'>
                <form onSubmit={this.doRegistration.bind(this)}>
                    <Grid container
                          direction='column'
                          justify="center"
                          spacing={24}
                          alignItems="center"
                          className='mt-0'>
                        <Typography variant="h3" gutterBottom>
                            Registration
                        </Typography>
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
                        <TextField
                            label='Password'
                            margin="normal"
                            type='password'
                            variant="outlined"
                            value={this.state.credentials.password}
                            name='password'
                            required
                            onChange={this.onInputChange}/>
                    </Grid>
                    <Grid container
                          direction='row'
                          justify="center"
                          spacing={24}
                          alignItems="center"
                          className='mt-0'>
                        <Grid item>
                            <Button variant="contained" color="primary" type='submit' size='large'>
                                submit
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button component={Link}
                                    to='/login'
                                    variant="contained"
                                    color="secondary"
                                    size='large'>
                                login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        );
    }
}

export default Registration;