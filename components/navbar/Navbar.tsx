import { Container, StyledLink } from '@/styles/globalStyles';
import styled from 'styled-components';
import { navBarHeight } from '@/utils/constants';
import { useRouter } from 'next/router';
import { getNavbarHeader, isEmptyObject } from '@/utils/functions';
import { useMemo } from 'react';

type NavbarProps = {};

const NavbarContainer = styled(Container)<{ barheight: number }>`
  flex-direction: row;
  background-color: coral;
  height: ${({ barheight }) => barheight}vh;
  justify-content: center;
  align-items: center;
`;

const NavbarLink = styled(StyledLink)<{ barheight: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 20px;
  padding: 10px;
  margin-right: 150px;
  color: white;
  font-size: 20px;
  font-weight: bolder;
  position: absolute;
  top: ${({ barheight }) => barheight / 3}vh;
  left: 50px;
`;

const NavbarComponent = (props: NavbarProps) => {
  const router = useRouter();

  const routeString = useMemo(() => {
    return isEmptyObject(router.query)
      ? router.route
      : (router.query.billType as string);
  }, [router]);

  return (
    <NavbarContainer barheight={navBarHeight}>
      <NavbarLink barheight={navBarHeight} href={'/'}>
        Home
      </NavbarLink>
      <div>{getNavbarHeader(routeString)}</div>
    </NavbarContainer>
  );
};

export default NavbarComponent;
