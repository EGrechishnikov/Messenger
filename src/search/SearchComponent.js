import React from 'react';

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchLine: ''};
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        this.setState({searchLine: event.target.value});
    }

    render() {
        return (
            <div>
                <h1>Search</h1>
                <input value={this.state.searchLine} onChange={this.onInputChange}/>
                <button onClick={this.props.doSearch.bind({}, this.state.searchLine)}>search test</button>
            </div>
        );
    }
}

export default SearchComponent;