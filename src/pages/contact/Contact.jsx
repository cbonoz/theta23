import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ContactForm from '../../components/Form/ContactForm';
import { DEFAULT_HOME_PAGE } from '../../constants';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  return (
    <div align="center">
      <Typography align="center" variant="h2" sx={{mt: 6}} color="primary">Contact Us</Typography>
      {!submitted ? 
         <ContactForm submitted={submitted} setSubmitted={setSubmitted} />: 
         <Typography>Thank you for contacting us! We'll take a look at your message shortly.</Typography>}

      <Button onClick={() => {navigate(DEFAULT_HOME_PAGE);}} color="primary" variant="contained" >Go To App</Button>
      <Button onClick={() => {navigate("/");}} color="primary" variant="outlined" >Go To Homepage</Button>
    </div>
  );
};

export default Contact;