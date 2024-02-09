import { BillsInitialState } from './interfaces';
import { emptyBill } from '@/utils/constants';

export const initialState: BillsInitialState = {
  billsByType: [],
  selectedBill: emptyBill,
  creationBill: emptyBill,
};
