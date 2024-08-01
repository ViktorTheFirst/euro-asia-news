import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { getHouseholdId, setHouseholdIdAction } from '@/store/Auth';
import { UserInfo, getUserInfo, setUserInfoAction } from '@/store/Users';
import { getUserAPI } from '@/api/users/usersAPI';
import myTheme from '@/theme';
import { getNewsAPI } from '@/api/news/newsAPI';
import { IArticle, IArticlePreview } from '@/utils/interfaces';
import ArticleComponent from '@/components/article/Article';

interface HomePageProps {
  news: IArticle[];
  sessionHouseholdId?: string;
  user?: UserInfo;
}

const HomePage = ({ news, sessionHouseholdId, user }: HomePageProps) => {
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
      flexWrap={'wrap'}
      sx={{
        backgroundColor: '#f5f5f5',
        height: (theme) => `calc(100vh - ${theme.appBarHeight}vh)`,
      }}
    >
      {news.map((article: IArticlePreview) => {
        return <ArticleComponent key={article.h1} {...article} />;
      })}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;

  const newsResponse = await getNewsAPI();
  const news: IArticle[] = newsResponse?.data;

  const userData = await getUserAPI(cookies.userId!);
  const { user } = userData?.data;
  const { _id, name, email, profileImage } = user;

  return {
    props: {
      news,
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
