import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import {
  AppBar as MuiAppBar,
  Box,
  Link as MuiLink,
  Toolbar,
} from '@mui/material';

import {
  resetCreationBillInfoAction,
  resetSelectedBillInfoAction,
  setBillsByTypeAction,
} from '@/store/Bills';
import { setHouseholdIdAction, setTokenAction } from '@/store/Auth';
import UserImageComponent from './UserImage';
import { setIsShopListChangedAction } from '@/store/ShopList';
import { setUserInfoAction } from '@/store/Users';
import svgLogo from '../../public/assets/svgs/news-logo3.png';

const AppBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onHomeClick = () => {
    dispatch(resetSelectedBillInfoAction());
    dispatch(resetCreationBillInfoAction());
    dispatch(setBillsByTypeAction([]));
    dispatch(setIsShopListChangedAction(false));
  };

  const onLogoutClick = async () => {
    dispatch(setHouseholdIdAction(''));
    dispatch(setUserInfoAction({ name: '', email: '', profileImage: '' }));
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
          minHeight: '64px',
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
              marginTop: 4,
            }}
          >
            <Image
              src={svgLogo}
              alt='news-logo'
              width={100}
              height={100}
              style={{ borderRadius: 10 }}
            />
          </MuiLink>

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
