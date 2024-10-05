
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
import { useState } from 'react';
import { initiateLogin, setLoading } from '../../../Redux/Slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
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

export default function AddBookDialogs({ open, handleClose, user }) {

  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const {isLoading} = useSelector((state)=> state.user)

    const [title, setTitle] =useState('');
    const [author, setAuthor] =useState('');
    const [description, setDescriptin] =useState('');
    const [quantity, setQuantity] =useState(0)

    const validateForm = () => {

      if (!title.trim() || !author.trim() || !description.trim() || quantity < 1){
        toast.error('All fields must be filled')
        return false;
      }
  
      if (title.length < 4) {
          toast.error('Title must be at least 4 characters long.')
        return false;
      }
    
      if (author.length < 4 || !/^[a-zA-Z\s]+$/.test(author) ) {
          toast.error('Author must be at least 4 characters and only alphabets.')
        return false;
      }
      if (description.length < 5) {
        toast.error('Description must be at least 5 characters long.')
        return false;
      }
      if (quantity < 1) {
        toast.error('Quantity must be greater than 0.')
        return false;
      }
      return true;
    };


    const handleSubmit= async (e)=>{
      console.log("calleddddd...")
      e.preventDefault();
      if (!validateForm()) {
        return;
      }
      console.log("calleddddd...ssss")
      dispatch(initiateLogin())
      try {
        const response = await request("POST", "/api/admin/addBooks", {
          title,
          author,
          description,
          quantity
        });
        console.log("add book response : "+response.data);
        if (response.data.status == 200) {
          toast.success("successfully added")
          console.log("successfully added");
          dispatch(setLoading());
        } else {
          dispatch(setLoading());
          toast.error(response.data.message)
          setAuthor("")
          setTitle("")
          setDescriptin("")
          setQuantity("")
        }
      } catch (error) {
        dispatch(setLoading());
        if(error.status == 404){
          toast.error("Internal server error")
        }
        setAuthor("")
        setTitle("")
        setDescriptin("")
        setQuantity("")
      } finally {
        handleClose();
      }
    }

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add Book
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
              
            </Typography>
            <TextField
              label="title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              sx={{ marginBottom: 2 }} 
            />
            <TextField
              label="Author"
              variant="outlined"
              fullWidth
              margin="normal"
              name="author"
              value={author}
              onChange={(e)=>setAuthor(e.target.value)}
              sx={{ marginBottom: 2 }} 
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              name="description"
              value={description}
              onChange={(e)=>setDescriptin(e.target.value)}
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
              onChange={(e)=>setQuantity(e.target.value)}
              sx={{ marginBottom: 2 }} 
            />
          </CardContent>
      </DialogContent>
      <DialogActions>
        {/* <Button autoFocus onClick={handleSubmit}>
        {isLoading ? (
          <img
          src="../loader.svg" // Replace with your loading image path
          alt="Loading..."
          className="w-5 h-5 mx-auto" // Adjust image size and position as needed
          />
          ) : (
          <span>Submit</span>
          )}
        </Button> */}
        <button
              type="submit"
              className="w-26 bg-indigo-600 text-white font-bold text-base py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
              onClick={handleSubmit}
            >
             {isLoading ? (
                <img
                  src="../loader.svg" 
                  alt="Loading..."
                  className="w-5 h-5 mx-auto"
                  />
              ) : (
              <span>Submit</span>
                )}
            </button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
