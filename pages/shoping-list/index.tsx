import React from 'react';
import { Box, Divider } from '@mui/material';

import AddShopingItem from '@/components/shopingList/AddShopingItem';
import ShopingItemsList from '@/components/shopingList/ShopingItemsList';
import ShopingListBottomButtons from '@/components/shopingList/ShopingListBottomButtons';

const ShopingList = () => {
  return (
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      sx={{
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.appBarHeight}vh)`,
      }}
    >
      <AddShopingItem />
      <Divider orientation='horizontal' flexItem />
      <ShopingItemsList />
      <ShopingListBottomButtons />
    </Box>
  );
};

export default ShopingList;
