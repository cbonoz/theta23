import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Drawer, CssBaseline, Toolbar, List, Typography, Divider, 
  IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import logo from '../../assets/logo.png';

import * as actionType from '../../constants/actionTypes';
import { useEthers } from '@usedapp/core';
import { PersonPinCircleOutlined } from '@mui/icons-material';
import { DEFAULT_HOME_PAGE } from '../../constants';

const DonorSidebar = ({ pageTitle, open, setOpen }) => {
  const {deactivate} = useEthers()
  const drawerWidth = 248;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    dispatch({ type: actionType.LOGOUT });
    deactivate()
    setTimeout(() => navigate('/'), 100);
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap component="div">
                {pageTitle}
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
            PaperProps={{
              sx: {
                backgroundColor: "#b3dee3",
                color: "#424242",
              }
            }}
        >
            <DrawerHeader>
            <Box sx={{ mr: 0.5 }}>
              <a href={DEFAULT_HOME_PAGE}>
                <img src={logo} alt="logo" width={180} height={45} />
              </a>
            </Box>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem disablePadding onClick={() => {navigate("/donor/marketplace");}}>
                    <ListItemButton>
                    <ListItemIcon>
                        <StorefrontIcon style={{ color: '#424242' }} />
                    </ListItemIcon>
                    <ListItemText primary="Marketplace" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding onClick={() => {navigate("/donor/transactions");}}>
                    <ListItemButton>
                    <ListItemIcon>
                      <AssessmentIcon style={{ color: '#424242' }} />
                    </ListItemIcon>
                    <ListItemText primary="Transactions" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding onClick={() => {navigate("/donor/account");}}>
                    <ListItemButton>
                    <ListItemIcon>
                        <PersonIcon style={{ color: '#424242' }} />
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                    </ListItemButton>
                </ListItem>
                
                <Divider />
                <ListItem disablePadding onClick={logout}>
                    <ListItemButton>
                    <ListItemIcon>
                        <LogoutIcon style={{ color: '#424242' }} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
             
            </List>
        </Drawer>
    </div>
  )
};

export default DonorSidebar;