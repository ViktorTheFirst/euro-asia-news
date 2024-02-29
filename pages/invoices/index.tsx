import { Container, StyledTypography } from '@/styles/globalStyles';
import styled from 'styled-components';
import CategoriesAccordion from '@/components/accordion/Accordion';
import { Button } from '@material-ui/core';
import { MOCK_CATEGORIES_DATA } from '@/utils/mocks';
import InvoicePlaceHolder from './InvoicePlaceHolder';
import { useEffect, useState } from 'react';
import { InvoiceData } from '@/utils/interfaces';
import PdfViewer from '@/components/pdfViewer/PdfViewer';

// our-domain.com/invoices
const InvoicesContainer = styled(Container)`
  height: ${(props) => 100 - 7 /* props.theme.appBarHeight */}vh;
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
  align-items: center;
`;

const CategoriesContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 3;
`;

const UploadInvoiceContainer = styled(Container)`
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
  const [selectedPDF, setSelectedPDF] = useState<string>('');

  const handleSelectedInvoice = (invoice: InvoiceData) => {
    setSelectedInvoice(invoice);
  };

  return (
    <InvoicesContainer>
      <LeftSide>
        <CategoriesContainer>
          <StyledTypography>Categories</StyledTypography>
          <CategoriesAccordion
            categoriesList={MOCK_CATEGORIES_DATA}
            getSelectedInvoice={handleSelectedInvoice}
          />
        </CategoriesContainer>
        <UploadInvoiceContainer>
          <StyledTypography>Upload invoice</StyledTypography>
          <Button variant='contained' color='primary'>
            Upload
          </Button>
        </UploadInvoiceContainer>
      </LeftSide>
      <RightSide>
        {selectedInvoice ? (
          <PdfViewer pdfURL={selectedPDF} />
        ) : (
          <InvoicePlaceHolder />
        )}
      </RightSide>
    </InvoicesContainer>
  );
};

export default InvoicesPage;
