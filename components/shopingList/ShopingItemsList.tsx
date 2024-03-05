import React from 'react';
import { Box, List, Typography } from '@mui/material';

import ShopingItem from './ShopingItem';
import { useSelector } from 'react-redux';
import { getShopList } from '@/store/ShopList';
import { ShopListItem } from '@/utils/interfaces';

const ShopingItemsList = () => {
  const shopList = useSelector(getShopList);

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
      <List
        sx={{
          width: '100%',
          overflowX: 'hidden',
          overflowY: 'scroll',
          height: '72vh',
        }}
      >
        {!!shopList.length ? (
          shopList.map((item: ShopListItem, index: number) => {
            const labelId = `checkbox-list-label-${item.title}`;

            return (
              <ShopingItem
                key={`${item.title}_${index}`}
                labelId={labelId}
                item={item}
                itemsAmount={shopList.length - 1}
                index={index}
              />
            );
          })
        ) : (
          <Typography textAlign='center' marginTop={5}>
            List is empty, please add items
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default ShopingItemsList;
