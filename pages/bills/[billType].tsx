// our-domain.com/bills/[billType]
import { ChangeEvent, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, Select, Typography } from '@material-ui/core';

import MonthBox from '@/components/monthBox/MonthBox';
import { Container } from '@/styles/globalStyles';
import {
  extractBillInfoByMonth,
  extractRelatedMonthInBundle,
} from '@/utils/functions';
import { BillInfo, Month, SelectOption } from '@/utils/interfaces';
import { MOCK_MONTHS, MOCK_YEARS_OPTIONS, MOCK_BILLS } from '@/utils/mocks';
import { setSelectedBillInfo, getSelectedBill } from '@/store/Bills';

const ViewBillsContainer = styled(Container)`
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: ${(props) => 100 - props.theme.appBarHeight}vh;
  background-color: #e9576f;
`;

const SelectYearContainer = styled(Container)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const MonthsGrid = styled(Grid)`
  & .MuiGrid-container {
    max-width: 60%;
  }
  ,
  & .MuiGrid-spacing {
    max-width: 60%;
  }
  ,
  & .MuiGrid-item {
    display: flex;
    justify-content: center;
  }
`;

const StyledSelect = styled(Select)`
  margin-left: 20px;
`;

const ViewBillsPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const selectedBill = useSelector(getSelectedBill);

  useEffect(() => {
    dispatch(
      setSelectedBillInfo({
        ...selectedBill,
        year: selectedBill.year || new Date().getFullYear().toString(),
        billType: router.query.billType as string,
      })
    );
  }, [dispatch]);

  const handleSelectChange = (event: ChangeEvent<any>) => {
    dispatch(
      setSelectedBillInfo({ ...selectedBill, year: event.target.value })
    );
  };

  const billsDataPerYear = useMemo(() => {
    return MOCK_BILLS.filter(
      (bill: BillInfo) =>
        bill.year === selectedBill.year &&
        bill.billType === selectedBill.billType
    );
  }, [selectedBill]);

  const onEditBill = (monthToEdit: Month) => {
    const monthsInBundle = extractRelatedMonthInBundle(
      monthToEdit,
      billsDataPerYear
    );

    const selectedBill = billsDataPerYear.find(
      (bill) => bill.months === monthsInBundle
    );
    selectedBill && dispatch(setSelectedBillInfo(selectedBill));
  };

  const onDeleteBill = (monthToDelete: Month) => {
    const billIdTodelete = extractBillInfoByMonth(
      monthToDelete,
      billsDataPerYear
    )?.id;
    // TODO:
    // 1. load the bill info to redux and show confirmation modal
    // 2. send request to BE in the modal
  };

  return (
    <ViewBillsContainer>
      <SelectYearContainer>
        <Typography>Year:</Typography>
        <StyledSelect
          native
          value={selectedBill.year}
          onChange={handleSelectChange}
        >
          {MOCK_YEARS_OPTIONS.map((option: SelectOption, index: number) => (
            <option key={`${option.value} - ${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </SelectYearContainer>
      <MonthsGrid container justifyContent='center' spacing={2}>
        {MOCK_MONTHS.map((month) => (
          <Grid key={month} item md={3}>
            <MonthBox
              month={month}
              billData={extractBillInfoByMonth(month, billsDataPerYear)}
              onEditBill={onEditBill}
              onDeleteBill={onDeleteBill}
            />
          </Grid>
        ))}
      </MonthsGrid>
    </ViewBillsContainer>
  );
};

export default ViewBillsPage;
