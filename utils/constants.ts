import { BillInfo } from './interfaces';

export const emptyBill: BillInfo = {
  _id: '',
  householdId: '',
  billType: '',
  year: '',
  months: [],
  confirmationNumber: '',
  payedAmount: '',
};

export const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
