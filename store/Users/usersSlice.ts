import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { setProfileImageAction, setUserInfoAction } from './usersActions';

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setProfileImageAction, (state, action) => {
        state.profileImage = action.payload;
      })
      .addCase(setUserInfoAction, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.profileImage = action.payload.profileImage || '';
      });
  },
});

export const usersReducer = usersSlice.reducer;
