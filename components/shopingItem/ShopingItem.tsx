import React, { useState } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

interface ShopingItemProps {
  labelId: string;
  item: { name: string; amount: number };
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDotsClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemClick = () => {
    console.log('handleItemClick - item ', item);
    console.log('handleItemClick - index', index);
  };

  return (
    <ListItem
      key={`${item.name}_${index}`}
      role={undefined}
      button
      divider={index !== itemsAmount}
      onClick={handleItemClick}
    >
      <ListItemIcon>
        <Checkbox
          edge='start'
          checked={false}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': labelId }}
          onClick={() => console.log('chekbox clicked')}
        />
      </ListItemIcon>
      <ListItemText id={labelId} primary={item.name} />
      {item.amount > 1 && <Chip label={item.amount} color='primary' />}
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
        <MenuItem onClick={() => {}}>Edit</MenuItem>
        <MenuItem onClick={() => {}}>Remove</MenuItem>
      </Menu>
    </ListItem>
  );
};

export default ShopingItem;
