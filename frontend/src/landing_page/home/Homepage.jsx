
import React from 'react';
import Navbar from '../Navbar';
import Hero from './Hero';
import Education from './Education';
import Stats from './Stats';
import Pricing from './Pricing';
import OpenAccount from '../OpenAccount';
import Footer from '../Footer';
import Awards from './Awards';
function Homepage() {
    return (
        <>
    
        <Hero />
        <Awards />
        <Stats />
        <Pricing />
               <Education />
        <OpenAccount />

        </>
    );
}

export default Homepage;