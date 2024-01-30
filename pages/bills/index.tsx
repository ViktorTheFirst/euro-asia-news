// our-domain.com/bills
import MenuComponent from '@/components/menu/Menu';
import { Container } from '@/styles/globalStyles';
import { MOCK_BILLS_TOPICS } from '@/utils/mocks';
import styled from 'styled-components';

const BillsContainer = styled(Container)`
  height: ${({ props }) => 100 - props.theme.appBarHeight}vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: pink;
  width: 100%;
`;

const BillsPage = () => {
  return (
    <BillsContainer>
      <MenuComponent mode='bills-menu' topics={MOCK_BILLS_TOPICS} />
    </BillsContainer>
  );
};

export default BillsPage;
