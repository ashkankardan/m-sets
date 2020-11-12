import React from 'react';
import ArtistItem from './artist-item';

export default class ArtistsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setArray: []
    };
    this.getArtists = this.getArtists.bind(this);
  }

  componentDidMount() {
    this.getArtists();
  }

  getArtists() {
    fetch('/api/artists')
      .then(res => res.json())
      .then(array => {
        this.setState({
          setArray: array
        });
      });
  }

  render() {
    const array = this.state.setArray;
    return (
      <div className="browse">
        <h1 className="large-font">Artists</h1>
        {
          array.map(item => {
            return (
              <ArtistItem className="flex browse" key={item.artistId} set={item} />
            );
          })
        }
      </div>
    );
  }
}
