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
import TagComponent from '@/components/tag/Tag';
import { useRouter } from 'next/router';

interface HomePageProps {
  news: IArticle[] | null;
}

const HomePage = ({ news }: HomePageProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    news && dispatch(setNextArticleIdAction(news.length + 1));
  }, []);
  /* const mainArticle = news.find(
    (article: IArticlePreview) => article.articleType === ArticleType.main
  ); */

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
