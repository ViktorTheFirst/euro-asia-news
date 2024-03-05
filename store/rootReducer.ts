import { combineReducers } from '@reduxjs/toolkit';
import { BillsInitialState, billsReducer } from './Bills';
import { AuthInitialState, authReducer } from './Auth';
import { UsersInitialState, usersReducer } from './Users';
import { ShopListInitialState, shopListReducer } from './ShopList';

export interface RootState {
  readonly bills: BillsInitialState;
  readonly auth: AuthInitialState;
  readonly users: UsersInitialState;
  readonly shopList: ShopListInitialState;
}

const rootReducer = combineReducers({
  bills: billsReducer,
  auth: authReducer,
  users: usersReducer,
  shopList: shopListReducer,
});

export default rootReducer;
