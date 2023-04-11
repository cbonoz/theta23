import React from 'react';
import { Feature } from '../../components';
import './about.css';
import { APP_NAME } from '../../constants';

const about = () => {
  return (
    <div className="toku__about section__margin" id="about">
      <div className='toku__about-heading'>
        <h1 className='gradient__text'>What is {APP_NAME}?</h1>
        <p>An ANIMAL ADOPTION NFT family</p>
      </div>
      <div>
        <p>
        Our platform offers a unique opportunity to make a lasting impact on the lives of shelter animals. 
        By minting an NFT, you'll be able to showcase your support for animal welfare and connect with like-minded 
        individuals who share the same passion. Your contribution will be used to spread the word, connect with 
        influencers and artists to drive more support and make a real difference in the lives of our furry friends in need.
        <br />
        <br />
        By holding an NFT of your favorite animal, you will unlock a personal and immersive web3 adoption experience. 
        This experience will allow you to meet your animal virtually, receive regular updates, and engage with influencers 
        who are supporting your animal.
        </p>
      </div>
    </div>
  )
}

export default about;