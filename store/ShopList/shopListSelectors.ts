import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export const shopListSelector = (state: RootState) => state.shopList;

export const getShopList = createSelector(
  [shopListSelector],
  (shopListSelector) => shopListSelector.shopList
);

export const getInitialShopList = createSelector(
  [shopListSelector],
  (shopListSelector) => shopListSelector.initialList
);

export const isShopListChanged = createSelector(
  [shopListSelector],
  (shopListSelector) => shopListSelector.isChanged
);
