import Link from 'next/link';
import { Box, Button, ButtonGroup } from '@mui/material';

type MenuProps = {
  topics: { title: string }[];
};

const MainMenu = ({ topics }: MenuProps) => {
  return (
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <ButtonGroup
        orientation='vertical'
        color='primary'
        aria-label='vertical contained primary button group'
        size='large'
      >
        {topics.map((menuItem: { title: string }, index: number) => (
          <Button
            href={`/${menuItem.title.toLowerCase()}/`}
            key={`${index} - ${menuItem}`}
            size='large'
            component={Link}
          >
            {menuItem.title}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default MainMenu;
