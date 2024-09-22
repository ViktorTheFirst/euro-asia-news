import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import RegistrationForm from '@/components/form/RegistrationForm';
import { registrationAPI } from '@/api/auth/authAPI';
import { setHouseholdIdAction, setTokenAction } from '@/store/Auth';
import { setUserInfoAction } from '@/store/Users';
import useValidation from '@/hooks/useValidation';
import { ValidationFields } from '@/utils/interfaces';

const RegistrationPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errors, validate] = useValidation();

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const handleUserNameChange = (event: any) => {
    setUserName(event.target.value);
    validate(event.target.value, ValidationFields.name);
  };

  const handleUserEmailChange = (event: any) => {
    setUserEmail(event.target.value);
    validate(event.target.value, ValidationFields.email);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
    validate(event.target.value, ValidationFields.password);
  };

  const handlePasswordAgainChange = (event: any) => {
    setPasswordAgain(event.target.value);
    validate(event.target.value, ValidationFields.passwordAgain);
  };

  const onRegister = async () => {
    setLoading(true);
    try {
      registrationAPI({
        name: userName,
        email: userEmail,
        password,
      }).then((result) => {
        if (result?.data.id) {
          const { name, email, role, id } = result?.data;

          dispatch(
            setUserInfoAction({
              name,
              email,
              role,
            })
          );
          router.push('/');
        }
      });
    } catch (err) {
      console.warn('Error while registering user ' + err);
    }
    setLoading(false);
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
      <RegistrationForm
        userName={userName}
        userEmail={userEmail}
        password={password}
        passwordAgain={passwordAgain}
        errors={errors}
        loading={loading}
        nameChangeHandler={handleUserNameChange}
        emailChangeHandler={handleUserEmailChange}
        passwordChangeHandler={handlePasswordChange}
        passwordAgainChangeHandler={handlePasswordAgainChange}
        onRegister={onRegister}
      />
    </Box>
  );
};

export default RegistrationPage;
