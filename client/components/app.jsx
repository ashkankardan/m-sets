import React from 'react';
import Header from './header';
import Footer from './footer';

import Modules from './modules';
import SetsList from './sets-list';
import ArtistsList from './artists-list';

import AccountView from './account-view';
import LogInView from './log-in-view';
import Search from './search';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'home',
      currentUser: {
        artistId: 1,
        artistName: 'ashkan',
        image: './images/avatars/ashkan.png',
        setId: 1,
        setName: 'Mynoise'
      }

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
          view: 'account'
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
      viewElement = <div><Modules divSetView={this.divSetView} currentUser={this.state.currentUser}/></div>;
    } else if (this.state.view === 'home') {
      viewElement = <div><SetsList /><ArtistsList /></div>;
    } else if (this.state.view === 'search') {
      viewElement = <div><Search /></div>;
    } else if (this.state.view === 'account') {
      viewElement = <div><AccountView account={this.state.currentUser}/></div>;
    } else if (this.state.view === 'login') {
      viewElement = <div><LogInView currentUser={this.state.currentUser} divSetView={this.divSetView} setUser={this.setUser} /></div>;
    }

    return (
      this.state.isLoading
        ? <h1>Testing connections...</h1>
        : <div className="container">
          <Header avatar={this.state.currentUser.image} stateView={this.state.view} logInView={this.logInView} getAccount={this.getAccount}/>
          {viewElement}
          <Footer stateView={this.state.view} divSetView={this.divSetView} iconSetView={this.iconSetView} />
        </div>
    );
  }
}
