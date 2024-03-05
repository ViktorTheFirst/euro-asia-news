// our-domain.com/bills/[billType]
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import {
  Box,
  Grid,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import MonthBox from '@/components/monthBox/MonthBox';
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

  const handleSelectChange = (event: SelectChangeEvent<any>) => {
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
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      justifyContent='space-evenly'
      alignItems='center'
      sx={{ height: (theme) => `calc(100vh - ${theme.appBarHeight}vh)` }}
    >
      <Box
        component={Box}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Typography>Year:</Typography>
        <Select
          native
          value={selectedBill.year}
          onChange={handleSelectChange}
          sx={{ marginLeft: '20px ' }}
        >
          {MOCK_YEARS_OPTIONS.map((option: SelectOption, index: number) => (
            <option key={`${option.value} - ${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Box>
      <Grid
        container
        justifyContent='center'
        spacing={2}
        display='flex'
        sx={{ justifyContent: 'center' }}
      >
        {MOCK_MONTHS.map((month) => (
          <Grid
            key={month}
            item
            md={3}
            display='flex'
            sx={{ justifyContent: 'center' }}
          >
            <MonthBox
              month={month}
              billData={extractBillInfoByMonth(month, billsDataPerYear)}
              onEditBill={onEditBill}
              onDeleteBill={onDeleteBill}
            />
          </Grid>
        ))}
      </Grid>
      {isDeleteModalOpen && (
        <DeleteItemModal
          isModalOpen={isDeleteModalOpen}
          itemType='bill'
          onDelete={handleDeleteClickInModal}
          onClose={handleCncelDeletionInModal}
        />
      )}
    </Box>
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
