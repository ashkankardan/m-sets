import React from 'react';

function ResultItem(props) {
  return (
    <div className="srch-res-container">
      <div className="srch-res-row">
        <img className="srch-avatar" src={props.resItem.image} alt={props.resItem.setName} />
        <div className="srch-res-info">
          <p className="set-name">{props.resItem.setName}</p>
          <p className="artist-name">{props.resItem.artistName}</p>
        </div>
      </div>
    </div>
  );
}

export default function SearchSetResultItem(props) {
  return (

    <div className={ 'search-result' }>
      {
        props.result.map(resItem => {
          return <ResultItem key={ resItem.setId } resItem={ resItem } />;
        })
      }

    </div>

  );
}
