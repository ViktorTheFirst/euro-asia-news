import { combineReducers } from '@reduxjs/toolkit';
import { BillsInitialState, billsReducer } from './Bills';
import { AuthInitialState, authReducer } from './Auth';

export interface RootState {
  readonly bills: BillsInitialState;
  readonly auth: AuthInitialState;
}

const rootReducer = combineReducers({
  bills: billsReducer,
  auth: authReducer,
});

export default rootReducer;
