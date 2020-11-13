import React from 'react';

function ResultItem(props) {
  return (
    <div className="srch-res-container">
      <div className="srch-res-row">
        <img className="srch-avatar" src={props.resItem.image} alt={props.resItem.artistName} />
        <div className="srch-res-info">
          <p className="artist-name">{props.resItem.artistName}</p>
          <p className="set-name">{props.resItem.setName}</p>
        </div>
      </div>
    </div>
  );
}

export default function SearchArtistResultItem(props) {
  return (

    <div className={ 'search-result' }>
      {
        props.result.map(resItem => {
          return <ResultItem key={ resItem.artistId } resItem={ resItem } />;
        })
      }

    </div>

  );
}
