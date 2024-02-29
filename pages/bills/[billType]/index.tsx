// our-domain.com/bills/[billType]
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { Grid, Select } from '@material-ui/core';

import MonthBox from '@/components/monthBox/MonthBox';
import { Container, StyledTypography } from '@/styles/globalStyles';
import {
  extractBillInfoByMonth,
  extractRelatedMonthInBundle,
} from '@/utils/functions';
import { BillInfo, Month, SelectOption } from '@/utils/interfaces';
import { MOCK_MONTHS, MOCK_YEARS_OPTIONS } from '@/utils/mocks';
import {
  setSelectedBillInfoAction,
  getSelectedBill,
  setBillsByTypeAction,
} from '@/store/Bills';
import { deleteBillByIdAPI, getBillsByTypeAPI } from '@/api/bills/billsAPI';
import DeleteItemModal from '@/components/modal/DeleteItemModal';

const ViewBillsContainer = styled(Container)`
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: ${(props) => 100 - props.theme.appBarHeight}vh;
  overflow: hidden;
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
  & .MuiGrid-spacing {
    max-width: 60%;
  }
  & .MuiGrid-item {
    display: flex;
    justify-content: center;
  }
`;

const StyledSelect = styled(Select)`
  margin-left: 20px;
`;

interface ViewBillsProps {
  billsByType: BillInfo[];
}

const ViewBillsPage = ({ billsByType }: ViewBillsProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const selectedBill = useSelector(getSelectedBill);

  useEffect(() => {
    dispatch(setBillsByTypeAction(billsByType));

    dispatch(
      setSelectedBillInfoAction({
        ...selectedBill,
        year: selectedBill.year || new Date().getFullYear().toString(),
        billType: router.query.billType as string,
      })
    );
  }, [dispatch]);

  const handleSelectChange = (event: ChangeEvent<any>) => {
    dispatch(
      setSelectedBillInfoAction({ ...selectedBill, year: event.target.value })
    );
  };

  const billsDataPerYear = useMemo(() => {
    return billsByType.filter(
      (bill: BillInfo) =>
        bill.year === selectedBill.year &&
        bill.billType === selectedBill.billType
    );
  }, [selectedBill, billsByType]);

  const onEditBill = (monthToEdit: Month) => {
    const monthsInBundle = extractRelatedMonthInBundle(
      monthToEdit,
      billsDataPerYear
    );

    const selectedBill = billsDataPerYear.find(
      (bill) => bill.months === monthsInBundle
    );
    selectedBill && dispatch(setSelectedBillInfoAction(selectedBill));
  };

  const onDeleteBill = (monthToDelete: Month) => {
    const billIdTodelete = extractBillInfoByMonth(
      monthToDelete,
      billsDataPerYear
    )?._id;

    const selectedBill = billsDataPerYear.find(
      (bill) => bill._id === billIdTodelete
    );
    selectedBill && dispatch(setSelectedBillInfoAction(selectedBill));
    setIsDeleteModalOpen(true);
  };

  const handleDeleteClickInModal = async () => {
    await deleteBillByIdAPI(selectedBill._id).then((result) => {
      if (result?.data._id === selectedBill._id) {
        setIsDeleteModalOpen(false);
        selectedBill &&
          dispatch(
            setSelectedBillInfoAction({
              ...selectedBill,
              _id: '',
              months: [],
              confirmationNumber: '',
              payedAmount: '',
            })
          );
        // navigate to same page so getServerSideProps will fetch updated bills
        router.push(`/bills/${router.query.billType}`);
      }
    });
  };

  const handleCncelDeletionInModal = () => {
    setIsDeleteModalOpen(false);
    selectedBill &&
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
  return (
    <ViewBillsContainer>
      <SelectYearContainer>
        <StyledTypography>Year:</StyledTypography>
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
      {isDeleteModalOpen && (
        <DeleteItemModal
          isModalOpen={isDeleteModalOpen}
          itemType='bill'
          onDelete={handleDeleteClickInModal}
          onClose={handleCncelDeletionInModal}
        />
      )}
    </ViewBillsContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;
  const params = context.params;
  const billsByType = await getBillsByTypeAPI(
    params?.billType as string,
    cookies.householdId!
  );

  return {
    props: {
      billsByType: billsByType?.data,
    },
    notFound: !billsByType,
  };
};

export default ViewBillsPage;
