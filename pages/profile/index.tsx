import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { Box, Button, TextField } from '@mui/material';

import profilePicPlaceHolder from './../../public/assets/images/profile_placeholder.jpg';
import { UserInfo, setUserInfoAction } from '@/store/Users';

interface ProfileProps {
  user: UserInfo;
}

const ProfilePage = () => {
  const [file, setFile] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const pickImageRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    pickImageRef.current && pickImageRef.current.click();
  };

  const pickedImageHandler = (event: any) => {
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
  };

  const cancelProfileImageChange = () => {
    setPreview(null);
    setFile(null);
  };

  return (
    <Box
      component={Box}
      display='flex'
      sx={{
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.appBarHeight}vh)`,
      }}
    >
      <Box
        component={Box}
        display='flex'
        sx={{
          width: '100%',
        }}
      >
        <Box
          component={Box}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          bgcolor='#dad86ca9'
          padding={7}
          sx={{
            width: '100%',
          }}
        >
          <TextField
            id='profile-user-name'
            label='Name'
            variant='outlined'
            margin='normal'
            value={''}
            onChange={() => {}}
            disabled={false}
            sx={{ width: '50%' }}
          />
          <TextField
            id='profile-user-email'
            label='Email'
            variant='outlined'
            margin='normal'
            value={''}
            onChange={() => {}}
            disabled={false}
            sx={{ width: '50%' }}
          />

          <TextField
            id='profile-household-id'
            label='Household ID'
            variant='outlined'
            margin='normal'
            value={''}
            onChange={() => {}}
            disabled={true}
            sx={{ width: '50%' }}
          />
          <Button
            variant='outlined'
            color='primary'
            onClick={() => {}}
            disabled
          >
            Save
          </Button>
        </Box>
        <Box
          component={Box}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          bgcolor='#69ad3ca9'
          padding={8}
          sx={{
            width: '100%',
          }}
        >
          <Box
            component={Box}
            display='flex'
            justifyContent='center'
            sx={{
              width: '100%',
            }}
          >
            <Image
              src={preview ?? profilePicPlaceHolder}
              width={300}
              height={300}
              alt='User profile picture'
              style={{
                borderRadius: '10px',
              }}
            />
          </Box>
          {preview && file ? (
            <Box
              component={Box}
              display='flex'
              flexDirection='column'
              justifyContent='space-around'
              sx={{
                width: '30%',
                minHeight: '100px',
              }}
            >
              <Button
                type='button'
                variant='contained'
                color='primary'
                /* onClick={confirmProfileImageChange} */
              >
                Confirm
              </Button>
              <Button
                type='button'
                variant='contained'
                color='secondary'
                onClick={cancelProfileImageChange}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Button
              type='button'
              variant='contained'
              color='primary'
              onClick={pickImageHandler}
              sx={{ marginTop: '10px' }}
            >
              Upload image
            </Button>
          )}
          <input
            id='user-image'
            ref={pickImageRef}
            style={{ display: 'none' }}
            accept='image/*'
            type='file'
            onChange={pickedImageHandler}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
