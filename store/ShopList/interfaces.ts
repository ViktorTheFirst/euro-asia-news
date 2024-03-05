import { ShopListItem } from '@/utils/interfaces';

export interface ShopListInitialState {
  shopList: ShopListItem[];
  initialList: ShopListItem[];
  isChanged: boolean;
}
