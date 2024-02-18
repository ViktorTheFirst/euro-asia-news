import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export const authSelector = (state: RootState) => state.auth;

export const getHouseholdId = createSelector(
  [authSelector],
  (authSelector) => authSelector.householdId
);

export const getToken = createSelector(
  [authSelector],
  (authSelector) => authSelector.token
);
