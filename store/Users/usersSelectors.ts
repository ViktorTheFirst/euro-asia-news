import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export const usersSelector = (state: RootState) => state.users;

export const getProfileImage = createSelector(
  [usersSelector],
  (usersSelector) => usersSelector.profileImage
);

export const getUserInfo = createSelector([usersSelector], (usersSelector) => {
  const { name, email, profileImage, role } = usersSelector;
  return {
    name,
    email,
    profileImage,
    role,
  };
});
