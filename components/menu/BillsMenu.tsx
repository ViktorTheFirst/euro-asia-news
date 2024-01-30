import { Container, StyledLink } from '@/styles/globalStyles';
import styled from 'styled-components';
import { Button, ButtonGroup, makeStyles } from '@material-ui/core';

type MenuProps = {
  topics: string[];
};

const MenuContainer = styled(Container)`
  flex-direction: column;
  align-items: center;
  width: 60%;
`;

const BillsMenuButton = styled(Button)`
  & .MuiButton-outlinedPrimary {
    color: red;
  }
`;

const useStyles = makeStyles({
  root: {
    color: 'red',
  },
});

const BillsMenu = ({ topics }: MenuProps) => {
  const classes = useStyles();

  return (
    <MenuContainer>
      <ButtonGroup
        orientation='vertical'
        color='primary'
        aria-label='vertical contained primary button group'
      >
        {topics.map((menuItem: string, index: number) => {
          return (
            <Button
              href={`bills/${menuItem.toLowerCase()}/`}
              size='large'
              component={StyledLink}
              key={`${index} - ${menuItem}`}
              className={classes.root}
            >
              {menuItem}
            </Button>
          );
        })}
      </ButtonGroup>
    </MenuContainer>
  );
};

export default BillsMenu;
