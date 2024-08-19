import { Suspense } from 'react';
import { GetServerSideProps } from 'next';
import { Box } from '@mui/material';

import myTheme from '@/theme';
import { getNewsAPI } from '@/api/news/newsAPI';
import { ArticleType, IArticle, IArticlePreview } from '@/utils/interfaces';
import ImageArticleComponent from '@/components/article/ImageArticle';
import homeStyles from '../styles/homeStyles.module.css';
import MainArticleComponent from '@/components/article/MainArticle';

interface HomePageProps {
  news: IArticle[] | null;
}

const HomePage = ({ news }: HomePageProps) => {
  /* const mainArticle = news.find(
    (article: IArticlePreview) => article.articleType === ArticleType.main
  ); */

  //{mainArticle ? <MainArticleComponent {...mainArticle} /> : null}
  return (
    <Box component={Box} className={homeStyles.articlesContainer}>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
      {!news && (
        <div
          style={{
            height: '200vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          No newss
        </div>
      )}
    </Box>
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
