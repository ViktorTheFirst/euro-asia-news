import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Paper, Typography } from '@material-ui/core';

import { Container } from '@/styles/globalStyles';
import { Month, MonthInfo } from '@/utils/interfaces';

const StyledPaper = styled(Paper)`
  width: 160px;
  height: 160px;
`;

const ContentContainer = styled(Container)<{ billPayed: boolean }>`
  flex-direction: column;
  align-items: center;
  background-color: ${({ billPayed }) =>
    billPayed ? '#41e72b97' : '#d1373796'};
  height: 100%;
`;

const ButtonsContainer = styled(Container)`
  flex-direction: column;
  width: 70%;
  height: 90%;
  justify-content: space-evenly;
`;

interface MonthBoxProps {
  month: Month;
  billData?: MonthInfo;
  onEditBill: (monthToEdit: Month) => void;
}

const MonthBox = ({ billData, month, onEditBill }: MonthBoxProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();

  const renderContent: JSX.Element | null = useMemo(() => {
    if (!billData) return null;
    if (isHovering && router.query.billType) {
      return (
        <ButtonsContainer>
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
            onClick={() => console.log('DELETE BILL CLICKED')}
          >
            DELETE
          </Button>
        </ButtonsContainer>
      );
    }
    return (
      <>
        <Typography gutterBottom>Confirmation #</Typography>
        <Typography>{billData.confirmationNumber}</Typography>
        <Typography gutterBottom>Payed amount</Typography>
        <Typography>{`${billData.payedAmount}\u20aa`}</Typography>
      </>
    );
  }, [isHovering, billData, router.query.billType]);

  return (
    <StyledPaper
      square
      elevation={5}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <ContentContainer billPayed={!!billData}>
        <Typography variant='h6' gutterBottom>
          {month}
        </Typography>
        {renderContent}
      </ContentContainer>
    </StyledPaper>
  );
};

export default MonthBox;
