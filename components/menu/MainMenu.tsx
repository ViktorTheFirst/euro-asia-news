import Link from 'next/link';
import styled from 'styled-components';
import { Button, ButtonGroup } from '@material-ui/core';

import { Container } from '@/styles/globalStyles';

type MenuProps = {
  topics: { title: string }[];
};

const MenuContainer = styled(Container)`
  flex-direction: column;
  align-items: center;
  width: 60%;
`;

const MainMenu = ({ topics }: MenuProps) => {
  return (
    <MenuContainer>
      <ButtonGroup
        orientation='vertical'
        color='primary'
        aria-label='vertical contained primary button group'
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
    </MenuContainer>
  );
};

export default MainMenu;
