import React, { useState} from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Modal } from '@mui/base';

const SwitchAccounts = () => {
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

  return (
    <div>
        <Button variant="contained" onClick={handleOpen}>Switch Accounts</Button>
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
            <Typography>You are currently:</Typography>
            <Typography>Switch to:</Typography>
            <div>
                <Button variant="contained">Creator</Button>
                <Button variant="contained">Sponsor</Button>
                <Button variant="contained">Donor</Button>
            </div>
        </Box>
        </Modal>
    </div> 
  )
}

export default SwitchAccounts;