import React from 'react';
import styled from 'styled-components';

import { InputAdornment, TextField, Typography } from '@material-ui/core';
import { Container } from '@/styles/globalStyles';

const FormContainer = styled(Container)`
  flex-direction: column;
  width: 50%;
  background-color: #c437bdac;
  height: 50vh;
  padding: 20px;
  margin: 0 70px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  width: 50%;
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
      <Typography>Confirmation number</Typography>
      <StyledTextField
        id='conf-number'
        label='Confirmation number'
        variant='outlined'
        margin='normal'
        value={confirmationNumber}
        onChange={confNumberChangeHandler}
        disabled={isInputsDisabled}
      />

      <Typography>Payed amount</Typography>
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
