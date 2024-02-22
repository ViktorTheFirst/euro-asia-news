import { Container, StyledTypography } from '@/styles/globalStyles';
import { CategoriesData, InvoiceData } from '@/utils/interfaces';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import styled from 'styled-components';

const AccordionContainer = styled(Container)`
  flex-direction: column;
  padding: 10px;
`;

const InvoiceListContainer = styled(Container)`
  flex-direction: column;
`;

const InvoiceItem = styled(StyledTypography)`
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
              <StyledTypography>{category.title}</StyledTypography>
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
