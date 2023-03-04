import { StyledLink } from '@/styles/globalStyles';
import styled from 'styled-components';

type MenuItemProps = {
  name: string;
  mode: string;
};

const MenuLink = styled(StyledLink)<{ mode: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ mode }) =>
    mode === 'main-menu' ? 'coral' : '#1c8f7f'};
  width: 80%;
  height: 50px;
  border: 2px black solid;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
  color: white;
  font-size: 20px;
  font-weight: bolder;
`;

const MenuItemComponent = ({ name, mode }: MenuItemProps) => {
  // when rendering bills menu add bills to url
  const getHref = () => {
    if (mode === 'main-menu') return `/${name.toLowerCase()}`;
    else return `/bills/${name.toLowerCase()}`;
  };

  return (
    <MenuLink mode={mode} href={getHref()}>
      {name}
    </MenuLink>
  );
};

export default MenuItemComponent;
