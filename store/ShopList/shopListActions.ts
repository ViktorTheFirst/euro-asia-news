import { ShopListItem } from '@/utils/interfaces';
import { createAction } from '@reduxjs/toolkit';

export const addShopListItemAction = createAction<ShopListItem>(
  'shopList/addShopListItemAction'
);

export const removeShopListItemAction = createAction<string>(
  'shopList/removeShopListItemAction'
);

export const editShopListItemAction = createAction<ShopListItem>(
  'shopList/editShopListItemAction'
);

export const setIsShopListChangedAction = createAction<boolean>(
  'shopList/setIsShopListChangedAction'
);

export const deleteShopListAction = createAction(
  'shopList/deleteShopListAction'
);
