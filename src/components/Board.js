import React from 'react';
import Block from './Block';
import * as Actions from '../actions/Actions';
class Board extends React.Component {

  constructor(props) {
    super(props);
    this.props.store.dispatch(Actions.initializeBoard({
      rows: this.props.rows,
      cols: this.props.cols,
      numOfMines: this.props.numOfMines
    }));
    this.state = this.props.store.getState();
    console.log(`has ${this.props.rows} rows, ${this.props.cols} columns.`);
    this.onChange = this.onChange.bind(this);
    this.handleClickBlock = this.handleClickBlock.bind(this);
    this.handleShiftClickBlock = this.handleShiftClickBlock.bind(this);
  }

  onChange() {
    this.setState(this.props.store.getState());
  }

  handleClickBlock(i) {
    this.props.store.dispatch(Actions.discloseBlock({
      idx: i,
      rows: this.props.rows,
      cols: this.props.cols
    }));
    if (this.state.blocks[i] === "💣") {
      alert("Oops, here is a mine!");
    }
  }

  handleShiftClickBlock(i) {
    this.props.store.dispatch(Actions.markBlockAsMine({idx: i}));
    if (this.state.remainingMines === 0) {
      alert("Congratulations, you have found all mines!");
    }
  }

  componentDidMount() {
    this.props.store.subscribe(this.onChange);
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.onChange);
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