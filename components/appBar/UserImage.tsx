import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Box, Menu, MenuItem } from '@mui/material';

import profilePicPlaceHolder from './../../public/assets/images/profile_placeholder.jpg';
import { getUserInfo } from '@/store/Users';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
    <Box component={Box} display='flex' justifyContent='center'>
      <Image
        alt='profile image'
        src={
          userInfo.profileImage
            ? baseUrl + '/' + userInfo.profileImage
            : profilePicPlaceHolder
        }
        onClick={handleClick}
        width={58}
        height={58}
        aria-controls='user-image-menu'
        style={{
          borderRadius: '30px',
          cursor: 'pointer',
          border: '1px solid black',
        }}
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
