import { BillInfo } from '@/utils/interfaces';

export interface BillsInitialState {
  billsByType: BillInfo[];
  selectedBill: BillInfo;
  creationBill: BillInfo;
}
