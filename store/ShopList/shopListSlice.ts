import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  addShopListItemAction,
  removeShopListItemAction,
  editShopListItemAction,
  setIsShopListChangedAction,
  setShopListAction,
  setInitialShopListAction,
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

        if (JSON.stringify(newList) !== JSON.stringify(state.initialList)) {
          state.isChanged = true;
        } else {
          state.isChanged = false;
        }

        state.shopList = newList;
      })
      .addCase(removeShopListItemAction, (state, action) => {
        const index = state.shopList.findIndex(
          (item) => item.title === action.payload
        );
        const newList = state.shopList;
        index !== -1 && newList.splice(index, 1);

        if (JSON.stringify(newList) !== JSON.stringify(state.initialList)) {
          state.isChanged = true;
        } else {
          state.isChanged = false;
        }

        state.shopList = newList;
      })
      .addCase(editShopListItemAction, (state, action) => {
        const index = state.shopList.findIndex(
          (item) => item._id === action.payload._id
        );
        const newList = state.shopList;
        index !== -1 && newList.splice(index, 1, action.payload);

        if (JSON.stringify(newList) !== JSON.stringify(state.initialList)) {
          state.isChanged = true;
        } else {
          state.isChanged = false;
        }

        state.shopList = newList;
      })
      .addCase(setShopListAction, (state, action) => {
        state.shopList = action.payload;
      })
      .addCase(setInitialShopListAction, (state, action) => {
        state.initialList = action.payload;
      })
      .addCase(setIsShopListChangedAction, (state, action) => {
        state.isChanged = action.payload;
      });
  },
});

export const shopListReducer = shopListSlice.reducer;
