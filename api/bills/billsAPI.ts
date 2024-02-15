import axios from 'axios';
import { BillInfo } from '@/utils/interfaces';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const addBillAPI = async (billInfo: BillInfo, token: string) => {
  try {
    const createdBill = await axios({
      method: 'post',
      url: `${baseUrl}/bills/addBill`,
      data: billInfo,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    return createdBill;
  } catch (err) {
    console.warn('Bill creation failed on FE ' + err);
  }
};

export const editBillAPI = async (billInfo: BillInfo, token: string) => {
  try {
    const editedBill = await axios({
      method: 'post',
      url: `${baseUrl}/bills/${billInfo._id}`,
      data: billInfo,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    return editedBill;
  } catch (err) {
    console.warn('Bill edition failed on FE ' + err);
  }
};

export const getBillsByTypeAPI = async (billType: string) => {
  try {
    const billsByType = await axios({
      method: 'get',
      url: `${baseUrl}/bills/${billType}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return billsByType;
  } catch (err) {
    console.warn('Fetching bills failed on FE ' + err);
  }
};

export const deleteBillByIdAPI = async (billId: string, token: string) => {
  try {
    const deletedBill = await axios({
      method: 'delete',
      url: `${baseUrl}/bills/${billId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    return deletedBill;
  } catch (err) {
    console.warn('Bill deletion failed on FE ' + err);
  }
};
