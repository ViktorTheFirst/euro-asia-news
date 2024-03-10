import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material';

import {
  setShopListAction,
  getShopList,
  setInitialShopListAction,
  isShopListChanged,
  getInitialShopList,
  setIsShopListChangedAction,
} from '@/store/ShopList';
import DeleteItemModal from '../modal/DeleteItemModal';
import { deleteShopListAPI, saveShopListAPI } from '@/api/shopList/shopListAPI';
import { getHouseholdId } from '@/store/Auth';

interface ShopingListButtonsProps {
  householdId: string;
}

const ShopingListBottomButtons = ({ householdId }: ShopingListButtonsProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const shopList = useSelector(getShopList);
  const initialShopList = useSelector(getInitialShopList);
  const isListChanged = useSelector(isShopListChanged);

  const dispatch = useDispatch();

  const onDeleteShopList = async () => {
    await deleteShopListAPI(householdId);
    dispatch(setShopListAction([]));
    dispatch(setInitialShopListAction([]));
    setIsDeleteModalOpen(false);
  };

  const onSaveShopList = async () => {
    saveShopListAPI(shopList, householdId).then((result) => {
      dispatch(setInitialShopListAction(result?.data?.list?.shopList));
      dispatch(setIsShopListChangedAction(false));
    });
  };

  const onCancelChanges = () => {
    dispatch(setShopListAction(initialShopList));
    dispatch(setIsShopListChangedAction(false));
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
        <Button
          variant='contained'
          color='warning'
          disabled={!isListChanged}
          onClick={onCancelChanges}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          color='success'
          disabled={!isListChanged}
          onClick={onSaveShopList}
        >
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
