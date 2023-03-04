// our-domain.com/bills/[billType]
import MonthListComponent from '@/components/list/MonthList';
import { Container, StyledForm } from '@/styles/globalStyles';
import { navBarHeight } from '@/utils/constants';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const AddBillContainer = styled(Container)<{ barheight: number }>`
  align-items: center;
  justify-content: center;
  height: ${({ barheight }) => 100 - barheight}vh;
  background-color: pink;
`;

const FormContainer = styled(StyledForm)`
  width: 50%;
  background-color: #28a6cc;
  height: 50vh;
  padding: 10px;
`;

const AddBillPage = () => {
  const router = useRouter();
  const routeName = router.query.billType;
  console.log('router.query.billType', router.query.billType);

  const handleSubmit = () => {};

  return (
    <AddBillContainer barheight={navBarHeight}>
      <MonthListComponent />
      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor='meshalem'>Mispar meshalem</label>
        <input type='text' id='meshalem' name='meshalem' />

        <label htmlFor='last'>Last Name</label>
        <input type='text' id='last' name='last' />

        <button type='submit'>Submit</button>
      </FormContainer>
    </AddBillContainer>
  );
};

export default AddBillPage;
