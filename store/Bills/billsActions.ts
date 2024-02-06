import { BillInfo } from '@/utils/interfaces';
import { createAction } from '@reduxjs/toolkit';

export const setSelectedBillInfo = createAction<BillInfo>(
  'bills/setSelectedBillInfo'
);

export const resetSelectedBillInfo = createAction(
  'bills/resetSelectedBillInfo'
);
