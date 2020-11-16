import React from 'react';
import SetItem from './set-item';

export default class SetsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setArray: []
    };
    this.getSets = this.getSets.bind(this);
    this.updateSetId = this.updateSetId.bind(this);
  }

  componentDidMount() {
    this.getSets();
  }

  getSets() {
    fetch('/api/sets')
      .then(res => res.json())
      .then(array => {
        this.setState({
          setArray: array
        });
      });
  }

  updateSetId(setId) {
    this.props.getSelectedSetData(setId);
  }

  render() {
    const array = this.state.setArray;
    return (
      <div className="browse">
        <h1 className="large-font">Module|Sets</h1>
        {
          array.map(item => {
            return (
              <SetItem updateSetId={this.updateSetId} className="browse-container flex" key={item.setId} set={item}/>
            );
          })
        }
      </div>
    );
  }
}
