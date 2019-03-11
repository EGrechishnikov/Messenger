import React from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import {MenuItem, MenuList} from "@material-ui/core/es/index";

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchLine: ''};
        this.onInputChange = this.onInputChange.bind(this);
        this.searchListRender = this.searchListRender.bind(this);
        this.changeSearchLine = this.changeSearchLine.bind(this);
    }

    onInputChange(event) {
        this.changeSearchLine(event.target.value);
    }

    changeSearchLine(name) {
        this.setState({searchLine: name});
        this.props.doSearch(name);
    }

    searchListRender() {
        return this.props.searchList.map(item =>
            <MenuItem key={item.id} onClick={this.props.onClick.bind(null, item.id)}>{item.name}</MenuItem>);
    }

    render() {
        return (
            <div className='grow'>
                <TextField
                    type='search'
                    label='Search'
                    margin='normal'
                    value={this.state.searchLine}
                    onChange={this.onInputChange}/>
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