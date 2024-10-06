
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
import { useEffect, useState } from 'react';
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

export default function EditLimitDialog({ open, handleClose, onAddBook }) {

  const dispatch = useDispatch()

  const {isLoading} = useSelector((state)=> state.user)

    const [quantity, setQuantity] =useState(0)

    useEffect(()=>{
      request("GET","/api/admin/limitDetails")
      .then((response)=>{
        console.log("borrowed books limit: "+response.data.borrow_limit)
        setQuantity(response.data.borrow_limit)
      }).catch((error)=>{

      })
    },[])

    const validateForm = () => {
      if (quantity < 1) {
        toast.error('Quantity must be greater than 0.')
        return false;
      }
      return true;
    };


    const handleSubmit= async (e)=>{
      console.log("calleddddd...")
      if (!validateForm()) {
        return;
      }
     
      dispatch(initiateLogin())
      try {
        const response = await request("PUT", `/api/admin/updateBorrowLimit/${quantity}`, {
        });
        console.log("add limit response : "+response.data);
        if (response.data.status == 200) {
          toast.success("successfully updated")
          console.log("successfully updated");
          dispatch(setLoading());
        } else {
          dispatch(setLoading());
          toast.error(response.data.message)
          setQuantity("")
        }
      } catch (error) {
        dispatch(setLoading());
        if(error.status == 404){
          toast.error("Internal server error")
        }
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
        Borrowed Books Limit
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
              label="limit"
              variant="outlined"
              fullWidth
              margin="normal"
              name="limit"
              type='number'
              value={quantity}
              onChange={(e)=>setQuantity(e.target.value)}
              sx={{ marginBottom: 2 }} 
            />
          </CardContent>
      </DialogContent>
      <DialogActions>
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
