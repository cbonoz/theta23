import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

import ReportBugsForm from '../../components/Form/ReportBugsForm';

const Reportbugs = () => {
  const [reported, setReported] = useState(false);
  const navigate = useNavigate();

  return (
    <div align="center">
      <Typography align="center" variant="h2" sx={{mt: 6}} color="primary">Report A Bug</Typography>
      {!reported ? 
         <ReportBugsForm reported={reported} setReported={setReported} />: 
         <Typography>Thank you for reporting, we'll fix it ASAP!</Typography>}

      <Button onClick={() => {navigate("/help");}} color="primary" variant="contained" >Go To App</Button>
      <Button onClick={() => {navigate("/");}} color="primary" variant="outlined" >Go To Homepage</Button>
    </div>
  );
};

export default Reportbugs;