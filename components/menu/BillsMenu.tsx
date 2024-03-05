import Link from 'next/link';
import { Add } from '@mui/icons-material';
import { Box, Button, ButtonGroup } from '@mui/material';

type MenuProps = {
  topics: { title: string }[];
  onAddBillClick: (billType: string) => void;
};

const BillsMenu = ({ topics, onAddBillClick }: MenuProps) => {
  return (
    <Box
      component={Box}
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight={50}
    >
      <ButtonGroup
        orientation='vertical'
        size='large'
        color='success'
        variant='contained'
        aria-label='vertical contained primary button group'
      >
        {topics.map((menuItem: { title: string }, index: number) => {
          return (
            <Button
              href={`bills/${menuItem.title.toLowerCase()}/`}
              size='large'
              component={Link}
              key={`${index} - ${menuItem}`}
            >
              {menuItem.title}
            </Button>
          );
        })}
      </ButtonGroup>
      <ButtonGroup
        orientation='vertical'
        color='success'
        variant='contained'
        aria-label='vertical contained primary button group'
        size='large'
        sx={{ marginLeft: '10px' }}
      >
        {topics.map((menuItem: { title: string }, index: number) => {
          return (
            <Button
              href={`bills/${menuItem.title.toLowerCase()}/add-bill/`}
              size='large'
              component={Link}
              key={`${index} - ${menuItem}`}
              onClick={() => onAddBillClick(menuItem.title.toLowerCase())}
            >
              <Add sx={{ minHeight: '28px' }} />
            </Button>
          );
        })}
      </ButtonGroup>
    </Box>
  );
};

export default BillsMenu;
