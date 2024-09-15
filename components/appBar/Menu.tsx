import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Menu as MenuIcon,
  AssignmentInd as ProfileIcon,
  AdminPanelSettings as AdminIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

import { existingTags } from '@/utils/constants';
import { getUserInfo } from '@/store/Users';

interface MenuProps {
  onLogoutClick: () => void;
  onLoginClick: () => void;
  onUserProfileClick: () => void;
  onAdminPanelClick: () => void;
}

const MenuComponent = ({
  onLogoutClick,
  onLoginClick,
  onUserProfileClick,
  onAdminPanelClick,
}: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const userInfo = useSelector(getUserInfo);

  const router = useRouter();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    onUserProfileClick();
    handleClose();
  };

  const handleAdminPanelClick = () => {
    onAdminPanelClick();
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      component={Box}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Typography
        sx={{ cursor: 'pointer', color: '#ff7030' }}
        onClick={handleClick}
      >
        {userInfo.name}
      </Typography>
      <MenuIcon
        aria-controls='menu'
        sx={{
          cursor: 'pointer',
          marginLeft: '5px',
          fontSize: '50px',
          color: '#ff7030',
        }}
        onClick={handleClick}
      />
      <Menu
        id='menu'
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        keepMounted
        onClose={handleClose}
        transitionDuration={300}
      >
        <MenuItem disabled onClick={handleProfileClick}>
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleAdminPanelClick}>
          <ListItemIcon>
            <AdminIcon />
          </ListItemIcon>
          <ListItemText>Admin Panel</ListItemText>
        </MenuItem>
        {!userInfo.email ? (
          <MenuItem onClick={onLoginClick}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText>Login</ListItemText>
          </MenuItem>
        ) : (
          <MenuItem onClick={onLogoutClick}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        )}
        {router.query.viewport === 'mobile' && <Divider />}
        {router.query.viewport === 'mobile' &&
          existingTags.map((tag: string, index: number) => (
            <MenuItem key={`${tag} - ${index}`}>{tag}</MenuItem>
          ))}
      </Menu>
    </Box>
  );
};

export default MenuComponent;
