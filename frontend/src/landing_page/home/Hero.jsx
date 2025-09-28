
import React from 'react'

function Hero() {
    return (
       <div className="container p-5 mb-5">
        <div className="row">
            <img src='media/images/homeHero.png' alt="Hero" />
            <h1 className='mt-5'>Invest in Everything</h1>
            <p>
                Online platform to invest in stocks, derivatives,mutual funds, and more.
            </p>
            <button style={{ width: '15%', margin: '0 auto', borderRadius:'0px', color: 'white',fontSize:'17px', fontWeight:'bold'}} className='p-2 btn btn-primary mb-5'>Signup for free</button>
       </div>
    
</div>
    );
}

export default Hero;