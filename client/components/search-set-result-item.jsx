import React from 'react';
import ResultItem from './set-srch-item';

export default class SearchSetResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sets: []
    };
    this.updateSetId = this.updateSetId.bind(this);
  }

  updateSetId(setId) {
    this.props.getSelectedSetData(setId);
  }

  render() {

    return (

      <div className={ 'search-result' }>
        {
          this.props.result.map(resItem => {
            return <ResultItem updateSetId={this.updateSetId} key={ resItem.setId } resItem={ resItem } />;
          })
        }

      </div>

    );
  }
}
