import axios from 'axios';
import { BillInfo } from '@/utils/interfaces';

const instance = axios.create({
  withCredentials: true,
});
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const addBillAPI = async (billInfo: BillInfo) => {
  try {
    const createdBill = await instance({
      method: 'post',
      url: `${baseUrl}/api/bills/addBill`,
      data: billInfo,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return createdBill;
  } catch (err) {
    console.warn('Bill creation failed on FE ' + err);
  }
};

export const editBillAPI = async (billInfo: BillInfo) => {
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
};

export const getBillsByTypeAPI = async (
  billType: string,
  householdId: string
) => {
  try {
    const billsByType = await instance({
      method: 'get',
      url: `${baseUrl}/api/bills/${billType}`,
      data: {
        householdId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return billsByType;
  } catch (err) {
    console.warn('Fetching bills failed on FE ' + err);
  }
};

export const deleteBillByIdAPI = async (billId: string) => {
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
};
