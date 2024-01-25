import { Container, StyledLink } from '@/styles/globalStyles';
import List from '@material-ui/core/List';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';
import { MouseEventHandler, useState } from 'react';

const MonthListContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

interface MonthListProps {
  getSelectedMonths: (months: string[]) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '90vh',
      maxWidth: 360,
      backgroundColor: '#c2c0ff',
      margin: '0px 20px',
    },
  })
);

const MonthListComponent = ({ getSelectedMonths }: MonthListProps) => {
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const classes = useStyles();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleToggle = ({ target }: any, index: number) => {
    const selected: boolean = target?.checked;

    const newSelected = [...selectedMonths];
    if (!!selected) {
      newSelected.push(months[index]);
    }
    if (selected === false) {
      // if value exist in list, unselect it
      newSelected.splice(selectedMonths.indexOf(months[index]), 1);
    }
    setSelectedMonths(newSelected);
    getSelectedMonths(newSelected);
  };

  return (
    <MonthListContainer>
      <List className={classes.root}>
        {months.map((month, index) => {
          const labelId = `checkbox-list-label-${month}`;

          return (
            <ListItem
              key={month}
              role={undefined}
              dense
              button
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
      </List>
    </MonthListContainer>
  );
};

export default MonthListComponent;
