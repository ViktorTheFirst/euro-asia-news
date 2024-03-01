import React from 'react';
import styled from 'styled-components';

import { InputAdornment, TextField } from '@mui/material';
import { Container, StyledTypography } from '@/styles/globalStyles';

const FormContainer = styled(Container)`
  flex-direction: column;
  width: 40%;
  height: 50vh;
  padding: 20px;
  margin: 0 30px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  width: 50%;
  caret-color: transparent;
`;

interface BillFormProps {
  confirmationNumber: string;
  payedAmount: string;
  isInputsDisabled: boolean;
  confNumberChangeHandler: (event: any) => void;
  payedAmountChangeHandler: (event: any) => void;
}

const BillForm = ({
  confirmationNumber,
  payedAmount,
  isInputsDisabled,
  confNumberChangeHandler,
  payedAmountChangeHandler,
}: BillFormProps) => {
  return (
    <FormContainer>
      <StyledTypography>Confirmation number</StyledTypography>
      <StyledTextField
        id='conf-number'
        label='Confirmation number'
        variant='outlined'
        margin='normal'
        value={confirmationNumber}
        onChange={confNumberChangeHandler}
        disabled={isInputsDisabled}
      />

      <StyledTypography>Payed amount</StyledTypography>
      <StyledTextField
        id='payed-amount'
        label='Payed amount'
        variant='outlined'
        margin='normal'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>{`\u20aa`}</InputAdornment>
          ),
        }}
        value={payedAmount}
        onChange={payedAmountChangeHandler}
        disabled={isInputsDisabled}
      />
    </FormContainer>
  );
};

export default BillForm;
