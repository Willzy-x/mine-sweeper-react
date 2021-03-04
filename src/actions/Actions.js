import * as ActionTypes from './ActionTypes';

export const initializeBoard = (payload) => {
  return {
    type: ActionTypes.INITIALIZE_BOARD,
    payload: payload
  }
};

export const discloseBlock = (payload) => {
  return {
    type: ActionTypes.DISCLOSE_BLOCK,
    payload: payload
  };
};

export const markBlockAsMine = (payload) => {
  return {
    type: ActionTypes.MARK_BLOCK_AS_MINE,
    payload: payload
  };
};