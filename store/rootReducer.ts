import { combineReducers } from '@reduxjs/toolkit';
import { BillsInitialState, billsReducer } from './Bills';

export interface RootState {
  readonly bills: BillsInitialState;
}

const rootReducer = combineReducers({
  bills: billsReducer,
});

export default rootReducer;
