import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Box, Button, TextField } from '@mui/material';

import profilePicPlaceHolder from './../../public/assets/images/profile_placeholder.jpg';
import { UserInfo, setUserInfoAction } from '@/store/Users';
import { getHouseholdId } from '@/store/Auth';
import { editUserAPI, getUserAPI } from '@/api/users/usersAPI';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface ProfileProps {
  user: UserInfo;
}

const ProfilePage = ({ user }: ProfileProps) => {
  const [file, setFile] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const pickImageRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const householdId = useSelector(getHouseholdId);

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

  const confirmProfileImageChange = async () => {
    if (!user.id || !file) return;
    const formData = new FormData();

    try {
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('image', file);

      await editUserAPI(user.id, formData).then((result) => {
        if (result?.data?.user) {
          const { name, email, profileImage } = result.data.user;
          dispatch(
            setUserInfoAction({
              name,
              email,
              profileImage: profileImage.toString(),
            })
          );
          setPreview(baseUrl + '/' + profileImage);
          setFile(null);
        }
      });
    } catch (err) {
      console.warn('Failed changing profile image ' + err);
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
            value={user.name}
            onChange={() => {}}
            disabled={false}
            sx={{ width: '50%' }}
          />
          <TextField
            id='profile-user-email'
            label='Email'
            variant='outlined'
            margin='normal'
            value={user.email}
            onChange={() => {}}
            disabled={false}
            sx={{ width: '50%' }}
          />

          <TextField
            id='profile-household-id'
            label='Household ID'
            variant='outlined'
            margin='normal'
            value={householdId}
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
              src={
                preview ??
                (user.profileImage
                  ? baseUrl + '/' + user.profileImage
                  : profilePicPlaceHolder)
              }
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
                onClick={confirmProfileImageChange}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;
  const userData = await getUserAPI(cookies.userId!);
  const { user } = userData?.data;
  const { _id, name, email, profileImage } = user;

  return {
    props: {
      user: {
        id: _id,
        name,
        email,
        profileImage,
      },
    },
    notFound: !userData?.data?.user,
  };
};

export default ProfilePage;
