import React from 'react';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer className="footer">
        <div className="red">
          <i className="fas fa-home icon-black"></i>
        </div>
        <div className="gray">
          <i className="fas fa-search icon-black"></i>
        </div>
        <div className="gray">
          <i className="fas fa-sitemap icon-black"></i>
        </div>
      </footer>
    );
  }
}
