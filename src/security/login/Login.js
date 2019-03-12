import React from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import Link from "react-router-dom/es/Link";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import {IconButton, Snackbar} from "@material-ui/core/es/index";
import CloseIcon from '@material-ui/icons/Close';

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
            <Grid container
                  direction='column'
                  justify="center"
                  alignItems="center"
                  className='full-height'>
                <form onSubmit={this.props.doLogin.bind(null, this.state.credentials)}>
                    <Grid container
                          direction='column'
                          justify="center"
                          spacing={24}
                          alignItems="center"
                          className='mt-0'>
                        <Typography variant="h3" gutterBottom>
                            Login
                        </Typography>
                        <TextField
                            label='Login'
                            margin='normal'
                            value={this.state.credentials.login}
                            name='login'
                            variant="outlined"
                            required
                            onChange={this.onInputChange}/>
                        <TextField
                            label='Password'
                            margin="normal"
                            type='password'
                            value={this.state.credentials.password}
                            name='password'
                            variant="outlined"
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
                        <Button component={Link}
                                to='/registration'
                                variant="contained"
                                color="secondary"
                                size='large'>
                            registration
                        </Button>
                    </Grid>
                </form>
                <Snackbar anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                          open={this.props.showWarning}
                          message={<span>Wrong login or password!</span>}
                          action={[

                              <IconButton
                                  key="close"
                                  aria-label="Close"
                                  color="inherit"
                                  onClick={this.props.handleClose}
                              >
                                  <CloseIcon/>
                              </IconButton>
                          ]}>

                </Snackbar>
            </Grid>
        );
    }
}

export default Login;