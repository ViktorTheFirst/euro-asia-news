import React from 'react';
import styled from 'styled-components';

import { Container } from '@/styles/globalStyles';
import { Button, TextField } from '@mui/material';

const InputContainer = styled(Container)`
  width: 100%;
  height: 10vh;
  display: flex;
  background-color: pink;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  width: 60%;
  caret-color: transparent;
`;

const AddShopingItem = () => {
  return (
    <InputContainer>
      <StyledTextField
        id='add item input'
        label='Add item name'
        size='small'
        variant='outlined'
        margin='none'
        type='search'
        value={''}
        onChange={() => {}}
      />
      <Button
        variant='contained'
        color='primary'
        size='medium'
        onClick={() => {}}
      >
        Add
      </Button>
    </InputContainer>
  );
};

export default AddShopingItem;
