import { IArticle } from '@/utils/interfaces';
import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
});
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const addArticleAPI = async (article: IArticle) => {
  try {
    const createdArticle = await axios({
      method: 'post',
      url: `${baseUrl}/api/news/addArticle`,
      data: article,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return createdArticle;
  } catch (err) {
    console.warn('Article creation failed on FE ' + err);
  }
};

export const getNewsAPI = async () => {
  try {
    const allNews = await axios({
      method: 'get',
      url: `${baseUrl}/api/news/getNews`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return allNews;
  } catch (err) {
    console.warn('Fetching news failed on FE ' + err);
  }
};

export const getNewsItemAPI = async (newsId: string) => {
  try {
    const allNews = await axios({
      method: 'get',
      url: `${baseUrl}/api/news/${newsId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return allNews;
  } catch (err) {
    console.warn('Fetching news item failed on FE ' + err);
  }
};
