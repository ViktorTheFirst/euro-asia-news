import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  setBillsByTypeAction,
  resetCreationBillInfoAction,
  resetSelectedBillInfoAction,
  setCreationBillInfoAction,
  setSelectedBillInfoAction,
} from './billsActions';
import { emptyBill } from '@/utils/constants';

export const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSelectedBillInfoAction, (state, action) => {
        state.selectedBill = action.payload;
      })
      .addCase(resetSelectedBillInfoAction, (state, action) => {
        state.selectedBill = emptyBill;
      })
      .addCase(setCreationBillInfoAction, (state, action) => {
        state.creationBill = action.payload;
      })
      .addCase(resetCreationBillInfoAction, (state, action) => {
        state.creationBill = emptyBill;
      })
      .addCase(setBillsByTypeAction, (state, action) => {
        state.billsByType = action.payload;
      });
  },
});

export const billsReducer = billsSlice.reducer;
