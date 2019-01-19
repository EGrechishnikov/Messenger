import React from 'react';
import Button from "@material-ui/core/es/Button/Button";

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
                <input value={this.state.searchLine} onChange={this.onInputChange}/>
                <Button
                    variant="contained"
                    color="primary"
                    size='medium'
                    onClick={this.props.doSearch.bind({}, this.state.searchLine)}>
                    search
                </Button>
            </div>
        );
    }
}

export default SearchComponent;