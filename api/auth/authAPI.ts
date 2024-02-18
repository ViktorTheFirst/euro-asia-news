import axios from 'axios';
import { UserLoginData, UserRegistrationData } from '@/utils/interfaces';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const registrationAPI = async (userData: UserRegistrationData) => {
  try {
    const createdUser = await axios({
      method: 'post',
      url: `${baseUrl}/users/signup`,
      data: userData,
      withCredentials: true,
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
      withCredentials: true,
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
