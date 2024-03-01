import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { AppBar as MuiAppBar, Toolbar } from '@mui/material';

import { getNavbarHeader, isEmptyObject } from '@/utils/functions';
import { Container, StyledLink } from '@/styles/globalStyles';
import {
  resetCreationBillInfoAction,
  resetSelectedBillInfoAction,
  setBillsByTypeAction,
} from '@/store/Bills';
import { setHouseholdIdAction, setTokenAction } from '@/store/Auth';
import UserImageComponent from './UserImage';

const AppBarContainer = styled(Container)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  //height: ${(props) => props.theme.appBarHeight}vh;
  height: 7vh;
`;

const StyledAppBar = styled(MuiAppBar)`
  & .MuiToolbar-regular {
    //min-height: ${(props) => props.theme.appBarHeight}vh;
    min-height: 7vh;
    display: flex;
    justify-content: space-between;
  }
`;

const AppBarLink = styled(StyledLink)`
  cursor: pointer;
  caret-color: transparent;
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
    dispatch(setBillsByTypeAction([]));
  };

  const onLogoutClick = async () => {
    dispatch(setHouseholdIdAction(''));
    dispatch(setTokenAction(''));
    router.push('/login');
  };

  const onUserImageClick = () => {};

  const onUserProfileClick = () => {
    router.push('/profile');
  };

  return (
    <AppBarContainer>
      <StyledAppBar position='static'>
        <Toolbar>
          <AppBarLink onClick={onHomeClick} href='/'>
            Home
          </AppBarLink>
          <div>{getNavbarHeader(routeString)}</div>

          <UserImageComponent
            onUserImageClick={onUserImageClick}
            onLogoutClick={onLogoutClick}
            onUserProfileClick={onUserProfileClick}
          />
        </Toolbar>
      </StyledAppBar>
    </AppBarContainer>
  );
};

export default AppBar;
