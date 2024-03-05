import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Paper, Typography } from '@mui/material';

import { Month, MonthInfo } from '@/utils/interfaces';

interface MonthBoxProps {
  month: Month;
  billData?: MonthInfo;
  onEditBill: (monthToEdit: Month) => void;
  onDeleteBill: (monthToDelete: Month) => void;
}

const MonthBox = ({
  billData,
  month,
  onEditBill,
  onDeleteBill,
}: MonthBoxProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();

  const renderContent: JSX.Element | null = useMemo(() => {
    if (!billData) return null;
    if (isHovering && router.query.billType) {
      return (
        <Box
          component={Box}
          display='flex'
          flexDirection='column'
          justifyContent='space-evenly'
          sx={{
            width: '70%',
            height: '90%',
          }}
        >
          <Button
            key='edit-btn'
            variant='contained'
            color='primary'
            onClick={() => onEditBill(month)}
            href={`${router.query.billType}/edit-bill/`}
            component={Link}
          >
            EDIT
          </Button>
          <Button
            key='delete-btn'
            variant='contained'
            color='secondary'
            onClick={() => onDeleteBill(month)}
          >
            DELETE
          </Button>
        </Box>
      );
    }
    return (
      <>
        {billData.confirmationNumber && (
          <>
            <Typography gutterBottom>Confirmation #</Typography>
            <Typography>{billData.confirmationNumber}</Typography>
          </>
        )}
        {billData.payedAmount && (
          <>
            <Typography gutterBottom>Payed amount</Typography>
            <Typography>{`${billData.payedAmount}\u20aa`}</Typography>
          </>
        )}
      </>
    );
  }, [isHovering, billData, router.query.billType, onDeleteBill, onEditBill]);

  return (
    <Paper
      square
      elevation={5}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      sx={{
        width: '160px',
        height: '160px',
      }}
    >
      <Box
        component={Box}
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{
          height: '100%',
          bgcolor: !!billData ? '#41e72b97' : '#d1373796',
        }}
      >
        <Typography variant='h6' gutterBottom>
          {month}
        </Typography>
        {renderContent}
      </Box>
    </Paper>
  );
};

export default MonthBox;
