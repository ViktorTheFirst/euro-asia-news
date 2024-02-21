import { createAction } from '@reduxjs/toolkit';
import { UserInfo } from './interfaces';

export const setProfileImageAction = createAction<string>(
  'users/setProfileImageAction'
);

export const setUserInfoAction = createAction<UserInfo>(
  'users/setUserInfoAction'
);
