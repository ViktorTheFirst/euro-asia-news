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
