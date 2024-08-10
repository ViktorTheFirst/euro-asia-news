import { combineReducers } from '@reduxjs/toolkit';
import { AuthInitialState, authReducer } from './Auth';
import { UsersInitialState, usersReducer } from './Users';

export interface RootState {
  readonly auth: AuthInitialState;
  readonly users: UsersInitialState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

export default rootReducer;
