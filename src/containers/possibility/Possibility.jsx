import React from 'react';
import './possibility.css';

import sittingDog from '../../assets/sittingdog.svg';
import { APP_NAME } from '../../constants';

const Possibility = () => {
  return (
    <div className="toku__possibility" id="possibility">
        <div className='toku__possibility-wrapper section__padding'>
          <div className="toku__possibility-image">
            <img src={sittingDog} alt="possibility" />
          </div>
          <div className='toku__possibility-content'>
            <h1 className='gradient__text'>Why {APP_NAME}?</h1>
            <p>Every year, millions of animals end up in shelters, hoping to find a home they can call their own. 
              Unfortunately, many of these animals never get the attention they deserve, and their stay in the 
              shelter may be forever and the last thing they see 💔. Our project was born out of a desire to make a 
              difference in the lives of these animals. By minting an NFT of a shelter animal, you'll help raise 
              awareness and give them a voice, and hopefully facilitate their journey to a forever home.</p>
          </div>
        </div>
    </div>
  )
};

export default Possibility;