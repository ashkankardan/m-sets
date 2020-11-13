import React from 'react';

export default class AccountItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="account-item">
        <img className="avatar" src={this.props.set.image} alt={this.props.set.setName} />
        <p className="set-name">{this.props.set.setName}</p>
      </div>
    );
  }
}
