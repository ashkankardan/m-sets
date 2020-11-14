import React from 'react';
import AccountSelect from './account-select';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.stateView === 'home') {
      return (
        <header className="header">
          <h1>M|S</h1>
          <i className="fas fa-home icon-red"></i>
          <AccountSelect avatar={this.props.avatar} logInView={this.props.logInView} getAccount={this.props.getAccount}/>
        </header>
      );
    } else if (this.props.stateView === 'search') {
      return (
        <header className="header">
          <h1>M|S</h1>
          <i className="fas fa-search icon-red"></i>
          <AccountSelect avatar={this.props.avatar} logInView={this.props.logInView} getAccount={this.props.getAccount}/>
        </header>
      );
    } else if (this.props.stateView === 'modules') {
      return (
        <header className="header">
          <h1>M|S</h1>
          <i className="fas fa-sitemap icon-red"></i>
          <AccountSelect avatar={this.props.avatar} logInView={this.props.logInView} getAccount={this.props.getAccount}/>
        </header>
      );
    } else if (this.props.stateView === 'account') {
      return (
        <header className="header">
          <h1>M|S</h1>
          <i className="fas fa-user icon-red"></i>
          <AccountSelect avatar={this.props.avatar} logInView={this.props.logInView} getAccount={this.props.getAccount}/>
        </header>
      );
    } else if (this.props.stateView === 'login') {
      return (
        <header className="header">
          <h1>M|S</h1>
          <i className="fas fa-user icon-red"></i>
          <AccountSelect avatar={this.props.avatar} logInView={this.props.logInView} getAccount={this.props.getAccount} />
        </header>
      );
    }
  }
}
