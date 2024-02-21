import axios from 'axios';
import { UserLoginData, UserRegistrationData } from '@/utils/interfaces';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  withCredentials: true,
});

export const registrationAPI = async (userData: UserRegistrationData) => {
  try {
    const createdUser = await instance({
      method: 'post',
      url: `${baseUrl}/api/users/signup`,
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
    const result = await instance({
      method: 'post',
      url: `${baseUrl}/api/users/login`,
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
