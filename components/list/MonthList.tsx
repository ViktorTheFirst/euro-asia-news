import { useState } from 'react';
import { Container, StyledLink } from '@/styles/globalStyles';
import List from '@material-ui/core/List';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';
import { MOCK_MONTHS } from '@/utils/mocks';

const MonthListContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 35%;
  background-color: #d6696981;
  margin-left: 20px;
  border-radius: 6px;
  padding: 10px;
`;

const StyledList = styled(List)`
  width: 140px;
  height: 48vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 20px;
`;

interface MonthListProps {
  getSelectedMonths: (months: string[]) => void;
  isListDisabled: boolean;
}

/* const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '140px',
      height: '48vh',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      margin: '0px 20px',
    },
  })
); */

const MonthListComponent = ({
  getSelectedMonths,
  isListDisabled,
}: MonthListProps) => {
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const handleToggle = ({ target }: any, index: number) => {
    const selected: boolean = target?.checked;

    const newSelected = [...selectedMonths];
    if (!!selected) {
      newSelected.push(MOCK_MONTHS[index]);
    }
    if (selected === false) {
      // if value exist in list, unselect it
      newSelected.splice(selectedMonths.indexOf(MOCK_MONTHS[index]), 1);
    }
    setSelectedMonths(newSelected);
    getSelectedMonths(newSelected);
  };

  return (
    <MonthListContainer>
      <StyledList>
        {MOCK_MONTHS.map((month, index) => {
          const labelId = `checkbox-list-label-${month}`;

          return (
            <ListItem
              key={month}
              role={undefined}
              dense
              button
              disabled={isListDisabled}
              onClick={(val) => handleToggle(val, index)}
            >
              <ListItemIcon>
                <Checkbox
                  edge='start'
                  checked={selectedMonths.includes(month)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={month} />
            </ListItem>
          );
        })}
      </StyledList>
    </MonthListContainer>
  );
};

export default MonthListComponent;
