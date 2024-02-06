import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { resetSelectedBillInfo, setSelectedBillInfo } from './billsActions';
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
      });
  },
});

export const billsReducer = billsSlice.reducer;
