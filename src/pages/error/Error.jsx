import React from 'react';
import errorImage from '../../assets/error404.svg';
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Button } from '@mui/material';
import { DEFAULT_HOME_PAGE } from '../../constants';

const Error = () => {
  const navigate = useNavigate();
  return (
    <Paper align="center" elavation={0}>
      <div>
        <Typography variant='h1' color="primary">Oops!</Typography>
        <Typography variant='h3'>You've reached the void.</Typography>
        <img src={errorImage} width={500} />
      </div>
      <Button onClick={() => {navigate(DEFAULT_HOME_PAGE);}} color="primary" variant="contained" >Go To App</Button>
      <Button onClick={() => {navigate("/");}} color="primary" variant="outlined" >Go To Homepage</Button>
    </Paper>
  )
}

export default Error;