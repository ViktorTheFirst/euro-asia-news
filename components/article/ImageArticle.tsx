import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Link as MuiLink } from '@mui/material';

import { IArticlePreview } from '@/utils/interfaces';
import articleStyles from '../../styles/articleStyles.module.css';
import { getUrlFromArticle } from '@/utils/functions';
import TagComponent from '../tag/Tag';
import { useRouter } from 'next/router';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ImageArticleComponent = (props: IArticlePreview) => {
  const { itemId, previewImageURL, previewImageAlt, tags, h1, h1Paragraphs } =
    props;

  const router = useRouter();

  const isMobile = router.query.viewport === 'mobile';
  if (!h1) return null;
  const itemUrl = `news/${getUrlFromArticle(h1, itemId)}`;

  return (
    <article className={articleStyles.article}>
      <div className={articleStyles.articleImageContainer}>
        <MuiLink
          component={Link}
          href={itemUrl}
          className={articleStyles.mainHeader}
          //prefetch={false}
        >
          <Image
            src={baseUrl + previewImageURL}
            alt={previewImageAlt}
            priority
            width={350}
            height={isMobile ? 300 : 350}
          />
        </MuiLink>
      </div>

      <div>
        <div className={articleStyles.tagsContainer}>
          <div className={articleStyles.tags}>
            {/* 
            TODO: add tag component to inside of article  
            TODO: when ? appears in h1 it fails to load article
            TODO: when % appears in h1 it fails to load article
            TODO: when ' appears in any text it fails to add the article
            */}
            {tags.map((tag: string, index: number) => {
              // TODO: change the 'undefined' incoming from be
              if (tag === 'undefined') return;
              return (
                <h5 key={tag} className={articleStyles.tag}>
                  <TagComponent value={tag} />
                </h5>
              );
            })}
          </div>

          <MuiLink
            component={Link}
            href={itemUrl}
            className={articleStyles.mainHeader}
            //prefetch={false}
          >
            <h1>{h1}</h1>
          </MuiLink>
        </div>

        <div className={articleStyles.articleText}>{h1Paragraphs[0].text}</div>
      </div>
    </article>
  );
};

export default ImageArticleComponent;
