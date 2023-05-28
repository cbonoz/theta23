import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material'
import logo from '../../assets/logo.png';

const Starter = () => {
    const navigate = useNavigate();
  return (
    <div align="center">
        <Typography variant="h3" sx={{mt: 20, mb: 5}} color="primary">Welcome to</Typography>
        <img src={logo} alt="logo"/>
        <Typography variant="h6" sx={{marginTop: 5, marginBottom: 2}}>Select View:</Typography>
        <div>
            <Button className='standard-btn' variant="contained" onClick={() => {navigate("/user/account");}}>Donor</Button>&nbsp;
            <Button className='standard-btn' variant="contained" onClick={() => {navigate("/sponsor/account");}}>Creator</Button>&nbsp;
        </div>
        <Button sx={{marginTop: 20}} className='standard-btn' variant="text" onClick={() => {navigate("/tutorial");}}>Want a tutorial?</Button>
    </div>
  )
}

export default Starter