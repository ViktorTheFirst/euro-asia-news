import { IArticle } from '@/utils/interfaces';
import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
});
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const addArticleAPI = async (article: IArticle) => {
  try {
    const createdArticle = await instance({
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

/* export const editBillAPI = async (billInfo: BillInfo) => {
  try {
    const editedBill = await instance({
      method: 'post',
      url: `${baseUrl}/api/bills/${billInfo._id}`,
      data: billInfo,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return editedBill;
  } catch (err) {
    console.warn('Bill edition failed on FE ' + err);
  }
}; */

export const getNewsAPI = async () => {
  try {
    const allNews = await instance({
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
    const allNews = await instance({
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

/* export const deleteBillByIdAPI = async (billId: string) => {
  try {
    const deletedBill = await instance({
      method: 'delete',
      url: `${baseUrl}/api/bills/${billId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return deletedBill;
  } catch (err) {
    console.warn('Bill deletion failed on FE ' + err);
  }
}; */
