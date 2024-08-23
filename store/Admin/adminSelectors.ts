import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export const adminSelector = (state: RootState) => state.admin;

export const getAddArticleData = createSelector(
  [adminSelector],
  (adminSelector) => adminSelector.addArticleData
);

/* export const getUserInfo = createSelector([usersSelector], (usersSelector) => {
  const { name, email, profileImage } = usersSelector;
  return {
    name,
    email,
    profileImage,
  };
}); */
