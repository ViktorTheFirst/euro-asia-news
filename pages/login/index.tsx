import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { loginAPI } from '@/api/auth/authAPI';
import LoginForm from '@/components/form/LoginForm';
import { Container } from '@/styles/globalStyles';
import { setHouseholdIdAction, setTokenAction } from '@/store/Auth';
import { setUserInfoAction } from '@/store/Users';

const LoginContainer = styled(Container)`
  height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const onLogin = () => {
    try {
      loginAPI({
        email: userEmail,
        password,
      }).then((result) => {
        if (result?.data.token) {
          const { name, email, token, householdId } = result?.data;
          dispatch(setHouseholdIdAction(householdId));
          dispatch(setTokenAction(token));
          dispatch(
            setUserInfoAction({
              name,
              email,
            })
          );
          router.push('/');
        }
      });
    } catch (err) {
      console.warn('Error while login user ' + err);
    }
  };

  const emailChangeHandler = (event: any) => {
    setUserEmail(event.target.value);
  };
  const passwordChangeHandler = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <LoginContainer>
      <LoginForm
        userEmail={userEmail}
        password={password}
        onLogin={onLogin}
        emailChangeHandler={emailChangeHandler}
        passwordChangeHandler={passwordChangeHandler}
      />
    </LoginContainer>
  );
};

export default LoginPage;
