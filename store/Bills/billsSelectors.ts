import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export const getSelectedBill = createSelector(
  ({ bills }: RootState) => bills.selectedBill,
  (selectedBill) => selectedBill
);
