import React from 'react';
import { Box } from '@mui/material';

import AddShopingItem from '@/components/input/AddShopingItem';
import ShopingItemsList from '@/components/list/ShopingItemsList';

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
      <ShopingItemsList />
    </Box>
  );
};

export default ShopingList;
