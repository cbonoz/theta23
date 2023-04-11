import React from 'react';
import { Box, Typography, ButtonBase, Card, Grid, Grow } from '@mui/material';
import { styled } from '@mui/material/styles';

import bugImage from '../../../assets/bugs.svg';
import contactImage from '../../../assets/contact.svg';
import tutorialImage from '../../../assets/tutorial.svg';
import { useNavigate } from 'react-router-dom';

import UserSidebar from '../../../components/navbar/UserSidebar';

const Help = () => {
  const navigate = useNavigate();

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
        <UserSidebar open={open} setOpen={setOpen} pageTitle="Support" />
        <Main open={open}>
          <DrawerHeader />
            <Grow in>
              <div>
                <Typography align="center" variant="h2" sx={{mt: 6}} color="primary">Need Help?</Typography>
                <Typography align="center" variant="subtitle1" sx={{mb: 6}}>We're here for you!</Typography>
                <Grid container sx={{
                  display: 'flex', flexDirection: {xs: 'column', sm: 'column', md: 'row'}
                }} justify="center" align="center" spacing={3}>
                  <Grid item xs={4} sm={4} md={4}>
                    <ButtonBase onClick={() => {navigate("/tutorial");}}>
                      <Card sx={{height: "300px"}}>
                        <Typography align="center" variant='h6' sx={{mb: 3}}>Tutorial</Typography>
                        <img src={tutorialImage} width={300} />
                      </Card>
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                    <ButtonBase onClick={() => {navigate("/contact");}}>
                      <Card sx={{height: "300px"}}>
                        <Typography align="center" variant='h6'sx={{mb: 8}}>Contact Us</Typography>
                        <img src={contactImage} width={300} />
                      </Card>
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                    <ButtonBase onClick={() => {navigate("/reportbugs");}}>
                      <Card sx={{height: "300px"}}>
                        <Typography align="center" variant='h6' sx={{mb: 1}}>Report A Bug</Typography>
                        <img src={bugImage} width={300} />
                      </Card>
                    </ButtonBase>
                  </Grid>
                </Grid>
              </div>
            </Grow>
        </Main>
      </Box>
    </div>
  )
}

export default Help;