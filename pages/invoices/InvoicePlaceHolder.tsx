import { Container } from '@/styles/globalStyles';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const PlaceHolderContainer = styled(Container)`
  justify-content: center;
`;

const InvoicePlaceHolder = () => {
  return (
    <PlaceHolderContainer>
      <Typography>Select an Invoice to view or upload a new one</Typography>
    </PlaceHolderContainer>
  );
};

export default InvoicePlaceHolder;
