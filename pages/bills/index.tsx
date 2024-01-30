// our-domain.com/bills
import BillsMenu from '@/components/menu/BillsMenu';
import { Container } from '@/styles/globalStyles';
import { MOCK_BILLS_TOPICS } from '@/utils/mocks';
import styled from 'styled-components';

const BillsContainer = styled(Container)`
  height: ${(props) => 100 - props.theme.appBarHeight}vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: pink;
  width: 100%;
`;

const BillsPage = () => {
  return (
    <BillsContainer>
      <BillsMenu topics={MOCK_BILLS_TOPICS} />
    </BillsContainer>
  );
};

export default BillsPage;
