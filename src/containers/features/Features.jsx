import React from 'react';
import { Feature } from '../../components';
import './features.css';

const featuresData = [
  {
    title: 'Personalized Discounts',
    text: 'Get access to special coupons for items in your shopping list',
  },
  {
    title: 'Reduce food waste',
    text: "If you have unused food that's about to expire or have plans to eat out, efficiently manage your meal plans to reduce food waste.",
  },
  {
    title: 'Reduce spendings',
    text: "Create your own shopping list beforehand so you don't spend money on items you don't need.",
  },
  {
    title: 'Delicious recipes',
    text: 'Get access to recommended recipes and import your own recipe so you can plan your meals efficiently.',
  }
]

const Features = () => {
  return (
    <div className='toku__features section__padding' id="features">
        <div className='toku__features-heading'>
          <h1 className='gradient__text'>What can you do with Toku?</h1>
          <p>Not your coventional food recipe app</p>
        </div> 
        <div className='toku__features-container'>
          {featuresData.map((item, index) => (
            <Feature title={item.title} text={item.text} key = {item.title + index}/>
          ))}
        </div>
    </div>
  )
};

export default Features;