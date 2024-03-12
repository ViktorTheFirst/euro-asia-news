import React from 'react';
import Link from 'next/link';

import { Box, Button, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ValidationError, ValidationFields } from '@/utils/interfaces';

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
  errors: ValidationError[];
  loading: boolean;
  nameChangeHandler: (event: any) => void;
  emailChangeHandler: (event: any) => void;
  partnerNameChangeHandler: (event: any) => void;
  partnerEmailChangeHandler: (event: any) => void;
  passwordChangeHandler: (event: any) => void;
  passwordAgainChangeHandler: (event: any) => void;
  onRegister: () => void;
}

const RegistrationForm = ({
  userName,
  userEmail,
  partnerName,
  partnerEmail,
  password,
  passwordAgain,
  errors,
  loading,
  nameChangeHandler,
  emailChangeHandler,
  partnerNameChangeHandler,
  partnerEmailChangeHandler,
  passwordChangeHandler,
  passwordAgainChangeHandler,
  onRegister,
}: RegistrationFormProps) => {
  const nameErr = errors.find((err) => err.type === ValidationFields.name);
  const emailErr = errors.find((err) => err.type === ValidationFields.email);
  const partnerNameErr = errors.find(
    (err) => err.type === ValidationFields.partnerName
  );
  const partnerEmailErr = errors.find(
    (err) => err.type === ValidationFields.partnerEmail
  );
  const passwordErr = errors.find(
    (err) => err.type === ValidationFields.password
  );
  const passwordAgainErr = errors.find(
    (err) => err.type === ValidationFields.passwordAgain
  );

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
          label={!!nameErr ? nameErr.error : 'Name'}
          error={!!nameErr}
          variant='outlined'
          margin='normal'
          value={userName}
          onChange={nameChangeHandler}
          sx={InputStyle}
        />

        <TextField
          id='userEmail'
          label={!!emailErr ? emailErr.error : 'Email'}
          error={!!emailErr}
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
          label={!!partnerNameErr ? partnerNameErr.error : 'Partner name'}
          error={!!partnerNameErr}
          variant='outlined'
          margin='normal'
          value={partnerName}
          onChange={partnerNameChangeHandler}
          sx={InputStyle}
        />

        <TextField
          id='partnersEmail'
          label={!!partnerEmailErr ? partnerEmailErr.error : 'Partner email'}
          error={!!partnerEmailErr}
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
          label={!!passwordErr ? passwordErr.error : 'Password'}
          error={!!passwordErr}
          variant='outlined'
          margin='normal'
          type='password'
          value={password}
          onChange={passwordChangeHandler}
          sx={InputStyle}
        />
        <TextField
          id='userPasswordAgain'
          label={!!passwordAgainErr ? passwordAgainErr.error : 'Password again'}
          error={!!passwordAgainErr}
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
      </Box>
    </Box>
  );
};

export default RegistrationForm;
