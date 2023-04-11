import React from 'react';
import './footer.css';
import tokulogo from '../../assets/logo.png'
import { APP_NAME } from '../../constants';

const Footer = () => {

  return (
    <div className='toku__footer section__padding'>
        <div className='toku__footer-links'>
          <div className='toku__footer-links_logo'>
            <img src={tokulogo} alt='logo' />
            <p>Animals get saved. 💙</p>
          </div>
          <div className='toku__footer-links_div'>
            <h4>Links</h4>
            {/* <p>Social Media</p> */}
            <p><a href='/privacy'>Privacy Policy</a></p>
            <p><a href='/terms'>Terms and Conditions</a></p>
            <p><a href='/contact'>Contact</a></p>
          </div>
        </div>
        <div className='toku__footer-copyright'>
          <p>{new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer;