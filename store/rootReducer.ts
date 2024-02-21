import { combineReducers } from '@reduxjs/toolkit';
import { BillsInitialState, billsReducer } from './Bills';
import { AuthInitialState, authReducer } from './Auth';
import { UsersInitialState, usersReducer } from './Users';

export interface RootState {
  readonly bills: BillsInitialState;
  readonly auth: AuthInitialState;
  readonly users: UsersInitialState;
}

const rootReducer = combineReducers({
  bills: billsReducer,
  auth: authReducer,
  users: usersReducer,
});

export default rootReducer;
