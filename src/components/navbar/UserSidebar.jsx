import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Drawer, CssBaseline, Toolbar, List, Typography, Divider, 
  IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PaidIcon from '@mui/icons-material/Paid';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';

import logo from '../../assets/logo.png';

import * as actionType from '../../constants/actionTypes';
import { getStocksBySearch } from '../../actions/stocks';
import { getShopsBySearch } from '../../actions/shops';

const UserSidebar = ({ pageTitle, open, setOpen }) => {
  const drawerWidth = 248;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const userId = (user?.result?.sub || user?.result?._id);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      };
    
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);



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

            <Box sx={{ ml: "auto"}}>
                <Avatar 
                    onClick={() => {navigate("/account");}}
                    alt={user.result.name}
                    src={user.result.imageUrl}>{user.result.name.charAt(0)}
                </Avatar>
            </Box>
            <Box sx={{ ml: 0.3}}>
                <Button
                    variant="contained"
                    disableElevation
                    onClick={() => {navigate("/account");}}>{user.result.name}
                </Button>
            </Box>

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
              <a href="/transactions">
                <img src={logo} alt="logo" width={150} height={27} />
              </a>
            </Box>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem disablePadding onClick={() => {navigate("/transactions");}}>
                    <ListItemButton>
                    <ListItemIcon>
                        <AssessmentIcon style={{ color: '#424242' }} />
                    </ListItemIcon>
                    <ListItemText primary="Transactions" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding onClick={() => {navigate("/sell");}}>
                    <ListItemButton>
                    <ListItemIcon>
                        <PaidIcon style={{ color: '#424242' }} />
                    </ListItemIcon>
                    <ListItemText primary="Payment" />
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
                <ListItem disablePadding onClick={() => {navigate("/help");}}>
                    <ListItemButton>
                    <ListItemIcon>
                        <InfoIcon style={{ color: '#424242' }} />
                    </ListItemIcon>
                    <ListItemText primary="Support" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    </div>
  )
};

export default UserSidebar;