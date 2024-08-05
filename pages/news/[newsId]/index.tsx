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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
interface NewsItemProps {
  newsItem: IArticle;
}

const NewsItem = ({
  newsItem,
}: NewsItemProps): InferGetStaticPropsType<typeof getStaticProps> => {
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
    authorh4,
    authorParagraph,
    authorMedia,
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
          src={baseUrl + previewImageURL}
          alt={previewImageAlt}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAI0lEQVR42mP8z/C/HwMDAwMjI+P/AAz+'
          loading='lazy'
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          style={{ objectFit: 'contain' }}
        />
      </div>
      {/* ---------------------------------h1------------------------------- */}
      <div className={articleStyles.articlePageHeaderContainer}>
        <h1>{h1}</h1>
        <div className='row'>
          <div className={articleStyles.date}>{formatDate(date)}</div>
          {/* <div className={articleStyles.tags}>
            {tags.map((tag: string, index: number) => (
              <h5 key={tag} className={articleStyles.tag}>
                {index < tags.length - 1 ? `${tag},` : tag}
              </h5>
            ))}
          </div> */}
          <span style={{ marginRight: '5px' }}>By</span>
          <h4 className={articleStyles.articleAuthorHeader}>{authorh4}</h4>

          {authorMedia.map((media: string, index: number) => (
            <h5 key={media} className={articleStyles.tag}>
              {index < authorMedia.length - 1 ? `${media},` : media}
            </h5>
          ))}
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
        <Image
          src={baseUrl + imageURL}
          alt={imageAlt}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAI0lEQVR42mP8z/C/HwMDAwMjI+P/AAz+'
          loading='lazy'
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          style={{ objectFit: 'contain' }}
        />
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
