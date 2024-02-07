// our-domain.com/bills/[billType]/edit-bill
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Button, Typography } from '@material-ui/core';

import { Container, Row } from '@/styles/globalStyles';
import MonthListComponent from '@/components/list/MonthList';
import BillForm from '@/components/forms/BillForm';
import { getSelectedBill, setSelectedBillInfo } from '@/store/Bills';
import { Month } from '@/utils/interfaces';

const EditBillContainer = styled(Container)`
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: ${(props) => 100 - props.theme.appBarHeight}vh;
  background-color: pink;
`;

const StyledRow = styled(Row)`
  min-height: 50vh;
  justify-content: space-around;
`;

const ButtonsContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: flex-end;
`;

const EditBillComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const selectedBill = useSelector(getSelectedBill);

  /* useEffect(() => {
    fetch('http://localhost:5000/api/bills/water/').then((res) =>
      console.log('res', res)
    );
  }, []); */

  const handleSelectedMonths = (months: Month[]) => {
    dispatch(setSelectedBillInfo({ ...selectedBill, months }));
  };

  const handleConfirmationNumberChange = (event: any) => {
    dispatch(
      setSelectedBillInfo({
        ...selectedBill,
        confirmationNumber: event.target.value,
      })
    );
  };

  const handlePayedAmountChange = (event: any) => {
    dispatch(
      setSelectedBillInfo({
        ...selectedBill,
        payedAmount: event.target.value,
      })
    );
  };

  const cancelButtonHandler = () => {
    dispatch(
      setSelectedBillInfo({
        ...selectedBill,
        id: '',
        months: [],
        confirmationNumber: '',
        payedAmount: '',
      })
    );
  };

  const submitButtonHandler = () => {
    // TODO: send selected bill from redux to BE
  };

  console.log('router', router);
  return (
    <EditBillContainer>
      <Typography variant='h5'>Edit bill</Typography>
      <StyledRow>
        <MonthListComponent
          isListDisabled={false}
          preSelectedMonths={selectedBill.months}
          getSelectedMonths={handleSelectedMonths}
        />

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
