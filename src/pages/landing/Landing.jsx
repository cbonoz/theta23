import React from 'react';

import { Footer, Possibility, About, Header } from '../../containers';
import { CTA, LandingNavbar } from '../../components';
import './landing.css';

const Landing = () => {
  return (
      <div className="Landing">
        <div className="gradient__bg">
          <LandingNavbar />
          <Header />
        </div>
        <About />
        <Possibility />
        <CTA />
        <Footer />
      </div>
  )
}

export default Landing;