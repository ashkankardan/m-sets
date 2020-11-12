import React from 'react';

export default class SearchSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      input: null
    };
    this.getSetResults = this.getSetResults.bind(this);
  }

  getSetResults() {
    const inputValue = document.querySelector('.input').value;
    fetch('/api/sets/' + inputValue)
      .then(result => {
        this.setState({
          result: result
        });
      });
  }

  render() {
    if (!this.state.result) {
      return (
        <div>
          <h1 className="large-font">By Set</h1>
          <div className="search-bar">
            <i className="fas fa-search icon-black" onClick={() => {
              this.getSetResults();
            }}></i>
            <input type="text" className="input" />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <h1 className="large-font">By Set</h1>
            <div className="search-bar">
              <i className="fas fa-search icon-black" onClick={() => {
                this.getSetResults();
              }}></i>
              <input type="text" className="input" />
            </div>
          </div>
          <div className="search-result">
            <h1></h1>
          </div>;
        </div>
      );
    }
  }
}
