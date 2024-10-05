import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { CardContent, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { initiateLogin, setLoading } from '../../../Redux/Slice/userSlice';
import { toast } from 'sonner';
import request from '../../../APIs/userApi';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function EditBookDialogs({ open, handleClose, book , onSubmit }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  // Local state for form inputs
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState();

  // Update local state when book prop changes
  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
      setQuantity(book.quantity);
    }
  }, [book]);

  const validateForm = () => {
    if (!title.trim() || !author.trim() || !description.trim() || quantity < 1) {
      toast.error('All fields must be filled');
      return false;
    }
    if (title.length < 4) {
      toast.error('Title must be at least 4 characters long.');
      return false;
    }
    if (author.length < 4 || !/^[a-zA-Z\s]+$/.test(author)) {
      toast.error('Author must be at least 4 characters and only alphabets.');
      return false;
    }
    if (description.length < 5) {
      toast.error('Description must be at least 5 characters long.');
      return false;
    }
    if (quantity < 1) {
      toast.error('Quantity must be greater than 0.');
      return false;
    }
    return true;
  };

  const handleEdit = async (bookId) => {
    if (!validateForm()) {
      return;
    }
    dispatch(initiateLogin());
    try {
      const response = await request("PUT", '/api/admin/editBook', {
        id: bookId,
        title,
        author,
        description,
        quantity: parseInt(quantity, 10) // Ensure quantity is a number
      });
      console.log("response for edit: "+response.data.title)
      if (response) {
        toast.success("Successfully updated the book.");
        dispatch(setLoading());
        handleClose();
        if(response){
          onSubmit({
            id: bookId,
            title: response.data.title,
            author: response.data.author,
            description: response.data.description,
            quantity: response.data.quantity,
          });
        }
      } else {
        dispatch(setLoading());
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("called...")
      toast.error(error);
      dispatch(setLoading());
    }
  }

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Edit Book
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
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Edit Details
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            margin="normal"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            margin="normal"
            name="quantity"
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </CardContent>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEdit(book.id)} // Pass the book ID when editing
          disabled={isLoading} // Disable if loading
        >
          {isLoading ? (
            <img
              src="../loader.svg"
              alt="Loading..."
              className="w-5 h-5 mx-auto"
            />
          ) : (
            <span>Edit</span>
          )}
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
