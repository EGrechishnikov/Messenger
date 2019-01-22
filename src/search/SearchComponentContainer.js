import React from 'react';
import SearchComponent from './SearchComponent';
import {httpGet} from '../common/Http';

class SearchComponentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchList: []};
        this.doSearch = this.doSearch.bind(this);
    }

    doSearch(name) {
        if (name) {
            httpGet('user', [{name: 'name', value: name}, {
                name: 'currentUserLogin',
                value: localStorage.getItem('login')
            }]).then(response => {
                this.setState({searchList: response.data.content});
            });
        } else {
            this.setState({searchList: []});
        }
    }

    render() {
        return (
            <SearchComponent doSearch={this.doSearch} searchList={this.state.searchList}/>
        );
    }
}

export default SearchComponentContainer;