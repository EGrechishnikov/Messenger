import React from 'react';
import {Grid} from "@material-ui/core/es/index";

class Message extends React.Component {
    render() {
        console.log(this.props.isAuthor);
        return(
            <Grid item xs={4}>{this.props.text}</Grid>
        );
    }
}

export default Message;