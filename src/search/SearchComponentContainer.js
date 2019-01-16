import React from 'react';
import SearchComponent from './SearchComponent';
import {httpGet} from '../common/Http';

class SearchComponentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchList: []}
    }

    doSearch(name) {
        httpGet("user", [{name: 'name', value: name}, {name: 'currentUserLogin', value: localStorage.getItem('login')}]).then(response => {
            console.log(response);
        });
    }

    render() {
        return(
            <SearchComponent doSearch={this.doSearch}/>
        );
    }
}

export default SearchComponentContainer;