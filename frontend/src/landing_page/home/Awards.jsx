
import React from 'react'

function Awards() {
    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-6">
                    <img style={{ width: '90%' }} src="media/images/largestBroker.svg" alt="Award1" />
                </div>
                <div className="col-6 mt-3">
                    <h1 className=''>Largest stock broker in World</h1>
                    <p className='mb-5'>2+ milion TradeX clients contribute to over 15% of all stock volumes in World daily by trading and investing in : </p>
                    <div className="row">
                        <div className="col-6 p-5">
<ul>
                        <li>
                            <p>Futures and Options</p>
                        </li>

                         <li>
                            <p>Commodities derivatives</p>
                        </li>


                         <li>
                            <p>currency derivatives</p>
                        </li>
                        </ul>
                        </div>
                        <div className="col-6 p-5">
                            <ul>
   <li>
                            <p>Stocks and IPO's</p>
                        </li>

                         <li>
                            <p>Direct mutual funds</p>
                        </li>

                         <li>
                            <p>Bonds and debentures</p>
                        </li>
                    </ul>
                        </div>
                    </div>
                    <img src="media/images/pressLogos.png" alt="" style={{ width: '90%' }} />
                </div>
            </div>
        </div>
    );
}

export default Awards;