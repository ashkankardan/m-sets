import React from 'react';
import Header from './header';
import Footer from './footer';
import Modules from './modules';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'modules'
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
    } else if (this.state.view === 'modules') {
      viewElement = <Modules />;
    }
    return (
      <div>
        <Header />
        {viewElement}
        <Footer />
      </div>
    );
  }
}
