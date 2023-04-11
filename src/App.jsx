import React from 'react';
import { Landing, Auth, Contact, Account, Transactions, Sell, Help, Tutorial, Reportbugs, Terms, Privacy, Error } from './pages';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import './App.css';

const App = () => {
  const ProtectedRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
      user?<Outlet />: <Navigate to="/auth"/>
    )
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#63b7db'
      },
      success: {
        main: '#0097a7'
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GoogleOAuthProvider clientId='342302868532-d7t07ohj57fbbg9765gt1avseqagasag.apps.googleusercontent.com' >
      <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/auth" element={JSON.parse(localStorage.getItem('profile')) ? <Navigate to="/transactions" /> : <Auth/>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms/>} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/account" element={<Account />}/>
              <Route path="/transactions" element={<Transactions />}/>
              <Route path="/sell" element={<Sell/>} />
              <Route path="/help" element={<Help />}/>
              <Route path="/tutorial" element={<Tutorial />}/>
              <Route path="/reportbugs" element={<Reportbugs />}/>
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
    </ThemeProvider>

  )
}

export default App;
