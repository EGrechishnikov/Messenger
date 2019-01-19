import React from 'react';
import SearchComponentContainer from "../search/SearchComponentContainer";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/es/Button/Button";

class Menu extends React.Component {
    render() {
        return (
            <div>
                <SearchComponentContainer/>
                <Link to='/me'>
                    <Button
                        variant="contained"
                        color="primary"
                        size='medium'>
                        me
                    </Button>
                </Link>
                <Button
                    variant="contained"
                    color="secondary"
                    size='medium'
                    onClick={this.props.doLogout}>
                    Logout
                </Button>
            </div>
        );
    }
}

export default Menu;