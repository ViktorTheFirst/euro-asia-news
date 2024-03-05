import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  addShopListItemAction,
  removeShopListItemAction,
  editShopListItemAction,
  setIsShopListChangedAction,
  deleteShopListAction,
} from './shopListActions';

export const shopListSlice = createSlice({
  name: 'shopList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addShopListItemAction, (state, action) => {
        let newList = state.shopList;
        newList.push(action.payload);
        state.shopList = newList;
      })
      .addCase(removeShopListItemAction, (state, action) => {
        const index = state.shopList.findIndex(
          (item) => item.title === action.payload
        );
        const newList = state.shopList;
        index !== -1 && newList.splice(index, 1);
        state.shopList = newList;
      })
      .addCase(editShopListItemAction, (state, action) => {
        const index = state.shopList.findIndex(
          (item) => item.title === action.payload.title
        );
        const newList = state.shopList;
        index !== -1 && newList.splice(index, 1, action.payload);
        state.shopList = newList;
      })
      .addCase(deleteShopListAction, (state, action) => {
        state.shopList = [];
        state.initialList = [];
      });
  },
});

export const shopListReducer = shopListSlice.reducer;
