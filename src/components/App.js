import React from 'react';
import Board from './Board';
import { boardStore as store } from '../store';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Board rows={ 10 } cols={ 10 } numOfMines={ 10 } store={ store } />
      </div>
    );
  }
}

export default App;