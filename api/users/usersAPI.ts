import axios from 'axios';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getUsersAPI = async () => {
  try {
    const users = await axios({
      method: 'get',
      url: `${baseUrl}/api/users/getAllUsers`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return users;
  } catch (err) {
    console.warn('Fetching users failed on FE ' + err);
  }
};

export const editUserAPI = async (userId: string, userData: FormData) => {
  try {
    const user = await axios({
      method: 'post',
      url: `${baseUrl}/api/users/${userId}`,
      data: userData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return user;
  } catch (err) {
    console.warn('Fetching user failed on FE ' + err);
  }
};

export const getUserAPI = async (userId: string) => {
  try {
    const user = await axios({
      method: 'get',
      url: `${baseUrl}/api/users/${userId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return user;
  } catch (err) {
    console.warn('Fetching user failed on FE ' + err);
  }
};
