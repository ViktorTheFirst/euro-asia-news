import { Box, Typography } from '@mui/material';

const InvoicePlaceHolder = () => {
  return (
    <Box component={Box} display='flex' justifyContent='center'>
      <Typography>Select an Invoice to view or upload a new one</Typography>
    </Box>
  );
};

export default InvoicePlaceHolder;
