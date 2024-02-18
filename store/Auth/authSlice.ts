import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { setHouseholdIdAction, setTokenAction } from './authActions';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setHouseholdIdAction, (state, action) => {
        state.householdId = action.payload;
      })
      .addCase(setTokenAction, (state, action) => {
        state.token = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
