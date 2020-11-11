import React from 'react';
import Header from './header';
import Footer from './footer';
import SetsList from './sets-list';
import ArtistsList from './artists-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'home'
    };
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
    } else if (!this.state.isLoading) {
      viewElement = <div className="center">
        <h1>{this.state.message.toUpperCase()}</h1>
      </div>;
    }
    if (this.state.view === 'home') {
      return (
        <div className="container">
          <Header />
          <SetsList />
          <ArtistsList />
          <Footer />
        </div>
      );
    } else {
      return (
        <div className="container">
          <Header />
          <Footer />
        </div>
      );
    }
  }
}
