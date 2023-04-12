import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import UserSidebar from '../../../components/navbar/UserSidebar';
import { ACTIVE_NETWORK } from '../../../constants';
import RenderBalance from '../../../components/RenderBalance';
import { useEtherBalance } from '@usedapp/core';

const Account = ({account}) => {
  const drawerWidth = 240;
  const amount = useEtherBalance(account);

  const [open, setOpen] = React.useState(true);

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
          <Typography variant="h6" component="h6">Network: {ACTIVE_NETWORK.chainName}</Typography>
          {account && <Typography variant="h6" component="h6">Address: {account}</Typography>}
          {/* Render balance */}
          <RenderBalance account={account} amount={amount}/>
        </Main>
      </Box>
    </div>
  )
}

export default Account;