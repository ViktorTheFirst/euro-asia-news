import { createAction } from '@reduxjs/toolkit';

export const setHouseholdIdAction = createAction<string>(
  'auth/setHousholdIdAction'
);

export const setTokenAction = createAction<string>('auth/setTokenAction');
