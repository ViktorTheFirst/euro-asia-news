import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Button, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { ValidationError, ValidationFields } from '@/utils/interfaces';
import loginRegisterStyles from '../../styles/loginRegisterStyles.module.css';
import svgLogo from '../../public/assets/svgs/news-logo3.png';

interface LoginFormProps {
  userEmail: string;
  password: string;
  errors: ValidationError[];
  loading: boolean;
  emailChangeHandler: (event: any) => void;
  passwordChangeHandler: (event: any) => void;
  onLogin: () => void;
}

const LoginForm = ({
  userEmail,
  password,
  errors,
  loading,
  emailChangeHandler,
  passwordChangeHandler,
  onLogin,
}: LoginFormProps) => {
  const emailErr = errors.find((err) => err.type === ValidationFields.email);
  const passwordErr = errors.find(
    (err) => err.type === ValidationFields.password
  );

  const isDisabled = useMemo(() => {
    return !!emailErr || !!passwordErr || !userEmail.length || !password.length;
  }, [emailErr, passwordErr, userEmail, password]);

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
        Login
      </Typography>

      <Box
        component={Box}
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{ width: '100%' }}
      >
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
      </Box>
      <div className={loginRegisterStyles.buttonsContainer}>
        <Button
          variant='text'
          color='primary'
          component={Link}
          href='/registration'
        >
          Register
        </Button>
        <LoadingButton
          variant='contained'
          color='secondary'
          onClick={onLogin}
          disabled={isDisabled}
          loading={loading}
        >
          Login
        </LoadingButton>
      </div>
    </div>
  );
};

export default LoginForm;
