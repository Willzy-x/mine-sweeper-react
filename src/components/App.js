import React from 'react';
import Board from './Board';
import * as Actions from '../actions/Actions';
import { boardStore as store } from '../store';
import InfoPanel from './InfoPanel';

class App extends React.Component {

  constructor(props) {
    super(props);
    store.dispatch(Actions.initializeBoard({
      rows: 10,
      cols: 10,
      numOfMines: 2
    }));
  }

  render() {
    return (
      <div className="container">
        <InfoPanel store={ store }/>
        <Board rows={ 10 } cols={ 10 } numOfMines={ 10 } store={ store } />
      </div>
    );
  }
}

export default App;