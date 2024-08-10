import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Alert, Box, Snackbar, Typography } from '@mui/material';

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
  const [apiError, setApiError] = useState('');
  const [errors, validate] = useValidation();
  const router = useRouter();
  const dispatch = useDispatch();

  const onLogin = async () => {
    setLoading(true);
    try {
      const result = await loginAPI({ email: userEmail, password });

      const { name, email } = result;
      dispatch(
        setUserInfoAction({
          name,
          email,
        })
      );
      router.push('/');
    } catch (err) {
      setApiError('Wrong credentials');
      console.warn('Error while login user ' + err);
    }
    setLoading(false);
  };

  const emailChangeHandler = (event: any) => {
    setUserEmail(event.target.value);
    validate(event.target.value, ValidationFields.email);
  };
  const passwordChangeHandler = (event: any) => {
    setPassword(event.target.value);
    validate(event.target.value, ValidationFields.password);
  };

  const handleClose = () => {
    setApiError('');
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
      {!!apiError && (
        <Snackbar
          open={!!apiError}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity='error'
            variant='filled'
            sx={{ width: '100%' }}
          >
            <Typography>{apiError}</Typography>
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default LoginPage;
