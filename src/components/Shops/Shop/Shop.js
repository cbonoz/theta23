import React from 'react';
import { Card, CardActions, Button, Typography, Chip } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { useDispatch } from 'react-redux';
import { deleteShop } from '../../../actions/shops';

const Shop = ({ shop }) => {

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

  const textcolor = (priority) => {
    if ( priority==="Urgent" ) {
      return "error"
    }
    else {
      return "string"
    }
  }


  return (
    <Card>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Chip sx={{ml: 1}} label={shop.department} color={chipcolor(shop.department)} />
          <Typography sx={{ml: 1}} variant="h6">{shop.title}</Typography>
          <Typography sx={{ ml: "auto"}} color={textcolor(shop.priority)} variant="subtitle2">{shop.priority}</Typography>
        <CardActions>
          {(user?.result?.sub === shop?.creator || user?.result?._id === shop?.creator) && (
              <Button size="small" color="primary" onClick={() => dispatch(deleteShop(shop._id))}>
                <CheckBoxOutlinedIcon fontSize='small' />&nbsp; Done
              </Button>
          )}
        </CardActions>
      </div>
    </Card>
  )
}

export default Shop;