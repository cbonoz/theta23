import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import UserSidebar from '../../../components/navbar/UserSidebar';

import { db } from "../../../config/firebase";
import { doc, setDoc } from 'firebase/firestore';


const EditAccount = () => {
  const drawerWidth = 240;

  const [open, setOpen] = useState(true);

  const [formData, setFormData] = useState({email: '', firstName: '', lastName: '', userName: ''})
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));


  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <UserSidebar open={open} setOpen={setOpen} pageTitle="Edit Account" />
        <DrawerHeader />
        <div>
        <form noValidate autoComplete="off">
            <TextField sx={{width: 300, marginTop: 12}} onChange={(e) => setEmail(e.target.value)} required={true} label="Email" variant="outlined" />
            <br />
            <TextField sx={{width: 300, marginTop: 2}} required={true} label="First Name" variant="outlined" />
            <br />
            <TextField sx={{width: 300, marginTop: 2}} required={true} label="Last Name" variant="outlined" />
            <br />
            <TextField sx={{width: 300, marginTop: 2}} required={true} label="User Name" variant="outlined" />
            <br />
            <Button variant="outlined" sx={{marginTop: 2}}>Connect to Theta.tv</Button>
            <br />
            <Button variant="contained" sx={{marginTop: 2}}>Save</Button>
        </form>
        </div>
      </Box>
    </div>
  )
}

export default EditAccount;