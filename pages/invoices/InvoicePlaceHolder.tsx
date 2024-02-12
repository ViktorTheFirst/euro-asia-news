import { Container, StyledTypography } from '@/styles/globalStyles';
import styled from 'styled-components';

const PlaceHolderContainer = styled(Container)`
  justify-content: center;
`;

const InvoicePlaceHolder = () => {
  return (
    <PlaceHolderContainer>
      <StyledTypography>
        Select an Invoice to view or upload a new one
      </StyledTypography>
    </PlaceHolderContainer>
  );
};

export default InvoicePlaceHolder;
