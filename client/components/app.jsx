import React from 'react';
import Header from './header';
import Footer from './footer';

import Modules from './modules';
import SetsList from './sets-list';
import ArtistsList from './artists-list';
// import SearchSet from './search-set';
// import SearchArtist from './search-artist';
import Search from './search';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'search'
    };
    this.divSetView = this.divSetView.bind(this);
    this.iconSetView = this.iconSetView.bind(this);
  }

  divSetView(view) {
    this.setState({
      view: view
    });
  }

  iconSetView() {

  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {

    let viewElement;

    if (this.state.view === 'modules') {
      viewElement = <div><Modules /></div>;
    } else if (this.state.view === 'home') {
      viewElement = <div><SetsList /><ArtistsList /></div>;
    } else if (this.state.view === 'search') {
      // viewElement = <div><SearchSet /><SearchArtist /></div>;
      viewElement = <div><Search /></div>;
    }

    return (
      this.state.isLoading
        ? <h1>Testing connections...</h1>
        : <div className="container">
          <Header stateView={this.state.view} />
          {viewElement}
          <Footer stateView={this.state.view} divSetView={this.divSetView} iconSetView={this.iconSetView} />
        </div>
    );
  }
}
