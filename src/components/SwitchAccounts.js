import React, { useState} from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Modal } from '@mui/base';
import { useNavigate } from 'react-router-dom';

const SwitchAccounts = ({type}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const handleOpen = () => {
        setModalOpen(!modalOpen)
    };

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
        <Button variant="outlined" onClick={handleOpen}>Switch Account Type</Button>
        <Modal
            open={modalOpen}
            onClose={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Switch Account Type
            </Typography>
            <Typography>You are currently logged in as a <b>{type}</b>.</Typography>
            <br/>
            <Typography>Switch to:</Typography>
            <div>
                <Button className='standard-btn' variant="contained" onClick={() => {navigate("/user/account");}}>Creator</Button>&nbsp;
                <Button className='standard-btn' variant="contained">Sponsor</Button>&nbsp;
                <Button className='standard-btn' variant="contained" onClick={() => {navigate("/donor/account");}}>Donor</Button>
            </div>
        </Box>
        </Modal>
    </div> 
  )
}

export default SwitchAccounts;