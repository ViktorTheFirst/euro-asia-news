import { Container } from '@/styles/globalStyles';
import { Month, MonthInfo } from '@/utils/interfaces';
import { Paper, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  width: 160px;
  height: 160px;
`;

const ContentContainer = styled(Container)<{ isPayed: boolean }>`
  flex-direction: column;
  align-items: center;
  background-color: ${({ isPayed }) => (isPayed ? '#41e72b97' : '#d1373796')};
  height: 100%;
`;

interface MonthBoxProps {
  month: Month;
  billData: MonthInfo;
}

const MonthBox = ({ billData, month }: MonthBoxProps) => {
  const isPayed = useMemo(() => {
    return !!billData.payedAmount;
  }, [billData.payedAmount]);

  return (
    <StyledPaper square elevation={5}>
      <ContentContainer isPayed={isPayed}>
        <Typography variant='h6' gutterBottom>
          {month}
        </Typography>
        {isPayed && (
          <>
            <Typography gutterBottom>Confirmation #</Typography>
            <Typography>{billData.confirmationNumber}</Typography>
            <Typography gutterBottom>Payed amount</Typography>
            <Typography>{`${billData.payedAmount}\u20aa`}</Typography>
          </>
        )}
      </ContentContainer>
    </StyledPaper>
  );
};

export default MonthBox;
