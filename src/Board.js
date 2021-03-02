import React from 'react';
import Block from './Block';

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      blocks: Array(props.cols * props.rows).fill(5)
    };
    console.log(`has ${this.props.rows} rows, ${this.props.cols} columns.`);
  }
  

  render() {
    return (
      <div className="Board">
        { 
          [...Array(this.props.rows).keys()].map(rIndex => 
            <div key={rIndex} className="board-row">
              { [...Array(this.props.cols).keys()].map(cIndex => 
                <Block key={rIndex * this.props.rows + cIndex} value={this.state.blocks[rIndex][cIndex]}/>) 
              }
            </div>
          ) 
        }
      </div>
    );
  }
}

export default Board;