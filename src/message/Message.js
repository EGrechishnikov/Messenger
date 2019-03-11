import React from 'react';
import {Chip, Grid, ListItem, Paper, Typography} from "@material-ui/core/es/index";

class Message extends React.Component {
    render() {
        return(
            <ListItem alignItems="flex-start">
                <Paper elevation={1} className={this.props.isAuthor ? 'my-message' : 'message'}>
                    <Typography variant="p">
                        {this.props.text}
                    </Typography>
                </Paper>
                </ListItem>
        );
    }
}

export default Message;