import React from 'react';
import SearchSetResultItem from './search-set-result-item';
import SearchArtistResultItem from './search-artist-result-item';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      result: [],
      resultView: '',
      bySetInput: '',
      byArtistInput: ''
    };
    this.getSetResults = this.getSetResults.bind(this);
    this.getArtistResults = this.getArtistResults.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const inputName = evt.target.name;
    const inputValue = evt.target.value;
    this.setState({
      [inputName]: inputValue
    });
  }

  getSetResults() {
    const inputValue = this.state.bySetInput;
    fetch(`/api/sets/${inputValue}`)
      .then(res => res.json())
      .then(result => {
        if (result[0]) {
          this.setState({
            result,
            resultView: 'setResult'
          });
        } else {
          this.setState({
            result,
            resultView: ''
          });
        }
      });
    this.setState({
      bySetInput: '',
      byArtistInput: ''
    });
  }

  getArtistResults() {
    const inputValue = this.state.byArtistInput;
    fetch(`/api/artists/${inputValue}`)
      .then(res => res.json())
      .then(result => {
        if (result[0]) {
          this.setState({
            result,
            resultView: 'artistResult'
          });
        } else {
          this.setState({
            result,
            resultView: ''
          });

        }
      });
    this.setState({
      bySetInput: '',
      byArtistInput: ''
    });
  }

  render() {

    let resultViewEl;

    if (this.state.resultView === 'setResult') {
      resultViewEl = <SearchSetResultItem getSelectedSetData={this.props.getSelectedSetData} result={ this.state.result } />;
    } else if (this.state.resultView === 'artistResult') {
      resultViewEl = <SearchArtistResultItem result={ this.state.result } />;
    } else {
      resultViewEl = <h1 className={ 'search-result' } >No results found</h1>;
    }

    return (
      <div>
        <h1 className="large-font">By Set</h1>
        <div className="search-bar">
          <i className="fas fa-search icon-black search-btn" onClick={() => {
            this.getSetResults();
          }}></i>
          <input name="bySetInput" onChange={ this.handleChange } value={ this.state.bySetInput } type="text" className="input" />
        </div>

        <h1 className="large-font">By Artist</h1>
        <div className="search-bar">
          <i className="fas fa-search icon-black search-btn" onClick={() => {
            this.getArtistResults();
          }}></i>
          <input name="byArtistInput" onChange={ this.handleChange } value={ this.state.byArtistInput } type="text" className="input" />
        </div>

        {resultViewEl}

      </div>
    );
  }

}
