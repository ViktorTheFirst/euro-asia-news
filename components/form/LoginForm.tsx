import Link from 'next/link';
import { Box, Button, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ValidationError, ValidationFields } from '@/utils/interfaces';
import { useMemo } from 'react';

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
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      sx={{
        width: '70%',
        height: '60vh',
        margin: '0 70px',
      }}
    >
      <Typography variant='h4'>Login</Typography>

      <Box
        component={Box}
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{ width: '100%' }}
      >
        <TextField
          id='userEmail'
          label={!!emailErr ? emailErr.error : 'Email'}
          error={!!emailErr}
          variant='outlined'
          margin='normal'
          type='email'
          value={userEmail}
          onChange={emailChangeHandler}
          sx={{ width: '40%' }}
        />

        <TextField
          id='userPassword'
          label={!!passwordErr ? passwordErr.error : 'Password'}
          error={!!passwordErr}
          variant='outlined'
          margin='normal'
          type='password'
          value={password}
          onChange={passwordChangeHandler}
          sx={{ width: '40%' }}
        />
      </Box>
      <Box
        component={Box}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        sx={{
          width: '30%',
        }}
      >
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
      </Box>
    </Box>
  );
};

export default LoginForm;
