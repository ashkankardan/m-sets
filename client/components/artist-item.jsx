import React from 'react';

export default class ArtistItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="browse-item">
        <img className="avatar" src={this.props.set.image} alt={this.props.set.setName} />
        <p className="artist-name">{this.props.set.artistName}</p>
      </div>
    );
  }
}
