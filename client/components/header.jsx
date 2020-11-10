import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header className="header">
        <h1 className="roboto">M|S</h1>
        <i className="fas fa-home"></i>
        <div className="circle"></div>
      </header>
    );
  }
}
