// our-domain.com/bills/[billType]/edit-bill
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Button, Divider } from '@material-ui/core';

import { Container, Row, StyledTypography } from '@/styles/globalStyles';
import MonthListComponent from '@/components/list/MonthList';
import BillForm from '@/components/forms/BillForm';
import { getSelectedBill, setSelectedBillInfoAction } from '@/store/Bills';
import { Month } from '@/utils/interfaces';
import { editBillAPI } from '@/api/bills/billsAPI';
import { getToken } from '@/store/Auth';

const EditBillContainer = styled(Container)`
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: ${(props) => 100 - props.theme.appBarHeight}vh;
`;

const StyledRow = styled(Row)`
  min-height: 50vh;
  justify-content: space-around;
`;

const ButtonsContainer = styled(Container)`
  flex-direction: row;
  width: 80%;
  justify-content: flex-end;
`;

const EditBillComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const selectedBill = useSelector(getSelectedBill);
  const token = useSelector(getToken);

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
    <EditBillContainer>
      <StyledTypography variant='h5'>Edit bill</StyledTypography>
      <StyledRow>
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
      </StyledRow>
      <ButtonsContainer>
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
        >
          Submit
        </Button>
      </ButtonsContainer>
    </EditBillContainer>
  );
};

export default EditBillComponent;
