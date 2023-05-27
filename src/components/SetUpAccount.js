import React, { useState} from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Modal } from '@mui/base';
import { useNavigate } from 'react-router-dom';

const SetUpAccount = () => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid rgba(0,0,0,.333)',
        boxShadow: 24,
        p: 4,
        borderRadius: '8px',
        justifyContent: 'center'
    };
    const navigate = useNavigate();

  return (
    <div>
        <br/>
        {/* <Button variant="contained" onClick={handleOpen}>Set Up Account</Button> */}
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                You must set up your account first
            </Typography>
            <br/>
            <div>
                <Button className='standard-btn' variant="contained" onClick={() => {navigate("/user/editaccount");}}>Set up</Button>&nbsp;
            </div>
        </Box>
        </Modal>
    </div> 
  )
}

export default SetUpAccount;