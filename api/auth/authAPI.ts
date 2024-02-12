import axios from 'axios';
import { baseUrl } from '@/utils/constants';
import { UserLoginData, UserRegistrationData } from '@/utils/interfaces';

export const registrationAPI = async (userData: UserRegistrationData) => {
  try {
    const createdUser = await axios({
      method: 'post',
      url: `${baseUrl}/users/signup`,
      data: userData,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return createdUser;
  } catch (err) {
    console.warn('User registration failed on FE ' + err);
  }
};

export const loginAPI = async (userData: UserLoginData) => {
  try {
    const result = await axios({
      method: 'post',
      url: `${baseUrl}/users/login`,
      data: userData,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return result;
  } catch (err) {
    console.warn('User login failed on FE ' + err);
  }
};

export const getUsersAPI = async () => {
  try {
    const users = await axios({
      method: 'get',
      url: `${baseUrl}/users/getAllUsers`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return users;
  } catch (err) {
    console.warn('Fetching users failed on FE ' + err);
  }
};
