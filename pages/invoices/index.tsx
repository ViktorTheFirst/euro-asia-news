import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import CategoriesAccordion from '@/components/accordion/Accordion';
import { MOCK_CATEGORIES_DATA } from '@/utils/mocks';
import InvoicePlaceHolder from './InvoicePlaceHolder';
import { InvoiceData } from '@/utils/interfaces';
import PdfViewer from '@/components/pdfViewer/PdfViewer';

// our-domain.com/invoices
const InvoicesPage = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(
    null
  );
  const [selectedPDF, setSelectedPDF] = useState<string>('');

  const handleSelectedInvoice = (invoice: InvoiceData) => {
    setSelectedInvoice(invoice);
  };

  return (
    <Box
      component={Box}
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{
        height: (theme) => `calc(100vh - ${theme.appBarHeight}vh)`,
        width: '100%',
      }}
    >
      <Box
        component={Box}
        display='flex'
        flexDirection='column'
        sx={{
          height: '100%',
          width: '100%',
          padding: '8px',
        }}
      >
        <Box
          component={Box}
          display='flex'
          flexDirection='column'
          justifyContent='flex-start'
          alignItems='center'
          flex={3}
          sx={{
            width: '100%',
          }}
        >
          <Typography marginTop={5}>Categories</Typography>
          <CategoriesAccordion
            categoriesList={MOCK_CATEGORIES_DATA}
            getSelectedInvoice={handleSelectedInvoice}
          />
        </Box>
        <Box
          component={Box}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          flex={1}
          sx={{
            width: '100%',
          }}
        >
          <Typography>Upload invoice</Typography>
          <Button variant='contained' color='primary'>
            Upload
          </Button>
        </Box>
      </Box>
      <Box
        component={Box}
        display='flex'
        alignItems='center'
        justifyContent='center'
        sx={{
          height: '100%',
          width: '100%',
          padding: '8px',
        }}
      >
        {selectedInvoice ? (
          <PdfViewer pdfURL={selectedPDF} />
        ) : (
          <InvoicePlaceHolder />
        )}
      </Box>
    </Box>
  );
};

export default InvoicesPage;
