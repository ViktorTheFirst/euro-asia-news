import React from 'react';
import styled from 'styled-components';

import { Col, Container, Row, StyledTypography } from '@/styles/globalStyles';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';

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

const StyledRow = styled(Row)`
  justify-content: space-evenly;
`;

const StyledCol = styled(Col)`
  align-items: center;
`;

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
    <FormContainer>
      <StyledTypography variant='h4'>Register new household</StyledTypography>
      <StyledRow>
        <StyledTextField
          id='userName'
          label='Name'
          variant='outlined'
          margin='normal'
          value={userName}
          onChange={nameChangeHandler}
        />

        <StyledTextField
          id='userEmail'
          label='Email'
          variant='outlined'
          margin='normal'
          type='email'
          value={userEmail}
          onChange={emailChangeHandler}
        />
      </StyledRow>
      <StyledRow>
        <StyledTextField
          id='partnersName'
          label='Partners name'
          variant='outlined'
          margin='normal'
          value={partnerName}
          onChange={partnerNameChangeHandler}
        />

        <StyledTextField
          id='partnersEmail'
          label='Partners email'
          variant='outlined'
          margin='normal'
          type='email'
          value={partnerEmail}
          onChange={partnerEmailChangeHandler}
        />
      </StyledRow>
      <StyledCol>
        <StyledTextField
          id='userPassword'
          label='Password'
          variant='outlined'
          margin='normal'
          type='password'
          value={password}
          onChange={passwordChangeHandler}
        />
        <StyledTextField
          id='userPasswordAgain'
          label='Password again'
          variant='outlined'
          margin='normal'
          type='password'
          value={passwordAgain}
          onChange={passwordAgainChangeHandler}
        />
      </StyledCol>
      <ButtonsContainer>
        <Button
          variant='text'
          color='primary'
          onClick={onAlreadyRegistered}
          component={Link}
          href='/login'
        >
          Already registered?
        </Button>
        <Button variant='contained' color='secondary' onClick={onRegister}>
          Register
        </Button>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default RegistrationForm;
