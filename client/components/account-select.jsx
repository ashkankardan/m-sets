import React from 'react';

export default class AccountSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <select name="artists" className="artist-select" onChange={this.props.getAccount}>
        <option value="" selected disabled></option>
        <option value="ashkan">Ashkan</option>
        <option value="burns">burns</option>
      </select>
    );
  }
}
