import React from 'react';
import { Box, List } from '@mui/material';

import { MOCK_SHOPING_LIST } from '@/utils/mocks';
import ShopingItem from '../shopingItem/ShopingItem';

const ShopingItemsList = () => {
  return (
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      justifyContent='flex=start'
      alignItems='center'
      bgcolor='#99e25d'
      sx={{
        width: '100%',
        height: (theme) => `calc(100vh - 10vh - ${theme.appBarHeight}vh)`,
      }}
    >
      <List sx={{ width: '100%' }}>
        {MOCK_SHOPING_LIST.map(
          (item: { name: string; amount: number }, index: number) => {
            const labelId = `checkbox-list-label-${item.name}`;

            return (
              <ShopingItem
                key={`${item.name}_${index}`}
                labelId={labelId}
                item={item}
                itemsAmount={MOCK_SHOPING_LIST.length - 1}
                index={index}
              />
            );
          }
        )}
      </List>
    </Box>
  );
};

export default ShopingItemsList;
