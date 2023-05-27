import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import UserSidebar from '../../../components/navbar/UserSidebar';

import { db } from "../../../config/firebase";
import { doc, setDoc, addDoc } from 'firebase/firestore';


function EditAccount ({account}) {

  const [open, setOpen] = useState(true);

  const [newEmail, setNewEmail] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const navigate = useNavigate();

  const userRef = doc(db, "users", String(account))

  const submitForm = async () => {
    try {
        await setDoc(userRef, {
        email: newEmail,
        firstName: newFirstName,
        lastName: newLastName,
        userName: newUserName
    })} catch (err) {
        console.log(err)
    }
  }

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <UserSidebar open={open} setOpen={setOpen} pageTitle="Edit Account" />
        <DrawerHeader />
        <div>
        <form noValidate autoComplete="off">
            <Typography sx={{width: 300, marginTop: 12}}>Enter your account details below:</Typography>
            <TextField sx={{width: 300, marginTop: 2}} onChange={(e) => setNewEmail(e.target.value)} required={true} label="Email" variant="outlined" />
            <br />
            <TextField sx={{width: 300, marginTop: 2}} onChange={(e) => setNewFirstName(e.target.value)} required={true} label="First Name" variant="outlined" />
            <br />
            <TextField sx={{width: 300, marginTop: 2}} onChange={(e) => setNewLastName(e.target.value)} required={true} label="Last Name" variant="outlined" />
            <br />
            <TextField sx={{width: 300, marginTop: 2}} onChange={(e) => setNewUserName(e.target.value)} required={true} label="User Name" variant="outlined" />
            <br />
            <Button variant="outlined" sx={{marginTop: 2}}>Connect to Theta.tv</Button>
            <br />
            <Button variant="contained" sx={{marginTop: 2, marginRight: 2}} onClick={() => {navigate("/user/account");}}>Go Back</Button>
            <Button variant="contained" sx={{marginTop: 2}} onClick={submitForm}>Save</Button>
        </form>
        </div>
      </Box>
    </div>
  )
}

export default EditAccount;