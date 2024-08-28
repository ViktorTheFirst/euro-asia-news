import { IArticle } from '@/utils/interfaces';

export interface AddArticleInitialState {
  nextArticleId: number;
  addArticleData: IArticle;
}
