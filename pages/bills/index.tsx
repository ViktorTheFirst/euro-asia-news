// our-domain.com/bills
import MenuComponent from '@/components/menu/Menu';
import { Container } from '@/styles/globalStyles';
import { navBarHeight } from '@/utils/constants';
import { MOCK_BILLS_TOPICS } from '@/utils/mocks';
import styled from 'styled-components';

const BillsContainer = styled(Container)<{ barheight: number }>`
  height: ${({ barheight }) => 100 - barheight}vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: pink;
  width: 100%;
`;

const BillsPage = () => {
  return (
    <BillsContainer barheight={navBarHeight}>
      <MenuComponent mode='bills-menu' topics={MOCK_BILLS_TOPICS} />
    </BillsContainer>
  );
};

export default BillsPage;
