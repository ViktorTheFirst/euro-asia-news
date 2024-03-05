import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Chip,
  Menu,
  MenuItem,
  ButtonGroup,
} from '@mui/material';
import { MoreVert, ArrowDropUp, ArrowDropDown } from '@mui/icons-material';

import { ShopListItem } from '@/utils/interfaces';
import {
  editShopListItemAction,
  removeShopListItemAction,
} from '@/store/ShopList';
import EditShopListItemModal from '../modal/EditShopListItemModal';

interface ShopingItemProps {
  labelId: string;
  item: ShopListItem;
  itemsAmount: number;
  index: number;
}

const ShopingItem = ({
  labelId,
  item,
  itemsAmount,
  index,
}: ShopingItemProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [completed, setCompleted] = useState(false);

  const dispatch = useDispatch();

  const handleClose = (event: any) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const handleDotsClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
    console.log('handleDotsClick - item ', item);
    console.log('handleDotsClick - index', index);
  };

  const handleRemoveItemClick = () => {
    dispatch(removeShopListItemAction(item.title));
    setAnchorEl(null);
  };

  const handleEditItemClick = () => {
    setEditModalOpen(true);
  };

  const onEditItemModalClose = () => {
    setEditModalOpen(false);
  };

  const onEditItemComplete = (title: string, amount: number) => {
    dispatch(
      editShopListItemAction({
        ...item,
        title,
        amount,
      })
    );
    setEditModalOpen(false);
    setAnchorEl(null);
  };

  const handleCheckboxClick = (event: any) => {
    event.stopPropagation();
    setCompleted(event.target?.checked);
    dispatch(
      editShopListItemAction({
        ...item,
        isDone: event.target?.checked,
      })
    );
  };

  const handleItemClick = (event: any) => {
    event.stopPropagation();
    setSelected((prev) => !prev);
  };

  const handleArrowUp = (event: any) => {
    event.stopPropagation();
    dispatch(
      editShopListItemAction({
        ...item,
        amount: item.amount + 1,
      })
    );
  };

  const handleArrowDown = (event: any) => {
    event.stopPropagation();
    if (item.amount === 1) return;
    dispatch(
      editShopListItemAction({
        ...item,
        amount: item.amount - 1,
      })
    );
  };

  return (
    <ListItem
      key={`${item.title}_${index}`}
      //role={undefined}
      divider={index !== itemsAmount}
      onClick={handleItemClick}
    >
      <ListItemIcon>
        <Checkbox
          edge='start'
          checked={completed}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': labelId }}
          onClick={handleCheckboxClick}
        />
      </ListItemIcon>
      <ListItemText id={labelId} primary={item.title} />
      {item.amount > 1 && <Chip label={item.amount} color='primary' />}
      {selected && (
        <ButtonGroup
          orientation='vertical'
          variant='contained'
          sx={{ marginLeft: '8px' }}
        >
          <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
            <ArrowDropUp
              color='info'
              fontSize='small'
              onClick={handleArrowUp}
            />
          </ListItemIcon>
          <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
            <ArrowDropDown
              color='error'
              fontSize='small'
              onClick={handleArrowDown}
              sx={{ display: item.amount === 1 ? 'none' : 'inherit' }}
            />
          </ListItemIcon>
        </ButtonGroup>
      )}
      <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
        <MoreVert onClick={handleDotsClick} />
      </ListItemIcon>

      <Menu
        id='user-image-menu'
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        keepMounted
        onClose={handleClose}
        transitionDuration={300}
      >
        <MenuItem onClick={() => {}}>Add to favorites</MenuItem>
        <MenuItem onClick={handleEditItemClick}>Edit</MenuItem>
        <MenuItem onClick={handleRemoveItemClick}>Remove</MenuItem>
      </Menu>
      <EditShopListItemModal
        existingItem={item}
        isModalOpen={editModalOpen}
        itemType='item'
        onClose={onEditItemModalClose}
        onEdit={onEditItemComplete}
      />
    </ListItem>
  );
};

export default ShopingItem;
