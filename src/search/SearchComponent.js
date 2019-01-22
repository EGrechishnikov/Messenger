import React from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import {MenuItem, MenuList} from "@material-ui/core/es/index";
import Button from "@material-ui/core/es/Button/Button";

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchLine: ''};
        this.onInputChange = this.onInputChange.bind(this);
        this.searchListRender = this.searchListRender.bind(this);
        this.changeSearchLine = this.changeSearchLine.bind(this);
        this.clear = this.clear.bind(this);
    }

    onInputChange(event) {
        this.changeSearchLine(event.target.value);
    }

    clear() {
        this.changeSearchLine('');
    }

    changeSearchLine(name) {
        this.setState({searchLine: name});
        this.props.doSearch(name);
    }

    searchListRender() {
        return this.props.searchList.map(item => <MenuItem key={item.id}>{item.name}</MenuItem>);
    }

    render() {
        return (
            <div>
                <TextField
                    label='Search'
                    margin='normal'
                    value={this.state.searchLine}
                    variant="outlined"
                    onChange={this.onInputChange}/>
                <Button variant="contained" color="secondary" size='large' onClick={this.clear}>
                    Clear
                </Button>
                <MenuList>
                    {
                        this.searchListRender()
                    }
                </MenuList>
            </div>
        );
    }
}

export default SearchComponent;