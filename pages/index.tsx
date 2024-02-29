import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import fs from 'fs/promises';
import path from 'path';

import MainMenu from '@/components/menu/MainMenu';
import { Container, Row } from '@/styles/globalStyles';
import { getHouseholdId, setHouseholdIdAction } from '@/store/Auth';
import { UserInfo, getUserInfo, setUserInfoAction } from '@/store/Users';
import { getUserAPI } from '@/api/users/usersAPI';
import ModelViewer from '@/components/modelViewer/ModelViewer';

// our-domain.com/
const HomeContainer = styled(Container)`
  background-color: #f4d03f;
  background-image: linear-gradient(132deg, #f4d03f 0%, #16a085 100%);

  height: ${(props) => 100 - 7 /* props.theme.appBarHeight */}vh;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
`;

const HouseContainer = styled(Container)`
  height: 75vh;
  justify-content: center;
  align-items: center;
  flex: 3;
`;

const MenuContainer = styled(Container)`
  height: 75vh;
  justify-content: center;
  align-items: center;
  flex: 2;
`;

const ContainerWithMedia = styled.div`
  display: flex;
  @media (max-width: 400px) {
    flex-direction: column;
  }
  flex-direction: row;
`;

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
    <HomeContainer>
      <ContainerWithMedia>
        <HouseContainer>
          <ModelViewer />
        </HouseContainer>
        <MenuContainer>
          <MainMenu topics={mainTopics} />
        </MenuContainer>
      </ContainerWithMedia>
    </HomeContainer>
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
