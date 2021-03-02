import React from 'react';
import Board from './Board';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Board rows={ 10 } cols = { 10 } />
      </div>
    );
  }
}

export default App;