import React, { useState } from 'react';
import styled from 'styled-components';

import RegistrationForm from '@/components/forms/RegistrationForm';
import { Container } from '@/styles/globalStyles';
import { useRouter } from 'next/router';
import { registrationAPI } from '@/api/auth/authAPI';
import { setUserToken } from '@/auth/utils/users';

const RegistrationContainer = styled(Container)`
  height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #d24ef3b7;
`;

const RegistrationPage = () => {
  const router = useRouter();

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
        if (result?.data) {
          setUserToken(result?.data?.householdId);
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
