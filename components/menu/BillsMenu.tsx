import Link from 'next/link';
import styled from 'styled-components';
import { Add } from '@material-ui/icons';
import { Button, ButtonGroup } from '@material-ui/core';

import { Container } from '@/styles/globalStyles';

type MenuProps = {
  topics: { title: string }[];
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
      <AddButtonGroup
        orientation='vertical'
        color='primary'
        aria-label='vertical contained primary button group'
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
              <Add />
            </Button>
          );
        })}
      </AddButtonGroup>
    </MenuContainer>
  );
};

export default BillsMenu;
