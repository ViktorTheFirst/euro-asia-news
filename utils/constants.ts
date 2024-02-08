import { BillInfo } from './interfaces';

export const baseUrl = 'http://localhost:5000/api';

export const emptyBill: BillInfo = {
  id: '',
  billType: '',
  year: '',
  months: [],
  confirmationNumber: '',
  payedAmount: '',
};
