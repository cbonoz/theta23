import React from 'react';
import { Typography, Button } from '@mui/material';
import imgstock from '../../assets/stocklist.png';
import imgshop from '../../assets/shoppinglist.png';
import imgrecipes from '../../assets/recipespage.png';
import { useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../constants';

const Tutorial = () => {
  const navigate = useNavigate();
  return (
    <div align="center">
      <div>
        <Typography variant="h2" sx={{mt: 6}} color="primary">How to use {APP_NAME}</Typography>
      </div>
      <Button sx={{mt: 2, mb: 6}}variant="contained" onClick={()=> {
        navigate('/help');
      }}>Go Back</Button>
    </div>
  )
}

export default Tutorial