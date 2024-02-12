export const getUserToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userToken');
  }
  return null;
};

export const setUserToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userToken', token);
  }
  return null;
};

export const removeUserToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userToken');
  }
  return null;
};
