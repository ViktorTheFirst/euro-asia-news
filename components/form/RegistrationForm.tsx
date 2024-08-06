import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Button, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { ValidationError, ValidationFields } from '@/utils/interfaces';
import loginRegisterStyles from '../../styles/loginRegisterStyles.module.css';
import svgLogo from '../../public/assets/svgs/news-logo3.png';

interface RegistrationFormProps {
  userName: string;
  userEmail: string;
  password: string;
  passwordAgain: string;
  errors: ValidationError[];
  loading: boolean;
  nameChangeHandler: (event: any) => void;
  emailChangeHandler: (event: any) => void;
  passwordChangeHandler: (event: any) => void;
  passwordAgainChangeHandler: (event: any) => void;
  onRegister: () => void;
}

const RegistrationForm = ({
  userName,
  userEmail,

  password,
  passwordAgain,
  errors,
  loading,
  nameChangeHandler,
  emailChangeHandler,

  passwordChangeHandler,
  passwordAgainChangeHandler,
  onRegister,
}: RegistrationFormProps) => {
  const nameErr = errors.find((err) => err.type === ValidationFields.name);
  const emailErr = errors.find((err) => err.type === ValidationFields.email);

  const passwordErr = errors.find(
    (err) => err.type === ValidationFields.password
  );
  const passwordAgainErr = errors.find(
    (err) => err.type === ValidationFields.passwordAgain
  );

  return (
    <div className={loginRegisterStyles.loginContainer}>
      <Image
        src={svgLogo}
        alt='news-logo'
        width={300}
        height={300}
        style={{ borderRadius: 10, margin: '20px 0 40px 0' }}
      />
      <Typography
        variant='h4'
        sx={{
          color: (theme) => theme.palette.secondary.main,
          fontWeight: 'bold',
        }}
      >
        Registration
      </Typography>
      <Box
        component={Box}
        display='flex'
        flexDirection='column'
        justifyContent='space-evenly'
        alignItems='center'
        sx={{ width: '100%' }}
      >
        <TextField
          className={loginRegisterStyles.textField}
          id='userName'
          label={!!nameErr ? nameErr.error : 'Name'}
          error={!!nameErr}
          variant='outlined'
          margin='normal'
          value={userName}
          onChange={nameChangeHandler}
        />

        <TextField
          className={loginRegisterStyles.textField}
          id='userEmail'
          label={!!emailErr ? emailErr.error : 'Email'}
          error={!!emailErr}
          variant='outlined'
          margin='normal'
          type='email'
          value={userEmail}
          onChange={emailChangeHandler}
        />
      </Box>

      <Box
        component={Box}
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{ width: '100%' }}
      >
        <TextField
          className={loginRegisterStyles.textField}
          id='userPassword'
          label={!!passwordErr ? passwordErr.error : 'Password'}
          error={!!passwordErr}
          variant='outlined'
          margin='normal'
          type='password'
          value={password}
          onChange={passwordChangeHandler}
        />
        <TextField
          className={loginRegisterStyles.textField}
          id='userPasswordAgain'
          label={!!passwordAgainErr ? passwordAgainErr.error : 'Password again'}
          error={!!passwordAgainErr}
          variant='outlined'
          margin='normal'
          type='password'
          value={passwordAgain}
          onChange={passwordAgainChangeHandler}
        />
      </Box>
      <div className={loginRegisterStyles.buttonsContainer}>
        <Button
          variant='text'
          color='primary'
          component={Link}
          href='/login'
          sx={{ width: '100%' }}
        >
          Already registered?
        </Button>
        <LoadingButton
          variant='contained'
          color='secondary'
          onClick={onRegister}
          sx={{ width: '100%' }}
          disabled={!!emailErr || !!passwordErr}
          loading={loading}
        >
          Register
        </LoadingButton>
      </div>
    </div>
  );
};

export default RegistrationForm;
