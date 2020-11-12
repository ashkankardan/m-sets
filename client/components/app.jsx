import React from 'react';
import Header from './header';
import Footer from './footer';
import SetsList from './sets-list';
import ArtistsList from './artists-list';
import SearchSet from './search-set';
import SearchArtist from './search-artist';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'home'
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
    if (this.state.isLoading) {
      viewElement = <h1>Testing connections...</h1>;
      return viewElement;
    } else if (this.state.view === 'home') {
      return (
        <div className="container">
          <Header stateView={this.state.view} />
          <SetsList />
          <ArtistsList />
          <Footer stateView={this.state.view} divSetView={this.divSetView} iconSetView={this.iconSetView} />
        </div>
      );
    } else if (this.state.view === 'search') {
      return (
        <div className="container">
          <Header stateView={this.state.view} />
          <SearchSet />
          <SearchArtist />
          <Footer stateView={this.state.view} divSetView={this.divSetView} iconSetView={this.iconSetView} />
        </div>
      );
    }
  }
}
