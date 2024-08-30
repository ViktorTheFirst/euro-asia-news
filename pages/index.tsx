import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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

interface HomePageProps {
  news: IArticle[] | null;
}

const HomePage = ({ news }: HomePageProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    news && dispatch(setNextArticleIdAction(news.length + 1));
  }, []);
  /* const mainArticle = news.find(
    (article: IArticlePreview) => article.articleType === ArticleType.main
  ); */

  //{mainArticle ? <MainArticleComponent {...mainArticle} /> : null}
  return (
    <div className={homeStyles.homeContainer}>
      <div className={homeStyles.tagsContainer}>
        {existingTags.map((tag, index) => {
          if (index < existingTags.length - 1) {
            return (
              <>
                <div className={homeStyles.tag} key={`${tag} + ${index}`}>
                  {tag}
                </div>
                <Divider
                  orientation='vertical'
                  sx={{ backgroundColor: '#ff7030' }}
                  key={`${tag} + ${index}`}
                />
              </>
            );
          }
          return (
            <div className={homeStyles.tag} key={`${tag} + ${index}`}>
              {tag}
            </div>
          );
        })}
      </div>
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

  const news: IArticle[] | null = newsResponse?.data?.news ?? null;
  return {
    props: {
      news,
    },
  };
};

export default HomePage;
