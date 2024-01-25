import { Container } from '@/styles/globalStyles';
import styled from 'styled-components';
import MenuItem from './MenuItem';

type MenuProps = {
  topics: string[];
  mode: string;
};

const MenuContainer = styled(Container)`
  flex-direction: column;
  align-items: center;
  width: 60%;
`;

const MenuComponent = ({ topics, mode }: MenuProps) => {
  return (
    <MenuContainer>
      {topics.map((menuItem: string, index: number) => {
        return (
          <MenuItem
            key={`${index} - ${menuItem}`}
            name={menuItem}
            mode={mode}
          />
        );
      })}
    </MenuContainer>
  );
};

export default MenuComponent;
