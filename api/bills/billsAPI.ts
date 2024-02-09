import { baseUrl } from '@/utils/constants';
import { BillInfo } from '@/utils/interfaces';
import axios from 'axios';

export const addBillAPI = async (billInfo: BillInfo) => {
  try {
    const createdBill = await axios({
      method: 'post',
      url: `${baseUrl}/bills/addBill`,
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
    const editedBill = await axios({
      method: 'post',
      url: `${baseUrl}/bills/${billInfo._id}`,
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

export const getBillsByTypeAPI = async (billType: string) => {
  console.log('billType', billType);
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
