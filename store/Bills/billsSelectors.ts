import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export const billsSelector = (state: RootState) => state.bills;

export const getSelectedBill = createSelector(
  [billsSelector],
  (billsSelector) => billsSelector.selectedBill
);

export const getCreationBill = createSelector(
  [billsSelector],
  (billsSelector) => billsSelector.creationBill
);
