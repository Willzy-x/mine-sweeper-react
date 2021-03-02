import React from 'react';
import Board from './Board';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Board rows={ 3 } cols = { 4 } />
      </div>
    );
  }
}

export default App;