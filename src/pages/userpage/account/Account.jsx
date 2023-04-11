import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import UserSidebar from '../../../components/navbar/UserSidebar';

const Account = () => {
  const drawerWidth = 240;

  const [open, setOpen] = React.useState(true);

  const user = JSON.parse(localStorage.getItem('profile'));

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
          <Typography variant="h6" component="h6">Name: {user?.result?.name}</Typography>
          <Typography variant="h6" component="h6">Email: {user?.result?.email}</Typography>
          <Typography variant="h6" component="h6">Username: {user.result.userName || 'Null' }</Typography>
          <Typography variant="h6" component="h6">Country: {user.result.country || 'Null' }</Typography>
        </Main>
      </Box>
    </div>
  )
}

export default Account;