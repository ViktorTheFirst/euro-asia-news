import React from 'react';

import { Box, InputAdornment, TextField, Typography } from '@mui/material';

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
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      sx={{
        width: '40%',
        height: '50vh',
        margin: '0 30px',
        padding: '20px',
      }}
    >
      <Typography>Confirmation number</Typography>
      <TextField
        id='conf-number'
        label='Confirmation number'
        variant='outlined'
        margin='normal'
        value={confirmationNumber}
        onChange={confNumberChangeHandler}
        disabled={isInputsDisabled}
        sx={{ width: '50%' }}
      />

      <Typography>Payed amount</Typography>
      <TextField
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
        sx={{ width: '50%' }}
      />
    </Box>
  );
};

export default BillForm;
