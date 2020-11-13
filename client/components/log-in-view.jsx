import React from 'react';

export default class LogInView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArtistName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.getAccountData = this.getAccountData.bind(this);
  }

  handleChange(event) {
    this.setState({ selectedArtistName: event.target.value });
  }

  getAccountData() {
    const selectedArtistName = this.state.selectedArtistName;
    fetch(`/api/artists/${selectedArtistName}`)
      .then(res => res.json())
      .then(result => {
        const artistObject = result[0];
        this.props.setUser(artistObject);
      })
      .catch(err => console.error(err));
    this.props.setView('artist');
  }

  render() {
    return (
      <div className="flex-column">
        <select value={this.state.selectedArtistName} name="artists" className="artist-select" onChange={this.handleChange}>
          <option value="" disabled label="Account"></option>
          <option value="ashkan" label="Ashkan"></option>
          <option value="burns" label="burns"></option>
        </select>
        <button className="button" type="button" onClick={this.getAccountData}>Log In</button>
      </div>
    );
  }
}

// need to fix select disabled issue
