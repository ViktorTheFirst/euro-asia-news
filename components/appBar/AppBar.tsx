import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { AppBar as MuiAppBar } from '@material-ui/core';
import { Button, Toolbar } from '@material-ui/core';

import { getNavbarHeader, isEmptyObject } from '@/utils/functions';
import { Container, StyledLink } from '@/styles/globalStyles';
import {
  resetCreationBillInfoAction,
  resetSelectedBillInfoAction,
} from '@/store/Bills';
import { setHousholdIdAction, setTokenAction } from '@/store/Auth';

const AppBarContainer = styled(Container)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.theme.appBarHeight}vh;
`;

const StyledAppBar = styled(MuiAppBar)`
  & .MuiToolbar-regular {
    min-height: ${(props) => props.theme.appBarHeight}vh;
    display: flex;
    justify-content: space-between;
  }
`;

const AppBarLink = styled(StyledLink)`
  cursor: pointer;
`;

const AppBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const routeString = useMemo(() => {
    return isEmptyObject(router.query)
      ? router.route
      : (router.query.billType as string);
  }, [router]);

  const onHomeClick = () => {
    dispatch(resetSelectedBillInfoAction());
    dispatch(resetCreationBillInfoAction());
  };

  const onLogoutClick = async () => {
    dispatch(setHousholdIdAction(''));
    dispatch(setTokenAction(''));
    router.push('/login');
  };

  return (
    <AppBarContainer>
      <StyledAppBar position='static'>
        <Toolbar>
          <AppBarLink onClick={onHomeClick} href='/'>
            Home
          </AppBarLink>
          <div>{getNavbarHeader(routeString)}</div>
          <Button color='inherit' onClick={onLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </StyledAppBar>
    </AppBarContainer>
  );
};

export default AppBar;
