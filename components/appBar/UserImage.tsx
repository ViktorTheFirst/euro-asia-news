import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Image from 'next/image';
import { Menu, MenuItem } from '@mui/material';

import profilePicPlaceHolder from './../../public/assets/images/profile_placeholder.jpg';
import { getUserInfo } from '@/store/Users';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const UserImageContainer = styled.div`
  display: flex;
  border-radius: 30px;
`;

const StyledImage = styled(Image)`
  border-radius: 30px;
  border: 1px solid black;
  cursor: pointer;
`;

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
    <UserImageContainer>
      <StyledImage
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
    </UserImageContainer>
  );
};

export default UserImageComponent;
