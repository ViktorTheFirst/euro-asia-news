import { createAction } from '@reduxjs/toolkit';

export const setHousholdIdAction = createAction<string>(
  'auth/setHousholdIdAction'
);

export const setTokenAction = createAction<string>('auth/setTokenAction');
