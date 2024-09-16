import React from 'react';
import Link from 'next/link';
import { IArticle } from '@/utils/interfaces';
import articleStyles from '../../styles/articleStyles.module.css';
import homeStyles from '../../styles/homeStyles.module.css';
import { Link as MuiLink } from '@mui/material';

import { formatDate, getUrlFromArticle } from '@/utils/functions';
import CarouselComponent from '../carousel/Carousel';
import TagComponent from '../tag/Tag';
import { useRouter } from 'next/router';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const MainArticleComponent = (props: IArticle) => {
  const {
    itemId,
    previewImageURL,
    previewImageAlt,
    h1,
    date,
    articleImageURL,
    articleImageAlt,
    tags,
    author,
  } = props;

  const router = useRouter();
  const itemUrl = `news/${getUrlFromArticle(h1, itemId)}`;
  if (!h1) return null;

  return (
    <article className={articleStyles.mainArticle}>
      <div className={homeStyles.articleData}>
        <div className={homeStyles.mainHeaderContainer}>
          <MuiLink
            component={Link}
            href={itemUrl}
            className={articleStyles.mainHeader}
          >
            <h1>{h1}</h1>
          </MuiLink>
        </div>
        <div className={articleStyles.tagsContainer}>
          <div className={articleStyles.tags}>
            {tags.map((tag: string, index: number) => {
              if (tag === 'undefined') return;
              return (
                <h5 key={`${tag}-${index}`} className={articleStyles.tag}>
                  <TagComponent value={tag} />
                </h5>
              );
            })}
          </div>
          <div style={{ marginBottom: '10px' }} className='row'>
            <div className={articleStyles.date}>{formatDate(date)}</div>
          </div>
          <div style={{ marginBottom: '10px' }} className='row'>
            <span style={{ marginRight: '5px', fontWeight: 'bold' }}>By:</span>
            <h4 className={articleStyles.articleAuthorHeader}>{author}</h4>
          </div>
        </div>
      </div>
      <div className={homeStyles.carousel}>
        <CarouselComponent
          isMobile={router.query.viewport === 'mobile'}
          images={[
            { src: previewImageURL, alt: previewImageAlt },
            { src: articleImageURL, alt: articleImageAlt },
          ]}
        />
      </div>
    </article>
  );
};

export default MainArticleComponent;
