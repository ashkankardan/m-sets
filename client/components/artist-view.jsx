import React from 'react';
import AccountItem from './account-item';

export default class ArtistView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sets: []
    };
  }

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

  render() {
    const array = this.props.account;
    return (
      <div className="browse">
        <h1 className="large-font">My Sets</h1>
        {
          array.map(item => {
            return (
              <AccountItem className="flex" key={item.setId} set={item}/>
            );
          })
        }
      </div>
    );
  }
}

// console log received object
// create variable "artistId" assign artistId inside the current object
// console log artistId
// send get to '/api/artist/:artistId'
// after receiving, res json
// this setstate sets: received sets
