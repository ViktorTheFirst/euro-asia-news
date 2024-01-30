// our-domain.com/bills/[billType]
import MonthListComponent from '@/components/list/MonthList';
import { Container, StyledForm } from '@/styles/globalStyles';
import { navBarHeight } from '@/utils/constants';
import { onFormSubmit } from '@/utils/functions';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const AddBillContainer = styled(Container)<{ barheight: number }>`
  align-items: center;
  justify-content: center;
  height: ${({ barheight }) => 100 - barheight}vh;
  background-color: pink;
`;

const FormContainer = styled(StyledForm)`
  width: 100%;
  background-color: #28a6cc;
  height: 50vh;
  padding: 10px;
  margin: 0 70px;
`;

const AddBillPage = () => {
  const router = useRouter();
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const handleSubmit = (event: any) => {
    const values = onFormSubmit(event);
  };

  const handleSelectedMonths = (months: string[]) => {
    setSelectedMonths(months);
  };

  return (
    <AddBillContainer barheight={navBarHeight}>
      <MonthListComponent getSelectedMonths={handleSelectedMonths} />
      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor='meshalem'>Mispar meshalem</label>
        <input type='text' id='meshalem' name='meshalem' required />

        <label htmlFor='last'>Last Name</label>
        <input type='text' id='last' name='last' />

        <button type='submit'>Submit</button>
      </FormContainer>
    </AddBillContainer>
  );
};

export default AddBillPage;
