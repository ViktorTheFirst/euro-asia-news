import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import styled from 'styled-components';

import { Col, Container, Row } from '@/styles/globalStyles';
import { Button, TextField } from '@material-ui/core';
import profilePicPlaceHolder from './../../public/assets/images/profile_placeholder.jpg';
import { UserInfo, setUserInfoAction } from '@/store/Users';
import { getHouseholdId } from '@/store/Auth';
import { editUserAPI, getUserAPI } from '@/api/users/usersAPI';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ProfileContainer = styled(Container)`
  height: ${(props) => 100 - props.theme.appBarHeight}vh;
  display: flex;
`;

const ImageSection = styled(Container)`
  display: flex;
  flex-direction: column;
  background-color: #69ad3ca9;
  padding: 12px;
  justify-content: space-evenly;
  align-items: center;
`;

const TextSection = styled(Col)`
  background-color: #dad86ca9;
  padding: 12px;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled(Container)`
  justify-content: center;
  margin-top: 30px;
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
`;

const StyledTextField = styled(TextField)`
  width: 50%;
  caret-color: transparent;
`;

const StyledCol = styled(Col)`
  width: 30%;
  min-height: 100px;
  justify-content: space-around;
`;

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
          dispatch(setUserInfoAction({ name, email, profileImage }));
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
    <ProfileContainer>
      <Row>
        <TextSection>
          <StyledTextField
            id='profile-user-name'
            label='Name'
            variant='outlined'
            margin='normal'
            value={user.name}
            onChange={() => {}}
            disabled={false}
          />
          <StyledTextField
            id='profile-user-email'
            label='Email'
            variant='outlined'
            margin='normal'
            value={user.email}
            onChange={() => {}}
            disabled={false}
          />

          <StyledTextField
            id='profile-household-id'
            label='Household ID'
            variant='outlined'
            margin='normal'
            value={householdId}
            onChange={() => {}}
            disabled={true}
          />
          <Button variant='outlined' color='primary' onClick={() => {}}>
            Save
          </Button>
        </TextSection>
        <ImageSection>
          <ImageContainer>
            <StyledImage
              src={
                preview ??
                (user.profileImage
                  ? baseUrl + '/' + user.profileImage
                  : profilePicPlaceHolder)
              }
              width={300}
              height={300}
              alt='User profile picture'
            />
          </ImageContainer>
          {preview && file ? (
            <StyledCol>
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
            </StyledCol>
          ) : (
            <Button
              type='button'
              variant='contained'
              color='primary'
              onClick={pickImageHandler}
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
        </ImageSection>
      </Row>
    </ProfileContainer>
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
