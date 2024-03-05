import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import fs from 'fs/promises';
import path from 'path';
import { Box } from '@mui/material';

import MainMenu from '@/components/menu/MainMenu';
import { getHouseholdId, setHouseholdIdAction } from '@/store/Auth';
import { UserInfo, getUserInfo, setUserInfoAction } from '@/store/Users';
import { getUserAPI } from '@/api/users/usersAPI';
import ModelViewer from '@/components/modelViewer/ModelViewer';
import myTheme from '@/theme';

interface HomePageProps {
  mainTopics: { title: string }[];
  sessionHouseholdId?: string;
  user?: UserInfo;
}

const HomePage = ({ mainTopics, sessionHouseholdId, user }: HomePageProps) => {
  const dispatch = useDispatch();
  const householdId = useSelector(getHouseholdId);
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    if (sessionHouseholdId && !householdId)
      dispatch(setHouseholdIdAction(sessionHouseholdId));
  }, [sessionHouseholdId, householdId, dispatch]);

  useEffect(() => {
    if (!userInfo.profileImage && user) {
      dispatch(setUserInfoAction(user));
    }
  }, [user, userInfo.profileImage, dispatch]);

  return (
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      justifyContent='flex-start'
      sx={{
        backgroundImage: 'linear-gradient(132deg, #f4d03f 0%, #16a085 100%)',
        height: (theme) => `calc(100vh - ${theme.appBarHeight}vh)`,
      }}
    >
      <Box
        component={Box}
        display='flex'
        flexDirection='row'
        sx={{
          [myTheme.breakpoints.down('sm')]: {
            flexDirection: 'column',
          },
        }}
      >
        <Box
          component={Box}
          display='flex'
          justifyContent='center'
          alignItems='center'
          flex={3}
          sx={{ height: '75vh' }}
        >
          <ModelViewer />
        </Box>
        <Box
          component={Box}
          display='flex'
          justifyContent='center'
          alignItems='center'
          flex={2}
          sx={{ height: '75vh' }}
        >
          <MainMenu topics={mainTopics} />
        </Box>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;
  const filePath = path.join(process.cwd(), 'data', 'mainMenuTopics.json');
  const jsonData = await fs.readFile(filePath, { encoding: 'utf-8' });
  const data = JSON.parse(jsonData);

  const userData = await getUserAPI(cookies.userId!);
  const { user } = userData?.data;
  const { _id, name, email, profileImage } = user;

  return {
    props: {
      mainTopics: data.topics,
      sessionHouseholdId: cookies.householdId,
      user: {
        id: _id,
        name,
        email,
        profileImage,
      },
    },
  };
};

export default HomePage;
