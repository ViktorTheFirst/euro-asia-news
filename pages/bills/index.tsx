// our-domain.com/bills
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import BillsMenu from '@/components/menu/BillsMenu';
import { Container } from '@/styles/globalStyles';
import { MOCK_BILLS_TOPICS } from '@/utils/mocks';
import { getCreationBill, setCreationBillInfo } from '@/store/Bills';

const BillsContainer = styled(Container)`
  height: ${(props) => 100 - props.theme.appBarHeight}vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #7ff3bd;
  width: 100%;
`;

const BillsPage = () => {
  const dispatch = useDispatch();
  const creationBill = useSelector(getCreationBill);

  const handleAddNewBill = (billType: string) => {
    dispatch(
      setCreationBillInfo({
        ...creationBill,
        //id: uuid(),
        billType,
        year: new Date().getFullYear().toString(),
      })
    );
  };

  return (
    <BillsContainer>
      <BillsMenu topics={MOCK_BILLS_TOPICS} onAddBillClick={handleAddNewBill} />
    </BillsContainer>
  );
};

export default BillsPage;
