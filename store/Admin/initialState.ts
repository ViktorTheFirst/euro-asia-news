import { ArticleType, PragraphRole } from '@/utils/interfaces';
import { AddArticleInitialState } from './interfaces';

export const initialState: AddArticleInitialState = {
  addArticleData: {
    itemId: '',
    articleType: ArticleType.image,
    date: new Date(),
    author: '',
    authorMedia: [],
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
    imageURL: '',
    imageAlt: '',
    views: 0,
    tags: [],
  },
};
