// our-domain.com/bills
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import fs from 'fs/promises';
import path from 'path';

import BillsMenu from '@/components/menu/BillsMenu';
import { Container } from '@/styles/globalStyles';
import { getCreationBill, setCreationBillInfoAction } from '@/store/Bills';
import { getHouseholdId } from '@/store/Auth';

const BillsContainer = styled(Container)`
  height: ${(props) => 100 - props.theme.appBarHeight}vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

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
    <BillsContainer>
      <BillsMenu topics={topics} onAddBillClick={handleAddNewBill} />
    </BillsContainer>
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
