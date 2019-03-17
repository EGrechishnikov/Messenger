import React from 'react';
import {Grid, ListItem, Paper, Typography} from "@material-ui/core/es/index";
import {decryptMessage} from "../security/cipher/MessageCipher";

class Message extends React.Component {
    render() {
        return (
            <Grid container justify='center' alignItems='center'>
                <Grid item xs={11}>
                    <ListItem alignItems="flex-start" className={this.props.isAuthor ? 'my-message-wrapper' : ''}>
                        <Paper elevation={1} className='message'>
                            <Typography>
                                {decryptMessage(this.props.text)}
                            </Typography>
                            <div className='message-date'>
                                {new Date(this.props.date).toLocaleTimeString()}
                            </div>
                        </Paper>
                    </ListItem>
                </Grid>
            </Grid>
        );
    }
}

export default Message;