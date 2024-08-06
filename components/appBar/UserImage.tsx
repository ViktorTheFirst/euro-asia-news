import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import PortraitIcon from '@mui/icons-material/Portrait';

import { getUserInfo } from '@/store/Users';

interface UserImageProps {
  onUserImageClick: () => void;
  onLogoutClick: () => void;
  onUserProfileClick: () => void;
}

const UserImageComponent = ({
  onUserImageClick,
  onLogoutClick,
  onUserProfileClick,
}: UserImageProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const userInfo = useSelector(getUserInfo);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    onUserImageClick();
  };

  const handleProfileClick = () => {
    onUserProfileClick();
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
      <PortraitIcon
        aria-controls='user-image-menu'
        sx={{
          cursor: 'pointer',
          marginLeft: '5px',
          fontSize: '50px',
          color: '#ff7030',
        }}
        onClick={handleClick}
      />
      <Menu
        id='user-image-menu'
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        keepMounted
        onClose={handleClose}
        transitionDuration={300}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserImageComponent;
