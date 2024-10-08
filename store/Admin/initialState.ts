import { ArticleType, PragraphRole } from '@/utils/interfaces';
import { AddArticleInitialState } from './interfaces';

export const initialState: AddArticleInitialState = {
  nextArticleId: 0,
  addArticleData: {
    itemId: '',
    articleType: ArticleType.image,
    date: new Date().toISOString().split('T')[0] as unknown as Date,
    author: '',
    authorMedia: [
      { type: '', url: '' },
      { type: '', url: '' },
    ],
    previewImageURL: '',
    previewImageAlt: '',
    h1: '',
    h1Paragraphs: [
      { role: PragraphRole.regular, text: '' },
      { role: PragraphRole.regular, text: '' },
      { role: PragraphRole.regular, text: '' },
    ],
    h2: '',
    h2Paragraphs: [
      { role: PragraphRole.regular, text: '' },
      { role: PragraphRole.regular, text: '' },
      { role: PragraphRole.regular, text: '' },
    ],
    h3: '',
    h3Paragraphs: [
      { role: PragraphRole.regular, text: '' },
      { role: PragraphRole.regular, text: '' },
      { role: PragraphRole.regular, text: '' },
    ],
    articleImageURL: '',
    articleImageAlt: '',
    views: 0,
    tags: [],
  },
};
