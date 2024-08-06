import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { getHouseholdId, setHouseholdIdAction } from '@/store/Auth';
import { UserInfo, getUserInfo, setUserInfoAction } from '@/store/Users';
import { getUserAPI } from '@/api/users/usersAPI';
import myTheme from '@/theme';
import { getNewsAPI } from '@/api/news/newsAPI';
import { ArticleType, IArticle, IArticlePreview } from '@/utils/interfaces';
import ImageArticleComponent from '@/components/article/ImageArticle';
import homeStyles from '../styles/homeStyles.module.css';
import MainArticleComponent from '@/components/article/MainArticle';

interface HomePageProps {
  news: IArticle[];
  sessionHouseholdId?: string;
  user?: UserInfo;
}

const HomePage = ({ news, sessionHouseholdId, user }: HomePageProps) => {
  console.log('news', news);
  const dispatch = useDispatch();
  const householdId = useSelector(getHouseholdId);
  const userInfo = useSelector(getUserInfo);
  const mainArticle = news.find(
    (article: IArticlePreview) => article.articleType === ArticleType.main
  );

  useEffect(() => {
    if (sessionHouseholdId && !householdId)
      dispatch(setHouseholdIdAction(sessionHouseholdId));
  }, [sessionHouseholdId, householdId, dispatch]);

  useEffect(() => {
    if (!userInfo.profileImage && user) {
      dispatch(setUserInfoAction(user));
    }
  }, [user, userInfo.profileImage, dispatch]);

  //{mainArticle ? <MainArticleComponent {...mainArticle} /> : null}
  return (
    <Box component={Box} className={homeStyles.articlesContainer}>
      {news.map((article: IArticlePreview) => {
        switch (article.articleType) {
          case ArticleType.image:
            return <ImageArticleComponent key={article.h1} {...article} />;

          case ArticleType.video:
          // return video article component
          case ArticleType.audio:
          // return audio article component
          case ArticleType.regular:
          // return regular article component
          default:
            return;
          // return regular article component
        }
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
