import { AuthorMediaType, IArticle, PragraphRole } from '@/utils/interfaces';
import { createAction } from '@reduxjs/toolkit';

export const setAddArticleDataAction = createAction<IArticle>(
  'admin/setAddArticleDataAction'
);

export const clearAddArticleDataAction = createAction(
  'admin/clearAddArticleDataAction'
);

export const setNextArticleIdAction = createAction<number>(
  'admin/setNextArticleIdAction'
);

export const setAuthorMediaTypeAction = createAction<{
  mType: AuthorMediaType;
  mIndex: number;
}>('admin/setAuthorMediaTypeAction');

export const setAuthorMediaURLAction = createAction<{
  mURL: string;
  mIndex: number;
}>('admin/setAuthorMediaURLAction');

export const setAddArticleH1ParagraphRoleAction = createAction<{
  pRole: PragraphRole;
  pIndex: number;
}>('admin/setAddArticleH1ParagraphRoleAction');

export const setAddArticleH1ParagraphAction = createAction<{
  pText: string;
  pIndex: number;
}>('admin/setAddArticleH1ParagraphAction');

export const setAddArticleH2ParagraphRoleAction = createAction<{
  pRole: PragraphRole;
  pIndex: number;
}>('admin/setAddArticleH2ParagraphRoleAction');

export const setAddArticleH2ParagraphAction = createAction<{
  pText: string;
  pIndex: number;
}>('admin/setAddArticleH2ParagraphAction');

export const setAddArticleH3ParagraphRoleAction = createAction<{
  pRole: PragraphRole;
  pIndex: number;
}>('admin/setAddArticleH3ParagraphRoleAction');

export const setAddArticleH3ParagraphAction = createAction<{
  pText: string;
  pIndex: number;
}>('admin/setAddArticleH3ParagraphAction');
