// our-domain.com/bills/[billType]/edit-bill
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Container, Row } from '@/styles/globalStyles';
import MonthListComponent from '@/components/list/MonthList';
import BillForm from '@/components/forms/BillForm';
import { getSelectedBill, setSelectedBillInfo } from '@/store/Bills';
import { Month } from '@/utils/interfaces';

const EditBillContainer = styled(Container)`
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: ${(props) => 100 - props.theme.appBarHeight}vh;
  background-color: pink;
`;

const StyledRow = styled(Row)`
  min-height: 50vh;
  justify-content: space-around;
`;

const EditBillComponent = () => {
  const dispatch = useDispatch();

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

  return (
    <EditBillContainer>
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
    </EditBillContainer>
  );
};

export default EditBillComponent;
