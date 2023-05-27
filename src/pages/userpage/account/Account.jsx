import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import SwitchAccounts from '../../../components/SwitchAccounts';
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
  // debug set userRef to fetch from account
  const userRef = doc(db, "users", '0x82BD5fD0F73bA74f335917991519b151f7eD6E02')

  useEffect(() => {
    const getUserData = async() => {
      try { const data = await getDoc(userRef);
      setUserData(data.data())
    } catch (err) {
      console.error(err)
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

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <UserSidebar open={open} setOpen={setOpen} pageTitle="Account Overview" />
        <Main open={open}>
          <DrawerHeader />
          <h1>User information</h1>
          <div>
            <h3>Email: {userData.email}</h3>
            <h3>First Name: {userData.firstName}</h3>
            <h3>Last Name: {userData.lastName}</h3>
          </div>
          <Typography variant="h6" component="h6">Network: {ACTIVE_NETWORK.chainName}</Typography>
          {account && <Typography variant="h6" component="h6">Address: {account}</Typography>}
          {/* Render balance */}
          <RenderBalance account={account} amount={amount} loading={!amount}/>
          <Typography>Current Account Type: Creator</Typography>
          <SwitchAccounts type={"Creator"}/>
        </Main>
      </Box>
    </div>
  )
}

export default Account;