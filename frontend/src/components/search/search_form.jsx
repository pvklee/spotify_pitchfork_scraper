import React from 'react';

export default class SearchForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(prop){
    return e => {
      this.setState({[prop]: e.target.value})
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const query = this.state.query;
    if (!!query) {this.props.searchArtist(query)}
  }

  render(){
    return(
      <form>
        <label>Artist:
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleInput("query")}
          />
        </label>
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

