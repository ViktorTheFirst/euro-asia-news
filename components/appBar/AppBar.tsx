import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  AppBar as MuiAppBar,
  Box,
  Link as MuiLink,
  Toolbar,
} from '@mui/material';

import { getNavbarHeader, isEmptyObject } from '@/utils/functions';
import {
  resetCreationBillInfoAction,
  resetSelectedBillInfoAction,
  setBillsByTypeAction,
} from '@/store/Bills';
import { setHouseholdIdAction, setTokenAction } from '@/store/Auth';
import UserImageComponent from './UserImage';

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
    <Box
      component={Box}
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{
        height: (theme) => `${theme.appBarHeight}vh`,
      }}
    >
      <MuiAppBar
        position='static'
        sx={{
          height: (theme) => `${theme.appBarHeight}vh`,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
          }}
        >
          <MuiLink
            component={Link}
            onClick={onHomeClick}
            href='/'
            sx={{
              cursor: 'pointer',
              caretColor: 'transparent',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Home
          </MuiLink>
          <div>{getNavbarHeader(routeString)}</div>

          <UserImageComponent
            onUserImageClick={onUserImageClick}
            onLogoutClick={onLogoutClick}
            onUserProfileClick={onUserProfileClick}
          />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;
