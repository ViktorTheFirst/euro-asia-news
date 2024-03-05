import React from 'react';
import Link from 'next/link';

import { Box, Button, TextField, Typography } from '@mui/material';

const InputStyle = {
  width: '40%',
} as const;
interface RegistrationFormProps {
  userName: string;
  userEmail: string;
  partnerName: string;
  partnerEmail: string;
  password: string;
  passwordAgain: string;
  nameChangeHandler: (event: any) => void;
  emailChangeHandler: (event: any) => void;
  partnerNameChangeHandler: (event: any) => void;
  partnerEmailChangeHandler: (event: any) => void;
  passwordChangeHandler: (event: any) => void;
  passwordAgainChangeHandler: (event: any) => void;
  onRegister: () => void;
  onAlreadyRegistered: () => void;
}

const RegistrationForm = ({
  userName,
  userEmail,
  partnerName,
  partnerEmail,
  password,
  passwordAgain,
  nameChangeHandler,
  emailChangeHandler,
  partnerNameChangeHandler,
  partnerEmailChangeHandler,
  passwordChangeHandler,
  passwordAgainChangeHandler,
  onRegister,
  onAlreadyRegistered,
}: RegistrationFormProps) => {
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
      <Typography variant='h4'>Register new household</Typography>
      <Box
        component={Box}
        display='flex'
        flexDirection='column'
        justifyContent='space-evenly'
        alignItems='center'
        sx={{ width: '100%' }}
      >
        <TextField
          id='userName'
          label='Name'
          variant='outlined'
          margin='normal'
          value={userName}
          onChange={nameChangeHandler}
          sx={InputStyle}
        />

        <TextField
          id='userEmail'
          label='Email'
          variant='outlined'
          margin='normal'
          type='email'
          value={userEmail}
          onChange={emailChangeHandler}
          sx={InputStyle}
        />
      </Box>
      <Box
        component={Box}
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='space-evenly'
        sx={{ width: '100%' }}
      >
        <TextField
          id='partnersName'
          label='Partners name'
          variant='outlined'
          margin='normal'
          value={partnerName}
          onChange={partnerNameChangeHandler}
          sx={InputStyle}
        />

        <TextField
          id='partnersEmail'
          label='Partners email'
          variant='outlined'
          margin='normal'
          type='email'
          value={partnerEmail}
          onChange={partnerEmailChangeHandler}
          sx={InputStyle}
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
          id='userPassword'
          label='Password'
          variant='outlined'
          margin='normal'
          type='password'
          value={password}
          onChange={passwordChangeHandler}
          sx={InputStyle}
        />
        <TextField
          id='userPasswordAgain'
          label='Password again'
          variant='outlined'
          margin='normal'
          type='password'
          value={passwordAgain}
          onChange={passwordAgainChangeHandler}
          sx={InputStyle}
        />
      </Box>
      <Box
        component={Box}
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{ width: '25%' }}
      >
        <Button
          variant='text'
          color='primary'
          onClick={onAlreadyRegistered}
          component={Link}
          href='/login'
          sx={{ width: '100%' }}
        >
          Already registered?
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={onRegister}
          sx={{ width: '100%' }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
