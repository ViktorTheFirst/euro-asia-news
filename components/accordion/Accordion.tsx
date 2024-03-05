import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';

import { CategoriesData, InvoiceData } from '@/utils/interfaces';

interface AccordionProps {
  categoriesList: CategoriesData[];
  getSelectedInvoice: (invoice: InvoiceData) => void;
}
const CategoriesAccordion = ({
  categoriesList,
  getSelectedInvoice,
}: AccordionProps) => {
  const handleInvoiceSelection = (event: any, invoice: InvoiceData) => {
    getSelectedInvoice(invoice);
  };

  return (
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      padding={8}
      sx={{ width: '100%' }}
    >
      {categoriesList.map((category: CategoriesData, index: number) => {
        return (
          <Accordion key={`${category.title} - ${index}`}>
            <AccordionSummary>
              <Typography>{category.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                component={Box}
                display='flex'
                flexDirection='column'
                sx={{ width: '100%' }}
              >
                {category.items.map((invoice: InvoiceData) => (
                  <Typography
                    sx={{ cursor: 'pointer' }}
                    key={invoice.id}
                    onClick={(e: any) => handleInvoiceSelection(e, invoice)}
                  >
                    {invoice.title}
                  </Typography>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default CategoriesAccordion;
