import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import UserSidebar from '../../../components/navbar/UserSidebar';
import { getTransactionsForAccountAddress } from '../../../util/api';
import { getRpcError } from '../../../util';

const Transactions = ({ account }) => {
  const drawerWidth = 240;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchTransactionForAccount() {
    setLoading(true)
    setError(null);
    try {
      const res = await getTransactionsForAccountAddress(account || '0x1c155c0eb7f2fb63ce149e7586d8595773b3a35a');
      console.log('data', res.data)
      setData(res.data);
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


  useEffect(() => {
    if (account) {
      fetchTransactionForAccount();
    }
  }, [account])

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


  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <UserSidebar open={open} setOpen={setOpen} pageTitle="Dashboard" />
        <Main open={open}>
          <DrawerHeader />
          {/* <img src={UserPanel} alt="userpanel" width={1160} height={631} /> */}
          {loading && <CircularProgress />}
          {!loading && <div>
            <h3>Transactions for {account}</h3>
            {data && JSON.stringify(data)}
            {error && <p className='error-text'>{error}</p>}
          </div>}
        </Main>
      </Box>
    </div>
  )
}

export default Transactions;