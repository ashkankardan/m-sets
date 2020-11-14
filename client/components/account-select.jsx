import React from 'react';

export default class AccountSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArtistName: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ selectedArtistName: event.target.value });
    if (event.target.value === '') return;
    this.props.getAccount(event);
  }

  render() {
    return (
      <img src={this.props.avatar} className="account-avatar" onClick={this.props.logInView}/>
    );
  }
}
