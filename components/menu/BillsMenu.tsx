import { Container, StyledLink } from '@/styles/globalStyles';
import styled from 'styled-components';
import { Button, ButtonGroup, Icon } from '@material-ui/core';
import { Add } from '@material-ui/icons';

type MenuProps = {
  topics: string[];
  onAddBillClick: (billType: string) => void;
};

const MenuContainer = styled(Container)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 60%;
  padding: 8px;
`;

const AddButtonGroup = styled(ButtonGroup)`
  margin-left: 8px;
  & .MuiButtonGroup-grouped {
    min-height: 44px;
  }
`;

const BillsMenu = ({ topics, onAddBillClick }: MenuProps) => {
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
            >
              {menuItem}
            </Button>
          );
        })}
      </ButtonGroup>
      <AddButtonGroup
        orientation='vertical'
        color='primary'
        aria-label='vertical contained primary button group'
      >
        {topics.map((menuItem: string, index: number) => {
          return (
            <Button
              href={`bills/${menuItem.toLowerCase()}/add-bill/`}
              size='large'
              component={StyledLink}
              key={`${index} - ${menuItem}`}
              onClick={() => onAddBillClick(menuItem.toLowerCase())}
            >
              <Add />
            </Button>
          );
        })}
      </AddButtonGroup>
    </MenuContainer>
  );
};

export default BillsMenu;
