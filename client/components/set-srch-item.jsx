import React from 'react';

export default class ResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetSelect = this.handleSetSelect.bind(this);

  }

  handleSetSelect() {
    this.props.updateSetId(this.props.resItem.setId);
  }

  render() {

    return (
      <div className="srch-res-container" id={this.props.resItem.setId} onClick={this.handleSetSelect}>
        <div className="srch-res-row">
          <img className="srch-avatar" src={this.props.resItem.image} alt={this.props.resItem.setName} />
          <div className="srch-res-info">
            <p className="set-name">{this.props.resItem.setName}</p>
            <p className="artist-name">{this.props.resItem.artistName}</p>
          </div>
        </div>
      </div>
    );
  }
}
