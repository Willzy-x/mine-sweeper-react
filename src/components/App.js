import React from 'react';
import Board from './Board';
import * as Actions from '../actions/Actions';
import { boardStore as store } from '../store';
import InfoPanel from './InfoPanel';

class App extends React.Component {

  constructor(props) {
    super(props);
    store.dispatch(Actions.initializeBoard({
      rows: props.rows,
      cols: props.cols,
      numOfMines: props.numOfMines
    }));
  }

  render() {
    return (
      <div className="app container">
        <div className="row">
          <InfoPanel store={store} />
        </div>
        <div className="row">
          <Board 
            rows={this.props.rows} 
            cols={this.props.cols} 
            numOfMines={this.props.numOfMines} 
            store={store} />
        </div>
      </div>
    );
  }
}

export default App;