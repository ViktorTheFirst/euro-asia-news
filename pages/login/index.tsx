import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import { loginAPI } from '@/api/auth/authAPI';
import LoginForm from '@/components/form/LoginForm';
import { setHouseholdIdAction, setTokenAction } from '@/store/Auth';
import { setUserInfoAction } from '@/store/Users';
import useValidation from '@/hooks/useValidation';
import { ValidationFields } from '../../utils/interfaces';

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const onLogin = () => {
    setLoading(true);
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
    setLoading(false);
  };

  const [errors, validate] = useValidation();

  const emailChangeHandler = (event: any) => {
    setUserEmail(event.target.value);
    validate(event.target.value, ValidationFields.email);
  };
  const passwordChangeHandler = (event: any) => {
    setPassword(event.target.value);
    validate(event.target.value, ValidationFields.password);
  };

  return (
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      sx={{
        width: '100%',
        height: '100vh',
      }}
    >
      <LoginForm
        userEmail={userEmail}
        password={password}
        errors={errors}
        loading={loading}
        onLogin={onLogin}
        emailChangeHandler={emailChangeHandler}
        passwordChangeHandler={passwordChangeHandler}
      />
    </Box>
  );
};

export default LoginPage;
