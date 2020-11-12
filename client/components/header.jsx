import React from 'react';

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
          <div className="circle"></div>
        </header>
      );
    } else if (this.props.stateView === 'search') {
      return (
        <header className="header">
          <h1>M|S</h1>
          <i className="fas fa-search icon-red"></i>
          <div className="circle"></div>
        </header>
      );
    }
  }
}
