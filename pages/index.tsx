import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import myTheme from '@/theme';
import { getNewsAPI } from '@/api/news/newsAPI';
import { ArticleType, IArticle, IArticlePreview } from '@/utils/interfaces';
import ImageArticleComponent from '@/components/article/ImageArticle';
import homeStyles from '../styles/homeStyles.module.css';
import MainArticleComponent from '@/components/article/MainArticle';
import { setNextArticleIdAction } from '@/store/Admin';
import { Divider } from '@mui/material';
import { existingTags } from '@/utils/constants';
import TagComponent from '@/components/tag/Tag';
import { useRouter } from 'next/router';
import { getUserAPI } from '@/api/users/usersAPI';
import { getUserInfo, setUserInfoAction, UserInfo } from '@/store/Users';

interface HomePageProps {
  news: IArticle[] | null;
  user?: UserInfo;
}

const HomePage = ({ news, user }: HomePageProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    news && dispatch(setNextArticleIdAction(news.length + 1));
  }, []);

  useEffect(() => {
    if (!userInfo.email && user) {
      dispatch(setUserInfoAction(user));
    }
  }, [user, userInfo.email, dispatch]);

  const mainArticle = news?.find(
    (article: IArticlePreview) => article.articleType === ArticleType.main
  );

  //{mainArticle ? <MainArticleComponent {...mainArticle} /> : null}
  return (
    <div className={homeStyles.homeContainer}>
      {/* -----------------------------TAGS------------------------------ */}
      {router.query.viewport !== 'mobile' && (
        <div className={homeStyles.tagsContainer}>
          {existingTags.map((tag, index) => (
            <TagComponent value={tag} key={`${index} - ${tag}`} />
          ))}
        </div>
      )}

      {/* -----------------------------ARTICLES------------------------------ */}
      {mainArticle ? (
        <div className={homeStyles.mainArticleContainer}>
          <MainArticleComponent {...mainArticle} />
        </div>
      ) : null}
      <div className={homeStyles.articlesContainer}>
        {news &&
          news.map((article: IArticlePreview) => {
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
        {!news && (
          <div
            style={{
              height: '200vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            No news
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const newsResponse = await getNewsAPI();
  const cookies = context.req.cookies;
  const userData = await getUserAPI(cookies.userId!);

  const { user } = userData?.data;

  const { username, email, role } = user;

  const news: IArticle[] | null = newsResponse?.data?.news ?? null;
  return {
    props: {
      news,
      user: {
        name: username,
        email,
        role,
      },
    },
  };
};

export default HomePage;
