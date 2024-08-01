import React from 'react';
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next';
import Image from 'next/image';
import articleStyles from '../../../styles/articleStyles.module.css';
import { getNewsAPI, getNewsItemAPI } from '@/api/news/newsAPI';
import { IArticle, IParagraph, PragraphRole } from '@/utils/interfaces';
import { formatDate, getUrlFromArticle } from '@/utils/functions';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

interface NewsItemProps {
  newsItem: IArticle;
}

const NewsItem = ({
  newsItem,
}: NewsItemProps): InferGetStaticPropsType<typeof getStaticProps> => {
  console.log('newsItem in PROPS', newsItem);
  const {
    previewImageURL,
    previewImageAlt,
    h1,
    date,
    tags,
    h1Paragraphs,
    imageURL,
    imageAlt,
    h2,
    h2Paragraphs,
    h3,
    h3Paragraphs,
  } = newsItem;

  const getParagraphRoleClass = (role: PragraphRole): string => {
    switch (role) {
      case PragraphRole.lead:
        return articleStyles.leadPragraph;

      case PragraphRole.quote:
        return articleStyles.quoteParagraph;
      case PragraphRole.regular:
      default:
        return articleStyles.regularParagraph;
    }
  };

  return (
    <div className={articleStyles.articlePageContainer}>
      {/* ---------------------------------first-image------------------------------- */}
      <div className={articleStyles.articlePageImageContainer}>
        <Image
          src={previewImageURL}
          alt={previewImageAlt}
          width={800}
          height={500}
        />
      </div>
      {/* ---------------------------------h1------------------------------- */}
      <div className={articleStyles.articlePageHeaderContainer}>
        <h1>{h1}</h1>
        <div className='row'>
          <div className={articleStyles.date}>{formatDate(date)}</div>
          <div className={articleStyles.tags}>
            {tags.map((tag: string, index: number) => (
              <h5 key={tag} className={articleStyles.tag}>
                {index < tags.length - 1 ? `${tag},` : tag}
              </h5>
            ))}
          </div>
        </div>
      </div>
      {/* ---------------------------------h1-text------------------------------- */}
      <div className={articleStyles.articlePageH1ParagraphContainer}>
        {h1Paragraphs.map((p: IParagraph, index: number) => (
          <p
            key={`${p.role}-${index}`}
            className={getParagraphRoleClass(p.role)}
          >
            {p.text}
          </p>
        ))}
      </div>

      {/* ---------------------------------second-image------------------------------- */}
      <div className={articleStyles.articlePageImageContainer}>
        <Image src={imageURL} alt={imageAlt} width={800} height={500} />
      </div>
      {/* ---------------------------------h2------------------------------- */}
      <h2>{h2}</h2>

      {/* ---------------------------------h2-text------------------------------- */}
      <div className={articleStyles.articlePageH1ParagraphContainer}>
        {h2Paragraphs.map((p: IParagraph, index: number) => {
          const hasQuoteParagraph = p.role === PragraphRole.quote;
          if (hasQuoteParagraph) {
            return (
              <div
                key={`${p.role}-${index}`}
                className={articleStyles.quoteContainer}
              >
                <FormatQuoteIcon
                  fontSize='large'
                  sx={{ fontSize: '60px', color: '#999999' }}
                />
                <p
                  key={`${p.role}-${index}`}
                  className={getParagraphRoleClass(p.role)}
                >
                  {p.text}
                </p>
              </div>
            );
          }

          return (
            <p
              key={`${p.role}-${index}`}
              className={getParagraphRoleClass(p.role)}
            >
              {p.text}
            </p>
          );
        })}
      </div>

      {/* ---------------------------------h3------------------------------- */}
      <h3>{h3}</h3>

      {/* ---------------------------------h3-text------------------------------- */}
      <div className={articleStyles.articlePageH1ParagraphContainer}>
        {h3Paragraphs.map((p: IParagraph, index: number) => (
          <p
            key={`${p.role}-${index}`}
            className={getParagraphRoleClass(p.role)}
          >
            {p.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const newsResponse = await getNewsAPI();
  const news: IArticle[] = newsResponse?.data;
  const ids = news.map((newsItem: IArticle) =>
    getUrlFromArticle(newsItem.h1, newsItem.itemId)
  );
  const pathsWithParams = ids.map((id: string) => ({ params: { newsId: id } }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const extractedId = (params?.newsId as string).split('+')[1];
  const newsItem = await getNewsItemAPI(extractedId);
  return {
    props: { newsItem: newsItem?.data },
  };
};

export default NewsItem;
