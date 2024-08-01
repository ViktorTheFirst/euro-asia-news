import React from 'react';
import { IArticlePreview } from '@/utils/interfaces';
import articleStyles from '../../styles/articleStyles.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Link as MuiLink } from '@mui/material';
import { getUrlFromArticle } from '@/utils/functions';

const ArticleComponent = (props: IArticlePreview) => {
  const { itemId, previewImageURL, previewImageAlt, tags, h1, h1Paragraphs } =
    props;

  if (!h1) return null;
  //const itemUrl = `news/${h1.replace(/ /g, '_').toLowerCase()}+${itemId}`;
  const itemUrl = `news/${getUrlFromArticle(h1, itemId)}`;

  const onArticleClickLogs = () => {
    console.log('article clicked', props);
  };

  return (
    <article className={articleStyles.article}>
      <div className={articleStyles.articleImageContainer}>
        <MuiLink
          component={Link}
          href={itemUrl}
          className={articleStyles.mainHeader}
          onClick={onArticleClickLogs}
        >
          <Image
            src={previewImageURL}
            alt={previewImageAlt}
            width={350}
            height={350}
          />
        </MuiLink>
      </div>

      <div>
        <div className={articleStyles.tagsContainer}>
          <div className={articleStyles.tags}>
            {tags.map((tag: string, index: number) => (
              <h5 key={tag} className={articleStyles.tag}>
                {index < tags.length - 1 ? `${tag},` : tag}
              </h5>
            ))}
          </div>

          <MuiLink
            component={Link}
            href={itemUrl}
            className={articleStyles.mainHeader}
            onClick={onArticleClickLogs}
          >
            <h1>{h1}</h1>
          </MuiLink>
        </div>

        <div className={articleStyles.articleText}>{h1Paragraphs[0].text}</div>
      </div>
    </article>
  );
};

export default ArticleComponent;
