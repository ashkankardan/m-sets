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
        this.props.setUser(result);
      })
      .catch(err => console.error(err));

    this.props.divSetView('account');
  }

  render() {
    return (
      <div className="flex-column">
        <h1 className="large-font login">Login</h1>
        <select value={this.state.selectedArtistName} name="artists" className="artist-select" onChange={this.handleChange}>
          <option value="" disabled label="Account Name"></option>
          <option value="ashkan" label="Ashkan"></option>
          <option value="burns" label="burns"></option>
        </select>
        <button className="button" type="button" onClick={this.getAccountData}>Log In</button>
      </div>
    );
  }
}
