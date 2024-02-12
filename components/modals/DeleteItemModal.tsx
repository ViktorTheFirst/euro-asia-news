import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

export interface DeleteItemModalProps {
  isModalOpen: boolean;
  itemType: string;
  onDelete: () => void;
  onClose: () => void;
}

const DeleteItemModal = ({
  isModalOpen,
  itemType,
  onClose,
  onDelete,
}: DeleteItemModalProps) => {
  return (
    <Dialog open={isModalOpen} onClose={onClose}>
      <DialogTitle>{`Delete ${itemType} permanently?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`You will not be able to recover this ${itemType}.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onDelete} color='secondary' variant='contained'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteItemModal;
