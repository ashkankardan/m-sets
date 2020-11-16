import React from 'react';
import AccountItem from './account-item';

export default class AccountView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sets: []
    };
    // this.getAccount = this.getAccount.bind(this);
    this.updateSetId = this.updateSetId.bind(this);
  }

  // getAccount(event) {

  //   const account = event.target.value;
  //   console.log(`account`, account)
  //   fetch(`/api/accounts/${account}`)
  //     .then(res => res.json())
  //     .then(sets => {
  //       this.setState({
  //         sets: sets,
  //         view: 'account',
  //         setId: null
  //       });
  //     });
  // }

  updateSetId(setId) {
    this.props.getSelectedSetData(setId);
  }

  render() {
    const array = this.props.account;
    return (
      <div className="browse">
        <h1 className="large-font">My Sets</h1>
        {
          array.map(item => {
            return (
              <AccountItem updateSetId={this.updateSetId} className="flex" key={item.setId} set={item}/>
            );
          })
        }
      </div>
    );
  }
}
