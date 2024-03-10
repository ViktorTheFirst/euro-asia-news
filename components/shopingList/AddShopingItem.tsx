import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, TextField } from '@mui/material';

import { addShopListItemAction } from '@/store/ShopList';
import { ShopListItem } from '@/utils/interfaces';

const AddShopingItem = () => {
  const [item, setItem] = useState('');
  const dispatch = useDispatch();

  const handleAddButtonClick = () => {
    const shopListItem: ShopListItem = {
      title: item,
      amount: 1,
      isDone: false,
    };
    dispatch(addShopListItemAction(shopListItem));
    setItem('');
  };

  return (
    <Box
      component={Box}
      display='flex'
      justifyContent='space-evenly'
      alignItems='center'
      sx={{
        width: '100%',
        height: '12vh',
      }}
    >
      <TextField
        id='add item input'
        label='Add item'
        size='small'
        variant='outlined'
        margin='none'
        type='search'
        value={item}
        onChange={(val) => setItem(val.target.value)}
        sx={{ width: '60%' }}
      />
      <Button
        variant='contained'
        color='primary'
        size='medium'
        onClick={handleAddButtonClick}
        sx={{
          borderRadius: '50%',
          height: '63px',
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddShopingItem;
