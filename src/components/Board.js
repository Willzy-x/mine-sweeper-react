import React from 'react';
import Block from './Block';

const dx1 = [-1, 0, 1, -1, 1, -1, 0, 1];
const dy1 = [-1, -1, -1, 0, 0, 1, 1, 1];
const dx2 = [-1, 1, 0, 0];
const dy2 = [0, 0, -1, 1];

const generateMinesMap = (rows, cols, numOfMines) => {
  let totalNum = rows * cols;
  numOfMines = numOfMines % totalNum;
  let arr = Array(totalNum).fill(" ");
  // generate mines
  for (let i = 0; i < numOfMines; ++i) {
    let randomIndex = Math.floor(Math.random() * totalNum);
    while (arr[randomIndex] === "💣") {
      randomIndex = (randomIndex + Math.floor(Math.random() * 10)) % (totalNum);
    }
    arr[randomIndex] = "💣"
  }
  // generate numbers
  for (let i = 0; i < totalNum; ++i) {
    var count = 0;
    if (arr[i] !== "💣") {
      let rIndex = Math.floor(i / cols);
      let cIndex = i % cols;
      for (let j = 0; j < 8; ++j) {
        let newRIndex = rIndex + dy1[j];
        let newCIndex = cIndex + dx1[j];
        if (newRIndex >= 0 && newRIndex < rows && newCIndex >= 0 && newCIndex < cols) {
          let newIndex = newRIndex * cols + newCIndex;
          if (arr[newIndex] === "💣") 
            count += 1;
        }
      }
      arr[i] = count === 0 ? "x" : count;
    }
  }
  return arr;
};

const depthSearch = (concealedArray, blocks, i, rows, cols) => {
  if (blocks[i] === "x") {
    concealedArray[i] = 0;
    let rIndex = Math.floor(i / cols);
    let cIndex = i % cols;
    for (let j = 0; j < 4; ++j) {
      let newRIndex = rIndex + dy2[j];
      let newCIndex = cIndex + dx2[j];
      if (newRIndex >= 0 && newRIndex < rows && newCIndex >= 0 && newCIndex < cols) {
        let newIndex = newRIndex * cols + newCIndex;
        if (concealedArray[newIndex])
          depthSearch(concealedArray, blocks, newIndex, rows, cols);
      }
    }
  } 
};

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      blocks: generateMinesMap(this.props.rows, this.props.cols, this.props.numOfMines),
      concealedArray: Array(props.cols * props.rows).fill(1),
      remainingMines: this.props.numOfMines
    };
    console.log(`has ${this.props.rows} rows, ${this.props.cols} columns.`);
    this.handleClickBlock = this.handleClickBlock.bind(this);
    this.handleShiftClickBlock = this.handleShiftClickBlock.bind(this);
  }

  handleClickBlock(i) {
    const concealArray = this.state.concealedArray.slice();
    concealArray[i] = 0;
    depthSearch(concealArray, this.state.blocks, i, this.props.rows, this.props.cols);
    this.setState({
      concealedArray: concealArray
    });
    if (this.state.blocks[i] === "💣") {
      let foundedMines = this.props.numOfMines - this.state.remainingMines;
      alert(`You lose! Here is a mine! You found ${foundedMines}/${this.props.numOfMines} mines`);
    }
  }

  handleShiftClickBlock(i) {
    const concealArray = this.state.concealedArray.slice();
    let newRemainingMines = this.state.remainingMines;
    if (this.state.blocks[i] === "💣") {
      newRemainingMines--;
    } 
    concealArray[i] = 2;
    this.setState({
      concealedArray: concealArray,
      remainingMines: newRemainingMines
    });
    if (this.state.remainingMines === 0) {
      alert("You win! You found all of the mines!");
    }
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