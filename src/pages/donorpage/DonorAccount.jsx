import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import DonorSidebar from '../../components/navbar/DonorSidebar';
import SwitchAccounts from '../../components/SwitchAccounts';

const DonorAccount = ({account}) => {
  const drawerWidth = 240;

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
        <DonorSidebar open={open} setOpen={setOpen} pageTitle="Account Overview" />
        <Main open={open}>
          <DrawerHeader />
          <SwitchAccounts type={"Donor"}/>
        </Main>
      </Box>
    </div>
  )
}

export default DonorAccount;