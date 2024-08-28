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
    const result = await axios({
      method: 'get',
      url: `${baseUrl}/api/news/${newsId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result;
  } catch (err) {
    console.warn('Fetching news item failed on FE ' + err);
  }
};

export const uploadImageAPI = async (
  articleId: string,
  imageData: FormData
) => {
  try {
    const result = await axios({
      method: 'post',
      url: `${baseUrl}/api/news/upload-image/${articleId}`,
      data: imageData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return result;
  } catch (err) {
    console.warn('Uploading image failed on FE ' + err);
  }
};

export const getNextArticleIdAPI = async () => {
  try {
    const result = await axios({
      method: 'get',
      url: `${baseUrl}/api/news/getNextArticleId`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return result;
  } catch (err) {
    console.warn('Fetching next article id failed on FE ' + err);
  }
};
