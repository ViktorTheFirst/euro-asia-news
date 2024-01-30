import { Container, StyledLink } from '@/styles/globalStyles';
import styled from 'styled-components';
import { Button, ButtonGroup } from '@material-ui/core';

type MenuProps = {
  topics: string[];
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
        {topics.map((menuItem: string, index: number) => (
          <Button
            href={`/${menuItem.toLowerCase()}/`}
            key={`${index} - ${menuItem}`}
            size='large'
            component={StyledLink}
          >
            {menuItem}
          </Button>
        ))}
      </ButtonGroup>
    </MenuContainer>
  );
};

export default MainMenu;
