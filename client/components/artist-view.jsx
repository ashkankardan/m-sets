import React from 'react';
import SetItem from './set-item';

export default class ArtistView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const array = this.props.account;
    return (
      <div className="browse">
        <h1 className="large-font">Module|Sets</h1>
        {
          array.map(item => {
            return (
              <SetItem className="flex" key={item.setId} set={item}/>
            );
          })
        }
      </div>
    );
  }
}
