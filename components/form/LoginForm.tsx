import { Col, Container, StyledTypography } from '@/styles/globalStyles';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const FormContainer = styled(Container)`
  flex-direction: column;
  width: 70%;
  height: 60vh;
  padding: 20px;
  margin: 0 70px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

const ButtonsContainer = styled(Container)`
  flex-direction: column;
  display: flex;
  width: 20%;
  max-width: 300px;
  margin-top: 10px;
`;

const StyledTextField = styled(TextField)`
  width: 40%;
  caret-color: transparent;
`;

const StyledCol = styled(Col)`
  align-items: center;
`;

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
    <FormContainer>
      <StyledTypography variant='h4'>Login</StyledTypography>

      <StyledCol>
        <StyledTextField
          id='userEmail'
          label='Email'
          variant='outlined'
          margin='normal'
          type='email'
          value={userEmail}
          onChange={emailChangeHandler}
        />
        <StyledTextField
          id='userPassword'
          label='Password'
          variant='outlined'
          margin='normal'
          type='password'
          value={password}
          onChange={passwordChangeHandler}
        />
      </StyledCol>
      <ButtonsContainer>
        <Button
          variant='text'
          color='primary'
          component={Link}
          href='/registration'
        >
          Register
        </Button>
        <Button variant='contained' color='primary' onClick={onLogin}>
          Login
        </Button>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default LoginForm;
