import React from 'react';
import Block from './Block';
import * as Actions from '../actions/Actions';
import { boardStore } from '../store';
class Board extends React.Component {

  constructor(props) {
    super(props);
    boardStore.dispatch(Actions.initializeBoard({
      rows: this.props.rows,
      cols: this.props.cols,
      numOfMines: this.props.numOfMines
    }));
    this.state = boardStore.getState();
    console.log(`has ${this.props.rows} rows, ${this.props.cols} columns.`);
    this.onChange = this.onChange.bind(this);
    this.handleClickBlock = this.handleClickBlock.bind(this);
    this.handleShiftClickBlock = this.handleShiftClickBlock.bind(this);
  }

  onChange() {
    this.setState(boardStore.getState());
  }

  handleClickBlock(i) {
    boardStore.dispatch(Actions.discloseBlock({
      idx: i,
      rows: this.props.rows,
      cols: this.props.cols
    }));
    if (this.state.blocks[i] === "💣") {
      alert("Oops, here is a mine!");
    }
  }

  handleShiftClickBlock(i) {
    boardStore.dispatch(Actions.markBlockAsMine({idx: i}));
    if (this.state.remainingMines === 0) {
      alert("Congratulations, you have found all mines!");
    }
  }

  componentDidMount() {
    boardStore.subscribe(this.onChange);
  }

  componentWillUnmount() {
    boardStore.unsubscribe(this.onChange);
  }
  
  render() {
    return (
      <div className="Board">
        { 
          [...Array(this.props.rows).keys()].map(rIndex => 
            <div key={rIndex} className="board-row">
              { [...Array(this.props.cols).keys()].map(cIndex => {
                    let blockIndex = rIndex * this.props.cols + cIndex;
                    return (
                      <Block 
                        key={blockIndex} 
                        value={this.state.blocks[blockIndex]}
                        concealed={this.state.concealedArray[blockIndex]}
                        onClickBlock={() => this.handleClickBlock(blockIndex)}
                        onClickShiftBlock={() => this.handleShiftClickBlock(blockIndex)}
                      />
                    );
                  }
                ) 
              }
            </div>
          ) 
        }
      </div>
    );
  }
}

export default Board;