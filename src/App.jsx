import React, { useEffect, useState } from 'react';
import { Landing, Contact, Account, Transactions, Sell, Help, Tutorial, Reportbugs, Terms, Privacy, Error, DonorAccount, Marketplace, AdoptedPets } from './pages';
import { Route, Routes, Outlet, Navigate, useNavigate } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import { useEthers } from '@usedapp/core';
import {  APP_THEME, DEFAULT_HOME_PAGE } from './constants';
import './App.css';

const App = () => {
  const { activateBrowserWallet, account, error } = useEthers();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const pathname = window.location.pathname;

  const userRoute = pathname.startsWith('/user')

  useEffect(() => {
    if (!account && userRoute && error) {
      navigate('/')
    } else if (account && pathname === '/') {
      navigate(DEFAULT_HOME_PAGE)
    }
  }, [account, userRoute])

  useEffect(() => {
    activateBrowserWallet();
  }, [])

  

  return (
    <ThemeProvider theme={APP_THEME}>
      <CssBaseline />
      <div className='App'>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="user" element={<Outlet />}>
            <Route path="account" element={<Account account={account} />} />
            <Route path="transactions" element={<Transactions account={account} />} />
            <Route path="sell" element={<Sell account={account} />} />
            <Route path="help" element={<Help />} />
            <Route path="tutorial" element={<Tutorial />} />
            <Route path="reportbugs" element={<Reportbugs />} />
          </Route>
          <Route path="donor" element={<Outlet />}>
            <Route path="account" element={<DonorAccount account={account} />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="adoptedpets" element={<AdoptedPets />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App;
