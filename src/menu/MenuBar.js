import React from 'react';
import SearchComponentContainer from "../search/SearchComponentContainer";
import AccountCircle from '@material-ui/icons/AccountCircle';
import {AppBar, Toolbar, Typography, Menu, MenuItem, IconButton} from "@material-ui/core/es/index";
import history from '../common/History';

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {anchorEl: null};
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleMenuOpen = this.handleMenuOpen.bind(this);
    }

    handleMenuOpen(event) {
        this.setState({anchorEl: event.currentTarget});
    }

    handleMenuClose(callback) {
        this.setState({anchorEl: null});
        if (callback) {
            callback();
        }
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Messenger
                    </Typography>
                    <SearchComponentContainer/>
                    <IconButton onClick={this.handleMenuOpen} color='inherit'>
                        <AccountCircle/>
                    </IconButton>
                    <Menu
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        transformOrigin={{vertical: 'top', horizontal: 'right'}}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleMenuClose.bind(this, null)}
                        open={Boolean(this.state.anchorEl)}>
                        <MenuItem onClick={this.handleMenuClose.bind(this, () => history.push('/me'))}>Me</MenuItem>
                        <MenuItem onClick={this.handleMenuClose.bind(this, this.props.doLogout)}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        );
    }
}

export default MenuBar;