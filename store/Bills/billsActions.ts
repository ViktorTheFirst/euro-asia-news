import { BillInfo } from '@/utils/interfaces';
import { createAction } from '@reduxjs/toolkit';

export const setSelectedBillInfoAction = createAction<BillInfo>(
  'bills/setSelectedBillInfo'
);

export const resetSelectedBillInfoAction = createAction(
  'bills/resetSelectedBillInfo'
);

export const setCreationBillInfoAction = createAction<BillInfo>(
  'bills/setCreationBillInfo'
);

export const resetCreationBillInfoAction = createAction(
  'bills/resetCreationBillInfo'
);

export const setBillsByTypeAction = createAction<BillInfo[]>(
  'bills/setBillsByType'
);
