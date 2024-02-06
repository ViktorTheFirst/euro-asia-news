import { BillsInitialState } from './interfaces';
import { emptyBill } from '@/utils/constants';

export const initialState: BillsInitialState = {
  selectedBill: emptyBill,
};
