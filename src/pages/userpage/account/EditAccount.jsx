import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import TvIcon from '@mui/icons-material/Tv';

import UserSidebar from '../../../components/navbar/UserSidebar';

import { db } from "../../../config/firebase";
import { doc, setDoc } from 'firebase/firestore';


function EditAccount ({account}) {

  const [open, setOpen] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newProfilePic, setNewProfilePic] = useState("");

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const navigate = useNavigate();

    // fix bug
  const userRef = doc(db, "users", "0x82BD5fD0F73bA74f335917991519b151f7eD6E02")

  const handleError = () => {
    setError(true)
  }

  const submitForm = async () => {
    if (!newEmail || !newFirstName || !newLastName || !newUserName || !newProfilePic) {
      handleError()
    } else {
      try {
        await setDoc(userRef, {
        email: newEmail,
        firstName: newFirstName,
        lastName: newLastName,
        userName: newUserName,
        profilePic: newProfilePic,
    })} catch (err) {
        console.log(err)
    }
    setSaved(true)
    setError(false)
    }
  }

  return (
    <div>
      <Box sx={{ display: 'flex'}}>
        <UserSidebar open={open} setOpen={setOpen} pageTitle="Edit Account" />
        <DrawerHeader />
        <div>
        <form noValidate autoComplete="off">
            <Typography sx={{width: 300, marginTop: 12}}>Enter your account details below:</Typography>
            <TextField size="small" sx={{width: 300, marginTop: 2}} onChange={(e) => setNewEmail(e.target.value)} required={true} label="Email" variant="outlined" />
            <br />
            <TextField size="small" sx={{width: 300, marginTop: 2}} onChange={(e) => setNewFirstName(e.target.value)} required={true} label="First Name" variant="outlined" />
            <br />
            <TextField size="small" sx={{width: 300, marginTop: 2}} onChange={(e) => setNewLastName(e.target.value)} required={true} label="Last Name" variant="outlined" />
            <br />
            <TextField size="small" sx={{width: 300, marginTop: 2}} onChange={(e) => setNewUserName(e.target.value)} required={true} label="User Name" variant="outlined" />
            <br />
            <TextField size="small" sx={{width: 300, marginTop: 2}} onChange={(e) => setNewProfilePic(e.target.value)} required={true} label="Link to Profile Picture" variant="outlined" />
            <br />
            <Button variant="outlined" sx={{marginTop: 2}}>Connect to Theta.tv <TvIcon fontSize='small'/></Button>
            <br />
            <Button variant="contained" sx={{marginTop: 2, marginRight: 2}} onClick={() => {navigate("/user/account");}}>Go Back</Button>
            <Button variant="contained" sx={{marginTop: 2}} onClick={submitForm}>Save</Button>
            <Typography color="blue" sx={{marginTop: 2}}>{saved ? "Your account details were saved!" : ""}</Typography>
            <Typography color="red" sx={{marginTop: 2}}>{error ? "You must fill out all fields" : ""}</Typography>
        </form>
        </div>
      </Box>
    </div>
  )
}

export default EditAccount;