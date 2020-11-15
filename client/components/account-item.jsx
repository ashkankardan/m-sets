import React from 'react';

export default class AccountItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetSelect = this.handleSetSelect.bind(this);

  }

  handleSetSelect() {
    this.props.updateSetId(this.props.set.setId);
  }

  render() {
    return (
      <div className="account-item" onClick={this.handleSetSelect}>
        <img className="avatar" src={this.props.set.image} alt={this.props.set.setName} />
        <p className="set-name">{this.props.set.setName}</p>
      </div>
    );
  }
}
