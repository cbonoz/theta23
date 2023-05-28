import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useEtherBalance } from '@usedapp/core';
import SponsorSidebar from '../../components/navbar/SponsorSidebar';
import SponsoredPetsTabs from '../../containers/sponsortransactions/SponsoredPetsTabs';

const SponsoredPets = ({account}) => {
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
        <SponsorSidebar open={open} setOpen={setOpen} pageTitle="Sponsoring Pets" />
        <Main open={open}>
          <DrawerHeader />
          <SponsoredPetsTabs />
        </Main>
      </Box>
    </div>
  )
}

export default SponsoredPets;