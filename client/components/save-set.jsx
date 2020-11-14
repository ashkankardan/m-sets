import React from 'react';

export default class SaveSet extends React.Component {
  constructor(props) {
    super(props);

    this.saveSet = this.saveSet.bind(this);
  }

  saveSet() {
    const setData = this.props.setData;
    const setDataStr = JSON.stringify(setData);

    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: setDataStr
    };

    fetch('./api/saveset', req)
      .then(res => res.json())
      .then(result => {
      // console.log(result)
      })
      .catch(err => console.error(err));

  }

  render() {
    return (
      <button onClick={ this.saveSet } className="saveSet">Save</button>
    );
  }

}
