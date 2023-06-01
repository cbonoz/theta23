import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

import SwitchAccounts from '../../../components/SwitchAccounts';
import SetUpAccount from '../../../components/SetUpAccount';
import UserSidebar from '../../../components/navbar/UserSidebar';
import { ACTIVE_NETWORK } from '../../../constants';
import RenderBalance from '../../../components/RenderBalance';
import { useEtherBalance } from '@usedapp/core';

import { db } from "../../../config/firebase";
import { doc, getDoc } from 'firebase/firestore';


function Account ({account}) {
  const drawerWidth = 240;
  const amount = useEtherBalance(account);

  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(true);

  // fix bug: cannot take {account} as parameter for userRef
  const userRef = doc(db, "users", "0x82BD5fD0F73bA74f335917991519b151f7eD6E02")

  useEffect(() => {
    const getUserData = async() => {
      try { const data = await getDoc(userRef);
      setUserData(data.data())
    } catch (err) {
      console.log(err);
      }
    };
    getUserData();
  }, []);

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

  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <UserSidebar open={open} setOpen={setOpen} pageTitle="Account Overview" />
        <Main open={open}>
          <DrawerHeader />
          {userData ? (<div align="center">
            <Card sx={{maxWidth: 700}}>
              <div>
                <Typography variant="h2" sx={{mt: 3, mb: 1}} color="primary">Your Account✨</Typography>
                <img src={userData.profilePic} alt="Profile Pic" height={100} width={100} style={{borderRadius: 50}}/>
                <Typography>Username: {userData.userName}</Typography>
                <Typography>Name: {userData.firstName} {userData.lastName}</Typography>
                <Typography>Email: {userData.email}</Typography>
                <Button variant="outlined" sx={{marginTop: 2, marginBottom: 3}} onClick={() => {navigate("/user/editaccount");}}>Edit Account Details</Button>
              </div>
            </Card>
            <Card sx={{marginTop: 2, maxWidth: 700}}>
              <Typography variant="h2" sx={{mt: 3}} color="primary">Your Wallet👛</Typography>
              <Typography>Balance:</Typography>
              <RenderBalance account={account} amount={amount} loading={!amount}/>
              <Typography>Network: {ACTIVE_NETWORK.chainName}</Typography>
              {account && <Typography sx={{mb: 3}}>Address: {account}</Typography>}
              {/* Render balance */}
            </Card>
            <Typography sx={{marginTop: 2, marginBottom: -2}}>You're currently viewing this site as: Donor 👩‍🎨</Typography>
            <SwitchAccounts type={"Donor"}/>
          </div>) : <SetUpAccount/> }
        </Main>
      </Box>
    </div>
  )
}

export default Account;