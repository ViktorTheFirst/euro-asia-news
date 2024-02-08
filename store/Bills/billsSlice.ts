import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  resetCreationBillInfo,
  resetSelectedBillInfo,
  setCreationBillInfo,
  setSelectedBillInfo,
} from './billsActions';
import { BillInfo } from '@/utils/interfaces';
import { emptyBill } from '@/utils/constants';

export const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSelectedBillInfo, (state, action) => {
        state.selectedBill = action.payload;
      })
      .addCase(resetSelectedBillInfo, (state, action) => {
        state.selectedBill = emptyBill;
      })
      .addCase(setCreationBillInfo, (state, action) => {
        state.creationBill = action.payload;
      })
      .addCase(resetCreationBillInfo, (state, action) => {
        state.creationBill = emptyBill;
      });
  },
});

export const billsReducer = billsSlice.reducer;
