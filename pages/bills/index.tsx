// our-domain.com/bills
import MenuComponent from '@/components/menu/Menu';
import { Container } from '@/styles/globalStyles';
import styled from 'styled-components';

const BillsContainer = styled(Container)`
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: pink;
  width: 100%;
`;

const BillsPage = () => {
  const billsTopics = ['Water', 'Electricity', 'Arnona', 'Other'];
  return (
    <BillsContainer>
      <h2>Bills</h2>
      <MenuComponent mode='bills-menu' topics={billsTopics} />
    </BillsContainer>
  );
};

export default BillsPage;
