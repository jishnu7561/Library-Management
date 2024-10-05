import React, { useState } from 'react';
import { Button, TextField, Typography, Card, CardContent, CardActions, Breadcrumbs } from '@mui/material';
import NavBar from '../../Common/navBar';
import { useDispatch, useSelector } from 'react-redux';
import EditUserDialog from '../../Admin/User-Management/dialog';
import { updateUser } from '../../../Redux/Slice/userSlice';
import request from '../../../APIs/userApi';
import { toast } from 'sonner';
import CustomizedBreadcrumbs from '../../Common/breadCrumbs';

const Profile = () => {
  const { loggedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState({});
  const [openEdit, setOpenEdit] = useState(false);

  const handleEdit = () => {
    setSelectedUser(loggedUser); // Set the selected user
    setOpenEdit(true);
  };

  const handleEditSubmit = (updatedUser) => {
    dispatch(updateUser(updatedUser));
  };

  const handleCloseDialog = () => {
    setSelectedUser(null); // Close the dialog
    setOpenEdit(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <NavBar />
      <div className='flex justify-center items-center flex-grow mt-20'>
        <Card sx={{ maxWidth: 800, width: '100%', padding: 3 }}> {/* Adjusted width here */}
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
              value={loggedUser.name}
              disabled
              sx={{ marginBottom: 2 }} 
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={loggedUser.email}
              disabled
              sx={{ marginBottom: 2 }} 
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="phone"
              value={loggedUser.number}
              disabled
              sx={{ marginBottom: 2 }} 
            />
          </CardContent>
          <CardActions>
            <Button variant="outlined" color="primary" onClick={handleEdit}>
              Edit
            </Button>
          </CardActions>
        </Card>
      </div>
      {openEdit &&
        <EditUserDialog 
          open={openEdit}
          handleClose={handleCloseDialog} 
          user={selectedUser}
          onSubmit={handleEditSubmit}
        />
      }
    </div>
  );
};

export default Profile;
