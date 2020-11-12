import React from 'react';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.stateView === 'home') {
      return (
        <footer className="footer">
          <div className="red" onClick={() => {
            this.props.divSetView('home');
          }}>
            <i className="fas fa-home icon-black"></i>
          </div>
          <div className="gray" onClick={() => {
            this.props.divSetView('search');
          }}>
            <i className="fas fa-search icon-black"></i>
          </div>
          <div className="gray" onClick={() => {
            this.props.divSetView('sets');
          }}>
            <i className="fas fa-sitemap icon-black"></i>
          </div>
        </footer>
      );
    } else if (this.props.stateView === 'search') {
      return (
        <footer className="footer">
          <div className="gray" onClick={() => {
            this.props.divSetView('home');
          }}>
            <i className="fas fa-home icon-black"></i>
          </div>
          <div className="red" onClick={() => {
            this.props.divSetView('search');
          }}>
            <i className="fas fa-search icon-black"></i>
          </div>
          <div className="gray" onClick={() => {
            this.props.divSetView('sets');
          }}>
            <i className="fas fa-sitemap icon-black"></i>
          </div>
        </footer>
      );
    }
  }
}
