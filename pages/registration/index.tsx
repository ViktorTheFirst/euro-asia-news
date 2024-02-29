import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import RegistrationForm from '@/components/form/RegistrationForm';
import { Container } from '@/styles/globalStyles';
import { registrationAPI } from '@/api/auth/authAPI';
import { setHouseholdIdAction, setTokenAction } from '@/store/Auth';
import { setUserInfoAction } from '@/store/Users';

const RegistrationContainer = styled(Container)`
  height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RegistrationPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const handleUserNameChange = (event: any) => {
    setUserName(event.target.value);
  };

  const handleUserEmailChange = (event: any) => {
    setUserEmail(event.target.value);
  };

  const handlePartnerNameChange = (event: any) => {
    setPartnerName(event.target.value);
  };

  const handlePartnerEmailChange = (event: any) => {
    setPartnerEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handlePasswordAgainChange = (event: any) => {
    setPasswordAgain(event.target.value);
  };

  const onRegister = async () => {
    try {
      registrationAPI({
        name: userName,
        email: userEmail,
        partnerName,
        partnerEmail,
        password,
      }).then((result) => {
        if (result?.data.token) {
          const { name, email, token, householdId } = result?.data;
          dispatch(setHouseholdIdAction(householdId));
          dispatch(setTokenAction(token));
          dispatch(
            setUserInfoAction({
              name,
              email,
            })
          );
          router.push('/');
        }
      });
    } catch (err) {
      console.warn('Error while registering user ' + err);
    }
  };

  const onAlreadyRegistered = () => {};

  return (
    <RegistrationContainer>
      <RegistrationForm
        userName={userName}
        userEmail={userEmail}
        partnerName={partnerName}
        partnerEmail={partnerEmail}
        password={password}
        passwordAgain={passwordAgain}
        nameChangeHandler={handleUserNameChange}
        emailChangeHandler={handleUserEmailChange}
        partnerNameChangeHandler={handlePartnerNameChange}
        partnerEmailChangeHandler={handlePartnerEmailChange}
        passwordChangeHandler={handlePasswordChange}
        passwordAgainChangeHandler={handlePasswordAgainChange}
        onRegister={onRegister}
        onAlreadyRegistered={onAlreadyRegistered}
      />
    </RegistrationContainer>
  );
};

export default RegistrationPage;
