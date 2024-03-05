import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material';

import { deleteShopListAction, getShopList } from '@/store/ShopList';
import DeleteItemModal from '../modal/DeleteItemModal';

const ShopingListBottomButtons = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const shopList = useSelector(getShopList);
  const dispatch = useDispatch();

  const onDeleteShopList = () => {
    // TODO: send delete list order to BE and after that delete it on front
    dispatch(deleteShopListAction());
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant='contained'
        sx={{ position: 'absolute', bottom: '30px', left: '50px' }}
      >
        <Button
          variant='contained'
          color='error'
          disabled={!shopList.length}
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete List
        </Button>
        <Button variant='contained' color='warning' disabled>
          Cancel
        </Button>
        <Button variant='contained' color='success' disabled>
          Save
        </Button>
      </ButtonGroup>
      <DeleteItemModal
        isModalOpen={isDeleteModalOpen}
        itemType='shoping list'
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={onDeleteShopList}
      />
    </>
  );
};

export default ShopingListBottomButtons;
