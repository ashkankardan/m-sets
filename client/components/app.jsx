import React from 'react';
import Header from './header';
import Footer from './footer';

import Modules from './modules';
import SetsList from './sets-list';
import ArtistsList from './artists-list';
import SearchSet from './search-set';
import SearchArtist from './search-artist';
import ArtistView from './artist-view';
import LogInView from './log-in-view';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'home',
      sets: '',
      currentUser: null
    };
    this.divSetView = this.divSetView.bind(this);
    this.iconSetView = this.iconSetView.bind(this);
    this.getAccount = this.getAccount.bind(this);
    this.logInView = this.logInView.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  divSetView(view) {
    this.setState({
      view: view
    });
  }

  iconSetView() {

  }

  logInView() {
    this.setState({
      view: 'login'
    });
  }

  setUser(artistObject) {
    this.setState({
      currentUser: artistObject
    });
  }

  // need to double check
  getAccount(event) {
    const account = event.target.value;
    fetch(`/api/accounts/${account}`)
      .then(res => res.json())
      .then(sets => {
        this.setState({
          sets: sets,
          view: 'artist'
        });
      });
  }

  // --------
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
      viewElement = <div><Modules currentUser={this.state.currentUser}/></div>;
    } else if (this.state.view === 'home') {
      viewElement = <div><SetsList /><ArtistsList /></div>;
    } else if (this.state.view === 'search') {
      viewElement = <div><SearchSet /><SearchArtist /></div>;
    } else if (this.state.view === 'artist') {
      viewElement = <div><ArtistView account={this.state.currentUser}/></div>;
    } else if (this.state.view === 'login') {
      viewElement = <div><LogInView setView={this.divSetView} setUser={this.setUser} /></div>;
    }

    return (
      this.state.isLoading
        ? <h1>Testing connections...</h1>
        : <div className="container">
          <Header stateView={this.state.view} logInView={this.logInView} getAccount={this.getAccount}/>
          {viewElement}
          <Footer stateView={this.state.view} divSetView={this.divSetView} iconSetView={this.iconSetView} />
        </div>
    );
  }
}
