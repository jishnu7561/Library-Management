
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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { initiateLogin, setLoading } from '../../../Redux/Slice/userSlice';
import request from '../../../APIs/userApi';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function EditUserDialog({ open, handleClose, user ,onSubmit}) {

  const {isLoading} = useSelector((state)=> state.user)
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  

  useEffect(()=>{
    setName(user.name)
    setNumber(user.number)
    setEmail(user.email)
  },[user])

  const validateForm = () => {

    if (!email.trim() || !name.trim()){
      toast.error('All fields must be filled')
      return false;
    }

    if (name.length < 4 || !/^[a-zA-Z]+$/.test(name)) {
      toast.error('Name must be at least 4 characters long and contain only letters');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error('Invalid email address')
      return false;
    }

    if (number.toString().length === 10) {
      return true;
    } else{
      toast.error('Invalid mobile number')
      return false;
    }
    return true;
  };

    const editHandler = async (userId) => {
      // e.preventDefault();
      if (!validateForm()) {
        return;
      }
      
        dispatch(initiateLogin())
      try {
        const response =  await request("PUT", '/api/user/editUser', {
          id:userId,
          name,
          email,
          number,
        });
        console.log("login response : "+response.data.message);
        if (response.data.name) {
          toast.success("edited successfully")
          console.log("edited successfully");
          onSubmit({
            id:response.data.id,
            name:response.data.name,
            email:response.data.email,
            number:response.data.number,
          });
          dispatch(setLoading());
          handleClose()
        } else {
          toast.error(response.data.message)
          dispatch(setLoading());
          handleClose()
        }
      } catch (error) {
        toast.error(error.message)
        dispatch(setLoading());
        handleClose()
      }
    };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Edit User
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
              Profile
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              sx={{ marginBottom: 2 }} 
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              sx={{ marginBottom: 2 }} 
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="number"
              value={number}
              onChange={(e)=>setNumber(e.target.value)}
              sx={{ marginBottom: 2 }} 
            />
          </CardContent>
      </DialogContent>
      <DialogActions>
      <button
              type="submit"
              className="w-26 bg-indigo-600 text-white font-bold text-base py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
              onClick={()=>editHandler(user.id)}
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
            </button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
