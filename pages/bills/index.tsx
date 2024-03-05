// our-domain.com/bills
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { Box } from '@mui/material';

import BillsMenu from '@/components/menu/BillsMenu';
import { getCreationBill, setCreationBillInfoAction } from '@/store/Bills';
import { getHouseholdId } from '@/store/Auth';

interface BillsPageProps {
  topics: { title: string }[];
  sessionHouseholdId?: string;
}

const BillsPage = ({ topics }: BillsPageProps) => {
  const dispatch = useDispatch();
  const creationBill = useSelector(getCreationBill);
  const householdId = useSelector(getHouseholdId);

  const handleAddNewBill = (billType: string) => {
    dispatch(
      setCreationBillInfoAction({
        ...creationBill,
        billType,
        householdId,
        year: new Date().getFullYear().toString(),
      })
    );
  };

  return (
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      sx={{
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.appBarHeight}vh)`,
      }}
    >
      <BillsMenu topics={topics} onAddBillClick={handleAddNewBill} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const filePath = path.join(process.cwd(), 'data', 'billsTopics.json');
  const jsonData = await fs.readFile(filePath, { encoding: 'utf-8' });
  const data = JSON.parse(jsonData);

  return {
    props: {
      topics: data.topics,
    },
  };
};

export default BillsPage;
