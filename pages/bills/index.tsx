// our-domain.com/bills
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import fs from 'fs/promises';
import path from 'path';

import BillsMenu from '@/components/menu/BillsMenu';
import { Container } from '@/styles/globalStyles';
import { getCreationBill, setCreationBillInfoAction } from '@/store/Bills';

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
}

const BillsPage = ({ topics }: BillsPageProps) => {
  const dispatch = useDispatch();
  const creationBill = useSelector(getCreationBill);

  const handleAddNewBill = (billType: string) => {
    dispatch(
      setCreationBillInfoAction({
        ...creationBill,
        billType,
        householdId: '1',
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

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'billsTopics.json');
  const jsonData = await fs.readFile(filePath, { encoding: 'utf-8' });
  const data = JSON.parse(jsonData);

  return {
    props: {
      topics: data.topics,
    },
  };
}

export default BillsPage;
