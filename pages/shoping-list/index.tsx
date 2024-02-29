import React from 'react';
import styled from 'styled-components';
import AddShopingItem from '@/components/input/AddShopingItem';
import ShopingItemsList from '@/components/list/ShopingItemsList';
import { Container } from '@/styles/globalStyles';

const ShopingListContainer = styled(Container)`
  height: ${(props) => 100 - 7 /* props.theme.appBarHeight */}vh;
  display: flex;
  flex-direction: column;
`;

const ShopingList = () => {
  return (
    <ShopingListContainer>
      <AddShopingItem />
      <ShopingItemsList />
    </ShopingListContainer>
  );
};

export default ShopingList;
