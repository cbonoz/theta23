import React from 'react';
import './header.css';
import petting_dog from '../../assets/pettingdog.svg';
import { useNavigate } from 'react-router-dom';
import ConnectButton from '../../components/ConnectButton';
import { useEthers } from '@usedapp/core';

const Header = () => {
  const navigate = useNavigate();
  const { account } = useEthers();

  return (
    <div className="toku__header section__padding" id="home">
        <div className='toku__header-content'>
          <h1 className='gradient__text'>Join our ANIMAL ADOPTION NFT family</h1>
          <p>Mint an NFT of a real animal in need and connect with influencers, artists, and creators to raise awareness and play a direct role on their journey to a forever home. </p>

          <div className='toku__header-content__input'>
            {/* <input id="email" type="email" placeholder="Your Email Address" autoComplete="on"></input> */}
            {account ? 
              <button onClick={() => navigate('/user/transactions')}>Go to transactions</button> :
              <ConnectButton text="Connect wallet to begin" />
            }
          </div>

        </div>
        <div className="toku__header-image">
          <img src={petting_dog} alt="shopping icon" />
        </div>
    </div>
  )
};

export default Header;