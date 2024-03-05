import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { ShopListItem } from '@/utils/interfaces';

export interface DeleteItemModalProps {
  isModalOpen: boolean;
  itemType: string;
  existingItem: ShopListItem;
  onEdit: (title: string, amount: number) => void;
  onClose: () => void;
}

const EditShopListItemModal = ({
  isModalOpen,
  itemType,
  existingItem,
  onClose,
  onEdit,
}: DeleteItemModalProps) => {
  const [title, setTitle] = useState(existingItem.title);
  const [amount, setAmount] = useState(existingItem.amount);

  return (
    <Dialog open={isModalOpen} onClose={onClose}>
      <DialogTitle>{`Edit ${itemType}`}</DialogTitle>
      <DialogContent>
        <Box component={Box} display='flex' minHeight={80} alignItems='center'>
          <TextField
            label='Title'
            size='small'
            variant='outlined'
            type='text'
            value={title}
            onChange={(val) => setTitle(val.target.value)}
            sx={{ width: '60%' }}
          />
          <TextField
            label='Amount'
            size='small'
            variant='outlined'
            type='number'
            value={amount}
            onChange={(val) => setAmount(+val.target.value)}
            sx={{ width: '30%', marginLeft: '8px' }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={() => onEdit(title, amount)}
          color='secondary'
          variant='contained'
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditShopListItemModal;
