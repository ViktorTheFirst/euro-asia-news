import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Box,
} from '@mui/material';

import { MOCK_MONTHS } from '@/utils/mocks';
import { Month, MonthDictionary } from '@/utils/interfaces';

interface MonthListProps {
  isListDisabled: boolean;
  preSelectedMonths?: Month[];
  disabledItems?: MonthDictionary;
  getSelectedMonths: (months: Month[]) => void;
}

const MonthListComponent = ({
  isListDisabled,
  preSelectedMonths,
  disabledItems,
  getSelectedMonths,
}: MonthListProps) => {
  const [selectedMonths, setSelectedMonths] = useState<Month[]>(
    preSelectedMonths ?? []
  );

  const handleToggle = ({ target }: any, index: number) => {
    const selected: boolean = target?.checked;

    const newSelected = [...selectedMonths];
    if (!!selected) {
      newSelected.push(MOCK_MONTHS[index]);
    }
    if (selected === false) {
      newSelected.splice(selectedMonths.indexOf(MOCK_MONTHS[index]), 1);
    }
    setSelectedMonths(newSelected);
    getSelectedMonths(newSelected);
  };

  return (
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='flex-start'
      sx={{
        minWidth: '465px',
        height: '60vh',
        padding: '10px',
      }}
    >
      <List
        sx={{
          width: '210px',
          height: '38vh',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          margin: '0 20px',
        }}
      >
        {MOCK_MONTHS.map((month, index) => {
          const labelId = `checkbox-list-label-${month}`;

          return (
            <ListItem
              key={month}
              role={undefined}
              dense
              button
              disabled={isListDisabled || disabledItems?.[month]}
              onClick={(val) => handleToggle(val, index)}
              divider
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
    </Box>
  );
};

export default MonthListComponent;
