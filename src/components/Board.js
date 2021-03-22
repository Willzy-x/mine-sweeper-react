import React from 'react';
import Block from './Block';
import * as Actions from '../actions/Actions';
import RestartModal from './RestartModal';
class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.store.getState();
    this.onChange = this.onChange.bind(this);
    this.handleClickBlock = this.handleClickBlock.bind(this);
    this.handleShiftClickBlock = this.handleShiftClickBlock.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.gameFinish = this.gameFinish.bind(this);
  }

  gameFinish(win) {
    if (win) {
      alert("Congratulations, you have found all mines!");
    } else {
      alert("Oops, here is a mine!");
    }
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
      this.gameFinish(false);
    }
  }

  handleShiftClickBlock(i) {
    this.props.store.dispatch(Actions.markBlockAsMine({idx: i}));
  }

  handleRestart() {
    this.props.store.dispatch(Actions.initializeBoard({
      rows: this.props.rows,
      cols: this.props.cols,
      numOfMines: this.props.numOfMines
    }));
  }

  componentDidMount() {
    this.props.store.subscribe(this.onChange);
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.onChange);
  }

  componentDidUpdate() {
    if (this.state.remainingMines === 0) {
      this.gameFinish(true);
    }
  }
  
  render() {
    return (
      <div className="board">
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
        <RestartModal show={this.state.finished} handleRestart={this.handleRestart}/>
      </div>
    );
  }
}

export default Board;