import React, {Component}from 'react';
import './search-panel.css'

class SearchPanel extends Component {
    // state={
    //     term:''
    // };

    searchTerm(event){
        // this.setState({term: event.target.value});
        this.props.searchTerm(event.target.value)
    }
    render() {
        return (<input className='form-control search-input'
                       type='text'
                       placeholder='Search'
                       // value={this.state.term}
                       onChange={this.searchTerm.bind(this)}
            />

        )};
    }


export default SearchPanel;