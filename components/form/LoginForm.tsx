import Link from 'next/link';
import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface LoginFormProps {
  userEmail: string;
  password: string;
  emailChangeHandler: (event: any) => void;
  passwordChangeHandler: (event: any) => void;
  onLogin: () => void;
}

const LoginForm = ({
  userEmail,
  password,
  emailChangeHandler,
  passwordChangeHandler,
  onLogin,
}: LoginFormProps) => {
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
          label='Email'
          variant='outlined'
          margin='normal'
          type='email'
          value={userEmail}
          onChange={emailChangeHandler}
          sx={{ width: '40%' }}
        />
        <TextField
          id='userPassword'
          label='Password'
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
        <Button variant='contained' color='secondary' onClick={onLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
