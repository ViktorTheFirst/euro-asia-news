import { combineReducers } from '@reduxjs/toolkit';
import { AuthInitialState, authReducer } from './Auth';
import { UsersInitialState, usersReducer } from './Users';
import { AddArticleInitialState } from './Admin';
import { adminReducer } from './Admin/adminSlice';

export interface RootState {
  readonly auth: AuthInitialState;
  readonly users: UsersInitialState;
  readonly admin: AddArticleInitialState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  admin: adminReducer,
});

export default rootReducer;
