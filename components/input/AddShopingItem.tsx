import React from 'react';
import { Box, Button, TextField } from '@mui/material';

const AddShopingItem = () => {
  return (
    <Box
      component={Box}
      display='flex'
      justifyContent='space-evenly'
      alignItems='center'
      sx={{
        width: '100%',
        height: '10vh',
      }}
    >
      <TextField
        id='add item input'
        label='Add item name'
        size='small'
        variant='outlined'
        margin='none'
        type='search'
        value={''}
        onChange={() => {}}
        sx={{ width: '60%', caretColor: 'transparent' }}
      />
      <Button
        variant='contained'
        color='primary'
        size='medium'
        onClick={() => {}}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddShopingItem;
