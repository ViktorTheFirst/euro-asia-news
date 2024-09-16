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

import MenuComponent from './Menu';
import { setUserInfoAction } from '@/store/Users';
import svgLogo from '../../public/assets/svgs/news-logo3.png';

const AppBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onLogoutClick = async () => {
    dispatch(
      setUserInfoAction({ name: '', email: '', profileImage: '', role: '' })
    );
    router.push('/login');
  };
  const onLoginClick = async () => {
    router.push('/login');
  };

  const onUserProfileClick = () => {
    router.push('/profile');
  };

  const onAdminPanelClick = () => {
    router.push('/admin-panel');
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

          <MenuComponent
            onLogoutClick={onLogoutClick}
            onLoginClick={onLoginClick}
            onUserProfileClick={onUserProfileClick}
            onAdminPanelClick={onAdminPanelClick}
          />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;
