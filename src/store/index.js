import { createStore } from 'redux';
import * as Reducers from '../reducers';

export const boardStore = createStore(Reducers.BoardReducer);