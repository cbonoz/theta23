import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Typography } from '@mui/material';

const ContactForm = ({submitted, setSubmitted}) => {
    // const form = useRef();

    // const sendEmail = (e) => {
    //   e.preventDefault();
  
    //   emailjs.sendForm(REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, form.current, REACT_APP_SERVICE_ID)
    //     .then((result) => {
    //         console.log(result.text);
    //     }, (error) => {
    //         console.log(error.text);
    //     });
  
    //   e.target.reset();
    //   setSubmitted(true);

    // };

  return (
    <div>
      <Typography>Sorry we're working on this!</Typography>
        {/* <form ref={form} onSubmit={sendEmail}>
            <div>
              <label>Name: </label>
              <input type="text" name="user_name" />
            </div>
            <div>
              <label>Email: </label>
              <input type="email" name="user_email" />
            </div>
            <div>
              <label>Message: </label>
              <textarea name="message" />
            </div>
            <input type="submit" value="Send" />
        </form> */}
    </div>
  )
}

export default ContactForm;