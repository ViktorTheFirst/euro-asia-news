// our-domain.com/bills
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import fs from 'fs/promises';
import path from 'path';

import BillsMenu from '@/components/menu/BillsMenu';
import { Container } from '@/styles/globalStyles';
import { getCreationBill, setCreationBillInfoAction } from '@/store/Bills';
import { getHouseholdId, setHouseholdIdAction } from '@/store/Auth';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

const BillsContainer = styled(Container)`
  height: ${(props) => 100 - props.theme.appBarHeight}vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #7ff3bd;
  width: 100%;
`;

interface BillsPageProps {
  topics: { title: string }[];
  sessionHouseholdId?: string;
}

const BillsPage = ({ topics, sessionHouseholdId }: BillsPageProps) => {
  const dispatch = useDispatch();
  const creationBill = useSelector(getCreationBill);
  const householdId = useSelector(getHouseholdId);

  useEffect(() => {
    if (sessionHouseholdId && !householdId)
      dispatch(setHouseholdIdAction(sessionHouseholdId));
  }, [sessionHouseholdId, householdId, dispatch]);

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
  const cookies = context.req.cookies;
  const filePath = path.join(process.cwd(), 'data', 'billsTopics.json');
  const jsonData = await fs.readFile(filePath, { encoding: 'utf-8' });
  const data = JSON.parse(jsonData);

  return {
    props: {
      topics: data.topics,
      sessionHouseholdId: cookies.householdId,
    },
  };
};

/* export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'billsTopics.json');
  const jsonData = await fs.readFile(filePath, { encoding: 'utf-8' });
  const data = JSON.parse(jsonData);

  return {
    props: {
      topics: data.topics,
    },
  };
} */

export default BillsPage;
