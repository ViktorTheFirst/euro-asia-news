import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Paper } from '@mui/material';

import { Container, StyledTypography } from '@/styles/globalStyles';
import { Month, MonthInfo } from '@/utils/interfaces';

const StyledPaper = styled(Paper)`
  width: 160px;
  height: 160px;
`;
/* <{ billPayed: boolean }> */
const ContentContainer = styled(Container)`
  flex-direction: column;
  align-items: center;
  background-color: '#41e72b97';
  height: 100%;
`;
/* background-color: ${({ billPayed }) =>
    billPayed ? '#41e72b97' : '#d1373796'}; */

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
            onClick={() => onDeleteBill(month)}
          >
            DELETE
          </Button>
        </ButtonsContainer>
      );
    }
    return (
      <>
        {billData.confirmationNumber && (
          <>
            <StyledTypography gutterBottom>Confirmation #</StyledTypography>
            <StyledTypography>{billData.confirmationNumber}</StyledTypography>
          </>
        )}
        {billData.payedAmount && (
          <>
            <StyledTypography gutterBottom>Payed amount</StyledTypography>
            <StyledTypography>{`${billData.payedAmount}\u20aa`}</StyledTypography>
          </>
        )}
      </>
    );
  }, [isHovering, billData, router.query.billType, onDeleteBill, onEditBill]);

  return (
    <StyledPaper
      square
      elevation={5}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <ContentContainer /* billPayed={!!billData} */>
        <StyledTypography variant='h6' gutterBottom>
          {month}
        </StyledTypography>
        {renderContent}
      </ContentContainer>
    </StyledPaper>
  );
};

export default MonthBox;
