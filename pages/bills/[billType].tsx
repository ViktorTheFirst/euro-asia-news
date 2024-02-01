// our-domain.com/bills/[billType]
import MonthBox from '@/components/monthBox/MonthBox';
import { Container, StyledForm } from '@/styles/globalStyles';
import { SelectOption } from '@/utils/interfaces';
import {
  MOCK_BILLS_INFO_PER_YEAR,
  MOCK_MONTHS,
  MOCK_YEARS_OPTIONS,
} from '@/utils/mocks';
import { Grid, Paper, Select, Typography } from '@material-ui/core';

import { useRouter } from 'next/router';
import { ChangeEvent, useMemo, useState } from 'react';
import styled from 'styled-components';

const ViewBillsContainer = styled(Container)`
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: ${(props) => 100 - props.theme.appBarHeight}vh;
  background-color: #e9576f;
`;

const SelectYearContainer = styled(Container)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const MonthsGrid = styled(Grid)`
  & .MuiGrid-container {
    max-width: 60%;
  }
  ,
  & .MuiGrid-spacing {
    max-width: 60%;
  }
  ,
  & .MuiGrid-item {
    display: flex;
    justify-content: center;
  }
`;

const StyledSelect = styled(Select)`
  margin-left: 20px;
`;

const ViewBillsPage = () => {
  const [selectedYear, setSelectedYear] = useState<SelectOption>({
    value: '2024',
    label: '2024',
  });
  const router = useRouter();
  const handleSelectChange = (event: ChangeEvent<any>) => {
    setSelectedYear(
      MOCK_YEARS_OPTIONS.find((year) => year.value === event.target.value) || {
        label: 'None',
        value: '',
      }
    );
  };

  const yearlyBillsData = useMemo(() => {
    return MOCK_BILLS_INFO_PER_YEAR[selectedYear.value];
  }, [selectedYear]);

  return (
    <ViewBillsContainer>
      <SelectYearContainer>
        <Typography>Year:</Typography>
        <StyledSelect
          native
          value={selectedYear.label}
          onChange={handleSelectChange}
        >
          {MOCK_YEARS_OPTIONS.map((option: SelectOption, index: number) => (
            <option key={`${option.value} - ${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </SelectYearContainer>
      <MonthsGrid container justifyContent='center' spacing={2}>
        {MOCK_MONTHS.map((month) => (
          <Grid key={month} item md={3}>
            <MonthBox month={month} billData={yearlyBillsData[month]} />
          </Grid>
        ))}
      </MonthsGrid>
    </ViewBillsContainer>
  );
};

export default ViewBillsPage;
