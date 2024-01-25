import { Container } from '@/styles/globalStyles';
import styled from 'styled-components';
import { navBarHeight } from '@/utils/constants';
import CategoriesAccordion from '@/components/accordion/Accordion';
import { Button, Typography } from '@material-ui/core';
import { MOCK_CATEGORIES_DATA } from '@/utils/mocks';
import InvoicePlaceHolder from './InvoicePlaceHolder';
import { useState } from 'react';
import { InvoiceData } from '@/utils/interfaces';

// our-domain.com/invoices
const InvoicesContainer = styled(Container)<{ barheight: number }>`
  height: ${({ barheight }) => 100 - barheight}vh;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const LeftSide = styled(Container)`
  height: 100%;
  width: 100%;
  padding: 8px;
  flex-direction: column;
`;

const RightSide = styled(Container)`
  height: 100%;
  width: 100%;
  padding: 8px;
  background-color: #f05d5d;
  align-items: center;
`;

const CategoriesContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  background-color: #92e778;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 3;
`;

const UploadInvoiceContainer = styled(Container)`
  background-color: #a7c20d;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const InvoicesPage = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(
    null
  );

  const handleSelectedInvoice = (invoice: InvoiceData) => {
    setSelectedInvoice(invoice);
    console.log('handleSelectedInvoice', invoice);
  };

  return (
    <InvoicesContainer barheight={navBarHeight}>
      <LeftSide>
        <CategoriesContainer>
          <Typography>Categories</Typography>
          <CategoriesAccordion
            categoriesList={MOCK_CATEGORIES_DATA}
            getSelectedInvoice={handleSelectedInvoice}
          />
        </CategoriesContainer>
        <UploadInvoiceContainer>
          <Typography>Upload invoice</Typography>
          <Button variant='contained' color='primary'>
            Upload
          </Button>
        </UploadInvoiceContainer>
      </LeftSide>
      <RightSide>
        {selectedInvoice ? <div>SHOW PDF HERE</div> : <InvoicePlaceHolder />}
      </RightSide>
    </InvoicesContainer>
  );
};

export default InvoicesPage;
