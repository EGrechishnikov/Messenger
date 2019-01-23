import React from 'react';
import Link from "react-router-dom/es/Link";
import {Avatar} from "@material-ui/core/es/index";
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";

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
                <h1>{this.state.currentUser.login}</h1>
                <Link to='/'>
                    <Button variant="contained" color="primary" size='large'>
                        Back
                    </Button>
                </Link>
                {avatar && <Avatar alt='avatar' src={`data:image;base64,${avatar.content}`}/>}
                <form onSubmit={this.props.save.bind(null, this.state.currentUser, this.state.avatar)}>
                    <TextField
                        label='Name'
                        margin='normal'
                        value={this.state.currentUser.name ? this.state.currentUser.name : ''}
                        variant="outlined"
                        onChange={this.onNameChange}/>
                    <input type='file'
                           accept="image/*"
                           value={this.state.currentUser.avatar}
                           id="outlined-button-file"
                           onChange={this.onFileUpload}/>
                    <label htmlFor="outlined-button-file">
                        <Button variant="outlined" component="span">
                            Upload
                        </Button>
                    </label>
                    <Button variant="contained" color="primary" type='submit' size='large'>
                        Save
                    </Button>
                </form>
            </div>
        );
    }
}

export default UserDetail;