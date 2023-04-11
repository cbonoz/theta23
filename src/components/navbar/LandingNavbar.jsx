import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import { useNavigate } from "react-router-dom";

import logo from '../../assets/logo.png';
import './landingnavbar.css';
import { APP_NAME } from '../../constants';


const Menu = () => (
  <>
  <p><a href="#home">Home</a></p>
  <p><a href="#about">What is {APP_NAME}?</a></p>
  <p><a href="#possibility">Why {APP_NAME}?</a></p>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  let navigate = useNavigate();
  return (
    <div className="toku__navbar">
      <div className="toku__navbar-links">
        <div className="toku__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="toku__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="toku__navbar-sign">
        {/* <p><a href='/auth'>Sign in</a></p> */}
        <button type="button" onClick={() => {
                  navigate("/auth");}}>Connect Wallet</button>
      </div>
      <div className='toku__navbar-menu'>
        {toggleMenu
          ? <RiCloseLine color="white" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="white" size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className='toku__navbar-menu_container scale-up-center'>
            <div className='toku__navbar-menu_container-links'>
              <Menu />
              <div className="toku__navbar-menu_container-links-sign">
                <p><a href='/auth'>Sign in</a></p>
                <button type="button" onClick={() => {
                  navigate("/auth");
                }}>Sign up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default Navbar;