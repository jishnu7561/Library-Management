
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



export default function ViewDialog({ open, handleClose, user}) {

  return (
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Borrowed History
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <Typography gutterBottom>
          Here is the history of borrowed books for user: {user.name}
        </Typography>
        <table className="w-full text-sm text-left rtl:text-right text-black">
          <thead className="text-xs text-black uppercase">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Edit</th>              
            </tr>
          </thead>
          <tbody>
            {allBooks.map(book => (
              <tr key={book.id} className="border-b">
                <td className="px-6 py-4">{book.title}</td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">{book.description}</td>
                <td className="px-6 py-4">{book.quantity}</td>
                <td className="px-6 py-4">
                  <button
                    className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${book.archived ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                    onClick={() => handleBlock(book.id)}>
                    {book.archived ? 'Unblock' : 'Block'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-green-500`}
                    onClick={() => handleEdit(book)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
  );
}