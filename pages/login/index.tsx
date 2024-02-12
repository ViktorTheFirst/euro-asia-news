import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { loginAPI } from '@/api/auth/authAPI';
import { setUserToken } from '@/auth/utils/users';
import LoginForm from '@/components/forms/LoginForm';
import { Container } from '@/styles/globalStyles';

const LoginContainer = styled(Container)`
  height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #d24ef3b7;
`;

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onLogin = () => {
    try {
      loginAPI({
        email: userEmail,
        password,
      }).then((result) => {
        if (result?.data?.message) {
          setUserToken(result?.data?.message);
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
