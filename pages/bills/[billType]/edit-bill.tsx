// our-domain.com/bills/[billType]/edit-bill
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Divider, Typography } from '@mui/material';

import MonthListComponent from '@/components/list/MonthList';
import BillForm from '@/components/form/BillForm';
import { getSelectedBill, setSelectedBillInfoAction } from '@/store/Bills';
import { Month } from '@/utils/interfaces';
import { editBillAPI } from '@/api/bills/billsAPI';

const EditBillComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedBill = useSelector(getSelectedBill);

  const handleSelectedMonths = (months: Month[]) => {
    dispatch(setSelectedBillInfoAction({ ...selectedBill, months }));
  };

  const handleConfirmationNumberChange = (event: any) => {
    dispatch(
      setSelectedBillInfoAction({
        ...selectedBill,
        confirmationNumber: event.target.value,
      })
    );
  };

  const handlePayedAmountChange = (event: any) => {
    dispatch(
      setSelectedBillInfoAction({
        ...selectedBill,
        payedAmount: event.target.value,
      })
    );
  };

  const cancelButtonHandler = () => {
    dispatch(
      setSelectedBillInfoAction({
        ...selectedBill,
        _id: '',
        months: [],
        confirmationNumber: '',
        payedAmount: '',
      })
    );
  };

  const submitButtonHandler = () => {
    editBillAPI(selectedBill);
  };

  return (
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      justifyContent='space-evenly'
      alignItems='center'
      sx={{ height: (theme) => `calc(100vh - ${theme.appBarHeight}vh)` }}
    >
      <Typography variant='h5'>Edit bill</Typography>
      <Box
        component={Box}
        display='flex'
        justifyContent='space-around'
        sx={{ minHeight: '50vh', width: '100%' }}
      >
        <MonthListComponent
          isListDisabled={false}
          preSelectedMonths={selectedBill.months}
          getSelectedMonths={handleSelectedMonths}
        />
        <Divider orientation='vertical' flexItem />
        <BillForm
          confirmationNumber={selectedBill.confirmationNumber}
          payedAmount={selectedBill.payedAmount}
          isInputsDisabled={false}
          confNumberChangeHandler={handleConfirmationNumberChange}
          payedAmountChangeHandler={handlePayedAmountChange}
        />
      </Box>
      <Box
        component={Box}
        display='flex'
        justifyContent='flex-end'
        sx={{ width: '80%' }}
      >
        <Button
          href={`/bills/${router.query.billType}/`}
          key='cancel edit'
          component={Link}
          variant='contained'
          color='secondary'
          onClick={cancelButtonHandler}
        >
          Cancel
        </Button>
        <Button
          key='submit edit'
          component={Link}
          href={`/bills/${router.query.billType}/`}
          variant='contained'
          color='primary'
          onClick={submitButtonHandler}
          sx={{ marginLeft: '10px' }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default EditBillComponent;
