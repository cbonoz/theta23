import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import UserSidebar from '../../components/navbar/UserSidebar';
import { getTransactionsForAccountAddress, getTransactionList } from '../../util/api';
import { getRpcError, titleCase } from '../../util';

const SponsorTransactions = ({ account }) => {
  const drawerWidth = 240;
  const [transactionsData, setTransactionsData] = useState(null);
  const [transactionList, setTransactionList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchTransactionForAccount() {
    setLoading(true);
    setError(null);
    try {
      const res = await getTransactionsForAccountAddress(account || '0x1c155c0eb7f2fb63ce149e7586d8595773b3a35a');
      console.log('transactionsData', res.data)
      setTransactionsData(res.data);
    } catch (error) {
      const errorText = getRpcError(error)
      if (errorText.indexOf('404') !== -1) {
        setError('No transactions found for this account');
      } else {
        setError(errorText);
      }
      console.error('error getting transactions', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTransactionList() {
    setLoading(true);
    setError(null);
    try {
      const res = await getTransactionList();
      console.log('data', res.data)
      setTransactionList(res.data);
    } catch (error) {
      const errorText = getRpcError(error)
      if (errorText.indexOf('404') !== -1) {
        setError('No transactions found');
      } else {
        setError(errorText);
      }
      console.error('error getting transactions', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (account) {
      fetchTransactionForAccount();
    }
  }, [account])

  useEffect(() => {
    fetchTransactionList();
  }, [])

  const [open, setOpen] = useState(true);

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

  console.log(transactionList)
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <UserSidebar open={open} setOpen={setOpen} pageTitle="Dashboard" />
        <Main open={open}>
          <DrawerHeader />
          {/* <img src={UserPanel} alt="userpanel" width={1160} height={631} /> */}
          {loading && <CircularProgress />}
          {!loading && <div>
            <Typography align="center" variant="h2" sx={{mt: 3, mb: 1}} color="primary">Your Transactions📈</Typography>
            <ul>
              {Object.keys(transactionsData || {}).map((key, index) => (
                <li key={index}>{titleCase(key)}: {transactionsData[key]}</li>
              ))}
            </ul>
            <h3>Transactions List</h3>
            {/* <ul>
              {Object.keys(transactionList || {}).map((key, index) => (
                <li key={index}>{titleCase(key)}: {transactionList[key]}</li>
              ))}
            </ul> */}
            {error && <p className='error-text'>{error}</p>}
          </div>}
        </Main>
      </Box>
    </div>
  )
}

export default SponsorTransactions;