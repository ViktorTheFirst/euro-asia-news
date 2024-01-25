import { Container } from '@/styles/globalStyles';
import { CategoriesData, InvoiceData } from '@/utils/interfaces';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';

const AccordionContainer = styled(Container)`
  background-color: #ec7e17;
  flex-direction: column;
  padding: 10px;
`;

const InvoiceListContainer = styled(Container)`
  flex-direction: column;
`;

const InvoiceItem = styled(Typography)`
  cursor: pointer;
`;

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
    <AccordionContainer>
      {categoriesList.map((category: CategoriesData, index: number) => {
        return (
          <Accordion key={`${category.title} - ${index}`}>
            <AccordionSummary>
              <Typography>{category.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InvoiceListContainer>
                {category.items.map((invoice: InvoiceData) => (
                  <InvoiceItem
                    key={invoice.id}
                    onClick={(e) => handleInvoiceSelection(e, invoice)}
                  >
                    {invoice.title}
                  </InvoiceItem>
                ))}
              </InvoiceListContainer>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </AccordionContainer>
  );
};

export default CategoriesAccordion;

/* 
<Accordion>
        <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
          <Typography >Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
*/
