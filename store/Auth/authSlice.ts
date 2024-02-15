import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { setHousholdIdAction, setTokenAction } from './authActions';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setHousholdIdAction, (state, action) => {
        state.houseHoldId = action.payload;
      })
      .addCase(setTokenAction, (state, action) => {
        state.token = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
