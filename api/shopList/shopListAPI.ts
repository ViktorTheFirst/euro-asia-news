import { ShopListItem } from '@/utils/interfaces';
import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
});
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getShopListDataAPI = async (householdId: string) => {
  try {
    const shopList = await instance({
      method: 'get',
      url: `${baseUrl}/api/shop-list/shopList`,
      data: { householdId },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return shopList;
  } catch (err) {
    console.warn('Shop list fetching failed on FE ' + err);
  }
};

export const saveShopListAPI = async (
  shopList: ShopListItem[],
  householdId: string
) => {
  try {
    const savedList = await instance({
      method: 'post',
      url: `${baseUrl}/api/shop-list/shopList`,
      data: { shopList, householdId },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return savedList;
  } catch (err) {
    console.warn('Shop list save failed on FE ' + err);
  }
};

export const deleteShopListAPI = async (householdId: string) => {
  try {
    const deletedList = await instance({
      method: 'delete',
      url: `${baseUrl}/api/shop-list/shopList`,
      data: { householdId },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return deletedList;
  } catch (err) {
    console.warn('Shop list deletion failed on FE ' + err);
  }
};
