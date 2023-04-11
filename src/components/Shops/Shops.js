import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import Shop from './Shop/Shop';

const Shops = ({ setCurrentId }) => {
  const { shops, isLoading } = useSelector((state) => state.shops);

  if(!shops.length && !isLoading) return 'No Items Found';
  return (
      isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={1}>
        {shops.map((shop) => (
          <Grid key={shop._id} item xs={12} sm={12}>
            <Shop shop={shop} setCurrentId={setCurrentId} />
          </Grid>
        ))}
        </Grid>
      )
  )
}

export default Shops;