import React from 'react';
import Link from "react-router-dom/es/Link";
import {Avatar, Fab, Grid, Typography} from "@material-ui/core/es/index";
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ChevronLeft from '@material-ui/icons/ChevronLeft'

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
            avatar: undefined
        };
        this.onNameChange = this.onNameChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    onNameChange(event) {
        let currentUser = this.state.currentUser;
        currentUser.name = event.target.value;
        this.setState({currentUser: currentUser});
    }

    onFileUpload(event) {
        this.setState({avatar: event.target.files[0]});
    }

    render() {
        let avatar = this.state.currentUser.attachment;
        return (
            <div>
                <Fab color="primary"
                     component={Link}
                     to='/'
                     size="small"
                     className='mt-20 ml-20'>
                    <ChevronLeft/>
                </Fab>
                <Grid container
                      justify="center"
                      alignItems="center"
                      direction="column">
                    <Typography variant='h3'>{this.state.currentUser.login}</Typography>
                    <form className='mt-20' onSubmit={this.props.save.bind(null, this.state.currentUser, this.state.avatar)}>
                        <Grid container
                              justify="center"
                              alignItems="center"
                              direction="column"
                              spacing={16}>
                            {avatar && <Grid item><img className='photo' alt='avatar' src={`data:image;base64,${avatar.content}`}/></Grid>}
                            <Grid item>
                                <input type='file'
                                       accept="image/*"
                                       value={this.state.currentUser.avatar}
                                       id="outlined-button-file"
                                       className='hidden'
                                       onChange={this.onFileUpload}/>
                                <label htmlFor="outlined-button-file">
                                    <Button variant="contained" component="span">
                                        Photo
                                        <CloudUploadIcon className='ml-5'/>
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item>
                                <TextField
                                    label='Name'
                                    margin='normal'
                                    value={this.state.currentUser.name ? this.state.currentUser.name : ''}
                                    variant="outlined"
                                    onChange={this.onNameChange}/>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" type='submit' size='large'>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </div>
        );
    }
}

export default UserDetail;