import * as ActionTypes from '../actions/ActionTypes';

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
    arr[randomIndex] = "💣";
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
      arr[i] = count === 0 ? " " : count;
    }
  }
  return arr;
};

const depthSearch = (concealedArray, blocks, i, rows, cols) => {
  if (blocks[i] === " ") {
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

// conceal state: 0, disclosed; 1, hidden; 2, flagged.
export const BoardReducer = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {

    case ActionTypes.INITIALIZE_BOARD:
      const { rows, cols, numOfMines } = payload;
      const blocks = generateMinesMap(rows, cols, numOfMines);
      const concealedArray = Array(cols * rows).fill(1);
      const remainingMines = numOfMines;
      const finished = false;
      return {...state, 
        blocks: blocks, 
        concealedArray: concealedArray, 
        remainingMines: remainingMines,
        finished: finished
      };

    case ActionTypes.DISCLOSE_BLOCK: {
      const { rows, cols, idx } = payload;
      const concealArray = state.concealedArray.slice();
      concealArray[idx] = 0;
      let newFinished = state.finished;
      // loose finish
      if (state.blocks[idx] === "💣") {
        newFinished = true;
      }
      depthSearch(concealArray, state.blocks, idx, rows, cols);
      return {...state, concealedArray: concealArray, finished: newFinished};
    }

    case ActionTypes.MARK_BLOCK_AS_MINE: {
      const { idx } = payload;
      const concealArray = state.concealedArray.slice();
      let newRemainingMines = state.remainingMines;
      if (concealArray[idx] === 1) {
        concealArray[idx] = 2;
        if (state.blocks[idx] === "💣") newRemainingMines--;
      } else if (concealArray[idx] === 2) {
        concealArray[idx] = 1;
        if (state.blocks[idx] === "💣") newRemainingMines++;
      }
      let newFinished = state.finished;
      // win finish
      if (newRemainingMines === 0) {
        newFinished = true;
      }
      return {...state, 
        concealedArray: concealArray, 
        remainingMines: newRemainingMines,
        finished: newFinished
      };
    }

    default:
      return state;
  }
};