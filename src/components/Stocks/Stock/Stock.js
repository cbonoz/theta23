import React from 'react';
import { Card, CardActions, Button, Typography, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deleteStock } from '../../../actions/stocks';

const Stock = ({ stock }) => {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const chipcolor = (department) => {
    if ( department==='Produce' || department==='Bakery' ) {
      return "primary"
    }
    else if ( department==='Meat' || department==='Seafood' ) {
      return "error"
    }
    else if ( department==='Pantry' ) {
      return "warning"
    }
    else if ( department==='Dairy' ) {
      return "info"
    }
    else if ( department==='Beverages' || department==='Frozen' ) {
      return "secondary"
    }
    else if ( department==='Household' ) {
      return "success"
    }
  };

  const textColor = (days) => {
    if ( days < 1 ) {
      return "secondary"
    } else if (days < 3) {
      return "error"
    }
    else {
      return "string"
    }
  }

  var m = moment(stock.expiry);
  var today = moment().startOf('day');
  var days = Math.round((m - today) / 86400000) - 1;

  const expiryCalc = (days) => {
    if (days === 1) {
      return "Expires in 1 day"
    }
    else if (days > 1) {
      return `Expires in ${days} days`
    }
    else {
      return "Expired"
    }
  }

  return (
    <Card>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Chip sx={{ml: 1}} label={stock.department} color={chipcolor(stock.department)} />
          <Typography sx={{ml: 1}} variant="h6">{stock.title}</Typography>
          <Typography sx={{ ml: "auto"}} color={textColor(days)} variant="subtitle2">{expiryCalc(days)}</Typography>
        <CardActions>
          {(user?.result?.sub === stock?.creator || user?.result?._id === stock?.creator) && (
              <Button size="small" color="primary" onClick={() => dispatch(deleteStock(stock._id))}>
                <DeleteIcon fontSize='small' />&nbsp; Delete
              </Button>
          )}
        </CardActions>
      </div>
    </Card>
  )
}

export default Stock;