import React from 'react';

export default class SearchArtist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      value: ''
    };
    this.getArtistResults = this.getArtistResults.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  getArtistResults() {
    const artistName = JSON.stringify(this.state.value);
    const header = {
      header: {
        'Content-Type': 'application/json'
      },
      body: artistName
    };
    fetch('/api/artists', header)
      .then(res => res.json())
      .then(result => {
        this.setState({
          result: result
        });
      });
  }

  setValue() {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    if (!this.state.result) {
      return (
        <div>
          <h1 className="large-font">By Artist</h1>
          <div className="search-bar">
            <i className="fas fa-search icon-black" onClick={() => {
              this.getArtistResults();
            }}></i>
            <input type="text" className="input" onChange={this.setValue}/>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <h1 className="large-font">By Artist</h1>
            <div className="search-bar">
              <i className="fas fa-search icon-black" onClick={() => {
                this.getArtistResults(this.state.value);
              }}></i>
              <input type="text" className="input" onChange={this.setValue}/>
            </div>
          </div>
          <div className="search-result">
            <h1>{this.state.result}</h1>
          </div>;
        </div>
      );
    }
  }
}
